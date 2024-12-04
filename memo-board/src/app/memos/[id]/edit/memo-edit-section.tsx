"use client";

import { editMemo } from "@/app/service/memosServies";
import { useState } from "react";
import type { Memo } from "@prisma/client";

export default function MemoEditSection({ memo }: { memo: Memo }) {
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const handleEditDoneClick = async () => {
    try {
      await editMemo(memo.id, title, content);
    } catch (error) {
      console.error("Error editing memo:", error);
    }
  };

  return (
    <div className="flex flex-col h-full mt-10">
      <div className="flex w-full justify-end">
        <div className="flex">
          <button
            className="bg-green-300 text-lg px-6 py-1 rounded-md"
            onClick={handleEditDoneClick}>
            Done
          </button>
        </div>
      </div>
      <input
        className="text-2xl px-4 mb-2 font-bold mt-2 rounded-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="bg-gray-100 rounded-sm h-1/2 p-4 text-lg overflow-y-auto"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
