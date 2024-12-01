"use server";

import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMemo(
  state: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const content = formData.get("content");

    if (typeof title !== "string" || title.length > 50) {
      return {
        message: "Title must be 50 characters or fewer.",
      };
    }
    if (typeof content !== "string" || content.length > 1000) {
      return {
        message: "Content must be 1000 characters or fewer.",
      };
    }

    await db.memo.create({
      data: {
        title,
        content,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteMemo(id: number) {
  await db.memo.delete({
    where: { id },
  });

  revalidatePath("/");
  redirect("/");
}
