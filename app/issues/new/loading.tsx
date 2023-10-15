import { Box, TextField } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssueLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" className="mb-2" />
      <Skeleton height="23rem" />
    </Box>
  );
};

export default NewIssueLoadingPage;
