import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({
  page,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const buttonClassName =
    "rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50";
  const disabledClassName =
    "cursor-not-allowed rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-4"
    >
      {page <= 1 ? (
        <span aria-disabled="true" className={disabledClassName}>
          Previous
        </span>
      ) : (
        <Link href={`${basePath}?page=${page - 1}`} className={buttonClassName}>
          Previous
        </Link>
      )}
      <p className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </p>
      {page >= totalPages ? (
        <span aria-disabled="true" className={disabledClassName}>
          Next
        </span>
      ) : (
        <Link href={`${basePath}?page=${page + 1}`} className={buttonClassName}>
          Next
        </Link>
      )}
    </nav>
  );
}