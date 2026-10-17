import { cn } from "@/lib/utils";

export const container = "mx-auto w-full max-w-6xl px-4 md:px-8";

/** Section shell: a heading, an optional lead line and an optional action. */
export function Section({
  id,
  title,
  lead,
  action,
  className,
  children,
}: {
  id: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative scroll-mt-24 py-24 md:py-32", className)}
    >
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2
              id={`${id}-title`}
              className="font-heading text-4xl font-semibold tracking-tight md:text-5xl"
            >
              {title}
            </h2>
            {lead ? (
              <p className="text-muted-foreground mt-4 max-w-[60ch] text-lg leading-relaxed">
                {lead}
              </p>
            ) : null}
          </div>
          {action}
        </div>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

/** Small mono chip used for stack items. Dashed means still studying. */
export function Chip({
  children,
  dashed,
  className,
}: {
  children: React.ReactNode;
  dashed?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs",
        dashed
          ? "border-progress/50 text-progress-ink border-dashed"
          : "border-hairline text-muted-foreground bg-white/2",
        className,
      )}
    >
      {children}
    </span>
  );
}
