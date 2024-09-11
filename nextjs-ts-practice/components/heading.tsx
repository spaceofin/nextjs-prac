import { ReactNode } from "react";

export default function Heading1({ children }: { children?: ReactNode }) {
  return (
    <h1 className="m-4 mt-2 text-3xl text-indigo-900 not-prose dark:text-pink-400">
      {children}
    </h1>
  );
}
