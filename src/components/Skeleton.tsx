export function MaterialCardSkeleton() {
  return (
    <div className="surface-card overflow-hidden">
      <div className="skeleton aspect-[9/16] w-full" />
      <div className="space-y-2 p-4">
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
      </div>
    </div>
  );
}

export function PageSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <MaterialCardSkeleton key={i} />
      ))}
    </div>
  );
}
