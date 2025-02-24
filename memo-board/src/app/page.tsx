import AuthBar from "./components/auth-bar";
import { auth } from "@/app/auth";
import {
  fetchAllMemosByUserId,
  fetchPublicMemos,
} from "./service/memos-service";
import { MemoCards } from "./components/memo-cards";
import GroupsSection from "./components/groups-section";
import { fetchAllGroups } from "./service/groups-service";
import GroupMemosSection from "./components/group-memos-section";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const isSignedIn = !!(session && session.user);

  let memos;

  if (isSignedIn) memos = await fetchAllMemosByUserId();
  else memos = await fetchPublicMemos();

  const allGroups = await fetchAllGroups();

  return (
    <div className="flex flex-col my-10 gap-2">
      <Link
        href="/read-me"
        className="absolute flex items-center justify-center top-[53px] right-[41px] h-8 bg-gray-500 text-white px-5 rounded-md">
        Read Me
      </Link>
      <AuthBar userId={session?.user?.id} />
      <MemoCards memos={memos} isSignedIn={isSignedIn} />
      <GroupMemosSection />
      <GroupsSection allGroups={allGroups} />
    </div>
  );
}
