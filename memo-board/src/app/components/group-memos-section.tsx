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

const MAX_GROUPS = 3;

export default function GroupMemosSection() {
  const [isMyGroupVisible, setIsMyGroupVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { data: pinnedGroups } = useAppSelector(selectPinnedGroups);

  useEffect(() => {
    dispatch(fetchPinnedGroupsMemos());
  }, []);

  return (
    <div className="flex flex-col pt-7 pb-10 bg-green-100 rounded-md h-96 w-full px-10">
      {isMyGroupVisible && (
        <MyGroupsModal setIsMyGroupVisible={() => setIsMyGroupVisible(false)} />
      )}
      <div className="flex justify-end">
        <span
          className="hover:cursor-pointer"
          onClick={() => setIsMyGroupVisible(true)}>
          <MdOutlineAddBox size={28} />
        </span>
      </div>
      <div className="flex h-full gap-5">
        {pinnedGroups.map((group) => (
          <GroupMemosCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
