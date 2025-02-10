import BackButton from "@/app/components/back-button";
import React from "react";
import MyGroupsList from "./my-groups-list";
import {
  fetchGroupsByUserId,
  GroupWithMembers,
} from "@/app/service/groups-service";

export default async function GroupsManagement() {
  const myGroups: GroupWithMembers[] = await fetchGroupsByUserId();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex w-[700px] justify-end mb-2">
        <BackButton />
      </div>
      <div className="flex flex-col gap-12 w-[700px] h-[500px] bg-gray-200 rounded-md px-10 py-8 text-lg font-mono">
        <h1 className="flex justify-center text-2xl font-bold">My Groups</h1>
        <MyGroupsList groups={myGroups} />
      </div>
    </div>
  );
}
