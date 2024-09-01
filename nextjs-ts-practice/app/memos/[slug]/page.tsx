import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";

export default function MemosPage({ params }: { params: { slug: string } }) {
  const memoMarkdown = fs.readFileSync(
    path.join(process.cwd(), "content", `${params.slug}.mdx`)
  );
  return (
    <div className="prose">
      <MDXRemote source={memoMarkdown} />
    </div>
  );
}
