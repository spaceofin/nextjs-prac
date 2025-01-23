"use client";

import { deleteMemo } from "@/redux/features/memos/memosSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";

export default function DeleteMemoButton({
  memoId,
  className,
}: {
  memoId: number;
  className?: string;
}) {
  const dispatch = useAppDispatch();

  const handleDeleteClick = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      dispatch(deleteMemo(id));
    } catch (error) {
      console.error("error deleting memo:", error);
    }
  };

  return (
    <button
      className={`bg-red-300 rounded-md ${className}`}
      onClick={(e: React.MouseEvent) => handleDeleteClick(e, memoId)}>
      Del
    </button>
  );
}
