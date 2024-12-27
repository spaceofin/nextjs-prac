"use client";

import { useState } from "react";
import ConfirmModal from "../components/confirm-modal";
import { deleteUser } from "../service/account-service";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export default function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConfirm = async (confirmed: boolean) => {
    if (confirmed === true) {
      try {
        await deleteUser();
        toast.info("Account deletion completed.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
        });
        setTimeout(() => {
          signOut({ redirectTo: "/" });
        }, 1000);
      } catch (error) {
        console.error("error deleting user:", error);
      }
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
