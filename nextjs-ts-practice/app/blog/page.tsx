// import Card from "../components/card";
import { getPosts } from "@/lib/getPosts";
import { ReactElement } from "react";

// interface Post {
//   id: number;
//   title: string;
//   author: string;
// }

type Post = {
  frontmatter: {
    title: string;
    description: string;
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

export default async function BlogPage() {
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

  const posts = await getPosts();

  return (
    <div className="flex flex-col">
      <div className="mb-8 px-4 text-3xl text-white">🔽Posts</div>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4"></ul>
      {posts.map((post: Post) => (
        <div key={post.slug}>
          <div className="text-2xl mt-5">{post.slug}</div>
          <div>{post.frontmatter.title}</div>
          <div>{post.frontmatter.description}</div>
          <div className="bg-slate-200 bg-opacity-80 rounded-md p-3 my-2">
            {post.content}
          </div>
        </div>
      ))}
    </div>
  );
}
