import React, {
  Dispatch,
  SetStateAction,
  useActionState,
  useState,
} from "react";
import { createGroup } from "../service/groups-service";
const initialState = {
  errors: {},
};

export default function GroupCreateModal({
  setIsCreateGroupVisible,
}: {
  setIsCreateGroupVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, formAction] = useActionState(createGroup, initialState);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-64 p-5 text-lg rounded-md bg-teal-100 border-4 border-teal-400 z-50">
      <form action={formAction} noValidate>
        <div className="flex flex-col h-52 justify-between">
          <div className="flex flex-col gap-1">
            <div>
              <label htmlFor="name" className="font-bold">
                Group Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-teal-50 rounded-md px-2"
              />
            </div>
            <div>
              <label htmlFor="description" className="font-bold">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-teal-50 rounded-md h-14 px-2"
              />
            </div>
          </div>
          {state.errors?.name || state.errors?.description ? (
            <div className="text-red-500 text-sm">
              <p>{state.errors.name}</p>
              <p>{state.errors.description}</p>
            </div>
          ) : null}
          <div className="flex justify-center gap-5 mt-2">
            <button className="bg-teal-600 w-28 rounded-md text-white">
              Create
            </button>
            <button
              type="button"
              className="bg-gray-200 w-28 rounded-md"
              onClick={() => setIsCreateGroupVisible(false)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
