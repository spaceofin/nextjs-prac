import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/db";

export const { handlers, auth, signOut, signIn } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Github],
});
