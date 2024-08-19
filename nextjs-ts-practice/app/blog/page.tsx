interface Post {
  id: number;
  title: string;
  author: string;
}

export default async function BlogPage() {
  //   const posts = await fetch("http://localhost:3001/posts").then((res) =>
  //     res.json()
  //   );

  const response = await fetch("http://localhost:3001/posts", {
    cache: "no-store",
  });
  const posts = await response.json();

  return (
    <div className="flex flex-col w-32">
      <div className="mb-8 text-xl text-white">Posts</div>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id} className="mb-3 text-s">
            <div>id: {post.id}</div>
            <div>title: {post.title}</div>
            <div>author: {post.author}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
