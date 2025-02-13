"use client";

import React, { useState } from "react";

export default function ChangeOwnerModal({
  onConfirm,
  message,
  errorMsg,
  className,
}: {
  onConfirm: ({
    confirmed,
    newOwnerName,
  }: {
    confirmed: boolean;
    newOwnerName?: string;
  }) => Promise<void>;
  message: string;
  errorMsg: string | undefined;
  className?: string;
}) {
  const [newOwner, setNewOwner] = useState("");

  return (
    <div
      className={`absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] p-10 rounded-md bg-blue-300 z-50 font-semibold ${className}`}>
      <div className="flex flex-col gap-6">
        <p>{message}</p>

        <div className="flex flex-col justify-center gap-10">
          <div className="">
            <label className="text-blue-800 text-xl">
              Name of the New Owner
            </label>
            <input
              id="newOwner"
              type="text"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              className="flex w-full rounded-md px-2"
            />
            {errorMsg && (
              <p className="text-base font-normal text-red-500">{errorMsg}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              className="flex justify-center h-8 items-center bg-blue-500 rounded-md text-white"
              onClick={() =>
                onConfirm({ confirmed: true, newOwnerName: newOwner })
              }>
              Confirm
            </button>
            <button
              className="flex justify-center h-8 items-center bg-gray-200 rounded-md"
              onClick={() => onConfirm({ confirmed: false })}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
