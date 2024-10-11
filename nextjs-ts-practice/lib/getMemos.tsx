import fs from "fs";
import path from "path";
import { getContent } from "@/lib/loadContent";
import { MDXMemo, MemoFrontmatter } from "@/types/mdx-types";

export async function getMemos() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/memos"));

  const memos = await Promise.all(
    files.map(async (filename) => {
      const { frontmatter, content } = await getContent<MemoFrontmatter>(
        "memos/" + filename
      );
      return {
        frontmatter,
        content,
      };
    })
  );

  return memos;
}
