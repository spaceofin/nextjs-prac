"use client";

import { useActionState } from "react";
import { createMemo } from "@/app/service/memosServies";
import Link from "next/link";

const initialState = {
  errors: {},
};

export default function MemoCreatePage() {
  const [state, formAction] = useActionState(createMemo, initialState);

  return (
    <div className="mx-14 pt-10">
      <div className="flex w-full justify-end">
        <Link className="bg-slate-200 text-lg px-6 py-1 rounded-md" href="/">
          Back
        </Link>
      </div>
      <form action={formAction}>
        <h3 className="text-2xl mt-1 mb-6">Add a New Memo</h3>
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
          {state.errors && Object.keys(state.errors).length !== 0 ? (
            <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
              <p>{state.errors.title}</p>
              <p>{state.errors.content}</p>
              <p>{state.errors.db}</p>
            </div>
          ) : null}
          <button type="submit" className="rounded p-2 text-xl bg-orange-200">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
