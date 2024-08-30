import Link from "next/link";
import styles from "./navigation.module.css";

export default function Navigation() {
  return (
    <nav className="font-mono">
      <ul className="relative w-screen min-h-32 m-10 flex flex-col lg:flex-row lg:space-x-4 space-y-1 justify-center items-center text-2xl lg:text-3xl z-0">
        <li>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className={styles.link}>
            About
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
      </ul>
    </nav>
  );
}
