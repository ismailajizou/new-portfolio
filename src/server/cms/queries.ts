import { type CollectionKey } from "@/cms/collections";
import { DEFAULT_SETTINGS } from "@/cms/default-content";
import { env } from "@/env";
import { db } from "@/server/db";
import {
  certifications,
  education,
  events,
  experiences,
  projects,
  siteSettings,
  skills,
  testimonials,
  type SiteSettings,
} from "@/server/db/schema";
import { asc, desc, eq, sql } from "drizzle-orm";
import { CONTENT_TABLES, type ContentRow } from "./tables";

export type Settings = Omit<SiteSettings, "id" | "updatedAt">;

export async function getSettings(): Promise<Settings> {
  const [row] = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, "main"));
  if (row) return row;
  return {
    ...DEFAULT_SETTINGS,
    resumeUrl: env.NEXT_PUBLIC_RESUME_LINK || null,
  };
}

export async function getPortfolio() {
  const [
    settings,
    experienceRows,
    projectRows,
    skillRows,
    educationRows,
    certificationRows,
    eventRows,
    testimonialRows,
  ] = await Promise.all([
    getSettings(),
    db
      .select()
      .from(experiences)
      .where(eq(experiences.published, true))
      .orderBy(asc(experiences.startDate)),
    db
      .select()
      .from(projects)
      .where(eq(projects.published, true))
      .orderBy(asc(projects.sortOrder)),
    db
      .select()
      .from(skills)
      .where(eq(skills.published, true))
      .orderBy(asc(skills.sortOrder)),
    db
      .select()
      .from(education)
      .where(eq(education.published, true))
      .orderBy(desc(education.endDate)),
    db
      .select()
      .from(certifications)
      .where(eq(certifications.published, true))
      .orderBy(asc(certifications.status), desc(certifications.date)),
    db
      .select()
      .from(events)
      .where(eq(events.published, true))
      .orderBy(asc(events.sortOrder)),
    db
      .select()
      .from(testimonials)
      .where(eq(testimonials.status, "APPROVED"))
      .orderBy(desc(testimonials.createdAt)),
  ]);

  const stages = experienceRows.map((experience) => ({
    ...experience,
    jobs: projectRows.filter(
      (project) => project.experienceId === experience.id,
    ),
  }));
  const stageIds = new Set(experienceRows.map((experience) => experience.id));
  const independentJobs = projectRows.filter(
    (project) => !project.experienceId || !stageIds.has(project.experienceId),
  );

  const skillGroups: { category: string; skills: typeof skillRows }[] = [];
  for (const skill of skillRows) {
    const group = skillGroups.find((g) => g.category === skill.category);
    if (group) group.skills.push(skill);
    else skillGroups.push({ category: skill.category, skills: [skill] });
  }

  return {
    settings,
    stages,
    independentJobs,
    skillGroups,
    education: educationRows,
    certifications: certificationRows,
    events: eventRows,
    testimonials: testimonialRows,
  };
}

export type Portfolio = Awaited<ReturnType<typeof getPortfolio>>;
export type Stage = Portfolio["stages"][number];
export type Job = Stage["jobs"][number];

// Backoffice reads -----------------------------------------------------

const ADMIN_ORDER: Record<CollectionKey, ReturnType<typeof asc>[]> = {
  experiences: [desc(experiences.startDate)],
  projects: [asc(projects.sortOrder)],
  skills: [asc(skills.sortOrder)],
  education: [desc(education.endDate)],
  certifications: [asc(certifications.status), desc(certifications.date)],
  events: [asc(events.sortOrder)],
};

export async function listEntries(key: CollectionKey): Promise<ContentRow[]> {
  const rows = await db
    .select()
    .from(CONTENT_TABLES[key])
    .orderBy(...ADMIN_ORDER[key]);
  return rows as ContentRow[];
}

export async function getEntry(
  key: CollectionKey,
  id: string,
): Promise<ContentRow | null> {
  const table = CONTENT_TABLES[key];
  const [row] = await db.select().from(table).where(eq(table.id, id));
  return (row as ContentRow | undefined) ?? null;
}

export async function getAdminCounts() {
  const count = sql<number>`count(*)::int`;
  const entries = await Promise.all(
    (Object.keys(CONTENT_TABLES) as CollectionKey[]).map(async (key) => {
      const [row] = await db.select({ count }).from(CONTENT_TABLES[key]);
      return [key, row?.count ?? 0] as const;
    }),
  );
  const [pending] = await db
    .select({ count })
    .from(testimonials)
    .where(eq(testimonials.status, "PENDING"));
  const [settingsRow] = await db
    .select({ updatedAt: siteSettings.updatedAt })
    .from(siteSettings);
  return {
    collections: Object.fromEntries(entries) as Record<CollectionKey, number>,
    pendingTestimonials: pending?.count ?? 0,
    settingsSavedAt: settingsRow?.updatedAt ?? null,
  };
}
