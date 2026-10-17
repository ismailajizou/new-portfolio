import { saveEntry } from "@/app/_actions/cms";
import { COLLECTIONS, isCollectionKey } from "@/cms/collections";
import { EntryForm } from "@/components/admin/entry-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { getEntry, listEntries } from "@/server/cms/queries";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ collection: string; id: string }>;
}) => {
  const { collection, id } = await params;
  if (!isCollectionKey(collection)) notFound();
  const def = COLLECTIONS[collection];
  const isNew = id === "new";
  const entry = isNew ? null : await getEntry(collection, id);
  if (!isNew && !entry) notFound();

  // Options for "relation" fields, e.g. the experience a project belongs to.
  const relations: Record<string, { value: string; label: string }[]> = {};
  for (const field of def.fields) {
    if (field.type !== "relation" || !field.relation) continue;
    const target = COLLECTIONS[field.relation];
    relations[field.name] = (await listEntries(field.relation)).map((row) => ({
      value: row.id,
      label: String(row[target.titleField]),
    }));
  }

  const backHref = `/admin/content/${collection}`;
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <Link
        href={backHref}
        className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm"
      >
        <ChevronLeft className="size-4" aria-hidden /> {def.label}
      </Link>
      <AdminPageHeader
        title={
          isNew
            ? `New ${def.singular}`
            : String(entry?.[def.titleField] ?? def.singular)
        }
      />
      <EntryForm
        groups={[{ fields: def.fields }]}
        initial={entry ?? {}}
        action={saveEntry.bind(null, collection, isNew ? null : id)}
        relations={relations}
        backHref={backHref}
      />
    </div>
  );
};
export default Page;
