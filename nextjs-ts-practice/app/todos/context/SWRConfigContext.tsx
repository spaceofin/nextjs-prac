"use client";

import { SWRConfig } from "swr";

interface SWRProps {
  children: React.ReactNode;
}
export default function SWRConfigContext({ children }: SWRProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}>
      {children}
    </SWRConfig>
  );
}
