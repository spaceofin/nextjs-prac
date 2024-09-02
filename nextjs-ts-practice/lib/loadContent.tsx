import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export function loadContent(slug: string) {
  return fs.readFileSync(path.join(process.cwd(), "content", `${slug}.mdx`));
}

export async function getContent(slug: string) {
  const source = loadContent(slug);

  return await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
  });
}
