import {
  pgTable,
  text,
  timestamp,
  varchar,
  serial,
  pgEnum,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

// Enums
export const testimonialStatusEnum = pgEnum("testimonial_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  text: text("text").notNull(),
  status: testimonialStatusEnum("status").notNull().default("PENDING"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Portfolio content (edited from the backoffice)
export const workStatusEnum = pgEnum("work_status", ["SHIPPED", "IN_PROGRESS"]);

const contentColumns = {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
};

export const siteSettings = pgTable("site_settings", {
  id: text("id").primaryKey().default("main"),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  headline: text("headline").notNull(),
  about: text("about").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  availability: text("availability"),
  contactHeading: varchar("contact_heading", { length: 120 }),
  responseTime: varchar("response_time", { length: 120 }),
  email: varchar("email", { length: 255 }).notNull(),
  resumeUrl: text("resume_url"),
  portraitUrl: text("portrait_url"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
  seoTitle: varchar("seo_title", { length: 255 }).notNull(),
  seoDescription: text("seo_description").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const experiences = pgTable("experiences", {
  ...contentColumns,
  company: varchar("company", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  employmentType: varchar("employment_type", { length: 255 }),
  // "YYYY-MM"; a null end date means the role is current
  startDate: varchar("start_date", { length: 7 }).notNull(),
  endDate: varchar("end_date", { length: 7 }),
  summary: text("summary"),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  stack: jsonb("stack").$type<string[]>().notNull().default([]),
  url: text("url"),
});

export const projects = pgTable("projects", {
  ...contentColumns,
  experienceId: text("experience_id").references(() => experiences.id, {
    onDelete: "set null",
  }),
  name: varchar("name", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 255 }),
  description: text("description"),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  stack: jsonb("stack").$type<string[]>().notNull().default([]),
  url: text("url"),
  imageUrl: text("image_url"),
  status: workStatusEnum("status").notNull().default("SHIPPED"),
});

export const skills = pgTable("skills", {
  ...contentColumns,
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  note: varchar("note", { length: 255 }),
});

export const education = pgTable("education", {
  ...contentColumns,
  institution: varchar("institution", { length: 255 }).notNull(),
  degree: varchar("degree", { length: 255 }).notNull(),
  field: varchar("field", { length: 255 }),
  startDate: varchar("start_date", { length: 7 }),
  endDate: varchar("end_date", { length: 7 }),
  description: text("description"),
});

export const certifications = pgTable("certifications", {
  ...contentColumns,
  name: varchar("name", { length: 255 }).notNull(),
  issuer: varchar("issuer", { length: 255 }).notNull(),
  date: varchar("date", { length: 7 }),
  url: text("url"),
  status: workStatusEnum("status").notNull().default("SHIPPED"),
});

export const events = pgTable("events", {
  ...contentColumns,
  name: varchar("name", { length: 255 }).notNull(),
  year: varchar("year", { length: 32 }).notNull(),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  url: text("url"),
});

// Better Auth tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: text("email_verified"),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    withTimezone: true,
    mode: "string",
  }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    withTimezone: true,
    mode: "string",
  }),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
});

// Types
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Certification = typeof certifications.$inferSelect;
export type PortfolioEvent = typeof events.$inferSelect;
