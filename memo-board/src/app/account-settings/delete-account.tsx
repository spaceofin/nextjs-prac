"use client";

import { useState } from "react";
import ConfirmModal from "../components/confirm-modal";
import { deleteUser } from "../service/account-service";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { isUserGroupOfGroup } from "../service/groups-service";

export default function DeleteAccount() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showGroupOwnerRestriction, setShowGroupOwnerRestriction] =
    useState(false);
  const [ownedGroupNames, setOwnedGroupNames] = useState("");

  const onConfirm = async (confirmed: boolean) => {
    if (confirmed === true) {
      try {
        const ownedGroups = await isUserGroupOfGroup();
        if (ownedGroups && ownedGroups.length > 0) {
          const groupNames = ownedGroups.join(", ");
          setOwnedGroupNames(groupNames);
          setShowGroupOwnerRestriction(true);
        } else {
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
        }
      } catch (error) {
        console.error("error deleting user:", error);
      }
    }

    setIsConfirmModalOpen(false);
  };

  return (
    <>
      {isConfirmModalOpen && (
        <ConfirmModal
          message="Do you really want to delete your account?"
          onConfirm={onConfirm}
        />
      )}
      {showGroupOwnerRestriction && (
        <ConfirmModal
          message={`You are the owner of the ${ownedGroupNames}. Transfer the owner role to another member or delete the group, then delete your account."`}
          onConfirm={setShowGroupOwnerRestriction}
          type="info"
        />
      )}
      <button
        onClick={() => setIsConfirmModalOpen(true)}
        className="p-2 bg-gray-400 rounded-md">
        Delete Account
      </button>
    </>
  );
}
