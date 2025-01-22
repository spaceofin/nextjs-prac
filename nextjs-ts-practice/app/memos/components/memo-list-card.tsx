"use client";

import { MDXMemo } from "@/types/mdx-types";
import Link from "next/link";
import React, { useState } from "react";

export default function MemoListCard({
  yearMonth,
  memos,
}: {
  yearMonth: string;
  memos: MDXMemo[];
}) {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="flex flex-col h-52 w-44 font-mono border-2 bg-pink-500 bg-opacity-80 rounded-md py-5 pb-7 text-xl items-center">
      <div className="mb-2 text-pink-700 font-bold ">{yearMonth}</div>
      {showCard ? (
        <>
          {memos.map((memo) => (
            <Link
              key={memo.frontmatter.title}
              href={`/memos/${memo.frontmatter.title}`}
              className="flex text-xl text-white no-underline">
              {memo.frontmatter.title}
            </Link>
          ))}
        </>
      ) : (
        <div className="hover:cursor-pointer" onClick={() => setShowCard(true)}>
          Show List
        </div>
      )}
    </div>
  );
}
