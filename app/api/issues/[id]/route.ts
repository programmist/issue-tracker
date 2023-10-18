import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

/**
 * Get an Issue
 */
export async function GET(request: NextRequest, { params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  return NextResponse.json(issue);
}

/**
 * Patch an Issue
 */
export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  const valid = issueSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json({ error: valid.error.format() }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });
  return NextResponse.json(updatedIssue);
}

/**
 * Delete an Issue
 */
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  await prisma.issue.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({});
}
