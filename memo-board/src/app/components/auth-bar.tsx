"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcSettings } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";

export default function AuthBar({ userId }: { userId: string | undefined }) {
  const session = useSession();

  useEffect(() => {
    session.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const router = useRouter();

  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = (
      <>
        <div className="flex justify-end pr-4 gap-2 mb-0">
          <button className="flex justify-center items-center w-20 h-10 border-2 border-lime-500 bg-lime-100 rounded-md" />
          <button className="flex justify-center items-center w-20 h-10 bg-lime-400 rounded-md" />
        </div>
      </>
    );
  } else if (session.data?.user) {
    authContent = (
      <>
        <div className="flex justify-end pr-4 gap-4 mb-0">
          <div className="flex justify-center items-center gap-1">
            {session.data.user.image && (
              <div className="rounded-full w-10 h-10 overflow-hidden">
                <Image
                  width={40}
                  height={40}
                  src={session.data.user.image}
                  alt="User profile image"
                />
              </div>
            )}
            <p className="text-lg font-bold">{session.data.user.name}</p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              className="flex justify-center items-center w-24 h-10 border-2 border-lime-500 bg-lime-100 rounded-md"
              onClick={() => signOut()}>
              Sign Out
            </button>
            <Link href="/account-settings">
              <FcSettings size={32} />
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    authContent = (
      <>
        <div className="flex justify-end pr-4 gap-2 mb-0">
          <button
            className="flex justify-center items-center w-20 h-10 border-2 border-lime-500 bg-lime-100 rounded-md"
            onClick={() => router.push("/sign-in")}>
            Sign In
          </button>
          <button
            className="flex justify-center items-center w-20 h-10 bg-lime-400 rounded-md"
            onClick={() => router.push("/sign-up")}>
            Sign Up
          </button>
        </div>
      </>
    );
  }
  return authContent;
}
