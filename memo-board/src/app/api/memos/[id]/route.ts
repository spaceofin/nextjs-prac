import { db } from "@/app/db";
import { $Enums } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

interface MemoGetResponseData {
  userId: string | undefined;
  visibility: $Enums.Visibility | undefined;
  isUserInMemoGroups?: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const memoId = (await params).id;

  const memo = await db.memo.findFirst({
    where: { id: parseInt(memoId) },
    include: {
      groupMemos: { select: { groupId: true } },
    },
  });

  const responseData: MemoGetResponseData = {
    userId: memo?.userId,
    visibility: memo?.visibility,
  };

  const clientUserId = request.headers.get("x-user-id");

  if (clientUserId) {
    const groupIds = memo?.groupMemos.map((groupMemo) => groupMemo.groupId);
    const userGroups = await db.userGroup.findMany({
      where: {
        userId: clientUserId as string,
        groupId: { in: groupIds },
      },
    });

    let isUserInMemoGroups = false;
    if (userGroups.length !== 0) isUserInMemoGroups = true;

    responseData.isUserInMemoGroups = isUserInMemoGroups;
  }

  return NextResponse.json(responseData);
}
