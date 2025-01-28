"use server";

import { db } from "../db";
import { auth } from "../auth";
import { Group, UserGroup } from "@prisma/client";
import { GroupCreateFormSchema } from "../validation/group-schema";
import { Prisma } from "@prisma/client";

export interface GroupCreationResponse {
  group?: Group;
  errors?: {
    name?: string[];
    description?: string[];
    db?: string[];
    session?: string[];
  };
}

export async function createGroup(
  formData: FormData
): Promise<GroupCreationResponse> {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: { session: ["Please log in to continue."] },
    };
  }

  const result = GroupCreateFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    console.log("error");
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const createdGroup = await db.group.create({
      data: {
        name: result.data.name,
        ownerId: session.user.id,
        description: result.data.description,
        members: { create: { userId: session.user.id } },
      },
    });
    return { group: createdGroup };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
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

export async function fetchAllGroups(): Promise<Group[]> {
  try {
    const groups = await db.group.findMany();
    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
}

export type GroupWithOwnerId = Group & {
  owner: { name: string | null };
  members: { userId: string | null }[];
};

export async function fetchGroupById(
  id: number
): Promise<GroupWithOwnerId | null> {
  try {
    const group = await db.group.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            name: true,
          },
        },
        members: {
          select: {
            userId: true,
          },
        },
      },
    });
    if (group === null) throw new Error("Could not find group");
    return group;
  } catch (error) {
    console.error("Error fetching group:", error);
    return null;
  }
}

export type GroupWithMembers = Group & { members: UserGroup[] };

export async function fetchGroupsByUserId(): Promise<GroupWithMembers[]> {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Please log in to continue.");
    }

    const userId = session.user.id;
    const groups = await db.group.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (groups === null) return [];
    return groups;
  } catch (error) {
    console.error("Error fetching group:", error);
    return [];
  }
}

export type GroupWithMemosVisible = Group & {
  userGroupId: number;
  isMemosVisible: boolean;
};

export async function fetchGroupsByUserIdWithMemosVisible(): Promise<
  GroupWithMemosVisible[]
> {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Please log in to continue.");
    }

    const userId = session.user.id;
    const groups = await db.group.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        members: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
            isMemosVisible: true,
          },
        },
      },
    });

    const userGroups = groups.map(({ members, ...rest }) => ({
      ...rest,
      userGroupId: members[0]?.id,
      isMemosVisible: members[0]?.isMemosVisible,
    }));

    if (userGroups === null) return [];
    return userGroups;
  } catch (error) {
    console.error("Error fetching group:", error);
    return [];
  }
}

export async function toggelGroupMemosVisible(
  userGroupId: number,
  isMemosVisible: boolean
) {
  try {
    await db.userGroup.update({
      where: { id: userGroupId },
      data: { isMemosVisible },
    });
  } catch (error) {
    console.error("Error toggle group memos visible:", error);
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
      return [];
    }
  }
}

export async function joinGroup(groupId: number) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Please log in to continue.");
    }
    await db.userGroup.create({
      data: {
        userId: session.user.id,
        groupId,
      },
    });
    return;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error };
    } else if (error instanceof Error) {
      console.error("Error joining groups:", error.message);
      throw new Error("Error joining groups");
    }
  }
}
