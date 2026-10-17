"use server";

import {
  COLLECTIONS,
  SETTINGS_FIELDS,
  isCollectionKey,
  parseFields,
  type FieldErrors,
} from "@/cms/collections";
import { auth } from "@/server/auth";
import { CONTENT_TABLES } from "@/server/cms/tables";
import { db } from "@/server/db";
import { siteSettings } from "@/server/db/schema";
import { asc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export type SaveResult =
  | { ok: true; id: string }
  | { ok: false; message: string; errors?: FieldErrors };

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
}

function getTable(collection: string) {
  if (!isCollectionKey(collection)) throw new Error("Unknown collection");
  return { table: CONTENT_TABLES[collection], def: COLLECTIONS[collection] };
}

function publish(collection?: string) {
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  if (collection) revalidatePath(`/admin/content/${collection}`);
}

export async function saveEntry(
  collection: string,
  id: string | null,
  raw: Record<string, unknown>,
): Promise<SaveResult> {
  await requireAdmin();
  const { table, def } = getTable(collection);
  const { values, errors } = parseFields(def.fields, raw);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Fix the highlighted fields.", errors };
  }

  try {
    if (id) {
      const [row] = await db
        .update(table)
        .set({ ...values, updatedAt: new Date() } as never)
        .where(eq(table.id, id))
        .returning({ id: table.id });
      if (!row) return { ok: false, message: "This entry no longer exists." };
      publish(collection);
      return { ok: true, id: row.id };
    }

    const [last] = await db
      .select({ max: sql<number>`coalesce(max(${table.sortOrder}), 0)::int` })
      .from(table);
    const [row] = await db
      .insert(table)
      .values({ ...values, sortOrder: (last?.max ?? 0) + 1 } as never)
      .returning({ id: table.id });
    publish(collection);
    return { ok: true, id: row!.id };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Could not save. Try again." };
  }
}

export async function deleteEntry(collection: string, id: string) {
  await requireAdmin();
  const { table } = getTable(collection);
  await db.delete(table).where(eq(table.id, id));
  publish(collection);
}

export async function setPublished(
  collection: string,
  id: string,
  published: boolean,
) {
  await requireAdmin();
  const { table } = getTable(collection);
  await db
    .update(table)
    .set({ published, updatedAt: new Date() } as never)
    .where(eq(table.id, id));
  publish(collection);
}

export async function moveEntry(
  collection: string,
  id: string,
  direction: "up" | "down",
) {
  await requireAdmin();
  const { table } = getTable(collection);
  const rows = await db
    .select({ id: table.id })
    .from(table)
    .orderBy(asc(table.sortOrder));
  const from = rows.findIndex((row) => row.id === id);
  const to = direction === "up" ? from - 1 : from + 1;
  if (from < 0 || to < 0 || to >= rows.length) return;

  const ordered = [...rows];
  const [moved] = ordered.splice(from, 1);
  ordered.splice(to, 0, moved!);
  // Renumber the whole list so ties left by older rows cannot stall a move.
  await db.transaction(async (tx) => {
    for (const [index, row] of ordered.entries()) {
      await tx
        .update(table)
        .set({ sortOrder: index + 1 } as never)
        .where(eq(table.id, row.id));
    }
  });
  publish(collection);
}

export async function saveSettings(
  raw: Record<string, unknown>,
): Promise<SaveResult> {
  await requireAdmin();
  const fields = SETTINGS_FIELDS.flatMap((group) => group.fields);
  const { values, errors } = parseFields(fields, raw);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Fix the highlighted fields.", errors };
  }
  try {
    const record = { ...values, updatedAt: new Date() } as never;
    await db
      .insert(siteSettings)
      .values({ id: "main", ...(record as object) } as never)
      .onConflictDoUpdate({ target: siteSettings.id, set: record });
    publish();
    revalidatePath("/admin/settings");
    return { ok: true, id: "main" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Could not save. Try again." };
  }
}
