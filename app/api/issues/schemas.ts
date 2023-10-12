import { z } from "zod";

/*
 * Note: In more complex applications there will be
 * different schemas for different CRUD operations
 */

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
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});
