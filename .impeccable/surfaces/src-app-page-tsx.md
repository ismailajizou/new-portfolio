---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Home page (public portfolio)

Scope: `/` single page. Visitor mode: Persuade.

Audience: recruiters, tech leads, CTOs evaluating Ismail for Full Stack / Team Lead / Tech Lead roles. Job: verify in about a minute that he leads and ships. Action: contact him or get the CV. Proof: employers, shipped products, verified numbers from the career KB, live links, approved testimonials. Constraints: single page, all copy comes from the backoffice, KB content rules apply.

Memorable moment: the hero name lands under a slow spotlight while the constellation drifts behind; the experience timeline fills with the signal gradient as the reader scrolls through roles and opens project logs.

## Direction contract

Decision 2026-10-17: the shipped "Signal on black" world (DESIGN.md) is the direction. The earlier CI-pipeline concept is retired.

THESIS: A quiet control room. Near-black surfaces, one cyan → indigo → violet signal, and proof laid out as a timeline of roles with expandable project logs.

OWN-WORLD: Exactly as DESIGN.md: `background` #05060b, glass `surface` panels with `hairline` borders, one signal gradient, emerald only for live/done, dashed amber only for in-progress. Space Grotesk display, Geist body, Geist Mono for dates, chips and log lines.

STORY: Understand "lead who ships with a small team" from the hero; believe it from the timeline, project logs, live links and references; contact or take the CV.

FIRST VIEWPORT: Name, role, one plain sentence, "Get in touch" and "Download CV" visible on desktop and on a 390×844 phone without scrolling. Avatar supports, never pushes the actions below the fold.

EFFECTS: One per region. Hero: spotlight + avatar halo. Page: constellation backdrop. Cards: cursor light. No looping animation that runs indefinitely without a stop.

Unresolved: project screenshots do not exist yet; panels work without images.
