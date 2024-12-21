import MemoCard from "./components/memo-card";
import Link from "next/link";
import AuthBar from "./components/auth-bar";
import { auth } from "@/app/auth";
import NewButton from "./components/new-button";
import {
  fetchAllMemosByUserId,
  fetchPublicMemos,
} from "./service/memos-service";

export default async function Home() {
  const session = await auth();
  const isSignedIn = !!(session && session.user);

  let memos;

  if (isSignedIn) memos = await fetchAllMemosByUserId();
  else memos = await fetchPublicMemos();

  return (
    <div className="flex flex-col my-10 gap-1">
      <AuthBar userId={session?.user?.id} />
      {isSignedIn ? <NewButton isSignedIn={isSignedIn} /> : <NewButton />}
      {memos.map((memo) => (
        <Link key={memo.id} href={`/memos/${memo.id}`}>
          <MemoCard key={memo.id} memo={memo} />
        </Link>
      ))}
    </div>
  );
}
