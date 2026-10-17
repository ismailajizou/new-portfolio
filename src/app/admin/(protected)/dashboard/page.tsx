import { COLLECTIONS, COLLECTION_KEYS } from "@/cms/collections";
import { AdminPageHeader } from "@/components/admin/page-header";
import { getAdminCounts } from "@/server/cms/queries";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const rowClass =
  "hover:bg-muted flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors";

const Page = async () => {
  const counts = await getAdminCounts();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <AdminPageHeader
        title="Overview"
        description="Everything on the public page is edited here. Changes go live as soon as you save."
      />

      {counts.pendingTestimonials > 0 ? (
        <Link
          href="/admin/testimonials"
          className="border-progress bg-progress/10 mb-6 flex items-center justify-between gap-4 rounded-lg border border-dashed px-4 py-3 text-sm"
        >
          <span>
            <strong className="font-semibold tabular-nums">
              {counts.pendingTestimonials}
            </strong>{" "}
            {counts.pendingTestimonials === 1
              ? "testimonial is"
              : "testimonials are"}{" "}
            waiting for review
          </span>
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      ) : null}

      <ul className="border-border bg-card divide-border divide-y rounded-lg border">
        <li>
          <Link href="/admin/settings" className={rowClass}>
            <span className="font-medium">Site settings</span>
            <span className="text-muted-foreground flex items-center gap-2">
              {counts.settingsSavedAt
                ? `Saved ${format(counts.settingsSavedAt, "d MMM yyyy")}`
                : "Using the built-in defaults"}
              <ChevronRight className="size-4" aria-hidden />
            </span>
          </Link>
        </li>
        {COLLECTION_KEYS.map((key) => (
          <li key={key}>
            <Link href={`/admin/content/${key}`} className={rowClass}>
              <span className="font-medium">{COLLECTIONS[key].label}</span>
              <span className="text-muted-foreground flex items-center gap-2 tabular-nums">
                {counts.collections[key]}
                <ChevronRight className="size-4" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Page;
