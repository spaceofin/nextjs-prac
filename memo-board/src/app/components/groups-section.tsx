import React from "react";

export default function GroupsSection() {
  return (
    <div className="flex flex-col gap-4 pt-7 pb-10 bg-gray-100 rounded-md h-80 w-full px-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Groups</h2>
        <button className=" bg-green-300 text-slate-700  text-lg py-1 px-4 rounded-md">
          Create Group
        </button>
      </div>
      <div className="bg-gray-200 w-full p-2">Search Bar</div>
      <div className="flex flex-col h-full flex-grow w-full overflow-y-auto bg-white rounded-md break-words p-2">
        Groups List
      </div>
    </div>
  );
}
