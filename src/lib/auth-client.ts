import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
