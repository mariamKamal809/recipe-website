"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecipeById } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";
import { useToast } from "@/components/ToastProvider";
import { useFavorites } from "@/components/FavoritesProvider";

export default function FavoritesPage() {
    const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    const { showError } = useToast();
    const router = useRouter();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (favoriteIds.length === 0) {
                setRecipes([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const results = await Promise.all(
                    favoriteIds.map((id) => getRecipeById(id)),
                );
                setRecipes(results);
            } catch {
                showError("Couldn't load your favorite recipes.");
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favoriteIds]);

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-end justify-between mb-8">
                <h1 className="text-2xl sm:text-3xl font-normal text-[var(--color-navy)] font-[family-name:var(--font-serif)]">
                    Favorites
                </h1>
                <span className="text-sm text-[var(--color-warmgray)]">
                    {recipes.length}{" "}
                    {recipes.length === 1 ? "recipe" : "recipes"}
                </span>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <RecipeCardSkeleton key={i} />
                    ))}
                </div>
            ) : recipes.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-4xl mb-3">🤍</p>
                    <p className="text-lg font-medium mb-1 text-[var(--color-navy)]">
                        You haven&apos;t saved any favorites yet.
                    </p>
                    <p className="text-sm text-[var(--color-warmgray)] mb-4">
                        Tap the heart on any recipe you like to save it.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--color-terracotta)] text-white"
                    >
                        Browse recipes
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={isFavorite(recipe.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
