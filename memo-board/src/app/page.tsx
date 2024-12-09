import MemoCard from "./components/memo-card";
import Link from "next/link";
import { db } from "./db";
import AuthBar from "./components/auth-bar";
import { auth } from "@/app/auth";
import NewButton from "./components/new-button";

export default async function Home() {
  const memos = await db.memo.findMany();
  const session = await auth();
  const isSignedIn = !!(session && session.user);

  return (
    <div className="flex flex-col my-10 gap-1">
      <AuthBar />
      {isSignedIn ? <NewButton isSignedIn={isSignedIn} /> : <NewButton />}
      {memos.map((memo) => (
        <Link key={memo.id} href={`/memos/${memo.id}`}>
          <MemoCard key={memo.id} memo={memo} />
        </Link>
      ))}
    </div>
  );
}
