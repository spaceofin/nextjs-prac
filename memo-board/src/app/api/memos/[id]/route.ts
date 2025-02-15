import { db } from "@/app/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const memoId = (await params).id;

  const memo = await db.memo.findFirst({
    where: { id: parseInt(memoId) },
  });

  return NextResponse.json({
    userId: memo?.userId,
    visibility: memo?.visibility,
  });
}
