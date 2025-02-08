import Link from "next/link";
import { auth } from "../auth";
import BackButton from "../components/back-button";
import DeleteAccount from "./delete-account";
import { User } from "@prisma/client";

export default async function AccountSettings() {
  const session = await auth();
  const user = session?.user as User & { isOAuthUser: boolean };

  return (
    <div className="relaltive flex flex-col justify-center items-center w-full h-full">
      <div className="flex w-[500px] justify-end mb-2">
        <BackButton />
      </div>
      <div className="flex flex-col justify-between w-[500px] h-[350px] bg-gray-200 rounded-md p-10 text-xl font-mono">
        <div className="p-4">
          <p>Email: {user?.email}</p>
          <p>Name: {user?.name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href="/account-settings/manage-groups"
            className="flex justify-center p-2 bg-green-400 bg-opacity-80 rounded-md">
            Manage Groups
          </Link>
          {!user.isOAuthUser && (
            <Link
              href="/account-settings/change-password"
              className="flex justify-center p-2 bg-orange-400 bg-opacity-80 rounded-md">
              Change Password
            </Link>
          )}
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}
