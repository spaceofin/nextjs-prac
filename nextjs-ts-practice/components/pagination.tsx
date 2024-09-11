"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import Counter from "./counter";
import { useState } from "react";

export default function Pagination({ pageCount }: { pageCount: number }) {
  const [limitCount, setLimitCount] = useState(3);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  // console.log("searchParams:", searchParams.toString());
  // console.log("pathname:", pathname);
  const page = Number(searchParams.get("page") ?? 1);

  const createPageLink = (pageNumber: number, limitNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    params.set("limit", limitNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div>
      <ul className="flex justify-center space-x-4 text-xl">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(
          (pageNumber) => (
            <li key={pageNumber}>
              <Link
                href={createPageLink(pageNumber, limitCount)}
                className={`${
                  pageNumber === page
                    ? "font-bold underline underline-offset-3"
                    : ""
                } text-gray-700 dark:text-white`}>
                {pageNumber}
              </Link>
            </li>
          )
        )}
      </ul>
      <div className="flex justify-center">
        <Counter count={limitCount} setCount={setLimitCount} title="limit" />
        <Link
          href={createPageLink(page, limitCount)}
          className="flex-grow flex justify-center items-center mx-3 mt-3 bg-blue-600 px-2 rounded-md text-white">
          apply
        </Link>
      </div>
    </div>
  );
}
