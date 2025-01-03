import AuthBar from "./components/auth-bar";
import { auth } from "@/app/auth";
import {
  fetchAllMemosByUserId,
  fetchPublicMemos,
} from "./service/memos-service";
import { MemoCards } from "./components/memo-cards";

export default async function Home() {
  const session = await auth();
  const isSignedIn = !!(session && session.user);

  let memos;

  if (isSignedIn) memos = await fetchAllMemosByUserId();
  else memos = await fetchPublicMemos();

  return (
    <div className="flex flex-col my-10 gap-1">
      <AuthBar userId={session?.user?.id} />
      <MemoCards memos={memos} isSignedIn={isSignedIn} />
    </div>
  );
}
