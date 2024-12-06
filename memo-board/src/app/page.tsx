import MemoCard from "./components/memo-card";
import Link from "next/link";
import { db } from "./db";
import AuthBar from "./components/auth-bar";

export default async function Home() {
  const memos = await db.memo.findMany();

  return (
    <div className="flex flex-col my-10 gap-1">
      <AuthBar />
      <div className="flex w-full justify-start">
        <Link
          className="bg-slate-200 text-lg px-6 py-1 rounded-md"
          href="/memos/new">
          New
        </Link>
      </div>
      {memos.map((memo) => (
        <Link key={memo.id} href={`/memos/${memo.id}`}>
          <MemoCard key={memo.id} memo={memo} />
        </Link>
      ))}
    </div>
  );
}
