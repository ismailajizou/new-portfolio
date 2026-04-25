import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/env";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle<typeof schema>> | undefined;
  pool: Pool | undefined;
};

const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: env.DATABASE_URL,
  });

if (env.NODE_ENV !== "production") globalForDb.pool = pool;

export const db =
  globalForDb.db ??
  drizzle(pool, {
    schema,
    logger: env.NODE_ENV === "development",
  });

if (env.NODE_ENV !== "production") globalForDb.db = db;

export type DB = typeof db;
