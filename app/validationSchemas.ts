import { z } from "zod";

// TODO: Try to make these more DRY
export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required"),
});

export const updateIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required"),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});
