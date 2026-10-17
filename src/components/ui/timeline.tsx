"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import * as React from "react";

export type TimelineEntry = {
  id: string;
  /** Sticky label on the left, e.g. the date range. */
  title: React.ReactNode;
  /** Set for the entry that is still running; its node pulses. */
  live?: boolean;
  content: React.ReactNode;
};

/** Emerald node for the running entry; rings a few times once it is seen. */
function LiveNode() {
  const ref = React.useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  return (
    <span ref={ref} className="relative flex size-3.5">
      {seen ? (
        <span className="bg-passed animate-pulse-ring absolute inset-0 rounded-full motion-reduce:hidden" />
      ) : null}
      <span className="bg-passed border-passed relative size-3.5 rounded-full border" />
    </span>
  );
}

/**
 * Aceternity "Timeline": a rail that fills with the signal gradient as the
 * reader scrolls, with a sticky label beside each entry.
 */
export function Timeline({
  data,
  className,
}: {
  data: TimelineEntry[];
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <ol>
        {data.map((entry) => (
          <li
            key={entry.id}
            className="relative flex justify-start pt-10 md:gap-10 md:pt-24 first:md:pt-10"
          >
            <div className="sticky top-28 z-30 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <span className="bg-background absolute left-3 flex size-10 items-center justify-center rounded-full md:left-3">
                {entry.live ? (
                  <LiveNode />
                ) : (
                  <span className="border-signal-2/60 bg-surface relative size-3.5 rounded-full border" />
                )}
              </span>
              <div className="hidden md:block md:pl-20">{entry.title}</div>
            </div>
            <div className="relative w-full pr-0 pl-16 md:pl-4">
              <div className="mb-4 md:hidden">{entry.title}</div>
              {entry.content}
            </div>
          </li>
        ))}
      </ol>
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-8 w-px overflow-hidden bg-linear-to-b from-transparent via-[var(--hairline)] to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,#000_6%,#000_94%,transparent_100%)]"
      >
        <motion.div
          style={{ height, opacity }}
          className="from-signal-1 via-signal-2 to-signal-3 absolute inset-x-0 top-0 w-px rounded-full bg-linear-to-b"
        />
      </div>
    </div>
  );
}
