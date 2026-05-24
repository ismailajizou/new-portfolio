import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    DATABASE_URL: z.string(),
    // UPLOADTHING_SECRET: z.string(),
    // UPLOADTHING_APP_ID: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
    SMTP_USER: z.email(),
    SMTP_PASS: z.string(),
    CLOUDFLARE_TURNSTILE_SECRET_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_TWITTER_LINK: z.string(),
    NEXT_PUBLIC_GITHUB_LINK: z.string(),
    NEXT_PUBLIC_LINKEDIN_LINK: z.string(),
    NEXT_PUBLIC_URL: z.string(),
    NEXT_PUBLIC_RESUME_LINK: z.string(),
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    // UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    // UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    CLOUDFLARE_TURNSTILE_SECRET_KEY:
      process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,

    NEXT_PUBLIC_TWITTER_LINK: process.env.NEXT_PUBLIC_TWITTER_LINK,
    NEXT_PUBLIC_GITHUB_LINK: process.env.NEXT_PUBLIC_GITHUB_LINK,
    NEXT_PUBLIC_LINKEDIN_LINK: process.env.NEXT_PUBLIC_LINKEDIN_LINK,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_RESUME_LINK: process.env.NEXT_PUBLIC_RESUME_LINK,
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
