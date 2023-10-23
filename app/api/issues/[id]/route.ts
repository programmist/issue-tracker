import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";

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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const valid = patchIssueSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json({ error: valid.error.format() }, { status: 400 });
  }

  const { assignedToUserId, title, description, status } = body;

  // Validate that assignedToUserId is a valid user ID
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }
  }

  // Validate that id is a valid Issue ID
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  // Update Issue
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: { title, description, status, assignedToUserId },
  });
  return NextResponse.json(updatedIssue);
}

/**
 * Delete an Issue
 */
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  }

  await prisma.issue.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({});
}
