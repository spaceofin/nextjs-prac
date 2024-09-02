import { MDXRemote } from "next-mdx-remote/rsc";
import { loadContent } from "@/lib/loadContent";

export default function MemosPage({ params }: { params: { slug: string } }) {
  const memoMarkdown = loadContent(params.slug);
  return (
    <div className="prose">
      <MDXRemote source={memoMarkdown} />
    </div>
  );
}
