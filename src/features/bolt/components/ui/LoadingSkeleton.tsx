export function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-3.5 animate-pulse">
      <div className="h-3 bg-border rounded w-3/4 mb-3" />
      <div className="h-2 bg-border rounded w-1/2 mb-2" />
      <div className="h-2 bg-border rounded w-2/3" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-card border border-border rounded-lg animate-pulse">
      <div className="flex gap-4 px-4 py-3 border-b border-border">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-3 bg-border rounded w-20" />
        ))}
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 px-4 py-3 border-b border-border">
          {[1, 2, 3, 4, 5].map((j) => (
            <div key={j} className="h-3 bg-border rounded w-24" />
          ))}
        </div>
      ))}
    </div>
  );
}
