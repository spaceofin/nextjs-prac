"use client";

import ConfirmModal from "@/app/components/confirm-modal";
import {
  fetchGroupsByUserId,
  GroupWithMembers,
  leaveGroup,
} from "@/app/service/groups-service";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function MyGroupsList({
  groups,
}: {
  groups: GroupWithMembers[];
}) {
  const [myGroups, setMyGroups] = useState<GroupWithMembers[]>(groups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<GroupWithMembers>();
  const session = useSession();
  const currentUserId = session.data?.user.id;

  const fetchMyGroups = useCallback(async () => {
    const fetchedGroups = await fetchGroupsByUserId();
    setMyGroups(fetchedGroups);
  }, []);

  const onConfirm = async (confirmed: boolean) => {
    if (confirmed === true) {
      if (groupToDelete?.ownerId === currentUserId) {
        // when the current user is the owner of the group
      } else {
        try {
          if (groupToDelete) {
            await leaveGroup(groupToDelete?.id);
            await fetchMyGroups();
            toast.info("Account deletion completed.", {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: true,
              theme: "colored",
            });
          }
        } catch (error) {
          console.error("error deleting user:", error);
        }
      }
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full w-full gap-2 overflow-y-auto py-2 px-6 font-sans">
      {myGroups.map((group) => (
        <div
          key={group.id}
          className="flex justify-between items-center bg-gray-400 px-6 rounded-md h-10">
          <div className="flex text-xl gap-1">
            <p>{group.name}</p>
            {group.ownerId === currentUserId && <p>⭐</p>}
          </div>
          <div>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setGroupToDelete(group);
              }}
              className="bg-blue-500 px-2 rounded-md font-bold text-base">
              leave
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <ConfirmModal
          message={`Do you really want to leave the ${groupToDelete?.name} group?`}
          onConfirm={onConfirm}
        />
      )}
    </div>
  );
}
