import fs from "fs";
import path from "path";
import { compileMDX, CompileMDXResult } from "next-mdx-remote/rsc";
import Heading1 from "@/components/heading";
import Paragraph from "@/components/paragraph";

export function loadContent(slug: string) {
  const filename = slug.endsWith(".mdx") ? slug : `${slug}.mdx`;
  return fs.readFileSync(
    path.join(process.cwd(), "content", filename),
    "utf-8"
  );
}

export async function getContent<T>(
  slug: string
): Promise<CompileMDXResult<T>> {
  const source = loadContent(slug);

  return await compileMDX({
    source,
    components: {
      h1: (props) => <Heading1 {...props} />,
      p: (props) => <Paragraph {...props} />,
    },
    options: {
      parseFrontmatter: true,
    },
  });
}
