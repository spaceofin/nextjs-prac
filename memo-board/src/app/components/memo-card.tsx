"use client";

import { useRouter } from "next/navigation";
import { deleteMemo } from "../service/memosServies";
import type { Memo } from "@prisma/client";

export default function MemoCard({ memo }: { memo: Memo }) {
  const router = useRouter();

  return (
    <div className="flex justify-between border-2 border-slate-400 px-4 py-2 rounded-md">
      <div>
        <p className="font-bold">{memo.title}</p>
        <p>{memo.content}</p>
      </div>
      <div className="flex flex-col gap-1">
        <button
          className="bg-blue-300 px-2 rounded-md"
          onClick={() => router.push(`/memos/${memo.id}/edit`)}>
          Edit
        </button>
        <button
          className="bg-red-300 px-2 rounded-md"
          onClick={() => deleteMemo(memo.id)}>
          Del
        </button>
      </div>
    </div>
  );
}
