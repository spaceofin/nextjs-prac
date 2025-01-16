import MemoCard from "./memo-card";
import { Memo } from "@prisma/client";
import Link from "next/link";
import NewButton from "./new-button";
import { fetchPublicMemos } from "../service/memos-service";

export async function MemoCards({
  memos,
  isSignedIn,
}: {
  memos: Memo[];
  isSignedIn: boolean;
}) {
  const memoList = await fetchPublicMemos();

  return (
    <div className="flex flex-col gap-1 py-5">
      {isSignedIn ? <NewButton isSignedIn={isSignedIn} /> : <NewButton />}
      {memoList.map((memo) => (
        <Link key={memo.id} href={`/memos/${memo.id}`}>
          <MemoCard key={memo.id} memo={memo} />
        </Link>
      ))}
    </div>
  );
}
