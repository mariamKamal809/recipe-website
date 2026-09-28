export default function RecipeCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-[var(--color-card)] shadow-[0_2px_12px_rgba(30,42,58,0.06)]">
      <div
        className="animate-pulse bg-[var(--color-muted-bg)]"
        style={{ aspectRatio: "4/3" }}
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-2.5 w-1/3 rounded bg-[var(--color-muted-bg)] animate-pulse" />
        <div className="h-4 w-4/5 rounded bg-[var(--color-muted-bg)] animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-[var(--color-muted-bg)] animate-pulse" />
        <div className="h-3 w-1/4 rounded bg-[var(--color-muted-bg)] animate-pulse" />
      </div>
    </div>
  );
}
