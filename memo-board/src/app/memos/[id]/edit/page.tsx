import { db } from "@/app/db";
import { notFound } from "next/navigation";
import MemoEditSection from "./memo-edit-section";

export default async function MemoEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const memo = await db.memo.findFirst({
    where: { id: parseInt(id) },
  });

  if (!memo) return notFound();

  return <MemoEditSection memo={memo} />;
}