type Memo = {
  id: number;
  title: string;
  content: string;
};

export default function MemoCard({ memo }: { memo: Memo }) {
  return (
    <div className="border-2 border-slate-400 px-4 py-2 rounded-md">
      <p className="font-bold">{memo.title}</p>
      <p>{memo.content}</p>
    </div>
  );
}
