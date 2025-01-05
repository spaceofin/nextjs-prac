"use client";

import { useActionState, useState } from "react";
import InputGroup from "./input-group";
import { createGroup } from "../service/groups-service";
import { Group } from "@prisma/client";

const initialState = {
  errors: {},
};

export default function GroupsSection({ groups }: { groups: Group[] }) {
  const [isCreateGroupVisible, setIsCreateGroupVisible] = useState(false);
  const [state, formAction] = useActionState(createGroup, initialState);

  return (
    <div className="flex flex-col gap-4 pt-7 pb-10 bg-gray-100 rounded-md h-80 w-full px-10">
      <div className="flex justify-between items-center h-20">
        {isCreateGroupVisible ? (
          <InputGroup
            formAction={formAction}
            inputName="name"
            label="Enter New Group Name:"
            className="h-8"
          />
        ) : (
          <>
            <h2 className="text-xl font-bold">Groups</h2>
            <button
              className=" bg-green-300 text-slate-700 text-lg py-1 px-4 rounded-md"
              onClick={() => setIsCreateGroupVisible(true)}>
              Create Group
            </button>
          </>
        )}
      </div>
      {state.errors && Object.keys(state.errors).length !== 0 ? (
        <div className="text-red-500">
          <p>{state.errors.name}</p>
          <p>{state.errors.session}</p>
          <p>{state.errors.db}</p>
        </div>
      ) : null}
      <div className="bg-gray-200 w-full p-2">Search Bar</div>
      <div className="h-full flex-grow w-full overflow-y-auto bg-white rounded-md break-words p-2">
        {groups.map((group) => (
          <div
            key={group.id}
            className="inline-block py-1 px-2 mx-1 bg-gray-300 rounded-md">
            {group.name}
          </div>
        ))}
      </div>
    </div>
  );
}
