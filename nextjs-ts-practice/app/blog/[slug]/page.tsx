import type { Metadata } from "next";
import { getContent as libGetContent } from "@/lib/load-content";
import { getPosts } from "@/lib/get-posts";
import { cache } from "react";
import Link from "next/link";
import { ReactElement } from "react";

// export const dynamic = "force-static";

const titles = {
  "1": "first",
  "2": "second",
  "3": "third",
};

type MDXContent = {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags: string[];
  };
  content: ReactElement;
};

const getContent = cache(
  async (postPath: string): Promise<MDXContent> => libGetContent(postPath)
);

console.log("getContent:", getContent);
console.log("typeof getContent:", typeof getContent);

export async function generateStaticParams() {
  const { posts } = await getPosts({ limit: 1000 });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: keyof typeof titles };
}): Promise<Metadata | undefined> {
  try {
    const { frontmatter } = await getContent("posts/" + params.slug);
    return frontmatter;
  } catch (e) {
    console.log("error:", e);
  }

  // const description = (await parent).description ?? "This is blog page";

  // return {
  //   title: `${titles[params.slug]} post`,
  //   description,
  // };
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    // const { content } = await getContent("posts/" + params.slug);
    // return content;

    const post = await getContent("posts/" + params.slug);
    return (
      <article
        className="py-8 pl-7 px-12 border-solid border-4 w-full border-white bg-white bg-opacity-80 rounded-md"
        style={{ width: "500px" }}>
        {post.content}
        <div className="flex space-x-2 mt-8 ml-4">
          {post.frontmatter.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/?tags=${tag}`}
              className="text-lg text-gray-100 bg-violet-500 bg-opacity-70 rounded-xl px-3 dark:text-white dark:bg-pink-500 dark:bg-opacity-70">
              #{tag}
            </Link>
          ))}
        </div>
      </article>
    );
  } catch (e) {
    console.log("error:", e);
  }

  // return <div>My Post: {params.slug}</div>;
}
