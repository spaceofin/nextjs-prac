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
      </div>
    </div>
  );
}
