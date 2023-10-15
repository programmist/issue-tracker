"use client";

import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import IssueFormLoadingPage from "../_components/IssueFormLoadingPage";
/**
 * Empty wrapper component does two things.
 * 1. Dynamically loads <IssueFormLoadingPage> component because it
 *    mounts <SimpleMDE> which is not SSR-compatible.
 * 2. Loads the entire <form> dynamically so that loading skeletons can
 *    be applied uniformly. Trying to dynamically load just SimpleMDE
 *    and relying on default loading.tsx behavior caused loading skeletons
 *    only to apply to the SimpleMDE component and not the Title input,
 *    which looked bad.
 */
const IssueForm = dynamic(
  async () => import("@/app/issues/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormLoadingPage />,
  },
);

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
