import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

type StatusColor = { label: string; color: "green" | "violet" | "red" };

const statusMap: Record<Status, StatusColor> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const StatusBadge = ({ status }: { status: Status }) => {
  const { label, color } = statusMap[status];
  return <Badge color={color}>{label}</Badge>;
};

export default StatusBadge;
