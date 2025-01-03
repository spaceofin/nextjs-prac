import MemoCard from "./memo-card";
import { Memo } from "@prisma/client";
import Link from "next/link";
import NewButton from "./new-button";

export function MemoCards({
  memos,
  isSignedIn,
}: {
  memos: Memo[];
  isSignedIn: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 py-5">
      {isSignedIn ? <NewButton isSignedIn={isSignedIn} /> : <NewButton />}
      {memos.map((memo) => (
        <Link key={memo.id} href={`/memos/${memo.id}`}>
          <MemoCard key={memo.id} memo={memo} />
        </Link>
      ))}
    </div>
  );
}
