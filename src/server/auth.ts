import { env } from "@/env";
import connectMongo from "@/server/db";
import { compare } from "bcrypt";
import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import User from "./db/models/user";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      name: string;
      email: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // id?: string;
  //   // ...other properties

  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const { auth, handlers, signIn, signOut } = NextAuth({
  debug: env.NODE_ENV === "development", 
  pages: {
    signIn: "/admin/login",
    signOut: "/admin",
    error: "/admin/login",
    verifyRequest: "/admin/login",
    newUser: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongo();
        if (!credentials) throw new Error("No credentials provided");
        const d = z
          .object({
            email: z.string().email(),
            password: z.string(),
          })
          .safeParse(credentials);
        if (!d.success) throw new Error("Invalid credentials");
        const { email, password } = d.data;
        // You should name the admin as admin in the database
        const user = await User.findOne({ name: "admin" });
        if (!user || user.email !== email)
          throw new Error("Invalid credentials");

        const isValid = await compare(password, user.password);
        if (!isValid) throw new Error("Invalid credentials");
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
});
