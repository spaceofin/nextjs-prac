import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { Post } from "../types/posts";

export const getStaticPaths = (async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await response.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { id } = context.params as { id: string };

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const post = await response.json();

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: { post },
    };
  } catch (error) {
    return {
      props: {
        post: null,
      },
    };
  }
}) satisfies GetStaticProps<{ post: Post }>;

export default function PostDetail({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
