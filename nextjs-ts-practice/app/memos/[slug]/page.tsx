import { getContent } from "@/lib/load-content";

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
