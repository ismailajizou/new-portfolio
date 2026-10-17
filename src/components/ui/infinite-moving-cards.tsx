import { cn } from "@/lib/utils";
import * as React from "react";

/**
 * Aceternity "Infinite Moving Cards", CSS only: the list is rendered twice
 * and slid by half its width, so the loop is seamless. Pauses on hover and
 * focus, or when an ancestor carries data-paused="true" (see
 * MarqueePauseButton); reduced motion turns it into a scrollable row.
 */
export function InfiniteMovingCards<T>({
  items,
  renderItem,
  getKey,
  direction = "left",
  duration = "60s",
  className,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
  direction?: "left" | "right";
  duration?: string;
  className?: string;
}) {
  return (
    <div
      style={{ "--duration": duration, "--gap": "1rem" } as React.CSSProperties}
      className={cn(
        "group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] motion-reduce:overflow-x-auto",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max gap-[var(--gap)] py-2 group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] in-data-[paused=true]:[animation-play-state:paused] motion-reduce:animate-none",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
        )}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className={cn(
              "flex shrink-0 gap-[var(--gap)]",
              copy === 1 && "motion-reduce:hidden",
            )}
          >
            {items.map((item) => (
              <li key={getKey(item)} className="shrink-0">
                {renderItem(item)}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
