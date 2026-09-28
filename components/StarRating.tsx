import { StarIcon } from "./icons";

export default function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < rounded} />
      ))}
      <span className="text-xs text-[var(--color-warmgray)] ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
