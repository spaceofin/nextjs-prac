"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function TagList({ tags }: { tags: string[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const clickedTag = searchParams.get("tags");

  return (
    <div className="absolute top-0 -left-3/4 w-3/5 h-full rounded-lg bg-blue-500 bg-opacity-70 px-7 py-10 overflow-y-auto">
      <div className="w-full flex flex-wrap gap-2">
        {tags.map((tag) => {
          return (
            <Link
              key={tag}
              href={`${pathname}?tags=${tag}`}
              className={`rounded-lg text-white bg-opacity-70 border-2 bg- border-blue-200 py-1 px-2 hover:cursor-pointer active:scale-95 active:bg-blue-600 ${
                clickedTag === tag ? "bg-blue-600" : "bg-transparent"
              }`}>
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
