import { PinnedGroupWithMemos } from "@/redux/features/groups/pinnedGroupsSlice";
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
        <div className="flex-grow rounded-md bg-green-50 overflow-y-auto">
          {group.memos.map((memo) => (
            <div key={memo.id}>{memo.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
