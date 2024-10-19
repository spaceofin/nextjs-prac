import Link from "next/link";
import styles from "./navigation.module.css";
import ToggleTheme from "./toggle-theme";
import useServerTheme from "@/hooks/use-server-theme";
import { Theme } from "@/types/theme";

export default function Navigation() {
  const theme: Theme = useServerTheme();
  return (
    <nav className="font-mono">
      <ul className="relative w-screen min-h-32 m-10 flex flex-col lg:flex-row lg:space-x-4 space-y-1 justify-center items-center text-2xl lg:text-3xl z-0">
        <li>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/blog" className={styles.link}>
            Blog
          </Link>
        </li>
        <li>
          <Link href="/photos" className={styles.link}>
            Photos
          </Link>
        </li>
        <li>
          <Link href="/memos" className={styles.link}>
            Memos
          </Link>
        </li>
        <li>
          <Link href="/todos" className={styles.link}>
            Todos
          </Link>
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
