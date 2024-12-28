import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/db";
import { compare } from "bcryptjs";
import { AdapterUser } from "next-auth/adapters";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export const { handlers, auth, signOut, signIn } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          throw new Error("No account found with this email address.");
        } else {
          const isPasswordValid = await compare(
            credentials.password as string,
            user.password!
          );

          if (!isPasswordValid) {
            throw new Error("Invalid Password.");
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      if (!auth) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return !!auth;
    },
    session: async ({ session, token }) => {
      session.user = token.user as AdapterUser & User;
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
