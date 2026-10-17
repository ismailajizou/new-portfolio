"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * Types `text` once, blinks the caret for a moment, then fades the caret
 * out so nothing keeps blinking. The full text is always in the accessible
 * name, so screen readers never hear it half typed.
 */
export function Typewriter({
  text,
  className,
  delay = 500,
  speed = 45,
  linger = 3000,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  /** How long the caret keeps blinking after the text is typed, in ms. */
  linger?: number;
}) {
  const [count, setCount] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      setCount(text.length);
      timer = setTimeout(() => setSettled(true), reduced ? 0 : linger);
    };
    const step = (n: number) => {
      if (n >= text.length) return finish();
      setCount(n);
      timer = setTimeout(() => step(n + 1), speed);
    };
    setSettled(false);
    timer = reduced ? setTimeout(finish, 0) : setTimeout(() => step(1), delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed, linger]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className={cn(
          "bg-signal-1 ml-1 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.1em] transition-opacity duration-500",
          settled ? "opacity-0" : "animate-caret motion-reduce:animate-none",
        )}
      />
    </span>
  );
}
