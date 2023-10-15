import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import IssueFormLoadingPage from "../../_components/IssueFormLoadingPage";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const IssueForm = dynamic(
  async () => import("@/app/issues/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormLoadingPage />,
  },
);

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  if (Number.isNaN(parseInt(params.id))) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
