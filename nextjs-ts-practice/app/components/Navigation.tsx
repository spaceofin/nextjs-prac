import Link from "next/link";
export default function Navigation() {
  return (
    <nav className="font-mono">
      <ul className="relative w-screen min-h-32 m-10 flex flex-col lg:flex-row lg:space-x-4 justify-center items-center text-2xl z-0">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
}
