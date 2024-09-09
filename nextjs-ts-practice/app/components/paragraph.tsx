import { ReactNode } from "react";

export default function Paragraph({ children }: { children?: ReactNode }) {
  return (
    <p className="m-4 text-xl text-slate-500 not-prose dark:text-slate-700">
      {children}
    </p>
  );
}
