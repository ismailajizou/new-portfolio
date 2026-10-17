"use client";

import { LogoMark } from "@/components/site/logo";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  // Left out of the phone bar so the other four fit without scrolling.
  { id: "stack", label: "Stack", desktopOnly: true },
  { id: "references", label: "References" },
  { id: "contact", label: "Contact" },
];

/** The section currently under the top third of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const sections = LINKS.map((link) =>
      document.getElementById(link.id),
    ).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return active;
}

function NavLinks({
  active,
  id,
  compact = false,
}: {
  active: string | null;
  id: string;
  compact?: boolean;
}) {
  const links = compact ? LINKS.filter((link) => !link.desktopOnly) : LINKS;
  return (
    <ul
      className={cn(
        "text-sm whitespace-nowrap",
        compact ? "grid grid-cols-4" : "flex items-center gap-1",
      )}
    >
      {links.map((link) => {
        const isActive = active === link.id;
        return (
          <li key={link.id} className="relative">
            {isActive ? (
              <motion.span
                layoutId={`nav-pill-${id}`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                className="border-hairline absolute inset-0 rounded-full border bg-white/6"
              />
            ) : null}
            <a
              href={`#${link.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative flex items-center justify-center rounded-full transition-colors",
                compact ? "h-11 px-1" : "px-3.5 py-1.5",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader({
  name,
  resumeUrl,
}: {
  name: string;
  resumeUrl: string | null;
}) {
  const active = useActiveSection();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 md:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 w-full max-w-6xl items-center gap-4 rounded-full border px-3 pl-5 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled
            ? "border-hairline bg-background/70 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#top"
          aria-label={`${name}, back to top`}
          className="-ml-1.5 inline-flex size-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
        >
          <LogoMark size={28} gradientId="header-signal" />
        </a>
        <nav aria-label="Sections" className="mx-auto hidden md:block">
          <NavLinks active={active} id="desktop" />
        </nav>
        {resumeUrl ? (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-primary-foreground ml-auto inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-opacity hover:opacity-85 md:ml-0"
          >
            <FileText className="size-4" aria-hidden />
            Resume
          </a>
        ) : (
          <a
            href="#contact"
            className="bg-primary text-primary-foreground ml-auto inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition-opacity hover:opacity-85 md:ml-0"
          >
            Contact
          </a>
        )}
      </div>
      <nav
        aria-label="Sections"
        className="border-hairline bg-background/70 mx-auto mt-2 max-w-6xl rounded-full border p-1 backdrop-blur-xl md:hidden"
      >
        <NavLinks active={active} id="mobile" compact />
      </nav>
    </header>
  );
}
