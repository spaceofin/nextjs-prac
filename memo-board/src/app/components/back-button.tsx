"use client";

import { useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";

export default function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button onClick={handleClick} className="mr-2">
      <TbArrowBackUp size={32} style={{ stroke: "black", strokeWidth: 2 }} />
    </button>
  );
}
