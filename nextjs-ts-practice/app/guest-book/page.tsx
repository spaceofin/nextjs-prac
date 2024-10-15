"use client";

import Card from "@/components/card";
import Input from "@/components/input";
import Label from "@/components/label";
import Textarea from "@/components/textarea";
import Button from "@/components/button";
import { FormEvent, useState, useEffect } from "react";

type Entry = {
  id: string;
  name: string;
  email: string;
  message: string;
};

async function getGuestBook(): Promise<Entry[]> {
  const response = await fetch("http://localhost:3001/guestbook");
  const entries = await response.json();
  return entries;
}

export default function GuestBookPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getGuestBook();
      setEntries(data);
    };
    fetchEntries();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`http://localhost:3001/guestbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setFormData({ name: "", email: "", message: "" });
        setEntries((prevEntries) => [...prevEntries, result]);
      }
    } catch {
      console.error("Failed to Post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2 mt-10">
          <div className="col-span-1">
            <Label>Name</Label>
            <Input
              type="string"
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div className="col-span-1">
            <Label>Email</Label>
            <Input
              type="string"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <Label>Message</Label>
            <Textarea
              className="min-h-32 lg:min-h-20 overflow-y-auto"
              name="message"
              onChange={handleChange}
              value={formData.message}
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="m-1 dark:bg-gray-300 dark:text-slate-800 dark:hover:bg-pink-400 dark:hover:text-slate-800">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
