import { PortfolioPage } from "@/components/site/portfolio-page";
import { env } from "@/env";
import { getPortfolio, getSettings, type Portfolio } from "@/server/cms/queries";
import { type Metadata } from "next";

// Content comes from the backoffice, so the page is rendered per request.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const [firstName, ...rest] = settings.name.split(/\s+/);
  const twitterHandle = settings.twitterUrl
    ?.match(/(?:twitter|x)\.com\/@?([\w]+)/i)?.[1];
  return {
    // Absolute so the root "%s | Name" template does not repeat the name.
    title: { absolute: settings.seoTitle },
    description: settings.seoDescription,
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      locale: "en_US",
      url: "/",
      siteName: settings.name,
      title: settings.seoTitle,
      description: settings.seoDescription,
      firstName,
      lastName: rest.join(" ") || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
      creator: twitterHandle ? `@${twitterHandle}` : undefined,
    },
  };
}

/** schema.org Person, so search engines can tie the page to the profiles. */
function personJsonLd({ settings, stages, skillGroups }: Portfolio) {
  const current = stages.find((stage) => !stage.endDate);
  const sameAs = [settings.linkedinUrl, settings.githubUrl, settings.twitterUrl]
    .filter((url): url is string => Boolean(url));
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: settings.name,
      jobTitle: settings.role,
      description: settings.seoDescription,
      url: env.NEXT_PUBLIC_URL,
      image: settings.portraitUrl
        ? new URL(settings.portraitUrl, env.NEXT_PUBLIC_URL).toString()
        : undefined,
      address: { "@type": "PostalAddress", addressLocality: settings.location },
      worksFor: current
        ? { "@type": "Organization", name: current.company }
        : undefined,
      knowsAbout: skillGroups.flatMap((group) =>
        group.skills.map((skill) => skill.name),
      ),
      sameAs,
    },
  };
}

export default async function HomePage() {
  const portfolio = await getPortfolio();
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so content from the backoffice cannot close the tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(portfolio)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <PortfolioPage portfolio={portfolio} />
    </>
  );
}
