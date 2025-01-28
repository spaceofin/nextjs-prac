import React from "react";

export default function GroupMemosCard() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full gap-2">
        <h2 className="text-xl px-2">Group Name</h2>
        <div className="flex-grow rounded-md bg-green-50 overflow-y-auto"></div>
      </div>
    </div>
  );
}
