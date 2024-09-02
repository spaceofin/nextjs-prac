import { MDXRemote } from "next-mdx-remote/rsc";
import { loadContent, getContent } from "@/lib/loadContent";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: keyof typeof titles };
};

const titles = {
  memo: "memo",
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  try {
    const { frontmatter } = await getContent(params.slug);
    return frontmatter;
  } catch (e) {
    console.log("error:", e);
  }
}

export default async function MemosPage({
  params,
}: {
  params: { slug: string };
}) {
  const memoMarkdown = loadContent(params.slug);

  let memo;
  try {
    memo = await getContent(params.slug);
  } catch (e) {
    console.log("error:", e);
  }

  return (
    <div className="prose">
      {/* <MDXRemote source={memoMarkdown} />
       */}
      {memo?.content}
    </div>
  );
}
