"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  GroupWithMemosVisible,
  fetchGroupsByUserIdWithMemosVisible,
  toggelGroupMemosVisible,
} from "../service/groups-service";
import { GrView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";
import { useAppDispatch } from "@/redux/hooks";
import {
  fetchNewPinnedGroupMemos,
  removePinnedGroupMemo,
} from "@/redux/features/groups/pinnedGroupsSlice";
import { toast } from "react-toastify";

const MAX_PINNED_GROUPS = 3;

export default function MyGroupsModal({
  setIsMyGroupVisible,
}: {
  setIsMyGroupVisible: () => void;
}) {
  const [myGroups, setMyGroups] = useState<GroupWithMemosVisible[] | undefined>(
    undefined
  );
  const pinnedGroupsCount = useRef(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await fetchGroupsByUserIdWithMemosVisible();
      setMyGroups(groups);
      pinnedGroupsCount.current = groups.reduce((count, group) => {
        return group.isMemosVisible === true ? count + 1 : count;
      }, 0);
    };
    fetchGroups();
  }, []);

  const handleGroupMemosVisibleToggle = async (
    groupId: number,
    userGroupId: number,
    isMemosVisible: boolean
  ) => {
    if (
      pinnedGroupsCount.current >= MAX_PINNED_GROUPS &&
      isMemosVisible === false
    ) {
      toast.warn(
        "Maximum pinned group is 3. Please remove other pinned group first.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "colored",
        }
      );
      return;
    }
    await toggelGroupMemosVisible(userGroupId, !isMemosVisible);
    setMyGroups((prev) =>
      prev?.map((group) =>
        group.id === groupId
          ? { ...group, isMemosVisible: !isMemosVisible }
          : group
      )
    );
    if (!isMemosVisible) {
      dispatch(fetchNewPinnedGroupMemos(groupId));
      pinnedGroupsCount.current += 1;
    } else {
      dispatch(removePinnedGroupMemo(groupId));
      pinnedGroupsCount.current -= 1;
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-72 p-5 text-lg rounded-md bg-teal-100 border-4 border-teal-400 z-50">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h2 className="flex justify-center text-2xl font-bold mb-4">
            My Groups
          </h2>
          <div className="flex flex-col gap-1 h-32 font-bold overflow-y-auto">
            {myGroups?.map((group) => (
              <div
                key={group.id}
                className="flex justify-between items-center bg-teal-50 border border-gray-400 rounded-md pl-4 pr-3">
                <p>{group.name}</p>
                <p
                  className="hover:cursor-pointer"
                  onClick={() =>
                    handleGroupMemosVisibleToggle(
                      group.id,
                      group.userGroupId,
                      group.isMemosVisible
                    )
                  }>
                  {group.isMemosVisible ? (
                    <GrView size={16} />
                  ) : (
                    <GrFormViewHide size={18} />
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-5 mt-2">
          <button
            type="button"
            className="bg-gray-200 w-28 rounded-md"
            onClick={setIsMyGroupVisible}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
