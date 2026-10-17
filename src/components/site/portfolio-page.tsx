import { Contact } from "@/components/site/contact";
import { Experience } from "@/components/site/experience";
import { Hero } from "@/components/site/hero";
import {
  About,
  Background,
  References,
  Stack,
} from "@/components/site/sections";
import { SiteHeader } from "@/components/site/site-header";
import { Constellation } from "@/components/ui/constellation";
import { type Portfolio } from "@/server/cms/queries";

export function PortfolioPage({ portfolio }: { portfolio: Portfolio }) {
  const { settings } = portfolio;
  const links = [
    { label: "LinkedIn", href: settings.linkedinUrl },
    { label: "GitHub", href: settings.githubUrl },
    { label: "X", href: settings.twitterUrl },
    { label: "CV", href: settings.resumeUrl },
  ].filter((link): link is { label: string; href: string } =>
    Boolean(link.href),
  );

  return (
    <>
      {/* Page backdrop: a drifting constellation over a faint glow. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="from-signal-2/12 absolute -top-[30%] left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 bg-radial-[ellipse_at_center] to-transparent to-65%" />
        <Constellation className="opacity-70" />
      </div>
      <SiteHeader name={settings.name} resumeUrl={settings.resumeUrl} />
      <main className="isolate">
        <Hero portfolio={portfolio} />
        <About portfolio={portfolio} />
        <Experience portfolio={portfolio} />
        <Stack portfolio={portfolio} />
        <Background portfolio={portfolio} />
        <References portfolio={portfolio} />
        <Contact
          name={settings.name}
          email={settings.email}
          location={settings.location}
          availability={settings.availability}
          heading={settings.contactHeading}
          responseTime={settings.responseTime}
          links={links}
        />
      </main>
    </>
  );
}
