import { COLLECTIONS, isCollectionKey } from "@/cms/collections";
import { AdminPageHeader } from "@/components/admin/page-header";
import { RowActions } from "@/components/admin/row-actions";
import { Button } from "@/components/ui/button";
import { formatMonth } from "@/lib/format";
import { listEntries } from "@/server/cms/queries";
import { Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ collection: string }>;
}) => {
  const { collection } = await params;
  if (!isCollectionKey(collection)) notFound();
  const def = COLLECTIONS[collection];
  const rows = await listEntries(collection);
  // Resolve relation ids (e.g. a project's experience) to readable names.
  const relationLabels: Record<string, Map<string, string>> = {};
  for (const field of def.fields) {
    if (field.type !== "relation" || !field.relation) continue;
    const target = COLLECTIONS[field.relation];
    relationLabels[field.name] = new Map(
      (await listEntries(field.relation)).map((entry) => [
        entry.id,
        String(entry[target.titleField]),
      ]),
    );
  }
  const monthFields = new Set(
    def.fields.filter((f) => f.type === "month").map((f) => f.name),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <AdminPageHeader title={def.label} description={def.description}>
        <Button asChild size="lg" className="px-3">
          <Link href={`/admin/content/${collection}/new`}>
            <Plus aria-hidden /> Add {def.singular}
          </Link>
        </Button>
      </AdminPageHeader>

      {rows.length === 0 ? (
        <div className="border-border rounded-lg border border-dashed px-6 py-14 text-center">
          <p className="font-medium">No {def.label.toLowerCase()} yet</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Add the first {def.singular} and it appears on the site right away.
          </p>
        </div>
      ) : (
        <ul className="border-border bg-card divide-border divide-y rounded-lg border">
          {rows.map((row, index) => {
            const title = String(row[def.titleField] ?? "Untitled");
            const related = Object.entries(relationLabels).map(
              ([name, labels]) =>
                labels.get(String(row[name])) ?? "Independent",
            );
            const subtitle = [...related, ...def.subtitleFields]
              .map((name, position) =>
                position < related.length
                  ? name
                  : monthFields.has(name)
                    ? formatMonth(row[name] as string | null)
                    : row[name],
              )
              .filter(Boolean)
              .join(" · ");
            return (
              <li
                key={row.id}
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3"
              >
                <Link
                  href={`/admin/content/${collection}/${row.id}`}
                  className="min-w-0 flex-1 basis-56"
                >
                  <span className="block truncate text-sm font-medium">
                    {title}
                    {row.status === "IN_PROGRESS" ? (
                      <span className="border-progress text-progress-ink ml-2 rounded-full border border-dashed px-1.5 py-0.5 text-xs font-normal">
                        in progress
                      </span>
                    ) : null}
                  </span>
                  {subtitle ? (
                    <span className="text-muted-foreground block truncate text-sm">
                      {subtitle}
                    </span>
                  ) : null}
                </Link>
                <RowActions
                  collection={collection}
                  id={row.id}
                  title={title}
                  published={row.published}
                  orderable={def.orderable}
                  isFirst={index === 0}
                  isLast={index === rows.length - 1}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default Page;
