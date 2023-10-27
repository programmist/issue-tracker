"use client";

import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const IssueStatusSelector = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const changeStatus = (status: Status) => {
    axios
      .patch(`/api/issues/${issue.id}`, { status })
      .then(() => router.refresh())
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };
  return (
    <Select.Root value={issue.status} onValueChange={changeStatus}>
      <Select.Trigger
        placeholder="Status"
        // className="!shadow-none !outline-none"
      />
      <Select.Content color="gray">
        {Object.values(Status).map((status) => (
          <Select.Item key={status} value={status}>
            <IssueStatusBadge status={status} />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusSelector;
