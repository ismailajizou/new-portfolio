CREATE TYPE "public"."work_status" AS ENUM('SHIPPED', 'IN_PROGRESS');--> statement-breakpoint
CREATE TABLE "certifications" (
	"id" text PRIMARY KEY NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"issuer" varchar(255) NOT NULL,
	"date" varchar(7),
	"url" text,
	"status" "work_status" DEFAULT 'SHIPPED' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" text PRIMARY KEY NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"institution" varchar(255) NOT NULL,
	"degree" varchar(255) NOT NULL,
	"field" varchar(255),
	"start_date" varchar(7),
	"end_date" varchar(7),
	"description" text
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"year" varchar(32) NOT NULL,
	"location" varchar(255),
	"description" text,
	"url" text
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" text PRIMARY KEY NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"company" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"location" varchar(255),
	"employment_type" varchar(255),
	"start_date" varchar(7) NOT NULL,
	"end_date" varchar(7),
	"summary" text,
	"highlights" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"stack" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"experience_id" text,
	"name" varchar(255) NOT NULL,
	"tagline" varchar(255),
	"description" text,
	"highlights" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"stack" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"url" text,
	"image_url" text,
	"status" "work_status" DEFAULT 'SHIPPED' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" text PRIMARY KEY DEFAULT 'main' NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"headline" text NOT NULL,
	"about" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"availability" text,
	"email" varchar(255) NOT NULL,
	"resume_url" text,
	"portrait_url" text,
	"github_url" text,
	"linkedin_url" text,
	"twitter_url" text,
	"seo_title" varchar(255) NOT NULL,
	"seo_description" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" text PRIMARY KEY NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL,
	"note" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;