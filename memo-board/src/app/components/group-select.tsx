"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GroupSummary } from "../memos/new/page";
import { MdCancel } from "react-icons/md";
import { fetchGroupsByUserId } from "../service/groups-service";

export default function GroupSelect({
  selectedGroups,
  setSelectedGroups,
}: {
  selectedGroups: GroupSummary[];
  setSelectedGroups: Dispatch<SetStateAction<GroupSummary[]>>;
}) {
  const [groups, setGroups] = useState<GroupSummary[]>([]);

  const onSelectedGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") return;
    const groupId = parseInt(
      e.target.selectedOptions[0].dataset.groupId as string
    );
    const groupName = e.target.value;
    setSelectedGroups((prev) => {
      if (prev.some((group) => group.id === groupId)) {
        return prev;
      }
      return [
        ...prev,
        {
          id: groupId,
          name: groupName,
        },
      ];
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGroupsByUserId();
      const resultGroups = data.map(({ id, name }) => ({ id, name }));
      setGroups(resultGroups);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeSelectGroup = (group: GroupSummary) => {
    setSelectedGroups((prev) =>
      prev.filter((selectedGroup) => selectedGroup.id !== group.id)
    );
  };

  return (
    <div className="flex w-full gap-8 h-10 pt-1 pr-2">
      <div className="flex flex-grow items-start overflow-x-auto gap-2">
        {selectedGroups.map((group) => (
          <div
            key={group.id}
            className="flex items-center h-6 text-sm pb-1 px-3 bg-green-200 rounded-md whitespace-nowrap gap-1">
            <span>{group.name}</span>
            <span
              className="pt-1 hover:cursor-pointer"
              onClick={() => handleDeSelectGroup(group)}>
              <MdCancel size={14} />
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-start">
        <label htmlFor="groupSelect" className="inline-block whitespace-nowrap">
          Assign to Groups
        </label>
        <select
          id="groupSelect"
          name="groupSelect"
          onChange={onSelectedGroupChange}
          className="h-6 bg-green-300 px-3 rounded-md w-32">
          <option value="" />
          {groups.map((group) => (
            <option key={group.id} value={group.name} data-group-id={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
