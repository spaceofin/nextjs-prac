import React, { useEffect, useState } from "react";
import {
  GroupWithMembers,
  fetchGroupsByUserId,
} from "../service/groups-service";

export default function MyGroupsModal({
  setIsMyGroupVisible,
}: {
  setIsMyGroupVisible: () => void;
}) {
  const [myGroups, setMyGroups] = useState<GroupWithMembers[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await fetchGroupsByUserId();
      setMyGroups(groups);
    };
    fetchGroups();
  }, []);

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
                className="bg-teal-50 border border-gray-400 rounded-md px-4">
                <p>{group.name}</p>
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
