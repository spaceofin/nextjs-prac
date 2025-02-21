import React, { Dispatch, SetStateAction } from "react";

export default function ConfirmModal({
  message,
  onConfirm,
  type = "default",
  className,
}: {
  message: string;
  onConfirm:
    | ((confirmed: boolean) => Promise<void>)
    | Dispatch<SetStateAction<boolean>>;
  type?: "default" | "info";
  className?: string;
}) {
  const backgroundColor = {
    default: "bg-red-300",
    info: "bg-blue-400",
  }[type];

  const modalSize = {
    default: "w-96 h-48",
    info: "w-[450px] h-64",
  }[type];

  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 text-lg rounded-md z-50 font-semibold ${backgroundColor} ${modalSize} ${className}`}>
      <div className="flex flex-col">
        <p>{message}</p>
        <div className="flex justify-center gap-5 mt-10">
          {type === "info" ? (
            <button
              className="bg-gray-300 w-28 rounded-md "
              onClick={() => onConfirm(false)}>
              Close
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
