import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./dashboard/IssueChart";
import IssueSummary from "./dashboard/IssueSummary";
import LatestIssues from "./dashboard/LatestIssues";

export default async function Home() {
  const [open, inProgress, closed] = await prisma.$transaction([
    prisma.issue.count({
      where: {
        status: "OPEN",
      },
    }),
    prisma.issue.count({
      where: {
        status: "IN_PROGRESS",
      },
    }),
    prisma.issue.count({
      where: {
        status: "CLOSED",
      },
    }),
  ]);

  const issueStatusProps = { open, inProgress, closed };

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5" width="auto">
        <Flex direction="column" gap="5">
          <IssueSummary {...issueStatusProps} />
          <IssueChart {...issueStatusProps} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
}
