import { Issue, Status } from "@prisma/client";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Link, Table } from "@radix-ui/themes";
import classNames from "classnames";
import NextLink from "next/link";
import { IssueStatusBadge } from "../components";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sortOrder: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  return (
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
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toLocaleDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status" },
  { label: "Created", value: "createdAt" },
];

export const columnNames = columns.map((col) => col.value);

export default IssueTable;
