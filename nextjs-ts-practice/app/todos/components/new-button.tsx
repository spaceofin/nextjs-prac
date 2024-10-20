"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/button";

export default function NewButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/todos?new=true");
  };

  return (
    <Button onClick={handleClick} size="small" className="w-20">
      New
    </Button>
  );
}
