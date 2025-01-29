"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createMemo, selectMemos } from "@/redux/features/memos/memosSlice";
import { useRouter } from "next/navigation";
import GroupSelect from "@/app/components/group-select";

export type SelectedGroup = { id: number; name: string };

export default function MemoCreatePage() {
  const [selectedGroups, setSelectedGroups] = useState<SelectedGroup[]>([]);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectMemos);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const result = await dispatch(createMemo(formData));
    if (result.type === "memos/createMemo/fulfilled") router.push("/");
  };

  return (
    <div className="mx-14 pt-10">
      <div className="flex w-full justify-end">
        <Link className="bg-slate-200 text-lg px-6 py-1 rounded-md" href="/">
          Back
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl mt-1 mb-6">Add a New Memo</h3>
        <div className="flex justify-end items-center">
          <label htmlFor="isPublic">Show to Others</label>
          <input
            id="isPublic"
            name="isPublic"
            type="checkbox"
            className="w-4 h-4 mx-2"
          />
        </div>
        <div className="flex w-full">
          <GroupSelect
            selectedGroups={selectedGroups}
            setSelectedGroups={setSelectedGroups}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="w-12 text-lg" htmlFor="title">
              TITLE
            </label>
            <input
              id="title"
              name="title"
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="w-12 text-lg" htmlFor="content">
              CONTENT
            </label>
            <textarea
              id="content"
              name="content"
              className="border rounded p-2 w-full"
            />
          </div>
          {typeof error === "string" && (
            <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
              {error}
            </div>
          )}
          <button type="submit" className="rounded p-2 text-xl bg-orange-200">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
