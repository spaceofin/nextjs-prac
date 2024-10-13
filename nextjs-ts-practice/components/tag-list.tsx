"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function TagList({ tags }: { tags: string[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const pathname = usePathname();
  const router = useRouter();

  const updateUrl = () => {
    if (selectedTags.length > 0) {
      const tagsString = selectedTags.map((tag) => `tags=${tag}`).join("&");
      const newUrl = `${pathname}?${tagsString}`;
      router.push(newUrl, { scroll: false });
    }
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag))
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    else setSelectedTags((prevTags) => [...prevTags, tag]);
  };

  useEffect(() => {
    updateUrl();
  }, [selectedTags]);

  return (
    <div className="absolute top-0 -left-3/4 w-3/5 h-full rounded-lg bg-blue-500 bg-opacity-70 px-7 py-10 overflow-y-auto">
      <div className="w-full flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`rounded-lg text-white bg-opacity-70 border-2 border-blue-200 py-1 px-2 hover:cursor-pointer active:scale-95 ${
                isSelected ? "bg-blue-600" : "bg-transparent"
              }`}>
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
