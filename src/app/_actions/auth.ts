"use server";

import { signIn } from "@/server/auth";
import { type TAdminCredentials } from "@/validators/auth";

export const login = async (credentials: TAdminCredentials) => {
  return signIn("credentials", {
    ...credentials,
    redirectTo: "/admin",
  });
};
