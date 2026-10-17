---
name: Ismail Ajizou Portfolio
description: A dark, quiet control-room surface with one cyan-to-violet signal gradient and a drifting constellation behind it.
colors:
  background: "#05060b"
  foreground: "#e6e8f2"
  surface: "#0b0d16"
  card: "#0b0d16"
  muted: "#121522"
  muted-foreground: "#8e94ab"
  border: "#1b2033"
  input: "#262c44"
  hairline: "rgb(148 163 255 / 0.12)"
  primary: "#eef0ff"
  primary-foreground: "#07080f"
  signal-1: "#22d3ee"
  signal-2: "#6366f1"
  signal-3: "#a855f7"
  passed: "#34d399"
  progress: "#fbbf24"
  progress-ink: "#fcd34d"
  ring: "#6366f1"
  destructive: "#f05252"
typography:
  display:
    fontFamily: "Space Grotesk, Geist, sans-serif"
    fontSize: "clamp(3rem, 9vw, 6.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, Geist, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, Geist, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.625
  mono-eyebrow:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    letterSpacing: "0.18em"
    textTransform: "uppercase"
  mono-meta:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
  mono-log:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
  mono-job:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 500
rounded:
  chip: "0.375rem"
  panel: "0.75rem"
  card: "1rem"
  full: "9999px"
---

# Design System: Ismail Ajizou Portfolio

## Overview

**North star: "Signal on black".** Near-black, faintly blue surfaces; one gradient (cyan → indigo → violet) used as the signal; everything else is neutral. Futuristic through restraint: a drifting constellation, a spotlight over the hero, panels lit by the cursor. No neon overload, no busy effects stacked on each other.

The backoffice shares the same tokens (the `<html>` carries `dark`), so shadcn components render in their dark variants there with no extra work.

## Colors

- **Signal gradient** (`signal-1` #22d3ee → `signal-2` #6366f1 → `signal-3` #a855f7): the last name in the hero, company names, the timeline progress beam, the portrait ring, the logo. Use via `text-gradient` or `from-signal-1 via-signal-2 to-signal-3`. Never as a large background fill.
- **Signal 1 (cyan)** alone: inline links, the typing caret, icon accents.
- **Passed (emerald)**: "live / current" only (status dot, current role node, done certifications).
- **Progress (amber)**: unfinished things only, always with a dashed border ("in progress", "studying", "preparing"). Admin uses it for pending items.
- **Primary** is near-white: the Resume pill and default shadcn buttons. Not a colour accent.
- Neutrals: `background` page, `surface`/`card` panels (85–90% opacity, no backdrop blur: blur over the animated canvas costs a repaint every frame; only the sticky header blurs), `hairline` for 1px borders on dark glass.

## Typography

Space Grotesk for headings and big numbers, Geist for body, Geist Mono for meta (dates, chips, project log lines). Sections open with the heading alone: no eyebrow, no section numbers. Small steps: `0.8125rem` for chips and log lines, `0.9375rem` for project names.

## Layout

Single page, `max-w-6xl` container, 16px gutters on mobile. Sections: Hero (+ stats strip) → About → Experience (timeline) → Stack → Background → References → Contact + footer. Section padding `py-24 md:py-32`.

## Elevation and depth

Depth comes from translucency and light, not heavy shadows: panels (`bg-surface/85`) with 1px `hairline` borders, a soft indigo glow under the shimmer button, a fixed radial glow at the top of the page, and the constellation canvas behind everything (`fixed -z-10`).

## Components (src/components/ui)

Adapted from Aceternity UI and Magic UI, shadcn-style (copy-in, Tailwind v4, `motion/react`):

- `constellation.tsx`: canvas particle network (Magic UI Particles). Pauses when the tab is hidden; static under reduced motion; rescales its points on resize instead of reshuffling.
- `spotlight.tsx`: Aceternity Spotlight beam in the hero.
- `shimmer-button.tsx`: Magic UI Shimmer Button. Main CTA ("Get in touch", "Send message"). The edge light only travels on hover/focus. Supports `asChild`.
- `spotlight-card.tsx`: Aceternity Card Spotlight. Glass panel whose border and surface light up under the cursor. Default container for content cards.
- `timeline.tsx`: Aceternity Timeline. Sticky date labels and a gradient beam that fills on scroll; the live entry rings emerald three times once scrolled into view.
- `infinite-moving-cards.tsx`: Aceternity Infinite Moving Cards, CSS-only. Testimonials; pauses on hover/focus; static scroll row under reduced motion. Used only with 3+ items, paired with `marquee-pause-button.tsx` (Pause/Play in the section action row, for touch and keyboard users).
- `typewriter.tsx`: types the role once; the caret blinks for 3s then fades, so nothing blinks indefinitely; full text is always in the accessible name.

Site composition lives in `src/components/site/` (`portfolio-page.tsx` assembles the sections).

## Do's and don'ts

- Do keep one gradient. Do not add new hues.
- Do keep effects to one per region (hero: spotlight + avatar halo; cards: cursor light). Do not stack glow, shimmer and motion on the same element.
- Do respect `prefers-reduced-motion` per component (`motion-reduce:` variants, `MotionConfig reducedMotion="user"`); there is no global animation kill.
- Don't run any loop indefinitely: pulses are finite, the marquee has a pause control.
- Don't use emerald or amber decoratively; they carry status meaning.
- Don't put copy in code; all career text comes from the backoffice (including the contact heading and response time).
- Touch targets are at least 44px (`size-11` / `h-11`).
