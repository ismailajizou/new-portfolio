// Field definitions for everything the backoffice can edit. The admin lists,
// forms and validation are all generated from this file, so adding a field
// here (plus its column in schema.ts) is enough to make it editable.

export type FieldType =
  | "text"
  | "textarea"
  | "lines"
  | "tags"
  | "month"
  | "url"
  | "email"
  | "select"
  | "boolean"
  | "image"
  | "file"
  | "relation";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  relation?: CollectionKey;
  maxLength?: number;
};

export const COLLECTION_KEYS = [
  "experiences",
  "projects",
  "skills",
  "education",
  "certifications",
  "events",
] as const;

export type CollectionKey = (typeof COLLECTION_KEYS)[number];

export type CollectionDef = {
  key: CollectionKey;
  label: string;
  singular: string;
  description: string;
  titleField: string;
  subtitleFields: string[];
  // Manually ordered collections get up/down controls; the others are
  // ordered by date on the public page.
  orderable: boolean;
  fields: Field[];
};

const STATUS_OPTIONS = [
  { value: "SHIPPED", label: "Done (drawn solid)" },
  { value: "IN_PROGRESS", label: "In progress (drawn dashed)" },
];

const published: Field = {
  name: "published",
  label: "Visible on the site",
  type: "boolean",
};

export const COLLECTIONS: Record<CollectionKey, CollectionDef> = {
  experiences: {
    key: "experiences",
    label: "Experience",
    singular: "experience",
    description:
      "Each role is a stage in the pipeline. Stages are ordered by start date.",
    titleField: "company",
    subtitleFields: ["role", "startDate"],
    orderable: false,
    fields: [
      { name: "company", label: "Company", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      { name: "location", label: "Location", type: "text" },
      {
        name: "employmentType",
        label: "Employment type",
        type: "text",
        placeholder: "Full-time, Freelance…",
      },
      { name: "startDate", label: "Start", type: "month", required: true },
      {
        name: "endDate",
        label: "End",
        type: "month",
        help: "Leave empty for a current role. It shows as running.",
      },
      { name: "summary", label: "Summary", type: "textarea" },
      {
        name: "highlights",
        label: "Highlights",
        type: "lines",
        help: "One per line.",
      },
      {
        name: "stack",
        label: "Stack",
        type: "tags",
        help: "Comma separated.",
      },
      { name: "url", label: "Company link", type: "url" },
      published,
    ],
  },
  projects: {
    key: "projects",
    label: "Projects",
    singular: "project",
    description:
      "Each project is a job. Attach it to an experience to place it in that stage.",
    titleField: "name",
    subtitleFields: ["tagline"],
    orderable: true,
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        help: "Shown on the pipeline pill, so keep it short.",
        maxLength: 40,
      },
      { name: "tagline", label: "One-line description", type: "text" },
      {
        name: "experienceId",
        label: "Experience",
        type: "relation",
        relation: "experiences",
        help: "Leave empty for open source and independent work.",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: STATUS_OPTIONS,
        required: true,
      },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "highlights",
        label: "Log lines",
        type: "lines",
        help: "One per line. Each becomes a line in the job log.",
      },
      { name: "stack", label: "Stack", type: "tags", help: "Comma separated." },
      { name: "url", label: "Link", type: "url" },
      { name: "imageUrl", label: "Screenshot", type: "image" },
      published,
    ],
  },
  skills: {
    key: "skills",
    label: "Skills",
    singular: "skill",
    description: "Grouped by category on the site.",
    titleField: "name",
    subtitleFields: ["category", "note"],
    orderable: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "category",
        label: "Category",
        type: "text",
        required: true,
        placeholder: "Frontend, Backend, DevOps…",
        help: "Skills with the same category are listed together.",
      },
      {
        name: "note",
        label: "Note",
        type: "text",
        placeholder: "certification, academic…",
        help: "Optional qualifier. Skills with a note are drawn dashed.",
      },
      published,
    ],
  },
  education: {
    key: "education",
    label: "Education",
    singular: "education entry",
    description: "Degrees and schools.",
    titleField: "institution",
    subtitleFields: ["degree", "endDate"],
    orderable: false,
    fields: [
      {
        name: "institution",
        label: "Institution",
        type: "text",
        required: true,
      },
      { name: "degree", label: "Degree", type: "text", required: true },
      { name: "field", label: "Field of study", type: "text" },
      { name: "startDate", label: "Start", type: "month" },
      { name: "endDate", label: "End", type: "month" },
      { name: "description", label: "Description", type: "textarea" },
      published,
    ],
  },
  certifications: {
    key: "certifications",
    label: "Certifications",
    singular: "certification",
    description:
      "Mark a certification as in progress while you are preparing for it.",
    titleField: "name",
    subtitleFields: ["issuer", "date"],
    orderable: false,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "issuer", label: "Issuer", type: "text", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: STATUS_OPTIONS,
        required: true,
      },
      { name: "date", label: "Date earned", type: "month" },
      { name: "url", label: "Credential link", type: "url" },
      published,
    ],
  },
  events: {
    key: "events",
    label: "Events",
    singular: "event",
    description: "Talks, exhibitions and conferences.",
    titleField: "name",
    subtitleFields: ["year", "location"],
    orderable: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "year",
        label: "Year",
        type: "text",
        required: true,
        placeholder: "2026",
        maxLength: 32,
      },
      { name: "location", label: "Location", type: "text" },
      { name: "description", label: "What you did there", type: "textarea" },
      { name: "url", label: "Link", type: "url" },
      published,
    ],
  },
};

export const SETTINGS_FIELDS: { title: string; fields: Field[] }[] = [
  {
    title: "Opening",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text", required: true },
      {
        name: "headline",
        label: "Headline",
        type: "textarea",
        required: true,
        help: "One plain sentence under your name.",
      },
      { name: "portraitUrl", label: "Portrait", type: "image" },
    ],
  },
  {
    title: "About",
    fields: [
      {
        name: "about",
        label: "About",
        type: "textarea",
        required: true,
        help: "Separate paragraphs with an empty line.",
      },
      { name: "location", label: "Location", type: "text", required: true },
      {
        name: "availability",
        label: "Availability",
        type: "textarea",
        help: "What you are open to. Shown next to the contact form.",
      },
    ],
  },
  {
    title: "Contact and links",
    fields: [
      { name: "email", label: "Public email", type: "email", required: true },
      {
        name: "contactHeading",
        label: "Contact heading",
        type: "text",
        maxLength: 120,
        help: "Big line above the contact form. The last word gets the gradient.",
      },
      {
        name: "responseTime",
        label: "Response time",
        type: "text",
        maxLength: 120,
        help: 'How quickly you reply, e.g. "Usually within two days". Hidden when empty.',
      },
      {
        name: "resumeUrl",
        label: "CV",
        type: "file",
        help: "Upload a PDF or paste a link. Without one, the CV buttons are hidden.",
      },
      { name: "linkedinUrl", label: "LinkedIn", type: "url" },
      { name: "githubUrl", label: "GitHub", type: "url" },
      { name: "twitterUrl", label: "X / Twitter", type: "url" },
    ],
  },
  {
    title: "Search and sharing",
    fields: [
      {
        name: "seoTitle",
        label: "Page title",
        type: "text",
        required: true,
        maxLength: 70,
      },
      {
        name: "seoDescription",
        label: "Page description",
        type: "textarea",
        required: true,
        maxLength: 200,
      },
    ],
  },
];

export function isCollectionKey(value: string): value is CollectionKey {
  return (COLLECTION_KEYS as readonly string[]).includes(value);
}

export type FieldErrors = Record<string, string>;

const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;
const LINK = /^(https?:\/\/|\/)\S+$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Normalises raw form input against the field definitions. Runs on the
// server before every write; unknown keys are dropped.
export function parseFields(
  fields: Field[],
  raw: Record<string, unknown>,
): { values: Record<string, unknown>; errors: FieldErrors } {
  const values: Record<string, unknown> = {};
  const errors: FieldErrors = {};

  for (const field of fields) {
    const input = raw[field.name];

    if (field.type === "boolean") {
      values[field.name] = input === true;
      continue;
    }

    if (field.type === "lines" || field.type === "tags") {
      const list = (Array.isArray(input) ? input : [])
        .map((item) => String(item).trim())
        .filter(Boolean);
      if (field.required && list.length === 0) {
        errors[field.name] = `Add at least one ${field.label.toLowerCase()}.`;
      }
      values[field.name] = list;
      continue;
    }

    const text = typeof input === "string" ? input.trim() : "";
    if (!text) {
      if (field.required) errors[field.name] = `${field.label} is required.`;
      values[field.name] = null;
      continue;
    }

    const limit =
      field.maxLength ??
      (field.type === "textarea" ? 4000 : field.type === "text" ? 255 : 2000);
    if (text.length > limit) {
      errors[field.name] = `Keep this under ${limit} characters.`;
    } else if (field.type === "month" && !MONTH.test(text)) {
      errors[field.name] = "Use the format YYYY-MM.";
    } else if (
      (field.type === "url" ||
        field.type === "image" ||
        field.type === "file") &&
      !LINK.test(text)
    ) {
      errors[field.name] = "Enter a full link starting with https://";
    } else if (field.type === "email" && !EMAIL.test(text)) {
      errors[field.name] = "Enter a valid email address.";
    } else if (
      field.type === "select" &&
      !field.options?.some((option) => option.value === text)
    ) {
      errors[field.name] = "Pick one of the listed options.";
    }
    values[field.name] = text;
  }

  return { values, errors };
}
