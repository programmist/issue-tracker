import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(
  async () => import("@/app/issues/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  },
);

// TODO: There is a flash of the loading skeleton from the parent route (/issues)
//       before this loading skeleton is shown. I believe this is related to the
//       Github issue below. Mosh reorganizes his code to work-around this, but I
//       don't think it's worth the disorganization it causes.
//       Also, same thing happens with edit issue page.
//       https://github.com/vercel/next.js/issues/56344
const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
