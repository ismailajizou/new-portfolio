import { db } from "./server/db";
import {
  DEFAULT_CERTIFICATIONS,
  DEFAULT_EDUCATION,
  DEFAULT_EVENTS,
  DEFAULT_EXPERIENCES,
  DEFAULT_INDEPENDENT_PROJECTS,
  DEFAULT_SETTINGS,
  DEFAULT_SKILLS,
} from "./cms/default-content";
import {
  type Testimonial,
  certifications,
  education,
  events,
  experiences,
  projects,
  siteSettings,
  skills,
  testimonials,
} from "./server/db/schema";

async function seedTestimonials() {
  // Check if testimonials already exist
  const existing = await db.select().from(testimonials);
  if (existing.length > 0) {
    console.log("Testimonials already seeded, skipping...");
    return;
  }

  // insert the testimonials
  const records: Omit<Testimonial, "id">[] = [
    {
      name: "Imane Guennach",
      title: "FullStack Developer",
      company: "Arkx Talent Factory",
      text: "One of the most dedicated developers i have seen in the tech field. His attention to details, problem solving skills and ability to deliver high quality work on time made a significant impact on the project we worked on as a team.",
      status: "APPROVED",
      createdAt: new Date("2024-09-17T10:11:21.977Z"),
      updatedAt: new Date("2024-09-17T10:12:48.785Z"),
    },
    {
      name: "BAGHROUS Abdelmoumene",
      title: "CEO",
      company: "Digital Shifts",
      text: "Working with Ismail has been an incredible experience. His expertise in software engineering, combined with his strong problem-solving skills, makes him a valuable asset to any team. Ismail consistently delivers high-quality work. I highly recommend him for any challenging and impactful projects.",
      status: "APPROVED",
      createdAt: new Date("2024-10-18T11:27:19.787Z"),
      updatedAt: new Date("2024-10-18T11:28:54.484Z"),
    },
    {
      name: "Hicham El Aaouad",
      title: "Cyber Security Consultant ",
      company: "Nearsecure",
      text: "Ismail is one of the best JS developers I know. His deep understanding of how things work is unmatched. He delivers clean, efficient code and solves complex problems with ease. A true asset to any team!",
      status: "APPROVED",
      createdAt: new Date("2025-01-23T20:44:11.575Z"),
      updatedAt: new Date("2025-05-25T16:28:30.414Z"),
    },
  ];

  await db.insert(testimonials).values(records);
  console.log(`Seeded ${records.length} testimonials`);
}

// Fills the portfolio content tables once. Anything already edited in the
// backoffice is left alone.
async function seedContent() {
  const [settings] = await db.select().from(siteSettings);
  if (!settings) {
    await db.insert(siteSettings).values({
      id: "main",
      ...DEFAULT_SETTINGS,
      resumeUrl: process.env.NEXT_PUBLIC_RESUME_LINK || null,
      twitterUrl: process.env.NEXT_PUBLIC_TWITTER_LINK || null,
    });
    console.log("Seeded site settings");
  }

  const existing = await db.select({ id: experiences.id }).from(experiences);
  if (existing.length > 0) {
    console.log("Content already seeded, skipping...");
    return;
  }

  let projectOrder = 0;
  for (const [
    index,
    { projects: jobs, ...experience },
  ] of DEFAULT_EXPERIENCES.entries()) {
    const [row] = await db
      .insert(experiences)
      .values({ ...experience, sortOrder: index + 1 })
      .returning({ id: experiences.id });
    for (const job of jobs) {
      await db
        .insert(projects)
        .values({ ...job, experienceId: row!.id, sortOrder: ++projectOrder });
    }
  }
  for (const job of DEFAULT_INDEPENDENT_PROJECTS) {
    await db.insert(projects).values({ ...job, sortOrder: ++projectOrder });
  }

  let skillOrder = 0;
  await db.insert(skills).values(
    DEFAULT_SKILLS.flatMap(({ category, items }) =>
      items.map((item) => ({
        category,
        name: typeof item === "string" ? item : item[0],
        note: typeof item === "string" ? null : item[1],
        sortOrder: ++skillOrder,
      })),
    ),
  );
  await db
    .insert(education)
    .values(DEFAULT_EDUCATION.map((row, i) => ({ ...row, sortOrder: i + 1 })));
  await db
    .insert(certifications)
    .values(
      DEFAULT_CERTIFICATIONS.map((row, i) => ({ ...row, sortOrder: i + 1 })),
    );
  await db
    .insert(events)
    .values(DEFAULT_EVENTS.map((row, i) => ({ ...row, sortOrder: i + 1 })));
  console.log("Seeded portfolio content");
}

async function main() {
  try {
    await seedTestimonials();
    await seedContent();
    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

main();
