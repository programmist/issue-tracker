import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const issueSummaryCards: { label: string; value: number; status: Status }[] =
    [
      { label: "Open Issues", value: open, status: "OPEN" },
      { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
      { label: "Closed Issues", value: closed, status: "CLOSED" },
    ];

  return (
    <Flex gap="4">
      {issueSummaryCards.map((card) => (
        <Card key={card.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${card.status}`}
            >
              {card.label}
            </Link>
            <Text size="5" className="font-bold">
              {card.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
