import prisma from "@/prisma/client";
import IssueSummary from "./dashboard/IssueSummary";
import IssueChart from "./dashboard/IssueChart";
import LatestIssues from "./dashboard/LatestIssues";

export default async function Home({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
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

  /**
   * Dashboard
   * - Top: Summary of issues
   * - Middle: Chart
   * - Right Side: Latest Issues
   */

  return (
    <>
      <LatestIssues />
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
