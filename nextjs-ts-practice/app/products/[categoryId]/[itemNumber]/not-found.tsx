import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p>Invalid itemNumber: Must be a number</p>
      <Link
        className="inline-block bg-orange-300 p-2 my-2 rounded-md active:bg-orange-400"
        href="/">
        Return Home
      </Link>
    </div>
  );
}
