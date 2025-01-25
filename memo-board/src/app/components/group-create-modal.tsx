"use client";

import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createGroup, selectGroups } from "@/redux/features/groups/groupsSlice";
import { useRouter } from "next/navigation";

export default function GroupCreateModal({
  setIsCreateGroupVisible,
}: {
  setIsCreateGroupVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectGroups);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const result = await dispatch(createGroup(formData));
    if (result.type === "groups/createGroup/fulfilled") router.push("/");
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-64 p-5 text-lg rounded-md bg-teal-100 border-4 border-teal-400 z-50">
      <form onSubmit={handleSubmit} noValidate>
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
          {typeof error === "string" && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
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
