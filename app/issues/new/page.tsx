"use client";

import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import NewIssueLoadingPage from "./loading";
/**
 * Empty wrapper component does two things.
 * 1. Dynamically loads <NewIssueLoadingPage> component because it
 *    mounts <SimpleMDE>m which is not SSR-compatible.
 * 2. Loads the entire <form> dynamically so that loading skeletons can
 *    be applied uniformly. Trying to dynamically load just SimpleMDE
 *    and relying on default loading.tsx behavior caused loading skeletons
 *    only to apply to the SimpleMDE component and not the Title input,
 *    which looked bad.
 */
const NewIssueForm = dynamic(async () => import("./NewIssueForm"), {
  ssr: false,
  loading: () => <NewIssueLoadingPage />,
});

const NewIssuePage = () => {
  return <NewIssueForm />;
};

export default NewIssuePage;
