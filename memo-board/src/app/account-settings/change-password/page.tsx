"use client";

import BackButton from "@/app/components/back-button";
import { changePassword } from "@/app/service/account-service";
import {
  PasswordChangeSchema,
  PasswordChangeSchemaType,
} from "@/app/validation/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ChangePasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordChangeSchemaType>({
    resolver: zodResolver(PasswordChangeSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: PasswordChangeSchemaType) => {
    const response = await changePassword({
      currentPassword: data.currentPassword,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });

    if (response?.error) {
      setError("root", {
        message: response.message,
      });
    } else {
      toast.info("Password Changed successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
      });
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex w-[500px] justify-end mb-2">
        <BackButton />
      </div>
      <div className="flex flex-col justify-between w-[500px] h-[350px] bg-gray-200 rounded-md px-10 py-8 text-lg font-mono">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col h-full justify-between">
          <fieldset disabled={isSubmitting} className="px-2">
            <div className="flex flex-col">
              <label htmlFor="currentPassword" className="pl-1">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                {...register("currentPassword")}
                className="border p-1 rounded text-base"
              />
              {errors.currentPassword && (
                <span className="text-red-500 text-sm pl-1">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="newPassword" className="pl-1">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("password")}
                className="border p-1 rounded text-base"
              />
              {errors.password && (
                <span className="text-red-500 text-sm pl-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="newPasswordConfirm" className="pl-1">
                New Password Confirm
              </label>
              <input
                id="newPasswordConfirm"
                type="password"
                {...register("passwordConfirm")}
                className="border p-1 rounded text-base"
              />
              {errors.passwordConfirm && (
                <span className="text-red-500 text-sm pl-1">
                  {errors.passwordConfirm.message}
                </span>
              )}
            </div>
            <span className="text-red-500 text-sm pl-1">
              {errors.root && errors.root.message}
            </span>
          </fieldset>
          <button
            type="submit"
            className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 mt-1 text-xl">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
