import { getMemos } from "@/lib/get-memos";
import { MDXMemo } from "@/types/mdx-types";
import dynamic from "next/dynamic";

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

const MemoListCard = dynamic(() => import("./components/memo-list-card"), {
  loading: () => <p>Loading...</p>,
});

export default async function MemosPage() {
  const memos = await getMemos();

  const groupedMemos = groupMemosByMonth(memos);

  return (
    <div className="flex gap-10">
      {Object.entries(groupedMemos).map(([yearMonth, { memos }]) => (
        <MemoListCard key={yearMonth} yearMonth={yearMonth} memos={memos} />
      ))}
    </div>
  );
}
