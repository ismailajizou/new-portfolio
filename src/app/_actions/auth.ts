"use server";

import { signIn, signOut } from "@/server/auth";
import { type TAdminCredentials } from "@/validators/auth";

export const login = async (credentials: TAdminCredentials) => {
  return signIn("credentials", {
    ...credentials,
    redirectTo: "/admin",
  });
};

export const logout = async () => {
  return signOut({
    redirectTo: "/admin/login",
  });
};
