import { type CollectionKey } from "@/cms/collections";
import {
  certifications,
  education,
  events,
  experiences,
  projects,
  skills,
} from "@/server/db/schema";

export const CONTENT_TABLES = {
  experiences,
  projects,
  skills,
  education,
  certifications,
  events,
} satisfies Record<CollectionKey, unknown>;

export type ContentRow = {
  id: string;
  sortOrder: number;
  published: boolean;
} & Record<string, unknown>;
