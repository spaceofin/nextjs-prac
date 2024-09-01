import Card from "../components/card";

interface Post {
  id: number;
  title: string;
  author: string;
}

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

  let posts: Post[] = [];

  try {
    const response = await fetch("http://localhost:3001/posts", {
      cache: "no-store",
    });
    posts = await response.json();
  } catch (error) {
    console.error("error occurred:", error);
  }

  return (
    <div className="flex flex-col">
      <div className="mb-8 px-4 text-3xl text-white">🔽Posts</div>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {posts.map((post: Post) => (
          <li key={post.id} className="text-s font-mono w-72">
            <Card className="h-full">
              <div>id: {post.id}</div>
              <div>title: {post.title}</div>
              <div>author: {post.author}</div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
