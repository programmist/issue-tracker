import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusBadge from "@/app/components/IssueStatusBadge";
import delay from "delay";
import IssuesToolbar from "./IssuesToolbar";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  // FIXME: Remove after testing
  await delay(2000);

  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface">
        <Table.Header className="text-center md:text-left">
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id} className="text-center  md:text-left">
              <Table.Cell>
                {issue.title}
                <div className="block md:hidden">
                  <StatusBadge status={issue.status}></StatusBadge>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={issue.status}></StatusBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
