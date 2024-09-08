import { ReactNode } from "react";

export default function Paragraph({ children }: { children?: ReactNode }) {
  return <h1 className="m-4 text-xl text-slate-500 not-prose">{children}</h1>;
}
