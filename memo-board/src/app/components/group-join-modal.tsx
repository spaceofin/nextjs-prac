import React, { useEffect, useState } from "react";
import { GroupWithOwnerId, fetchGroupById } from "../service/groups-service";

export default function GroupJoinModal({
  groupId,
  onConfirm,
}: {
  groupId: number;
  onConfirm: (confirmed: boolean) => void;
}) {
  const [group, setGroup] = useState<GroupWithOwnerId | null>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      const group = await fetchGroupById(groupId);
      setGroup(group);
    };
    fetchGroup();
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-64 p-5 text-lg rounded-md bg-teal-100 border-4 border-teal-400 z-50 font-semibold">
      <div className="flex flex-col"></div>
      <p className="text-center text-2xl font-bold">{group?.name}</p>
      <div className="px-2 my-2 flex gap-2">
        <p>owner: {group?.owner.name}</p>
        <p>/</p>
        <p>member count: {group?.members.length}</p>
      </div>
      <p className="bg-teal-50 rounded-md h-24 px-2">description</p>
      <div className="flex justify-center gap-5 mt-4">
        <button
          className="bg-teal-600 w-28 rounded-md text-white"
          onClick={() => onConfirm(true)}>
          Join
        </button>
        <button
          className="bg-gray-200 w-28 rounded-md"
          onClick={() => onConfirm(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
