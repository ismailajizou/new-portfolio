"use client";

import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import * as React from "react";

/**
 * Pause/Play for the InfiniteMovingCards rows in the same <section>, so
 * touch and keyboard users can stop the motion too (hover only covers a
 * mouse). It flags the section with data-paused, which the rows read.
 * Hidden under reduced motion, where the rows are already static.
 */
export function MarqueePauseButton({
  label,
  className,
}: {
  /** What is scrolling, e.g. "references". Used in the accessible name. */
  label: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    section.dataset.paused = String(paused);
    return () => {
      delete section.dataset.paused;
    };
  }, [paused]);

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={paused}
      aria-label={`${paused ? "Play" : "Pause"} scrolling ${label}`}
      onClick={() => setPaused((value) => !value)}
      className={cn(
        "border-hairline text-muted-foreground hover:text-foreground inline-flex h-11 items-center gap-2 rounded-full border bg-white/3 px-4 text-sm transition-colors hover:bg-white/6 motion-reduce:hidden",
        className,
      )}
    >
      {paused ? (
        <Play className="size-4" aria-hidden />
      ) : (
        <Pause className="size-4" aria-hidden />
      )}
      {paused ? "Play" : "Pause"}
    </button>
  );
}
