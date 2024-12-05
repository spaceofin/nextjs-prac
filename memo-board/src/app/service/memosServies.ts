"use server";

import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createMemoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must contain at least 1 character(s)" })
    .max(50, { message: "Title must contain at most 50 character(s)" }),
  content: z
    .string()
    .max(1000, { message: "Title must contain at most 1000 character(s)" })
    .optional(),
});

interface CreateMemoFormState {
  errors?: {
    title?: string[];
    content?: string[];
    db?: string[];
  };
}

export async function createMemo(
  state: CreateMemoFormState,
  formData: FormData
): Promise<CreateMemoFormState> {
  const result = createMemoSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    console.log("error");
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.memo.create({
      data: {
        title: result.data.title,
        content: result.data.content || "",
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: { db: [error.message] },
      };
    } else {
      return {
        errors: { db: ["Something went wrong..."] },
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

export async function editMemo(id: number, title: string, content: string) {
  await db.memo.update({
    where: { id },
    data: { title, content },
  });

  revalidatePath(`/memos/${id}`);
  revalidatePath(`/memos/${id}/edit`);
  revalidatePath("/");
  redirect("/");
}
