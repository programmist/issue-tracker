import { NextRequest, NextResponse } from "next/server";
import { updateIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  // TODO: handle not found
  return NextResponse.json(issue);
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  const valid = updateIssueSchema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json({ error: valid.error.format() }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
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
