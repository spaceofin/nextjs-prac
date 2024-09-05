import fs from "fs";
import path from "path";
import { getContent } from "@/lib/loadContent";

type GetPostsOptions = {
  sortByDate?: boolean;
  page?: number;
  limit?: number;
  tags?: string[];
};

export async function getPosts({
  sortByDate = false,
  page = 1,
  limit = 10,
  tags = [],
}: GetPostsOptions = {}) {
  const files = fs.readdirSync(path.join(process.cwd(), "content/posts"));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const { frontmatter, content } = await getContent("posts/" + filename);

      return {
        frontmatter,
        content,
        slug: filename.replace(".mdx", ""),
      };
    })
  );

  let filteredPosts = posts;

  // if (tags) {
  //   filteredPosts = filteredPosts.filter((post) =>
  //     post.frontmatter.tags.some((tag) => tags.includes(tag))
  //   );
  // }

  if (tags) {
    filteredPosts = filteredPosts.filter((post) =>
      tags.every((tag) => post.frontmatter.tags.includes(tag))
    );
  }

  return filteredPosts;
}
