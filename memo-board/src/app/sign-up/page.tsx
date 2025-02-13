"use client";

import { useForm } from "react-hook-form";
import { signInWithGithub } from "../actions/sign-in";

import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../components/back-button";
import {
  EmailSignUpFormSchema,
  EmailSignUpFormType,
} from "../validation/auth-schema";
import { signUpWithCredentials } from "../actions/sign-up";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmailSignUpFormType>({
    resolver: zodResolver(EmailSignUpFormSchema),
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: EmailSignUpFormType) => {
    const response = await signUpWithCredentials({
      email: data.email,
      userName: data.userName,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });

    if (response?.error) {
      setError("root", {
        message: response.message,
      });
    } else {
      toast.success("Signed up successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "colored",
      });
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-col items-end gap-1">
        <BackButton />
        <div className="flex flex-col w-96 h-[550px] bg-gray-100 border-2 border-gray-500 rounded-md px-10 justify-center gap-2 font-sans">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col">
            <fieldset disabled={isSubmitting}>
              <div className="flex flex-col">
                <label htmlFor="email" className="pl-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="border p-1 rounded"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm pl-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="userName" className="pl-1">
                  UserName
                </label>
                <input
                  id="userName"
                  type="text"
                  {...register("userName")}
                  className="border p-1 rounded"
                />
                {errors.userName && (
                  <span className="text-red-500 text-sm pl-1">
                    {errors.userName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="pl-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="border p-1 rounded"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm pl-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="passwordConfirm" className="pl-1">
                  PasswordConfirm
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  {...register("passwordConfirm")}
                  className="border p-1 rounded"
                />
                {errors.passwordConfirm && (
                  <span className="text-red-500 text-sm pl-1">
                    {errors.passwordConfirm.message}
                  </span>
                )}
              </div>
              {errors.root?.message && (
                <span className="text-red-500 text-sm pl-1">
                  {errors.root.message}
                </span>
              )}
            </fieldset>
            <button
              type="submit"
              className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 mt-6 text-lg">
              Sign up
            </button>
          </form>
          <form action={signInWithGithub}>
            <button className="w-full bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-900 mt-2 text-lg">
              Sign up with Github
            </button>
          </form>
          <div className="flex justify-center my-1 text-gray-700">
            Already have an account?
            <Link href="/sign-in" className="ml-2 underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
