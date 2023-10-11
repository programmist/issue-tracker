import { z } from "zod";

/*
 * Note: In more complex applications there will be
 * different schemas for different CRUD operations
 */

export const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export const updateIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});
