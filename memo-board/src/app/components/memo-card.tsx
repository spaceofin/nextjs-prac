"use client";

import { deleteMemo } from "../service/memosServies";

type Memo = {
  id: number;
  title: string;
  content: string;
};

export default function MemoCard({ memo }: { memo: Memo }) {
  return (
    <div className="flex justify-between border-2 border-slate-400 px-4 py-2 rounded-md">
      <div>
        <p className="font-bold">{memo.title}</p>
        <p>{memo.content}</p>
      </div>
      <div>
        <button
          className="bg-red-300 px-2 rounded-md"
          onClick={() => deleteMemo(memo.id)}>
          Del
        </button>
      </div>
    </div>
  );
}
