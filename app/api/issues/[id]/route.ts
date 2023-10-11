import { NextRequest, NextResponse } from "next/server";
import { updateIssueSchema } from "../schemas";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  const valid = updateIssueSchema.safeParse(body);

  if (!valid.success) {
    return NextResponse.json({ error: valid.error.errors }, { status: 400 });
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
