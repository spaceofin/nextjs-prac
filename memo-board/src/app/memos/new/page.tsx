"use client";

import { useActionState } from "react";

export default function MemoCreatePage() {
  const [state, formAction] = useActionState(() => {
    console.log("form sumitted");
  }, null);

  return (
    <div className="mx-14">
      <form action={formAction}>
        <h3 className="text-2xl mt-10 mb-6">Add a New Memo</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="w-12 text-lg">TITLE</label>
            <input
              id="title"
              name="title"
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="w-12 text-lg">CONTENT</label>
            <textarea
              id="content"
              name="content"
              className="border rounded p-2 w-full"
            />
          </div>
          <button type="submit" className="rounded p-2 text-xl bg-orange-200">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
