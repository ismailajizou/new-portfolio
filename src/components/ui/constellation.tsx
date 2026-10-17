"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type Point = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Slow drifting points joined by faint lines when they come close, with a
 * gentle pull toward the cursor. Adapted from Magic UI "Particles".
 * Stops animating for reduced motion and while the tab is hidden.
 */
export function Constellation({
  className,
  density = 14000,
  linkDistance = 130,
}: {
  className?: string;
  /** Screen pixels per point; higher means fewer points. */
  density?: number;
  linkDistance?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let points: Point[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const spawn = (): Point => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.1 + 0.4,
    });

    // Rescale the existing points instead of starting over, so a phone's
    // address bar showing or hiding does not reshuffle the whole field.
    const resize = () => {
      const prevWidth = width;
      const prevHeight = height;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (prevWidth > 0 && prevHeight > 0) {
        const sx = width / prevWidth;
        const sy = height / prevHeight;
        for (const p of points) {
          p.x *= sx;
          p.y *= sy;
        }
      }
      const count = Math.min(110, Math.round((width * height) / density));
      if (points.length > count) points.length = count;
      while (points.length < count) points.push(spawn());
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of points) {
        if (!reduced) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            p.x += dx * 0.0025;
            p.y += dy * 0.0025;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200, 210, 255, 0.55)";
        ctx.fill();
      }
      for (let i = 0; i < points.length; i++) {
        const a = points[i]!;
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j]!;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.22;
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced) draw();
      else frame = requestAnimationFrame(loop);
    };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    resize();
    start();
    const observer = new ResizeObserver(() => {
      resize();
      start();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density, linkDistance]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none size-full", className)}
    />
  );
}
