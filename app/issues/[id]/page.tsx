import { updateIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import "easymde/dist/easymde.min.css";
import { notFound } from "next/navigation";
import { z } from "zod";

type UpdateIssueForm = z.infer<typeof updateIssueSchema>;

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  if (Number.isNaN(parseInt(params.id))) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <form className="max-w-xl space-y-3">
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <div>{issue.status}</div>
      <div>{issue.createdAt.toLocaleDateString()}</div>
    </form>
  );
};

export default IssueDetailPage;
