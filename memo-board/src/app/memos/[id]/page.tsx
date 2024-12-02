import { db } from "@/app/db";
import { deleteMemo } from "@/app/service/memosServies";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MemoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const memo = await db.memo.findFirst({
    where: { id: parseInt(id) },
  });

  if (!memo) return notFound();

  const deleteMemoAction = deleteMemo.bind(null, memo.id);

  return (
    <>
      <div className="flex flex-col h-full mt-10">
        <div className="flex w-full justify-end">
          <div className="flex gap-1">
            <Link
              href={`/memos/${memo.id}/edit`}
              className="bg-blue-300 text-lg px-6 py-1 rounded-md">
              Edit
            </Link>
            <form action={deleteMemoAction}>
              <button className="bg-red-300 text-lg px-6 py-1 rounded-md">
                Del
              </button>
            </form>
          </div>
        </div>
        <h1 className="text-2xl mx-4 mb-2 font-bold mt-2">{memo?.title}</h1>
        <p className="bg-gray-100 rounded-sm h-1/2 p-4 text-lg overflow-y-auto">
          {memo?.content}
        </p>
      </div>
    </>
  );
}
