import MemoCard from "./components/memo-card";
import Link from "next/link";

const memos = [
  { id: 1, title: "memo1", content: "This is memo1" },
  { id: 2, title: "memo2", content: "This is memo2" },
  { id: 3, title: "memo3", content: "This is memo3" },
];

export default function Home() {
  return (
    <div>
      <div className="flex flex-col my-10 gap-1">
        <div className="flex w-full justify-start">
          <Link
            className="bg-slate-200 text-lg px-6 py-1 rounded-md"
            href="/memos/new">
            New
          </Link>
        </div>
        <div>
          {memos.map((memo) => (
            <Link href={`/memos/${memo.id}`}>
              <MemoCard key={memo.id} memo={memo} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
