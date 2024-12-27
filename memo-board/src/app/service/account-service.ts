"use server";

import { auth } from "../auth";
import { db } from "../db";
import { PasswordChangeSchema } from "../validation/auth-schema";
import { compare, hash } from "bcryptjs";

export async function deleteUser() {
  const session = await auth();
  const id = session?.user?.id;
  try {
    await db.user.delete({
      where: { id },
    });
  } catch (error) {
    console.log("error deleting account:", error);
  }
}

export async function changePassword({
  currentPassword,
  password,
  passwordConfirm,
}: {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}) {
  const session = await auth();
  const id = session?.user?.id;

  if (!session?.user?.id) {
    return {
      error: true,
      message: "You must be logged in to change your password.",
    };
  }

  const validation = PasswordChangeSchema.safeParse({
    currentPassword,
    password,
    passwordConfirm,
  });

  if (validation?.error) {
    return {
      error: true,
      message:
        validation?.error.issues?.[0]?.message ??
        "Password change validation failed",
    };
  }

  const user = await db.user.findUnique({
    where: { id },
  });

  if (!user) {
    return {
      error: true,
      message: "User not found",
    };
  }

  const passwordMatch = await compare(currentPassword, user.password!);

  if (!passwordMatch) {
    return {
      error: true,
      message: "Current password is incorrect",
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log("error changing password:", error);
  }
}
