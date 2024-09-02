import fs from "fs";
import path from "path";

export function loadContent(slug: string) {
  return fs.readFileSync(path.join(process.cwd(), "content", `${slug}.mdx`));
}
