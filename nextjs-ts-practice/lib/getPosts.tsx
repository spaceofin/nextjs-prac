import fs from "fs";
import path from "path";
import { getContent } from "@/lib/loadContent";

export async function getPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/posts"));

  return await Promise.all(
    files.map(async (filename) => {
      const { frontmatter, content } = await getContent("posts/" + filename);

      return {
        frontmatter,
        content,
        slug: filename.replace(".mdx", ""),
      };
    })
  );
}
