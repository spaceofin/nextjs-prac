import { isMemoPublic } from "@/app/service/memos-service";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  if (!req.url) {
    return NextResponse.json({ error: "Invalid request URL" }, { status: 400 });
  }
  const url = new URL(req.url);
  const memoId = url.searchParams.get("memoId") as string;

  const isPublic = await isMemoPublic(parseInt(memoId));
  return NextResponse.json({ isMemoPublic: isPublic });
}
