import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { MarqueePauseButton } from "@/components/ui/marquee-pause-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { formatMonth, formatRange } from "@/lib/format";
import { cn } from "@/lib/utils";
import { type Portfolio } from "@/server/cms/queries";
import {
  ArrowUpRight,
  Award,
  CalendarDays,
  CircleCheck,
  CircleDashed,
  GraduationCap,
  Quote,
} from "lucide-react";
import TestimonialForm from "../testimonial/form-modal";
import { Chip, Section } from "./section";

/* About -------------------------------------------------------------- */

export function About({ portfolio }: { portfolio: Portfolio }) {
  const paragraphs = portfolio.settings.about.split(/\n\s*\n/).filter(Boolean);
  return (
    <Section id="about" title="Who I am">
      <div className="text-foreground/85 max-w-[66ch] space-y-5 text-lg leading-relaxed">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}

/* Stack -------------------------------------------------------------- */

export function Stack({ portfolio }: { portfolio: Portfolio }) {
  const { skillGroups } = portfolio;
  if (skillGroups.length === 0) return null;
  const hasNotes = skillGroups.some((g) => g.skills.some((s) => s.note));
  return (
    <Section
      id="stack"
      title="Tools I build with"
      lead={
        hasNotes ? (
          <>
            Solid means used in production.{" "}
            <span className="text-progress-ink">Dashed</span> means coursework
            or study so far.
          </>
        ) : undefined
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <SpotlightCard key={group.category} className="p-6">
            <h3 className="font-heading flex items-center gap-2 text-lg font-semibold">
              <span
                aria-hidden
                className="from-signal-1 to-signal-3 size-1.5 rounded-full bg-linear-to-r"
              />
              {group.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill.id}>
                  <Chip
                    dashed={Boolean(skill.note)}
                    className={cn(
                      "px-2.5 py-1 text-[0.8125rem]",
                      !skill.note && "text-foreground/85",
                    )}
                  >
                    {skill.name}
                    {skill.note ? (
                      <span className="ml-1 opacity-80">({skill.note})</span>
                    ) : null}
                  </Chip>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}

/* Background --------------------------------------------------------- */

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-signal-1 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRight className="size-3.5" aria-hidden />
    </a>
  );
}

function ColumnTitle({
  icon: Icon,
  children,
}: {
  icon: typeof Award;
  children: React.ReactNode;
}) {
  return (
    <h3 className="font-heading flex items-center gap-2.5 text-lg font-semibold">
      <span className="border-hairline text-signal-1 flex size-8 items-center justify-center rounded-lg border bg-white/3">
        <Icon className="size-4" aria-hidden />
      </span>
      {children}
    </h3>
  );
}

export function Background({ portfolio }: { portfolio: Portfolio }) {
  const { education, certifications, events } = portfolio;
  if (education.length + certifications.length + events.length === 0)
    return null;
  return (
    <Section id="background" title="Education and credentials">
      <div className="grid gap-4 lg:grid-cols-3">
        {education.length > 0 ? (
          <SpotlightCard className="p-6">
            <ColumnTitle icon={GraduationCap}>Education</ColumnTitle>
            <ul className="mt-6 space-y-6">
              {education.map((entry) => (
                <li key={entry.id}>
                  <p className="font-medium">
                    {[entry.degree, entry.field].filter(Boolean).join(", ")}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {entry.institution}
                  </p>
                  <p className="text-muted-foreground mt-1 font-mono text-xs">
                    {formatRange(entry.startDate, entry.endDate, {
                      yearsOnly: true,
                    })}
                  </p>
                  {entry.description ? (
                    <p className="text-foreground/80 mt-2 text-sm leading-relaxed">
                      {entry.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        ) : null}
        {certifications.length > 0 ? (
          <SpotlightCard className="p-6">
            <ColumnTitle icon={Award}>Certifications</ColumnTitle>
            <ul className="mt-6 space-y-5">
              {certifications.map((entry) => {
                const inProgress = entry.status === "IN_PROGRESS";
                const Icon = inProgress ? CircleDashed : CircleCheck;
                return (
                  <li key={entry.id} className="flex gap-3">
                    <Icon
                      aria-hidden
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        inProgress ? "text-progress" : "text-passed",
                      )}
                    />
                    <div>
                      <p className="font-medium">{entry.name}</p>
                      <p className="text-muted-foreground mt-0.5 text-sm">
                        {entry.issuer}
                        <span className="font-mono text-xs">
                          {" · "}
                          {inProgress ? "preparing" : formatMonth(entry.date)}
                        </span>
                      </p>
                      {entry.url ? (
                        <p className="mt-1">
                          <ExternalLink href={entry.url}>
                            Credential
                          </ExternalLink>
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </SpotlightCard>
        ) : null}
        {events.length > 0 ? (
          <SpotlightCard className="p-6">
            <ColumnTitle icon={CalendarDays}>Events</ColumnTitle>
            <ul className="mt-6 space-y-5">
              {events.map((entry) => (
                <li key={entry.id}>
                  <p className="font-medium">
                    {entry.name}{" "}
                    <span className="text-signal-1 font-mono text-xs font-normal">
                      {entry.year}
                    </span>
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    {[entry.location, entry.description]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {entry.url ? (
                    <p className="mt-1">
                      <ExternalLink href={entry.url}>Details</ExternalLink>
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        ) : null}
      </div>
    </Section>
  );
}

/* References --------------------------------------------------------- */

type Testimonial = Portfolio["testimonials"][number];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({
  entry,
  className,
}: {
  entry: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "border-hairline bg-surface/90 relative flex h-full flex-col rounded-2xl border p-6",
        className,
      )}
    >
      <Quote
        aria-hidden
        className="text-signal-2/40 absolute top-5 right-5 size-6"
      />
      <figcaption className="flex items-center gap-3 pr-8">
        <span
          aria-hidden
          className="from-signal-1/25 to-signal-3/25 border-hairline flex size-10 shrink-0 items-center justify-center rounded-full border bg-linear-to-br font-mono text-xs font-medium"
        >
          {initials(entry.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium">{entry.name}</span>
          <span className="text-muted-foreground block text-sm">
            {entry.title.trim()}{" "}
            <span className="text-signal-1">@{entry.company}</span>
          </span>
        </span>
      </figcaption>
      <blockquote className="text-foreground/85 mt-5 flex-1 leading-relaxed">
        {entry.text}
      </blockquote>
    </figure>
  );
}

export function References({ portfolio }: { portfolio: Portfolio }) {
  const { testimonials } = portfolio;
  // A loop only reads as a loop with enough cards to fill the row.
  const scroll = testimonials.length >= 3;
  const half = Math.ceil(testimonials.length / 2);
  const rows =
    testimonials.length >= 6
      ? [testimonials.slice(0, half), testimonials.slice(half)]
      : [testimonials];

  return (
    <Section
      id="references"
      title="What people say"
      action={
        <div className="flex flex-wrap items-center gap-2">
          {scroll ? <MarqueePauseButton label="references" /> : null}
          <TestimonialForm />
        </div>
      }
    >
      {testimonials.length === 0 ? (
        <p className="text-muted-foreground max-w-[60ch]">
          Nothing published yet. If we have worked together, I would value a few
          lines from you.
        </p>
      ) : scroll ? (
        <div className="-mx-4 space-y-4 md:-mx-8 xl:-mx-24">
          {rows.map((row, index) => (
            <InfiniteMovingCards
              key={index}
              items={row}
              getKey={(entry) => entry.id}
              direction={index === 0 ? "left" : "right"}
              duration={`${Math.max(40, row.length * 12)}s`}
              renderItem={(entry) => (
                <TestimonialCard
                  entry={entry}
                  className="w-[min(85vw,24rem)]"
                />
              )}
            />
          ))}
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {testimonials.map((entry) => (
            <li key={entry.id}>
              <TestimonialCard entry={entry} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
