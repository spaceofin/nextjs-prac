import { z } from "zod";
import { todoCategories, todoPriorities } from "./constants";

const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

export const todoSchema = z
  .object({
    task: z.string().min(1, { message: "Task is required" }),
    category: z.enum(todoCategories, {
      message: "Select the correct category",
    }),
    priority: z.enum(todoPriorities, {
      message: "Select the correct priority",
    }),
    dates: z.object({
      startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Date needs to contain a valid date",
      }),
      startTime: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (val) return timePattern.test(val);
            return true;
          },
          {
            message: "Time needs to be in HH:mm format",
          }
        ),
      endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Date needs to contain a valid date",
      }),
      endTime: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (val) return timePattern.test(val);
            return true;
          },
          {
            message: "Time needs to be in HH:mm format",
          }
        ),
      dateOnly: z.boolean(),
    }),
    memo: z.string().optional(),
  })
  .superRefine(({ dates }, ctx) => {
    if (!dates.dateOnly && (dates.startTime === "" || dates.endTime === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Time is required",
        fatal: true,
        path: ["dates.dateOnly"],
      });
    }
  });

// export type TodoType = z.infer<typeof todoSchema>;
