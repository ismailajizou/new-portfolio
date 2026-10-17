import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Spotlight } from "@/components/ui/spotlight";
import { Typewriter } from "@/components/ui/typewriter";
import { type Portfolio } from "@/server/cms/queries";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { container } from "./section";

function splitName(name: string) {
  const index = name.trim().lastIndexOf(" ");
  if (index === -1) return [name, ""] as const;
  return [name.slice(0, index), name.slice(index + 1)] as const;
}

export function Hero({ portfolio }: { portfolio: Portfolio }) {
  const { settings, stages } = portfolio;
  const [first, last] = splitName(settings.name);
  const jobs = stages.flatMap((stage) => stage.jobs);
  const shipped = jobs.filter((job) => job.status === "SHIPPED").length;
  const firstYear = Number(stages[0]?.startDate.slice(0, 4));
  const years = firstYear ? new Date().getFullYear() - firstYear : 0;
  const current = stages.find((stage) => !stage.endDate);

  const stats = [
    years > 0 ? { value: `${years}+`, label: "years shipping" } : null,
    stages.length > 0
      ? {
          value: String(stages.length),
          label: stages.length === 1 ? "company" : "companies",
        }
      : null,
    shipped > 0 ? { value: String(shipped), label: "projects shipped" } : null,
    current ? { value: current.company, label: "currently at" } : null,
  ].filter((stat): stat is { value: string; label: string } => stat !== null);

  const socials = [
    { href: settings.githubUrl, label: "GitHub", Icon: FaGithub },
    { href: settings.linkedinUrl, label: "LinkedIn", Icon: FaLinkedinIn },
    { href: settings.twitterUrl, label: "X", Icon: FaXTwitter },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <section
      id="top"
      className="relative -mt-32 flex min-h-svh flex-col overflow-hidden pt-32 md:-mt-20 md:pt-20"
    >
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />
      <div
        className={`${container} relative grid flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:py-24`}
      >
        <div>
          <p className="border-hairline text-muted-foreground bg-background/60 inline-flex items-center gap-2.5 rounded-full border py-1 pr-3.5 pl-2.5 text-sm">
            <span className="relative flex size-2">
              <span className="bg-passed animate-pulse-ring absolute inset-0 rounded-full motion-reduce:hidden" />
              <span className="bg-passed relative size-2 rounded-full" />
            </span>
            {settings.availability ? "Open to new roles" : "Building"}
            <span aria-hidden className="bg-hairline h-3.5 w-px" />
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden />
              {settings.location}
            </span>
          </p>

          <h1 className="font-heading mt-8 text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.04em]">
            <span className="text-foreground">{first}</span>{" "}
            <span className="text-gradient">{last}</span>
          </h1>
          <p className="text-foreground/90 mt-6 font-mono text-lg md:text-xl">
            <span aria-hidden className="text-signal-2 mr-2">
              &gt;
            </span>
            <Typewriter text={settings.role} />
          </p>
          <p className="text-muted-foreground mt-5 max-w-[52ch] text-lg leading-relaxed">
            {settings.headline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ShimmerButton asChild>
              <a href="#contact">
                Get in touch
                <ArrowRight
                  className="size-4 transition-transform group-hover/shimmer:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </ShimmerButton>
            {settings.resumeUrl ? (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="border-hairline text-foreground inline-flex h-11 items-center gap-2 rounded-full border bg-white/3 px-6 text-sm font-medium transition-colors hover:bg-white/7"
              >
                <Download className="size-4" aria-hidden />
                Download CV
              </a>
            ) : null}
            <ul className="ml-1 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="text-muted-foreground hover:text-foreground flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/5"
                  >
                    <Icon className="size-[18px]" aria-hidden />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  aria-label="Email"
                  className="text-muted-foreground hover:text-foreground flex size-11 items-center justify-center rounded-full transition-colors hover:bg-white/5"
                >
                  <Mail className="size-[18px]" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mx-auto aspect-[1/2] h-72 sm:h-96 lg:h-[34rem]">
          <div
            aria-hidden
            className="from-signal-1/30 via-signal-2/25 to-signal-3/30 absolute inset-x-[-40%] top-[10%] bottom-[20%] rounded-full bg-linear-to-tr blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-x-[5%] bottom-0 h-[4%] rounded-[50%] bg-black/50 blur-md"
          />
          <Image
            src="/assets/avatar.png"
            alt={`3D avatar of ${settings.name} waving`}
            width={1024}
            height={1024}
            preload
            sizes="(min-width: 1024px) 544px, (min-width: 640px) 384px, 288px"
            className="relative size-full object-cover object-[46%_50%]"
          />
        </div>
      </div>

      {stats.length > 0 ? (
        <div className="border-hairline bg-background/70 relative border-y">
          <dl
            className={`${container} divide-hairline grid grid-cols-2 md:grid-cols-4 md:divide-x`}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-1 py-6 md:px-6 first:md:pl-0">
                <dt className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                  {stat.label}
                </dt>
                <dd className="font-heading mt-1.5 truncate text-2xl font-semibold md:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}
