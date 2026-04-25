"use server";

import { auth } from "@/server/auth";
import { type TAdminCredentials } from "@/validators/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (credentials: TAdminCredentials) => {
  const result = await auth.api.signInEmail({
    body: {
      email: credentials.email,
      password: credentials.password,
    },
  });
  return result;
};

export const logout = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/admin/login");
};
