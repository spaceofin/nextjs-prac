"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Main({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const mainClass =
    pathname === "/" || pathname === "/read-me" ? "" : "h-[calc(100vh-136px)]";

  return <main className={mainClass}>{children}</main>;
}
