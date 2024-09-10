import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { ReactElement } from "react";
import Heading1 from "@/app/components/heading";
import Paragraph from "@/app/components/paragraph";

type MDXContent = {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags: string[];
  };
  content: ReactElement;
};

export function loadContent(slug: string) {
  const filename = slug.endsWith(".mdx") ? slug : `${slug}.mdx`;
  return fs.readFileSync(path.join(process.cwd(), "content", filename));
}

export async function getContent(slug: string): Promise<MDXContent> {
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
