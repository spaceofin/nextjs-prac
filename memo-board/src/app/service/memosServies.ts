"use server";

import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "../auth";
import { Memo, User } from "@prisma/client";

export type MemoWithUser = Memo & { user?: User };

const createMemoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must contain at least 1 character(s)" })
    .max(50, { message: "Title must contain at most 50 character(s)" }),
  content: z
    .string()
    .max(1000, { message: "Title must contain at most 1000 character(s)" })
    .optional(),
  isPublic: z.boolean(),
});

interface CreateMemoFormState {
  errors?: {
    title?: string[];
    content?: string[];
    isPublic?: string[];
    db?: string[];
    session?: string[];
  };
}

export async function createMemo(
  state: CreateMemoFormState,
  formData: FormData
): Promise<CreateMemoFormState> {
  const result = createMemoSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    isPublic: formData.get("isPublic") === "on",
  });

  if (!result.success) {
    console.log("error");
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: { session: ["Please log in to continue."] },
    };
  }

  try {
    await db.memo.create({
      data: {
        title: result.data.title,
        content: result.data.content || "",
        userId: session.user.id,
        isPublic: result.data.isPublic,
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

export async function editMemo(
  id: number,
  title: string,
  content: string,
  isPublic: boolean
) {
  await db.memo.update({
    where: { id },
    data: { title, content, isPublic },
  });

  revalidatePath(`/memos/${id}`);
  revalidatePath(`/memos/${id}/edit`);
  revalidatePath("/");
  redirect("/");
}

export async function fetchPrivateMemosByUserId(): Promise<Memo[]> {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Please log in to continue.");
  }

  return db.memo.findMany({
    where: { userId: session.user.id },
  });
}

export async function fetchPublicMemosByUserId(): Promise<MemoWithUser[]> {
  return db.memo.findMany({
    include: { user: true },
  });
}
