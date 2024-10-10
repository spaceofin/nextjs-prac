import fs from "fs";
import path from "path";
import { getContent } from "@/lib/loadContent";

export async function getMemos() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/memos"));

  const memos = await Promise.all(
    files.map(async (filename) => {
      const { frontmatter, content } = await getContent("memos/" + filename);

      return {
        frontmatter,
        content,
      };
    })
  );

  return memos;
}
