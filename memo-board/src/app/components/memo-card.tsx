"use client";

import { useRouter } from "next/navigation";
import { MemoWithUser, deleteMemo } from "../service/memosServies";

export default function MemoCard({ memo }: { memo: MemoWithUser }) {
  const router = useRouter();
  const isPublicMemo = !!memo.user;

  const handleDelClick = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteMemo(id);
    } catch (error) {
      console.error("error deleting memo:", error);
    }
  };

  return (
    <div className="flex justify-between border-2 border-slate-400 px-4 py-2 rounded-md">
      <div>
        <p className="font-bold">{memo.title}</p>
        <p>{memo.content}</p>
      </div>
      {isPublicMemo ? (
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

          <button
            className="bg-red-300 px-2 rounded-md"
            onClick={(e: React.MouseEvent) => handleDelClick(e, memo.id)}>
            Del
          </button>
        </div>
      )}
    </div>
  );
}
