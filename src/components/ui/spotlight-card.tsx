"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import * as React from "react";

/**
 * Aceternity "Card Spotlight": a glass panel whose border and surface light
 * up around the cursor.
 */
export function SpotlightCard({
  className,
  children,
  radius = 320,
  color = "99 102 241",
  ...props
}: React.ComponentProps<"div"> & {
  radius?: number;
  /** Space separated RGB channels. */
  color?: string;
}) {
  const x = useMotionValue(-radius);
  const y = useMotionValue(-radius);
  const glow = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, rgb(${color} / 0.12), transparent 70%)`;
  const edge = useMotionTemplate`radial-gradient(${radius * 0.8}px circle at ${x}px ${y}px, rgb(${color} / 0.55), transparent 70%)`;

  return (
    <div
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => {
        x.set(-radius);
        y.set(-radius);
      }}
      className={cn(
        "group/spot border-hairline bg-surface/85 relative rounded-2xl border",
        className,
      )}
      {...props}
    >
      {/* lit border: a 1px ring masked to the edge */}
      <motion.div
        aria-hidden
        style={{ background: edge }}
        className="pointer-events-none absolute -inset-px rounded-[inherit] p-px opacity-0 transition-opacity duration-300 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] group-hover/spot:opacity-100"
      />
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
