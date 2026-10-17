import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";
import * as React from "react";

/**
 * Magic UI "Shimmer Button": a dark pill with a light sweeping around its
 * edge while hovered or focused; at rest the light sits still on the edge.
 * Pass `asChild` to render a link.
 */
export function ShimmerButton({
  className,
  children,
  asChild = false,
  shimmerColor = "#a5b4fc",
  speed = "3s",
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  shimmerColor?: string;
  speed?: string;
}) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--speed": speed,
          "--cut": "1px",
          "--bg":
            "linear-gradient(135deg, color-mix(in oklab, var(--signal-2) 28%, var(--surface)) 0%, var(--surface) 60%)",
        } as React.CSSProperties
      }
      className={cn(
        "group/shimmer relative z-0 inline-flex h-11 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 px-6 text-sm font-medium whitespace-nowrap text-white [background:var(--bg)]",
        "shadow-[0_0_24px_-6px_rgb(99_102_241/0.6)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_0_32px_-4px_rgb(99_102_241/0.8)] active:translate-y-px",
        "focus-visible:ring-ring/60 outline-none focus-visible:ring-3",
        className,
      )}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {/* spark container */}
      <span
        aria-hidden
        className="[container-type:size] absolute inset-0 -z-30 overflow-visible blur-[2px] motion-reduce:hidden"
      >
        <span className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [animation-play-state:paused] [mask:none] group-hover/shimmer:[animation-play-state:running] group-focus-visible/shimmer:[animation-play-state:running]">
          <span className="animate-spin-around absolute -inset-full w-auto rotate-0 [animation-play-state:paused] [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] group-hover/shimmer:[animation-play-state:running] group-focus-visible/shimmer:[animation-play-state:running]" />
        </span>
      </span>
      {/* inner highlight */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full shadow-[inset_0_-8px_10px_#ffffff1f] transition-shadow duration-300 group-hover/shimmer:shadow-[inset_0_-6px_10px_#ffffff3f]"
      />
      {/* backdrop */}
      <span
        aria-hidden
        className="absolute [inset:var(--cut)] -z-20 rounded-full [background:var(--bg)]"
      />
    </Comp>
  );
}
