"use client";

import { SWRConfig } from "swr";

interface SWRProps {
  children: React.ReactNode;
  [key: string]: any;
}

export default function SWRConfigContext({ children, ...props }: SWRProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        ...props,
      }}>
      {children}
    </SWRConfig>
  );
}
