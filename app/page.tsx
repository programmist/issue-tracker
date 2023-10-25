import LatestIssues from "./dashboard/LatestIssues";

export default function Home({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  /**
   * Dashboard
   * - Top: Summary of issues
   * - Middle: Chart
   * - Right Side: Latest Issues
   */

  return <LatestIssues />;
}
