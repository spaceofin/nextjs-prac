"use client";

import { SWRConfig } from "swr";

interface SWRProps {
  children: React.ReactNode;
  [key: string]: any;
}

const BASE_URL = "http://localhost:3001";

export default function SWRConfigContext({ children, ...props }: SWRProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(`${BASE_URL}${url}`).then((res) => res.json()),
        ...props,
      }}>
      {children}
    </SWRConfig>
  );
}
