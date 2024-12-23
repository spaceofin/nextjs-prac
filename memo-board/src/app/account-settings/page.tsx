import { auth } from "../auth";

export default async function AccountSettings() {
  const session = await auth();

  return (
    <div className="m-10 bg-gray-200 rounded-md p-10 text-xl font-mono">
      <p>Email: {session?.user?.email}</p>
      <p>Name: {session?.user?.name}</p>
    </div>
  );
}
