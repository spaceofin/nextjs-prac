"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  if (pathname === "/read-me") return null;
  return (
    <div className="flex m-2 justify-center items-center">
      <Link className="text-4xl font-bold" href="/">
        MEMO BOARD
      </Link>
    </div>
  );
}
