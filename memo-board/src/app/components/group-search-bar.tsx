"use client";

import { useState } from "react";
import { fetchMatchingGroups } from "../service/groups-service";
import { useAppSelector } from "@/redux/hooks";
import {
  GroupWithStringDate,
  selectGroups,
} from "@/redux/features/groups/groupsSlice";

export default function GroupSearchBar({
  isUserLoggedIn,
  setGroupsToDisplay,
}: {
  isUserLoggedIn: boolean;
  setGroupsToDisplay: React.Dispatch<
    React.SetStateAction<GroupWithStringDate[]>
  >;
}) {
  const [value, setValue] = useState("");
  const { data: allGroups } = useAppSelector(selectGroups);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const matchedGroups = await fetchMatchingGroups(value);
      const matchedGroupsWithStringDate = matchedGroups.map((group) => ({
        ...group,
        createdAt: group.createdAt.toISOString(),
      }));
      setGroupsToDisplay(matchedGroupsWithStringDate);
    } catch (error) {
      console.error("Error occurred fetching matching groups:", error);
      setValue("");
    }
  };

  const handleAllClick = async () => {
    setGroupsToDisplay(allGroups);
  };

  return (
    <div className="flex h-10 w-full">
      <input
        id="searchBar"
        name="searchBar"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        className="w-full h-full border p-2 rounded-md"
      />
      <button
        onClick={handleSearchClick}
        disabled={!isUserLoggedIn}
        className="flex justify-center items-center h-full ml-2 p-2 border-2 border-green-700 text-green-700 bg-white font-bold rounded-md hover:bg-gray-200 hover:text-green-800">
        Search
      </button>
      <button
        onClick={handleAllClick}
        disabled={!isUserLoggedIn}
        className="flex justify-center items-center h-full ml-1 p-3 text-white bg-green-600 font-bold rounded-md hover:bg-green-700 hover:text-gray-100 whitespace-nowrap">
        All
      </button>
    </div>
  );
}
