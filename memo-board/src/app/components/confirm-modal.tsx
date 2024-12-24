import React from "react";

export default function ConfirmModal({
  message,
  onConfirm,
}: {
  message: string;
  onConfirm: (confirmed: boolean) => void;
}) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-48 p-10 text-lg rounded-md bg-red-300 z-50 font-semibold">
      <div className="flex flex-col"></div>
      <p>{message}</p>
      <div className="flex justify-center gap-5 mt-10">
        <button
          className="bg-red-500 w-28 rounded-md text-white"
          onClick={() => onConfirm(true)}>
          Yes
        </button>
        <button
          className="bg-gray-200 w-28 rounded-md"
          onClick={() => onConfirm(false)}>
          No
        </button>
      </div>
    </div>
  );
}
