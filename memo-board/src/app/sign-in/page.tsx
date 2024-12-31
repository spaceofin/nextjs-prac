"use client";

import { useForm } from "react-hook-form";
import { signInWithGithub, signInWithCredentials } from "../actions.ts/sign-in";

import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../components/back-button";
import {
  EmailSignInFormSchema,
  EmailSignInFormType,
} from "../validation/auth-schema";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmailSignInFormType>({
    resolver: zodResolver(EmailSignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: EmailSignInFormType) => {
    const response = await signInWithCredentials({
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      setError("root", {
        message: response.message,
      });
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="flex flex-col items-end gap-1">
        <BackButton />
        <div className="flex flex-col w-96 h-[400px] bg-gray-100 border-2 border-gray-500 rounded-md px-10 justify-center gap-2 font-sans">
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
            </fieldset>
            {errors.root?.message && (
              <span className="text-red-500 text-sm pl-1">
                {errors.root.message}
              </span>
            )}
            <button
              type="submit"
              className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 mt-6 text-lg">
              Sign in
            </button>
          </form>
          <form action={signInWithGithub}>
            <button className="w-full bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-900 mt-2 text-lg">
              Sign in with Github
            </button>
          </form>
          <div className="flex justify-center my-1 text-gray-700">
            Don't have an account?
            <Link href="/sign-up" className="ml-2 underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
