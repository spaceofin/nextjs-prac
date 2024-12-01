import MemoCard from "./components/memo-card";
import Link from "next/link";
import { db } from "./db";

export default async function Home() {
  const memos = await db.memo.findMany();

  return (
    <div>
      <div className="flex flex-col my-10 gap-1">
        <div className="flex w-full justify-start">
          <Link
            className="bg-slate-200 text-lg px-6 py-1 rounded-md"
            href="/memos/new">
            New
          </Link>
        </div>
        {memos.map((memo) => (
          <Link href={`/memos/${memo.id}`}>
            <MemoCard key={memo.id} memo={memo} />
          </Link>
        ))}
      </div>
    </div>
  );
}
