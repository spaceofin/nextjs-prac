"use server";

import { z } from "zod";
import { db } from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { Group } from "@prisma/client";

const createGroupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Group name must contain at least 2 characters" })
    .max(50, { message: "Group name must contain at most 50 characters" }),
});

interface CreateGroupFormState {
  errors?: {
    name?: string[];
    db?: string[];
    session?: string[];
  };
}

export async function createGroup(
  state: CreateGroupFormState,
  formData: FormData
): Promise<CreateGroupFormState> {
  const result = createGroupSchema.safeParse({
    name: formData.get("name"),
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
    await db.group.create({
      data: {
        name: result.data.name,
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

  console.log("Group created!: ", result.data.name);

  revalidatePath("/");
  redirect("/");
}

export async function fetchAllGroups(): Promise<Group[]> {
  // const session = await auth();
  // if (!session || !session.user || !session.user.id) {
  //   throw new Error("Please log in to continue.");
  // }

  try {
    const groups = await db.group.findMany();
    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Error("Could not fetch groups");
  }
}
