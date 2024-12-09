"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function NewButton({
  isSignedIn = false,
}: {
  isSignedIn?: boolean;
}) {
  const router = useRouter();

  const handleNewClick = () => {
    if (!isSignedIn) {
      alert("Please log in to continue.");
      return;
    }
    router.push("/memos/new");
  };

  return (
    <div className="flex w-full justify-start">
      <button
        className="bg-slate-200 text-lg px-6 py-1 rounded-md"
        onClick={handleNewClick}>
        New
      </button>
    </div>
  );
}
