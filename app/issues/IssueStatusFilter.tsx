"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import "@/string.extensions";

var statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  ...Object.values(Status).map((status) => ({
    label: status.titleCase(),
    value: status,
  })),
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterByStatus = (status: string) => {
    const params = new URLSearchParams(
      Array.from(searchParams.entries()).filter(([key]) => key !== "status"),
    );

    if (status !== "ALL") params.append("status", status);

    const query = params.size > 0 ? `?${params}` : "";
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get("status") ?? ""}
      onValueChange={filterByStatus}
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
