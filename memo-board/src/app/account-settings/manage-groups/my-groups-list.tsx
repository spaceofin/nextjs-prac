"use client";

import { selectGroups } from "@/redux/features/groups/groupsSlice";
import { useAppSelector } from "@/redux/hooks";

export default function MyGroupsList() {
  const { data: myGroups } = useAppSelector(selectGroups);

  return (
    <div className="flex flex-col h-full w-full gap-2 overflow-y-auto py-2 px-6 font-sans">
      {myGroups.map((group) => (
        <div
          key={group.id}
          className="flex justify-between items-center bg-gray-400 px-6 rounded-md h-10">
          <div className="text-xl">{group.name}</div>
          <div>
            <button className="bg-blue-500 px-2 rounded-md font-bold text-base">
              leave
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
