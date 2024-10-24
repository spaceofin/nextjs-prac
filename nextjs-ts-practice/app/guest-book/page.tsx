"use client";

import Card from "@/components/card";
import Input from "@/components/input";
import Label from "@/components/label";
import Textarea from "@/components/textarea";
import Button from "@/components/button";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Skeleton from "./components/skeleton";
import { guestBookSchema } from "./components/guest-book-schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Entry>({
    mode: "onTouched",
    resolver: zodResolver(guestBookSchema),
  });

  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        const data = await getGuestBook();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntries();
  }, []);

  const onSubmit: SubmitHandler<Entry> = async (data) => {
    setIsSaving(true);

    try {
      const response = await fetch(`http://localhost:3001/guestbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setEntries((prevEntries) => [...prevEntries, result]);
      }
    } catch {
      console.error("Failed to Post");
    } finally {
      setIsSaving(false);
      reset();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
        {!isLoading && entries.length !== 0 ? (
          entries.map((entry: Entry) => (
            <Card
              key={entry.id}
              className="flex flex-col justify-center min-w-72 h-36">
              <p>{entry.name}</p>
              <p>{entry.email}</p>
              <p>{entry.message}</p>
            </Card>
          ))
        ) : (
          <Skeleton />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2 mt-10">
          <div className="col-span-1">
            <Label>Name</Label>
            <Input
              type="string"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="col-span-1">
            <Label>Email</Label>
            <Input
              type="string"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="col-span-1 lg:col-span-2">
            <Label>Message</Label>
            <Textarea
              className="min-h-32 lg:min-h-20 overflow-y-auto"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && <p>{errors.message.message}</p>}
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
