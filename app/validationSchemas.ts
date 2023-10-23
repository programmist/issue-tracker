import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required")
    .max(65535, "Description must be less than 255 characters"),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .optional(),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required")
    .max(65535, "Description must be less than 255 characters")
    .optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
