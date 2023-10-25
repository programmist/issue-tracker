import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import IssuesToolbar from "./IssuesToolbar";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? searchParams.orderBy
    : "title";

  const sortOrder = ["asc", "desc"].includes(searchParams.sortOrder)
    ? searchParams.sortOrder
    : "asc";

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: {
      [orderBy]: sortOrder,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssuesToolbar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// Force dynamic rendering
export const dynamic = "force-dynamic";

const title = "Issue Tracker - Issue List";
const description = "View all project issues";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default IssuesPage;
