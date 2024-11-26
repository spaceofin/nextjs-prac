import { getMemos } from "@/lib/get-memos";
import Link from "next/link";
import { MDXMemo } from "@/types/mdx-types";

type MonthMemoGroup = {
  [yearMonth: string]: {
    memos: MDXMemo[];
  };
};

function groupMemosByMonth(memos: MDXMemo[]) {
  const groupedMemos: MonthMemoGroup = {};
  for (const memo of memos) {
    const yearMonth = memo.frontmatter.date.slice(0, -3);
    if (!groupedMemos[yearMonth]) {
      groupedMemos[yearMonth] = { memos: [] };
    }
    groupedMemos[yearMonth].memos.push(memo);
  }
  return groupedMemos;
}

export default async function MemosPage() {
  const memos = await getMemos();

  const groupedMemos = groupMemosByMonth(memos);

  return (
    <div className="flex gap-10">
      {Object.entries(groupedMemos).map(([yearMonth, { memos }]) => (
        <div className="flex flex-col font-mono border-2 bg-pink-500 bg-opacity-80 rounded-md py-5 pb-7 px-10 pr-12 text-xl">
          <div className="mb-2 text-pink-700 font-bold ">{yearMonth}</div>
          {memos.map((memo) => (
            <Link
              key={memo.frontmatter.title}
              href={`/memos/${memo.frontmatter.title}`}
              className="flex text-xl text-white no-underline">
              {memo.frontmatter.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
