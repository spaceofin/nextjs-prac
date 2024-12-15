"use client";

import { useForm } from "react-hook-form";
import { signIn } from "../api/auth/sign-in";
import BackButton from "../components/back-button";

type EmailSignInFormType = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSignInFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: EmailSignInFormType) => {
    console.log(data);
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
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters",
                    },
                  })}
                  className="border p-1 rounded"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm pl-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </fieldset>
            <button
              type="submit"
              className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 mt-6 text-lg">
              Sign in
            </button>
          </form>
          <form action={signIn}>
            <button className="w-full bg-slate-700 text-white py-2 px-4 rounded hover:bg-slate-900 mt-2 text-lg">
              Sign in with Github
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
