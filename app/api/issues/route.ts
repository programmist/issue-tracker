import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "./schemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const valid = createIssueSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json({ error: valid.error.format() }, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
