import { getMemos } from "@/lib/getMemos";
import Link from "next/link";

export default async function MemosPage() {
  const memos = await getMemos();

  return (
    <div className="prose">
      {memos.map((memo) => (
        <Link
          key={memo.frontmatter.title}
          href={`/memos/${memo.frontmatter.title}`}
          className="flex text-3xl font-mono m-3 text-blue-200 no-underline">
          {memo.frontmatter.title}
        </Link>
      ))}
    </div>
  );
}
