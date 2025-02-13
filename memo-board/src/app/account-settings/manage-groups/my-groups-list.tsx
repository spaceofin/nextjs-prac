"use client";

import ConfirmModal from "@/app/components/confirm-modal";
import {
  GroupWithMembers,
  changeGroupOwner,
  changeOwnerAndLeaveGroup,
  deleteGroup,
  fetchGroupsByUserId,
  leaveGroup,
} from "@/app/service/groups-service";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import ChangeOwnerModal from "./owner-change-modal";

export default function MyGroupsList({
  groups,
}: {
  groups: GroupWithMembers[];
}) {
  const [myGroups, setMyGroups] = useState<GroupWithMembers[]>(groups);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOwnerChangeAndLeaveModalOpen, setIsOwnerChangeAndLeaveModalOpen] =
    useState(false);
  const [isOwnerChangeModalOpen, setIsOwnerChangeModalOpen] = useState(false);
  const [targetGroup, setTargetGroup] = useState<GroupWithMembers>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const session = useSession();
  const currentUserId = session.data?.user.id;

  const fetchMyGroups = useCallback(async () => {
    const fetchedGroups = await fetchGroupsByUserId();
    setMyGroups(fetchedGroups);
  }, []);

  const onOnwerChangeConfirm = async ({
    confirmed,
    newOwnerName,
  }: {
    confirmed: boolean;
    newOwnerName?: string;
  }) => {
    if (confirmed === true && targetGroup && newOwnerName) {
      const result = await changeGroupOwner({
        groupId: targetGroup?.id,
        newOwnerName,
      });
      if (result) {
        setErrorMsg(result?.message);
      } else {
        await fetchMyGroups();
        toast.info("You have successfully change group owner.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
        });
        setIsOwnerChangeModalOpen(false);
      }
    } else {
      setErrorMsg(undefined);
      setIsOwnerChangeModalOpen(false);
    }
  };

  const onOnwerChangeAndLeaveConfirm = async ({
    confirmed,
    newOwnerName,
  }: {
    confirmed: boolean;
    newOwnerName?: string;
  }) => {
    if (confirmed === true && targetGroup && newOwnerName) {
      const result = await changeOwnerAndLeaveGroup({
        groupId: targetGroup?.id,
        newOwnerName,
      });
      if (result) {
        setErrorMsg(result?.message);
      } else {
        await fetchMyGroups();
        toast.info("You have successfully left the group.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
        });
        setIsOwnerChangeAndLeaveModalOpen(false);
      }
    } else {
      setErrorMsg(undefined);
      setIsOwnerChangeAndLeaveModalOpen(false);
    }
  };

  const onLeaveConfirm = async (confirmed: boolean) => {
    if (confirmed === true) {
      if (targetGroup?.ownerId === currentUserId) {
        setIsOwnerChangeAndLeaveModalOpen(true);
      } else {
        try {
          if (targetGroup) {
            await leaveGroup(targetGroup?.id);
            await fetchMyGroups();
            toast.info("You have successfully left the group.", {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: true,
              theme: "colored",
            });
          }
        } catch (error) {
          console.error("error leaving group:", error);
        }
      }
    }

    setIsLeaveModalOpen(false);
  };

  const onDeleteConfirm = async (confirmed: boolean) => {
    if (confirmed === true) {
      try {
        if (targetGroup) {
          await deleteGroup(targetGroup?.id);
          await fetchMyGroups();
          toast.info("You have successfully deleted the group.", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            theme: "colored",
          });
        }
      } catch (error) {
        console.error("error deleting group:", error);
      }
    }

    setIsDeleteModalOpen(false);
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
          <div className="flex gap-1">
            {group.ownerId === currentUserId && (
              <>
                <button
                  onClick={() => {
                    setIsOwnerChangeModalOpen(true);
                    setTargetGroup(group);
                  }}
                  className="bg-amber-400 px-2 rounded-md font-bold text-base">
                  change owner
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setTargetGroup(group);
                  }}
                  className="bg-red-400 px-2 rounded-md font-bold text-base">
                  delete
                </button>
              </>
            )}
            <button
              onClick={() => {
                setIsLeaveModalOpen(true);
                setTargetGroup(group);
              }}
              className="bg-blue-500 px-2 rounded-md font-bold text-base">
              leave
            </button>
          </div>
        </div>
      ))}
      {isLeaveModalOpen && (
        <ConfirmModal
          message={`Do you really want to leave the ${targetGroup?.name} group?`}
          onConfirm={onLeaveConfirm}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          message={`Do you really want to delete the ${targetGroup?.name} group? All memos in the group will be permanently deleted.`}
          onConfirm={onDeleteConfirm}
          className="h-64"
        />
      )}
      {isOwnerChangeAndLeaveModalOpen && (
        <ChangeOwnerModal
          onConfirm={onOnwerChangeAndLeaveConfirm}
          message="You are the owner of this group. To leave, you need to transfer the owner role to another member. Please enter the name of the member to whom you want to transfer the owner role."
          errorMsg={errorMsg}
        />
      )}
      {isOwnerChangeModalOpen && (
        <ChangeOwnerModal
          onConfirm={onOnwerChangeConfirm}
          message="Enter the name of the member to whom you want to transfer the owner role."
          errorMsg={errorMsg}
          className="h-[340px]"
        />
      )}
    </div>
  );
}
