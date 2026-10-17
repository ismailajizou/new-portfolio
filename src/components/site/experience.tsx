import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { formatRange, slugify } from "@/lib/format";
import { cn } from "@/lib/utils";
import { type Job, type Portfolio } from "@/server/cms/queries";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Chip, Section } from "./section";

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "link";
  }
}

function ProjectPanel({ job, open }: { job: Job; open?: boolean }) {
  const inProgress = job.status === "IN_PROGRESS";
  return (
    <details
      id={`project-${slugify(job.name)}-${job.id.slice(0, 4)}`}
      open={open}
      className={cn(
        "group/job scroll-mt-28 rounded-xl border bg-white/2 transition-colors open:bg-white/3.5",
        inProgress ? "border-progress/40 border-dashed" : "border-hairline",
      )}
    >
      <summary className="flex cursor-pointer list-none items-start gap-3 rounded-xl px-4 py-3.5 [&::-webkit-details-marker]:hidden">
        <ChevronRight
          aria-hidden
          className="text-signal-1 mt-0.5 size-4 shrink-0 transition-transform duration-200 group-open/job:rotate-90"
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-mono text-[0.9375rem] font-medium">
              {job.name}
            </span>
            {inProgress ? <Chip dashed>in progress</Chip> : null}
          </span>
          {job.tagline ? (
            <span className="text-muted-foreground mt-0.5 block text-sm">
              {job.tagline}
            </span>
          ) : null}
        </span>
      </summary>
      <div className="border-hairline space-y-4 border-t px-4 py-4 pl-11">
        {job.imageUrl ? (
          <img
            src={job.imageUrl}
            alt={`${job.name} screenshot`}
            loading="lazy"
            decoding="async"
            // Reserve a fixed 16:10 frame so opening the log never jumps.
            width={1600}
            height={1000}
            className="border-hairline aspect-[16/10] w-full rounded-lg border object-cover object-top"
          />
        ) : null}
        {job.description ? (
          <p className="text-foreground/85 max-w-[68ch] leading-relaxed">
            {job.description}
          </p>
        ) : null}
        {job.highlights.length > 0 ? (
          <ol className="bg-background/60 border-hairline rounded-lg border px-3 py-2.5 font-mono text-[0.8125rem]">
            {job.highlights.map((line, index) => (
              <li key={line} className="flex gap-3 py-1">
                <span
                  aria-hidden
                  className="text-signal-2 w-5 shrink-0 text-right text-xs leading-6 tabular-nums select-none"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground/85 max-w-[76ch] leading-6">
                  {line}
                </span>
              </li>
            ))}
          </ol>
        ) : null}
        {job.stack.length > 0 || job.url ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <ul className="flex flex-wrap gap-1.5">
              {job.stack.map((item) => (
                <li key={item}>
                  <Chip>{item}</Chip>
                </li>
              ))}
            </ul>
            {job.url ? (
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="text-signal-1 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
              >
                {hostname(job.url)}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </details>
  );
}

function Years({ start, end }: { start: string; end: string | null }) {
  return (
    <p className="font-heading text-muted-foreground/70 text-3xl font-bold tracking-tight md:text-5xl">
      {formatRange(start, end, { yearsOnly: true })}
    </p>
  );
}

export function Experience({ portfolio }: { portfolio: Portfolio }) {
  // Newest first.
  const stages = [...portfolio.stages].reverse();

  const entries: TimelineEntry[] = stages.map((stage, stageIndex) => ({
    id: stage.id,
    live: !stage.endDate,
    title: <Years key={stage.id} start={stage.startDate} end={stage.endDate} />,
    content: (
      <SpotlightCard key={stage.id} className="p-5 md:p-7">
        <header>
          <h3 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
            {stage.role}{" "}
            <span className="text-muted-foreground font-normal">@</span>{" "}
            {stage.url ? (
              <a
                href={stage.url}
                target="_blank"
                rel="noreferrer"
                className="text-gradient underline-offset-4 hover:underline"
              >
                {stage.company}
              </a>
            ) : (
              <span className="text-gradient">{stage.company}</span>
            )}
          </h3>
          <p className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 font-mono text-xs">
            {!stage.endDate ? (
              <span className="text-passed">● current</span>
            ) : null}
            <span>{formatRange(stage.startDate, stage.endDate)}</span>
            {[stage.location, stage.employmentType]
              .filter(Boolean)
              .map((part) => (
                <span key={part}>
                  <span aria-hidden>· </span>
                  {part}
                </span>
              ))}
          </p>
        </header>

        {stage.summary ? (
          <p className="text-foreground/85 mt-5 max-w-[68ch] leading-relaxed">
            {stage.summary}
          </p>
        ) : null}
        {stage.highlights.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {stage.highlights.map((line) => (
              <li key={line} className="flex gap-3">
                <span
                  aria-hidden
                  className="bg-signal-1 mt-2.5 size-1 shrink-0 rounded-full"
                />
                <span className="text-foreground/85 max-w-[68ch] leading-relaxed">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        {stage.jobs.length > 0 ? (
          <div className="mt-6 space-y-2">
            <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              Projects
            </p>
            {stage.jobs.map((job, jobIndex) => (
              <ProjectPanel
                key={job.id}
                job={job}
                open={stageIndex === 0 && jobIndex === 0}
              />
            ))}
          </div>
        ) : null}
        {stage.stack.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {stage.stack.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
        ) : null}
      </SpotlightCard>
    ),
  }));

  if (portfolio.independentJobs.length > 0) {
    entries.push({
      id: "independent",
      title: (
        <p
          key="independent"
          className="font-heading text-muted-foreground/70 text-3xl font-bold tracking-tight md:text-4xl"
        >
          Open source
        </p>
      ),
      content: (
        <SpotlightCard key="independent" className="p-5 md:p-7">
          <h3 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
            Open source and independent
          </h3>
          <div className="mt-5 space-y-2">
            {portfolio.independentJobs.map((job) => (
              <ProjectPanel key={job.id} job={job} />
            ))}
          </div>
        </SpotlightCard>
      ),
    });
  }

  return (
    <Section
      id="experience"
      title="Where I've shipped"
      lead="Every role, with what I built there. Open a project to read its log."
    >
      {entries.length > 0 ? (
        <Timeline data={entries} />
      ) : (
        <p className="text-muted-foreground">Nothing published yet.</p>
      )}
    </Section>
  );
}
