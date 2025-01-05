import AuthBar from "./components/auth-bar";
import { auth } from "@/app/auth";
import {
  fetchAllMemosByUserId,
  fetchPublicMemos,
} from "./service/memos-service";
import { MemoCards } from "./components/memo-cards";
import GroupsSection from "./components/groups-section";
import { fetchAllGroups } from "./service/groups-service";

export default async function Home() {
  const session = await auth();
  const isSignedIn = !!(session && session.user);

  let memos;

  if (isSignedIn) memos = await fetchAllMemosByUserId();
  else memos = await fetchPublicMemos();

  const groups = await fetchAllGroups();

  return (
    <div className="flex flex-col my-10 gap-1">
      <AuthBar userId={session?.user?.id} />
      <MemoCards memos={memos} isSignedIn={isSignedIn} />
      <GroupsSection groups={groups} />
    </div>
  );
}
