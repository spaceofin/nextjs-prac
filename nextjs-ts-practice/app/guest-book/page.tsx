import Card from "@/components/card";
import Input from "@/components/input";
import Label from "@/components/label";

type Entry = {
  id: number;
  name: string;
  email: string;
  message: string;
};

async function getGuestBook(): Promise<Entry[]> {
  const response = await fetch("http://localhost:3001/guestbook");
  const entries = await response.json();
  return entries;
}

export default async function GuestBookPage() {
  const entries: Entry[] = await getGuestBook();
  return (
    <div className="flex flex-col w-full">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
        {entries.map((entry: Entry) => (
          <Card key={entry.id} className="min-w-72">
            <p>{entry.name}</p>
            <p>{entry.email}</p>
            <p>{entry.message}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-2 mt-10">
        <div className="col-span-1">
          <Label>Name</Label>
          <Input type="string"></Input>
        </div>
        <div className="col-span-1">
          <Label>Email</Label>
          <Input type="string"></Input>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <Label>Message</Label>
          <Input type="string"></Input>
        </div>
      </div>
    </div>
  );
}
