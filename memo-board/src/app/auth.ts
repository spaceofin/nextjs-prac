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
  trustHost: true,
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
        const url = new URL(request.url);
        const path = url.pathname;
        const regex = /\/memos\/(\d+)$/;

        if (regex.test(path)) {
          try {
            const apiUrl = new URL(`/api${path}`, request.url);
            const response = await fetch(apiUrl);

            if (!response.ok) {
              console.error("Failed to check memo is public:", response.status);
              return NextResponse.redirect(new URL("/", request.url));
            }
            const data = await response.json();

            if (data.isMemoPublic) {
              return data.isMemoPublic;
            }
          } catch (error) {
            console.error(
              "Failed to parse response while checking memo is public:",
              error
            );
            return NextResponse.redirect(new URL("/", request.url));
          }
        }
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        const user = auth.user as User;
        const url = new URL(request.url);
        // console.log("url:", url.toString());
        if (
          url.pathname == "/account-settings/change-password" &&
          user.password === null
        ) {
          return NextResponse.redirect(
            new URL("/account-settings", request.url)
          );
        }
      }

      return !!auth;
    },
    session: async ({ session, token }) => {
      session.user = token.user as AdapterUser;

      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        let isOAuthUser = false;
        if ("password" in user && user.password === null) {
          isOAuthUser = true;
        }
        token.user = { ...user, isOAuthUser: isOAuthUser };
      }
      return token;
    },
  },
});
