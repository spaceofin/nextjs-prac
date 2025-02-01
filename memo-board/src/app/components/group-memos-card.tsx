import { PinnedGroupWithMemos } from "@/redux/features/groups/pinnedGroupsSlice";
import Link from "next/link";
import React from "react";

export default function GroupMemosCard({
  group,
}: {
  group: PinnedGroupWithMemos;
}) {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full gap-2">
        <h2 className="text-xl px-2">{group.name}</h2>
        <div className="flex flex-col flex-grow rounded-md bg-green-50 overflow-y-auto px-4 py-6 gap-1">
          {group.memos.map((memo) => (
            <Link
              key={memo.id}
              href={`/memos/${memo.id}`}
              className="flex flex-col bg-white border border-gray-700 rounded-md px-2 py-1 text-lg hover:cursor-pointer">
              <p>{memo.title}</p>
              <p className="text-sm max-h-10 overflow-y-hidden">
                {memo.content}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
