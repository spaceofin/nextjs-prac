import { z } from "zod";

export const EmailSignInFormSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
});

export type EmailSignInFormType = z.infer<typeof EmailSignInFormSchema>;
