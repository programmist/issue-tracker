import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  if (Number.isNaN(parseInt(params.id))) notFound();

  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  // Media Query Note: Radix "md" == Tailwind "lg" (ugh)
  // Media Query Note (tablets): Radix "sm" == Tailwind "md" (ugh)
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className="col-span-1">
          <Flex direction="column" gap="4">
            <AssigneeSelect />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
