import React from "react";

export default function GroupJoinModal({
  groupName,
  onConfirm,
}: {
  groupName: string;
  onConfirm: (confirmed: boolean) => void;
}) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-64 p-5 text-lg rounded-md bg-teal-100 border-4 border-teal-400 z-50 font-semibold">
      <div className="flex flex-col"></div>
      <p className="text-center text-2xl font-bold">{groupName}</p>
      <div className="px-2 my-2 flex gap-2">
        <p>owner: owner</p>
        <p>/</p>
        <p>member count: 00</p>
      </div>
      <p className="bg-teal-50 rounded-md h-24">description</p>
      <div className="flex justify-center gap-5 mt-4">
        <button
          className="bg-teal-600 w-28 rounded-md text-white"
          onClick={() => onConfirm(true)}>
          Join
        </button>
        <button
          className="bg-gray-200 w-28 rounded-md"
          onClick={() => onConfirm(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
