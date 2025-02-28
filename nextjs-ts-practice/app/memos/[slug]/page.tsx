import fs from "fs";
import path from "path";
import { getContent } from "@/lib/load-content";

export async function generateStaticParams() {
  const memoFiles = fs.readdirSync(path.join(process.cwd(), "content/memos"));

  return memoFiles.map((memo) => ({
    slug: memo.replace(".mdx", ""),
  }));
}

export default async function MemoDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let memo;
  try {
    memo = await getContent("memos/" + params.slug);
  } catch (e) {
    console.log("error:", e);
  }

  return <div className="prose">{memo?.content}</div>;
}
