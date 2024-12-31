"use server";

import * as auth from "@/app/auth";
import { EmailSignInFormSchema } from "../validation/auth-schema";

export async function signInWithGithub() {
  return auth.signIn("github", { redirectTo: "/" });
}

export async function signInWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const signInValidation = EmailSignInFormSchema.safeParse({
    email,
    password,
  });

  if (!signInValidation.success) {
    return {
      error: true,
      message:
        signInValidation.error?.issues[0]?.message ??
        "Invalid email or password.",
    };
  }

  try {
    await auth.signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (e) {
    return {
      error: true,
      message: "Login failed. Check your credentials.",
    };
  }
}
