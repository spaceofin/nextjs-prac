import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        className="inline-block bg-yellow-300 p-2 my-2 rounded-md active:bg-yellow-400"
        href="/">
        Return Home
      </Link>
    </div>
  );
}
