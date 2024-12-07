"use client";

import { useSession } from "next-auth/react";
import { signIn } from "../api/auth/sign-in";
import { signOut } from "next-auth/react";

export default function AuthBar() {
  const session = useSession();

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
        <div className="flex justify-end pr-4 gap-2 mb-0">
          <button
            className="flex justify-center items-center w-24 h-10 border-2 border-lime-500 bg-lime-100 rounded-md"
            onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </>
    );
  } else {
    authContent = (
      <>
        <div className="flex justify-end pr-4 gap-2 mb-0">
          <form action={signIn}>
            <button className="flex justify-center items-center w-20 h-10 border-2 border-lime-500 bg-lime-100 rounded-md">
              Sign In
            </button>
          </form>
          <form>
            <button className="flex justify-center items-center w-20 h-10 bg-lime-400 rounded-md">
              Sign Up
            </button>
          </form>
        </div>
      </>
    );
  }
  return authContent;
}
