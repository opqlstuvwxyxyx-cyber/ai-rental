import { PageSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="page-header">
        <div className="skeleton mb-2 h-3 w-20" />
        <div className="skeleton mb-2 h-8 w-48" />
        <div className="skeleton h-4 w-32" />
      </div>
      <PageSkeleton count={10} />
    </div>
  );
}
