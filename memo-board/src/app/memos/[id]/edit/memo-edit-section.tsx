"use client";

import { editMemo } from "@/app/service/memos-service";
import { Memo } from "@prisma/client";
import { useState } from "react";

export default function MemoEditSection({ memo }: { memo: Memo }) {
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);
  const [isPublic, setIsPublic] = useState(memo.isPublic);

  const handleEditDoneClick = async () => {
    try {
      await editMemo(memo.id, title, content, isPublic);
    } catch (error) {
      console.error("Error editing memo:", error);
    }
  };

  return (
    <div className="flex flex-col h-full mt-10">
      <div className="flex w-full justify-end">
        <button
          className="bg-green-300 text-lg px-6 py-1 rounded-md"
          onClick={handleEditDoneClick}>
          Done
        </button>
      </div>
      <div className="flex justify-between items-center">
        <input
          className="flex-auto text-2xl px-4 mb-2 font-bold rounded-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="ml-4">
          <label htmlFor="isPublic">Show to Others</label>
          <input
            id="isPublic"
            name="isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-4 h-4 mx-2"
          />
        </div>
      </div>
      <textarea
        className="bg-gray-100 rounded-sm h-1/2 p-4 text-lg overflow-y-auto"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
