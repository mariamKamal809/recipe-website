"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRecipeById } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useToast } from "@/components/ToastProvider";
import { useFavorites } from "@/components/FavoritesProvider";
import StarRating from "@/components/StarRating";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";
import {
    HeartIcon,
    ClockIcon,
    FireIcon,
    PersonIcon,
    ChevronRight,
} from "@/components/icons";

export default function RecipeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    const { showError } = useToast();
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const data = await getRecipeById(id);
                setRecipe(data);
            } catch {
                showError("Couldn't load this recipe's details.");
            } finally {
                setLoading(false);
            }
        };
        if (!Number.isNaN(id)) fetchRecipe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return (
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-2xl mx-auto">
                    <RecipeCardSkeleton />
                </div>
            </main>
        );
    }

    if (!recipe) {
        return (
            <main className="max-w-5xl mx-auto px-4 py-20 text-center">
                <p className="text-lg font-medium text-[var(--color-navy)]">
                    Recipe not found
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="mt-4 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--color-terracotta)] text-white"
                >
                    Back to home
                </button>
            </main>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
                onClick={() => router.push("/")}
                className="flex items-center gap-1.5 text-sm font-medium mb-8 text-[var(--color-navy)] hover:opacity-70 transition-opacity"
            >
                <span className="rotate-180 inline-block">
                    <ChevronRight />
                </span>
                Back to recipes
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                <div className="lg:col-span-3 flex flex-col gap-5">
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{ aspectRatio: "16/10" }}
                    >
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-full object-cover bg-[var(--color-muted-bg)]"
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            {
                                icon: <ClockIcon color="#d4734a" />,
                                label: "Prep time",
                                value: `${recipe.prepTimeMinutes} min`,
                            },
                            {
                                icon: <ClockIcon color="#7a9e7e" />,
                                label: "Cook time",
                                value: `${recipe.cookTimeMinutes} min`,
                            },
                            {
                                icon: <PersonIcon />,
                                label: "Servings",
                                value: recipe.servings,
                            },
                            {
                                icon: <FireIcon />,
                                label: "Calories",
                                value: `${recipe.caloriesPerServing} kcal`,
                            },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center justify-center py-4 rounded-2xl gap-2 bg-[var(--color-card)] border border-[var(--color-border)]"
                            >
                                {stat.icon}
                                <span className="text-xs font-medium text-[var(--color-warmgray)]">
                                    {stat.label}
                                </span>
                                <span className="text-sm font-semibold text-[var(--color-navy)]">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-2xl p-6 bg-[var(--color-card)] border border-[var(--color-border)]">
                        <h3 className="text-lg font-semibold mb-4 text-[var(--color-navy)] font-[family-name:var(--font-serif)]">
                            Ingredients
                        </h3>
                        <ul className="space-y-2 text-sm text-[var(--color-navy)]">
                            {recipe.ingredients.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-5">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-warmgray)] mb-1">
                                {recipe.cuisine} · {recipe.mealType.join(" / ")}
                            </p>
                            <h1 className="text-2xl sm:text-3xl font-normal text-[var(--color-navy)] font-[family-name:var(--font-serif)]">
                                {recipe.name}
                            </h1>
                            <div className="mt-2 flex items-center gap-2">
                                <StarRating rating={recipe.rating} />
                                <span className="text-xs text-[var(--color-warmgray)]">
                                    ({recipe.reviewCount} reviews)
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleFavorite(recipe.id)}
                            className="w-11 h-11 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center shrink-0"
                            aria-label={
                                isFavorite(recipe.id)
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                        >
                            <HeartIcon
                                filled={isFavorite(recipe.id)}
                                size={20}
                            />
                        </button>
                    </div>

                    <div className="rounded-2xl p-6 bg-[var(--color-card)] border border-[var(--color-border)]">
                        <h3 className="text-lg font-semibold mb-4 text-[var(--color-navy)] font-[family-name:var(--font-serif)]">
                            Instructions
                        </h3>
                        <ol className="space-y-4 text-sm text-[var(--color-navy)]">
                            {recipe.instructions.map((step, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[var(--color-terracotta)]/15 text-[var(--color-terracotta)]">
                                        {i + 1}
                                    </span>
                                    <span className="pt-0.5">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </main>
    );
}
