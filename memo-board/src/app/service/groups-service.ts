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
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: { session: ["Please log in to continue."] },
    };
  }

  const result = createGroupSchema.safeParse({
    name: formData.get("name"),
  });

  if (!result.success) {
    console.log("error");
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.group.create({
      data: {
        name: result.data.name,
        ownerId: session.user.id,
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
  try {
    const groups = await db.group.findMany();
    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Error("Could not fetch groups");
  }
}

export async function fetchMatchingGroups(query: string): Promise<Group[]> {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Please log in to continue.");
    }
    const matchedGroups = await db.group.findMany({
      where: {
        name: { contains: query },
      },
    });
    return matchedGroups;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Please log in to continue."
    ) {
      throw new Error(error.message);
    } else {
      console.error("Error fetching groups:", error);
    }
    return [];
  }
}
