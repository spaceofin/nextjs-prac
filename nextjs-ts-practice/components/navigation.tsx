import Link from "next/link";
import ToggleTheme from "./toggle-theme";
import useServerTheme from "@/hooks/use-server-theme";
import { Theme } from "@/types/theme";

function StyledLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="block min-w-24 lg:inline lg:p-2 lg:m-0 text-center hover:bg-slate-700 hover:rounded-lg hover:text-white dark:hover:bg-white dark:hover:bg-opacity-50 dark:hover:text-slate-700">
      {label}
    </Link>
  );
}

export default function Navigation() {
  const theme: Theme = useServerTheme();
  return (
    <nav className="font-mono">
      <ul className="relative w-screen min-h-32 m-10 flex flex-col lg:flex-row lg:space-x-4 space-y-1 justify-center items-center text-2xl lg:text-3xl z-0">
        <li>
          <StyledLink href="/" label="Home" />
        </li>
        <li>
          <StyledLink href="/blog" label="Blog" />
        </li>
        <li>
          <StyledLink href="/photos" label="Photos" />
        </li>
        <li>
          <StyledLink href="/memos" label="Memos" />
        </li>
        <li>
          <StyledLink href="/todos" label="Todos" />
        </li>
        <li className="flex justify-center pt-1 w-14">
          <ToggleTheme defaultTheme={theme} />
        </li>
        <li className="flex">
          <Link href="/guest-book" className="text-4xl pb-1">
            📖
          </Link>
        </li>
      </ul>
    </nav>
  );
}
