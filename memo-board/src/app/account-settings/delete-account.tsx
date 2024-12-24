"use client";

import { useState } from "react";
import ConfirmModal from "../components/confirm-modal";

export default function DeleteAccount({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConfirm = (confirmed: boolean) => {
    if (confirmed === true) {
      console.log("account deleted:", id);
    }

    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <ConfirmModal
          message="Do you really want to delete your account?"
          onConfirm={onConfirm}
        />
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-gray-400 rounded-md">
        Delete Account
      </button>
    </>
  );
}
