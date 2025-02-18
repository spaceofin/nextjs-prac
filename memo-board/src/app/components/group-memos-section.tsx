"use client";

import { useEffect, useState } from "react";
import GroupMemosCard from "./group-memos-card";
import { MdOutlineAddBox } from "react-icons/md";
import MyGroupsModal from "./my-groups-modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPinnedGroupsMemos,
  selectPinnedGroups,
} from "@/redux/features/groups/pinnedGroupsSlice";
import { useSession } from "next-auth/react";

const welcomeGroupMemos = [
  {
    title: "Welcome to the Group!",
    content:
      "We’re excited to have you join our community. Feel free to introduce yourself and explore our ideas!",
  },
  {
    title: "Day To Do",
    content: "Today, we’ll be focusing on fixing errors.",
  },
];

function DummyGroupMemosCard() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full gap-2">
        <h2 className="text-xl px-2">{"Group Memos"}</h2>
        <div className="flex flex-col flex-grow rounded-md bg-green-50 overflow-y-auto px-4 py-6 gap-1">
          {welcomeGroupMemos.map((memo) => (
            <div
              key={memo.title}
              className="flex flex-col bg-white border border-gray-700 rounded-md px-2 py-1 text-lg">
              <p>{memo.title}</p>
              <p className="text-sm max-h-10 overflow-y-hidden">
                {memo.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GroupMemosSection() {
  const [isMyGroupVisible, setIsMyGroupVisible] = useState(false);
  const session = useSession();

  const dispatch = useAppDispatch();
  const { data: pinnedGroups } = useAppSelector(selectPinnedGroups);

  useEffect(() => {
    if (session.status === "authenticated") dispatch(fetchPinnedGroupsMemos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);

  return (
    <div className="flex flex-col pt-7 pb-10 bg-green-100 rounded-md h-96 w-full px-10">
      {isMyGroupVisible && (
        <MyGroupsModal setIsMyGroupVisible={() => setIsMyGroupVisible(false)} />
      )}
      <div className="flex justify-end">
        <button
          className="hover:cursor-pointer disabled:cursor-default"
          onClick={() => setIsMyGroupVisible(true)}
          disabled={session.status !== "authenticated"}>
          <MdOutlineAddBox size={28} />
        </button>
      </div>
      <div className="flex h-full gap-5">
        {pinnedGroups.map((group) => (
          <GroupMemosCard key={group.id} group={group} />
        ))}
        {session.status !== "authenticated" && <DummyGroupMemosCard />}
      </div>
    </div>
  );
}
