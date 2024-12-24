import { auth } from "../auth";
import DeleteAccount from "./delete-account";

export default async function AccountSettings() {
  const session = await auth();

  return (
    <div className="relaltive flex justify-center items-center w-full h-full">
      <div className="flex flex-col justify-between m-10 w-[500px] h-[350px] bg-gray-200 rounded-md p-10 text-xl font-mono">
        <div>
          <p>Email: {session?.user?.email}</p>
          <p>Name: {session?.user?.name}</p>
        </div>
        <DeleteAccount id={session?.user?.id!} />
      </div>
    </div>
  );
}
