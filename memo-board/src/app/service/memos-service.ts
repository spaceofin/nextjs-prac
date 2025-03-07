"use server";

import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "../auth";
import { Memo, Visibility } from "@prisma/client";

export type MemoWithUserName = Memo & { user?: { name: string | null } };

const createMemoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must contain at least 1 character(s)" })
    .max(50, { message: "Title must contain at most 50 character(s)" }),
  content: z
    .string()
    .max(1000, { message: "Title must contain at most 1000 character(s)" })
    .optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE", "GROUP"]),
});

export interface MemoCreationResponse {
  memo?: Memo;
  errors?: {
    title?: string[];
    content?: string[];
    visibility?: string[];
    db?: string[];
    session?: string[];
  };
}

export async function createMemo({
  formData,
  groupIdsForMemo,
}: {
  formData: FormData;
  groupIdsForMemo: number[];
}): Promise<MemoCreationResponse> {
  const result = createMemoSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    visibility: formData.get("visibility"),
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
    const createdMemo = await db.memo.create({
      data: {
        title: result.data.title,
        content: result.data.content || "",
        userId: session.user.id,
        visibility: result.data.visibility,
      },
    });

    groupIdsForMemo.forEach(async (groupId) => {
      await db.groupMemo.create({ data: { memoId: createdMemo.id, groupId } });
    });

    return { memo: createdMemo };
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
}

export async function deleteMemoById(id: number) {
  try {
    await db.memo.delete({
      where: { id },
    });
  } catch (err) {
    console.log("error deleting memo:", err);
  }
}

export async function editMemo(
  id: number,
  title: string,
  content: string,
  visibility: Visibility
) {
  await db.memo.update({
    where: { id },
    data: { title, content, visibility },
  });

  revalidatePath(`/memos/${id}`);
  revalidatePath(`/memos/${id}/edit`);
  revalidatePath("/");
  redirect("/");
}

export async function fetchAllMemosByUserId(): Promise<Memo[]> {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Please log in to continue.");
  }

  return db.memo.findMany({
    where: { userId: session.user.id },
  });
}

export async function fetchPublicMemos(): Promise<MemoWithUserName[]> {
  return db.memo.findMany({
    where: { visibility: "PUBLIC" },
    include: {
      user: { select: { name: true } },
    },
  });
}
