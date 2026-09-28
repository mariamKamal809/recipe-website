import Link from "next/link";
import { RecipeCardProps } from "@/types/recipe";
import { HeartIcon, ClockIcon, FireIcon } from "./icons";
import StarRating from "./StarRating";

const DIFFICULTY_COLOR: Record<string, string> = {
    Easy: "#7a9e7e",
    Medium: "#d4734a",
    Hard: "#2d3a4a",
};

export default function RecipeCard({
    recipe,
    isFavorite,
    onToggleFavorite,
}: RecipeCardProps) {
    const diffColor = DIFFICULTY_COLOR[recipe.difficulty] ?? "#2d3a4a";

    return (
        <article className="group flex flex-col rounded-2xl overflow-hidden bg-[var(--color-card)] shadow-[0_2px_12px_rgba(30,42,58,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
            >
                <Link href={`/recipes/${recipe.id}`}>
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-[var(--color-muted-bg)]"
                    />
                </Link>
                <button
                    onClick={() => onToggleFavorite(recipe.id)}
                    aria-label={
                        isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow hover:scale-110 active:scale-95 transition-transform"
                >
                    <HeartIcon filled={isFavorite} />
                </button>
                <div
                    className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90"
                    style={{ color: diffColor }}
                >
                    {recipe.difficulty}
                </div>
            </div>

            <Link
                href={`/recipes/${recipe.id}`}
                className="flex flex-col gap-2 p-4 flex-1"
            >
                <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-warmgray)]">
                    {recipe.cuisine} · {recipe.mealType[0]}
                </p>
                <h3 className="font-semibold leading-snug line-clamp-2 text-[15px] text-[var(--color-navy)] font-[family-name:var(--font-serif)]">
                    {recipe.name}
                </h3>
                <div className="flex items-center gap-2">
                    <StarRating rating={recipe.rating} />
                    <span className="text-xs text-[var(--color-warmgray)]">
                        ({recipe.reviewCount})
                    </span>
                </div>
                <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-[var(--color-warmgray)]">
                    <span className="flex items-center gap-1">
                        <ClockIcon />{" "}
                        {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                    </span>
                    <span className="flex items-center gap-1">
                        <FireIcon /> {recipe.caloriesPerServing} kcal
                    </span>
                </div>
            </Link>
        </article>
    );
}
