import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const IssueFormLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" className="mb-2" />
      <Skeleton height="23rem" />
    </Box>
  );
};

export default IssueFormLoadingPage;