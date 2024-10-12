import fs from "fs";
import path from "path";
import { getContent } from "@/lib/loadContent";
import { PostFrontmatter } from "@/types/mdx-types";

type GetPostsOptions = {
  page?: number;
  limit?: number;
  tags?: string[];
  order?: string;
};

export async function getPosts({
  page = 1,
  limit = 3,
  tags = [],
  order = "",
}: GetPostsOptions = {}) {
  const files = fs.readdirSync(path.join(process.cwd(), "content/posts"));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const { frontmatter, content } = await getContent<PostFrontmatter>(
        "posts/" + filename
      );

      return {
        frontmatter,
        content,
        slug: filename.replace(".mdx", ""),
      };
    })
  );

  const allPosts = posts;
  const allTags = Array.from(
    new Set(allPosts.map((post) => post.frontmatter.tags).flat())
  );

  // console.log(allTags);

  const filteredPosts = tags
    ? allPosts.filter((post) =>
        tags.every((tag) => post.frontmatter.tags.includes(tag))
      )
    : allPosts;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const postsOnPage = filteredPosts.slice(startIndex, endIndex);

  if (order) {
    postsOnPage.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);

      const multiplier = order === "ascending" ? 1 : -1;

      return (dateA.getTime() - dateB.getTime()) * multiplier;
    });
  }

  return {
    allTags: allTags,
    posts: postsOnPage,
    pageCount: Math.ceil(filteredPosts.length / limit),
  };
}
