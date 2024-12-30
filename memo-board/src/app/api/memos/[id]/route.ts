import { isMemoPublic } from "@/app/service/memos-service";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const memoId = (await params).id;

  const isPublic = await isMemoPublic(parseInt(memoId));
  return NextResponse.json({ isMemoPublic: isPublic });
}
