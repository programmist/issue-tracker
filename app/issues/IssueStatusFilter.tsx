"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

// const statuses: { label: string; value?: Status }[] = [
//   { label: "All" },
//   { label: "Open", value: Status.OPEN },
//   { label: "Closed", value: Status.CLOSED },
//   { label: "In Progress", value: Status.IN_PROGRESS },
// ];

var titleCase = (str: string) =>
  str
    .split("_")
    .reduce((acc, frag) => {
      return acc + " " + frag[0] + frag.toLowerCase().slice(1);
    }, "")
    .trim();

var statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  ...Object.values(Status).map((status) => ({
    label: titleCase(status),
    value: status,
  })),
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") ?? ""}
      onValueChange={(status) => {
        const query = status === "ALL" ? "" : `?status=${status}`;
        router.push(`/issues${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map(({ label, value }) => (
          <Select.Item key={label} value={value ?? "ALL"}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
