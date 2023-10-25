import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import classNames from "classnames";
import NextLink from "next/link";
import IssuesToolbar from "./IssuesToolbar";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sortOrder: "asc" | "desc";
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
  ];

  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columns.map((col) => col.value).includes(searchParams.orderBy)
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
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface">
        <Table.Header className="text-center md:text-left">
          <Table.Row>
            {columns.map((column, idx) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={classNames({
                  "hidden md:table-cell": idx > 0,
                })}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      sortOrder:
                        searchParams.sortOrder === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <>
                    {searchParams.sortOrder === "desc" ? (
                      <TriangleDownIcon className="inline" />
                    ) : (
                      <TriangleUpIcon className="inline" />
                    )}
                  </>
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id} className="text-center  md:text-left">
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </div>
  );
};

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// Force dynamic rendering
export const dynamic = "force-dynamic";

// Force revalidate cache every 0 seconds (same effect)
export const revalidte = 0;

export default IssuesPage;
