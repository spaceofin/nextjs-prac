"use client";

import { useState, useEffect } from "react";
import { Group } from "@prisma/client";
import GroupSearchBar from "./group-search-bar";
import GroupJoinModal from "./group-join-modal";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import GroupCreateModal from "./group-create-modal";
import MyGroupsModal from "./my-groups-modal";
import { useAppDispatch } from "@/redux/hooks";
import {
  GroupWithStringDate,
  fetchAllGroups,
} from "@/redux/features/groups/groupsSlice";

const showLoginRequiredToast = () => {
  toast.error("Please log in to continue.", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    theme: "colored",
  });
};

export default function GroupsSection({ allGroups }: { allGroups: Group[] }) {
  const [groupsToDisplay, setGroupsToDisplay] =
    useState<GroupWithStringDate[]>(allGroups);
  const [isCreateGroupVisible, setIsCreateGroupVisible] = useState(false);
  const [isMyGroupVisible, setIsMyGroupVisible] = useState(false);
  const [isGroupJoinModalOpen, setIsGroupJoinModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const session = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, []);

  const onConfirm = async (confirmed: boolean) => {
    if (confirmed === true) {
      console.log("join button clicked");
    } else {
      console.log("cancel button clicked");
    }
    setIsGroupJoinModalOpen(false);
  };

  const handleGroupClick = (groupId: number) => {
    if (session.status !== "authenticated") {
      showLoginRequiredToast();
      return;
    }
    setSelectedGroupId(groupId);
    setIsGroupJoinModalOpen(true);
  };

  const handleCreateGroupClick = () => {
    if (session.status !== "authenticated") {
      showLoginRequiredToast();
      return;
    }
    setIsCreateGroupVisible(true);
  };

  const handleMyGroupClick = () => {
    if (session.status !== "authenticated") {
      showLoginRequiredToast();
      return;
    }
    setIsMyGroupVisible(true);
  };

  return (
    <div className="flex flex-col gap-3 pt-7 pb-10 bg-gray-100 rounded-md h-80 w-full px-10">
      <div className="flex justify-between items-center h-20">
        {isCreateGroupVisible && (
          <GroupCreateModal setIsCreateGroupVisible={setIsCreateGroupVisible} />
        )}
        {isMyGroupVisible && (
          <MyGroupsModal setIsMyGroupVisible={setIsMyGroupVisible} />
        )}
        <h2 className="text-xl font-bold">Groups</h2>
        <div className="flex gap-2">
          <button
            className=" bg-green-300 text-slate-700 text-lg py-1 px-4 rounded-md"
            onClick={handleCreateGroupClick}>
            Create Group
          </button>
          <button
            className=" bg-green-300 text-slate-700 text-lg py-1 px-4 rounded-md"
            onClick={handleMyGroupClick}>
            My Groups
          </button>
        </div>
      </div>
      <GroupSearchBar
        setGroupsToDisplay={setGroupsToDisplay}
        isUserLoggedIn={session.status === "authenticated"}
      />
      <div className="h-full flex-grow w-full overflow-y-auto bg-white rounded-md break-words p-2">
        {groupsToDisplay.map((group) => (
          <div
            key={group.id}
            className="inline-block py-1 px-2 mx-1 bg-gray-300 rounded-md hover:cursor-pointer"
            onClick={() => handleGroupClick(group.id)}>
            {group.name}
          </div>
        ))}
        {isGroupJoinModalOpen && selectedGroupId && (
          <GroupJoinModal groupId={selectedGroupId} onConfirm={onConfirm} />
        )}
      </div>
    </div>
  );
}
