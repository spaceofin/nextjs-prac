import { z } from "zod";

export const GroupCreateFormSchema = z.object({
  name: z
    .string()
    .min(2, "Group name must be at least 2 characters")
    .max(50, "Group name must contain at most 50 characters"),
  description: z
    .string()
    .max(200, "Group description must contain at most 200 characters")
    .optional(),
});

export type GroupCreateFormType = z.infer<typeof GroupCreateFormSchema>;
