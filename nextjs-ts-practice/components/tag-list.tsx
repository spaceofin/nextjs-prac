export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="absolute top-0 -left-3/4 w-3/5 h-full rounded-lg bg-blue-500 bg-opacity-70 px-7 py-10 overflow-y-auto">
      <div className="w-full flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span className="rounded-lg text-white bg-opacity-70 border-2 border-blue-200 py-1 px-2">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
