import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Post } from "../types/posts";

export const getServerSideProps = (async (context) => {
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
}) satisfies GetServerSideProps<{ post: Post }>;

export default function PostDetail({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
