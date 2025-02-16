import { db } from "@/app/db";
import { NextResponse, NextRequest } from "next/server";

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

  const groupIds = memo?.groupMemos.map((groupMemo) => groupMemo.groupId);
  const clientUserId = request.headers.get("x-user-id");

  const userGroups = await db.userGroup.findMany({
    where: {
      userId: clientUserId as string,
      groupId: { in: groupIds },
    },
  });

  let isUserInMemoGroups = false;
  if (userGroups.length !== 0) isUserInMemoGroups = true;

  return NextResponse.json({
    userId: memo?.userId,
    visibility: memo?.visibility,
    isUserInMemoGroups,
  });
}
