"use client";

import MemoCard from "./memo-card";
import { Memo } from "@prisma/client";
import Link from "next/link";
import NewButton from "./new-button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPublicMemos,
  fetchUserMemos,
  selectMemos,
} from "@/redux/features/memos/memosSlice";
import { useEffect } from "react";

export function MemoCards({
  memos,
  isSignedIn,
}: {
  memos: Memo[];
  isSignedIn: boolean;
}) {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectMemos);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchUserMemos());
    } else {
      dispatch(fetchPublicMemos());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  const memoList = data || memos;

  return (
    <div className="flex flex-col gap-1 mt-5">
      {isSignedIn ? <NewButton isSignedIn={isSignedIn} /> : <NewButton />}
      <div className="flex flex-col gap-1 h-72 overflow-y-auto">
        {memoList.map((memo) => (
          <Link key={memo.id} href={`/memos/${memo.id}`}>
            <MemoCard key={memo.id} memo={memo} />
          </Link>
        ))}
      </div>
    </div>
  );
}
