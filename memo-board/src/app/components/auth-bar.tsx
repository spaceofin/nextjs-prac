"use client";

import { useSession } from "next-auth/react";
import { signIn } from "../api/auth/sign-in";

export default function AuthBar() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = <></>;
  } else if (session.data?.user) {
    authContent = <></>;
  } else {
    authContent = (
      <>
        <div className="flex justify-end pr-4 gap-2 mb-0">
          <form action={signIn}>
            <button className="border-2 border-lime-500 bg-lime-100 px-3 py-1 rounded-md">
              SignIn
            </button>
          </form>
          <form>
            <button className="bg-lime-400 px-3 py-1 rounded-md">SignUp</button>
          </form>
        </div>
      </>
    );
  }
  return authContent;
}
