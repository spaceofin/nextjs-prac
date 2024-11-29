import Link from "next/link";

export default function Header() {
  return (
    <div className="flex m-2 justify-center items-center">
      <Link className="text-4xl font-bold" href="/">
        MEMO BOARD
      </Link>
    </div>
  );
}
