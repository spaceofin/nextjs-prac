import { z } from "zod";

export const EmailSignInFormSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
});

export const PasswordMatchSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(4, "Password must be at least 4 characters"),
    passwordConfirm: z.string().min(1, "PasswordConfirm is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Password do not match",
      });
    }
  });

export const PasswordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Password is required"),
  })
  .and(PasswordMatchSchema);

export const EmailSignUpFormSchema = z
  .object({
    email: z.string().email("Enter a valid email").min(1, "Email is required"),
    userName: z.string().min(1, "UserName is required"),
  })
  .and(PasswordMatchSchema);

export type EmailSignInFormType = z.infer<typeof EmailSignInFormSchema>;
export type EmailSignUpFormType = z.infer<typeof EmailSignUpFormSchema>;
export type PasswordChangeSchemaType = z.infer<typeof PasswordChangeSchema>;
