"use client";

import { useRouter } from "next/navigation";
import { MemoWithUserName } from "../service/memos-service";
import { useSession } from "next-auth/react";
import DeleteMemoButton from "./delete-memo-button";

export default function MemoCard({ memo }: { memo: MemoWithUserName }) {
  const router = useRouter();
  const isPublicMemo = !!memo.isPublic;
  const session = useSession();

  return (
    <div className="flex justify-between border-2 border-slate-400 px-4 py-2 rounded-md">
      <div>
        <p className="font-bold">{memo.title}</p>
        <p>{memo.content}</p>
      </div>
      {isPublicMemo && session.status !== "authenticated" ? (
        <div className="flex items-center">by {memo.user?.name}</div>
      ) : (
        <div className="flex flex-col gap-1">
          <button
            className="bg-blue-300 px-2 rounded-md"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/memos/${memo.id}/edit`);
            }}>
            Edit
          </button>
          <DeleteMemoButton memoId={memo.id} className="px-2" />
        </div>
      )}
    </div>
  );
}
