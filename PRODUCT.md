# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, tech leads and CTOs in Morocco, the UAE and Europe evaluating Ismail Ajizou for Full Stack Developer, Team Lead or Tech Lead roles. They arrive from a CV, LinkedIn or a referral, skim for a minute or two, and decide whether to contact him or download the CV.

Secondary: Ismail himself, as the only backoffice user, adding and editing content without touching code.

Freelance clients are not a target audience.

## Product Purpose

Personal portfolio at https://www.ismail-ajizou.com. It must let a hiring lead verify, fast, that Ismail leads and ships real production systems, and give them a direct path to contact him or get his CV. Success: a visitor understands role, scope and proof within the first screen and reaches contact or CV without hunting.

## Positioning

Lead Full Stack Developer (Casablanca) who ships with a 2-person team: ReparTrust MVP in one month, piyes.com e-commerce with 19k+ products, payments and a supplier stock sync, all on infrastructure he owns. Also a teacher: coached 90 bootcamp students with 90%+ placement, and a former student is now his teammate.

## Operating Context

- Single public page (no per-project pages), plus `/admin` backoffice behind login.
- Visitors come mostly from links in CVs, LinkedIn and application forms; desktop and mobile both matter.
- Career facts are maintained in a separate knowledge base (`~/Desktop/rxresume`); that KB is the source of truth and its CV writing rules apply to public copy.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router, standalone output), React 19, Tailwind 4, Drizzle + PostgreSQL, better-auth, nodemailer, Cloudflare Turnstile, Docker deploy.
- Existing functions to preserve: contact form (email + Turnstile), public testimonial submission with admin moderation, admin login.
- Backoffice must edit everything shown publicly: hero, about, experience, projects, skills, education, certifications, events, social links, CV link, SEO text. No blog.
- Image uploads from the backoffice go to an S3-compatible bucket.
- Content rules (from the KB): never name the confidential freelance client; describe, do not name, IT TRUST and WeHELP projects; no salaries; no invented metrics; ReparTrust and piyes.com have no usage numbers; title is "Lead Full Stack Developer"; Java/Spring is certification-level; AWS Solutions Architect is "preparing for", not certified; languages Arabic native, English fluent, French fluent.
- Removed claims that must not reappear: 70% ERP efficiency, 90% grading time, "architected" the ERP, 350+ trained, TDD, WhatsApp automation, "sole technical owner", "Senior", real-time chat.

## Brand Commitments

- Name: Ismail Ajizou. Voice: direct, concrete, first person, honest about scale; no hype adjectives, no emoji-led copy.
- Contact: ismailajizou1@gmail.com, LinkedIn linkedin.com/in/ismail-ajizou, GitHub ismailajizou.

## Evidence on Hand

- Portrait photo: `public/assets/hero.JPG`.
- Verified career facts, metrics and project details: `~/Desktop/rxresume` (experience, achievements, education, certifications).
- Live products that can be linked: piyes.com, repartrust.com.
- Open-source: merged contributions to aiji42/zod-i18n (2022).
- Events: presented at GITEX Marrakech 2025, GITEX Dubai 2025, GITEX Marrakech 2026.
- Testimonials: whatever is approved in the database.
- Absent, do not fabricate: project screenshots, usage metrics for ReparTrust or piyes.com, client logos, event photos.

## Product Principles

1. Proof before adjectives: every claim is a built thing, a number from the KB, or a link.
2. Honest scale: "2 developers", "just launched" are stated, not hidden.
3. One minute to a decision: role, proof and contact are reachable without scrolling a long way.
4. Content lives in the backoffice; code holds no career copy.
