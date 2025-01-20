"use client";

import { useState } from "react";
import { Group } from "@prisma/client";
import GroupSearchBar from "./group-search-bar";
import GroupJoinModal from "./group-join-modal";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import GroupCreateModal from "./group-create-modal";

export default function GroupsSection({ allGroups }: { allGroups: Group[] }) {
  const [groups, setGroups] = useState<Group[]>(allGroups);
  const [isCreateGroupVisible, setIsCreateGroupVisible] = useState(false);
  const [isGroupJoinModalOpen, setIsGroupJoinModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const session = useSession();

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
      toast.error("Please log in to continue.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
      return;
    }
    setSelectedGroupId(groupId);
    setIsGroupJoinModalOpen(true);
  };

  const handleCreateGroupClick = () => {
    if (session.status !== "authenticated") {
      toast.error("Please log in to continue.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
      return;
    }
    setIsCreateGroupVisible(true);
  };

  return (
    <div className="flex flex-col gap-3 pt-7 pb-10 bg-gray-100 rounded-md h-80 w-full px-10">
      <div className="flex justify-between items-center h-20">
        {isCreateGroupVisible && (
          <GroupCreateModal setIsCreateGroupVisible={setIsCreateGroupVisible} />
        )}
        <h2 className="text-xl font-bold">Groups</h2>
        <button
          className=" bg-green-300 text-slate-700 text-lg py-1 px-4 rounded-md"
          onClick={handleCreateGroupClick}>
          Create Group
        </button>
      </div>
      <GroupSearchBar
        setGroups={setGroups}
        isUserLoggedIn={session.status === "authenticated"}
      />
      <div className="h-full flex-grow w-full overflow-y-auto bg-white rounded-md break-words p-2">
        {groups.map((group) => (
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
