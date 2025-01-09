"use client";

import { useState } from "react";
import { fetchMatchingGroups } from "../service/groups-service";
import { Group } from "@prisma/client";

export default function GroupSearchBar({
  isUserLoggedIn,
  setGroups,
}: {
  isUserLoggedIn: boolean;
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}) {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const matchedGroups = await fetchMatchingGroups(value);
      setGroups(matchedGroups);
    } catch (error) {
      console.error("Error occurred fetching matching groups");
      setValue("");
    }
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
    </div>
  );
}
