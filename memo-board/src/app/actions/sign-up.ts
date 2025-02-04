"use server";

import * as auth from "@/app/auth";
import { EmailSignUpFormSchema } from "../validation/auth-schema";
import { hash } from "bcryptjs";
import { db } from "../db";
import { Prisma } from "@prisma/client";

export async function signUpWithGithub() {
  return auth.signIn("github", { redirectTo: "/" });
}

export async function signUpWithCredentials({
  email,
  userName,
  password,
  passwordConfirm,
}: {
  email: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}) {
  const signUpValidation = EmailSignUpFormSchema.safeParse({
    email,
    userName,
    password,
    passwordConfirm,
  });

  if (!signUpValidation.success) {
    return {
      error: true,
      message:
        signUpValidation.error?.issues[0]?.message ??
        "Invalid email, username, password, or password confirmation.",
    };
  }

  try {
    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: { email: email, name: userName, password: hashedPassword },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        error: true,
        message:
          "This email address is already in use. Please use a different one.",
      };
    }

    return {
      error: true,
      message: "Sign up failed.",
    };
  }
}
