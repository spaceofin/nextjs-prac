import { db } from "@/app/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/app/auth";
import BackButton from "@/app/components/back-button";
import DeleteMemoButton from "@/app/components/delete-memo-button";

export async function generateStaticParams() {
  const memos = await db.memo.findMany();

  return memos.map((memo) => {
    return { id: memo.id.toString() };
  });
}

export default async function MemoDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const isSignedIn = !!session;

  const memo = await db.memo.findFirst({
    where: { id: parseInt(id) },
  });

  if (!memo) return notFound();

  return (
    <>
      <div className="flex flex-col h-full mt-10">
        {isSignedIn ? (
          <div className="flex w-full justify-end">
            <div className="flex gap-1">
              <Link
                href={`/memos/${memo.id}/edit`}
                className="bg-blue-300 text-lg px-6 py-1 rounded-md">
                Edit
              </Link>
              <DeleteMemoButton
                memoId={memo.id}
                className="text-lg px-6 py-1"
              />
            </div>
          </div>
        ) : null}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl mx-4 mb-2 font-bold mt-2">{memo?.title}</h1>
          <BackButton />
        </div>
        <p className="bg-gray-100 rounded-sm h-1/2 p-4 text-lg overflow-y-auto">
          {memo?.content}
        </p>
      </div>
    </>
  );
}
