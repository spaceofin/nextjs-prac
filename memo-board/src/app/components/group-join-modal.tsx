import React, { useEffect, useState } from "react";
import {
  GroupWithOwnerId,
  fetchGroupById,
  joinGroup,
} from "../service/groups-service";
import { toast } from "react-toastify";

export default function GroupJoinModal({
  groupId,
  onModalCancel,
}: {
  groupId: number;
  onModalCancel: () => void;
}) {
  const [group, setGroup] = useState<GroupWithOwnerId | null>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      const group = await fetchGroupById(groupId);
      setGroup(group);
    };
    fetchGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJoinClick = async () => {
    try {
      const result = await joinGroup(groupId);

      if (result?.error) {
        toast.info("You are already a member of this group.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
        });
        return;
      }

      toast.success("You have successfully joined the group.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
      onModalCancel();
    } catch (error) {
      if (error instanceof Error)
        console.error("Error joining groups:", error.message);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-72 p-5 text-lg rounded-md bg-teal-100 border-4 border-teal-400 z-50">
      <div className="flex flex-col"></div>
      <p className="h-8 text-center text-2xl font-bold">{group?.name}</p>
      <div className="px-2 my-2 font-bold">
        <p className="block">owner: {group?.owner.name}</p>
        <p className="block">member count: {group?.members.length}</p>
      </div>
      <p className="bg-teal-50 rounded-md h-24 px-2 pb-2 overflow-y-auto">
        {group?.description}
      </p>
      <div className="flex justify-center gap-5 mt-4">
        <button
          className="bg-teal-600 w-28 rounded-md text-white"
          onClick={handleJoinClick}>
          Join
        </button>
        <button className="bg-gray-200 w-28 rounded-md" onClick={onModalCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
