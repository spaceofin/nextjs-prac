// import Card from "../components/card";
import { getPosts } from "@/lib/getPosts";
import { ReactElement } from "react";
import Button from "../components/button";
import Link from "next/link";

// interface Post {
//   id: number;
//   title: string;
//   author: string;
// }

type SearchParams = {
  sortByDate?: boolean;
  order?: "ascending" | "descending";
  page?: number;
  limit?: number;
  tags?: string | string[];
};

type Post = {
  frontmatter: {
    title: string;
    description: string;
    date: string;
  };
  slug: string;
  content: ReactElement;
};

export const metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams | undefined;
}) {
  //   const posts = await fetch("http://localhost:3001/posts").then((res) =>
  //     res.json()
  //   );

  // let posts: Post[] = [];

  // try {
  //   const response = await fetch("http://localhost:3001/posts", {
  //     cache: "no-store",
  //   });
  //   posts = await response.json();
  // } catch (error) {
  //   console.error("error occurred:", error);
  // }

  // console.log(posts);

  // const tags = searchParams.tags?.split(",");
  // console.log("searhchParams.tags:", searchParams.tags);

  // const tags: string[] = searchParams?.tags || [];
  const tags: string[] = Array.isArray(searchParams?.tags)
    ? searchParams.tags
    : searchParams?.tags
    ? [searchParams.tags]
    : [];

  // console.log("tags", tags);

  const order = searchParams?.order;
  const limit = searchParams?.limit;
  const page = searchParams?.page;

  const posts = await getPosts({ tags, order, limit, page });

  return (
    <div className="flex flex-col">
      <div className="mb-8 px-1 text-3xl text-white">🔽Posts</div>
      <div>
        <Link
          href={`/blog?order=${
            order === "descending" ? "ascending" : "descending"
          }${page ? `&page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`}>
          <Button size="small">
            {order === "descending" ? "Sort Asc" : "Sort Desc"}
          </Button>
        </Link>
      </div>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4"></ul>
      {posts.map((post: Post) => (
        <div key={post.slug}>
          <div className="text-2xl mt-5">{post.slug}</div>

          <div>{post.frontmatter.title}</div>
          <div>{post.frontmatter.description}</div>
          <div className="bg-slate-200 bg-opacity-80 rounded-md p-3 my-2">
            <div className="flex justify-end">{post.frontmatter.date}</div>
            {post.content}
          </div>
        </div>
      ))}
    </div>
  );
}
