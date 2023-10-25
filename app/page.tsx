import Pagination from "./components/Pagination";

export default function Home({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  const currentPage = page ? parseInt(page) : 1;
  return <Pagination itemCount={100} pageSize={10} currentPage={currentPage} />;
}
