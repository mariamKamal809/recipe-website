"use client";

import { useEffect, useState } from "react";
import {
    getRecipes,
    searchRecipes,
    getRecipesByTag,
    getRecipesByMealType,
} from "@/services/recipeService";
import { Recipe, Category } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";
import Pagination from "@/components/Pagination";
import CategoryChips, { CATEGORIES } from "@/components/CategoryChips";
import SortSelect, { SortValue } from "@/components/SortSelect";
import RandomRecipeButton from "@/components/RandomRecipeButton";
import { SearchIcon } from "@/components/icons";
import { useToast } from "@/components/ToastProvider";
import { useFavorites } from "@/components/FavoritesProvider";

const PAGE_SIZE = 10;

export default function HomePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("");

    const [activeCategory, setActiveCategory] = useState<Category>(
        CATEGORIES[0],
    );

    const [sortKey, setSortKey] = useState("default");
    const [sort, setSort] = useState<SortValue>({});

    const [loading, setLoading] = useState(true);

    const { showError } = useToast();
    const { isFavorite, toggleFavorite } = useFavorites();

    // Debounce the search input.
    useEffect(() => {
        const timer = setTimeout(() => {
            setQuery(searchInput.trim());
            setPage(1);
            if (searchInput.trim()) setActiveCategory(CATEGORIES[0]); // Searching resets the category.
        }, 300);
        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => {
        const skip = (page - 1) * PAGE_SIZE;

        const fetchData = async () => {
            setLoading(true);
            try {
                let data;
                if (query) {
                    data = await searchRecipes({
                        q: query,
                        limit: PAGE_SIZE,
                        skip,
                        ...sort,
                    });
                } else if (
                    activeCategory.id !== "all" &&
                    activeCategory.kind === "meal"
                ) {
                    data = await getRecipesByMealType(activeCategory.id, {
                        limit: PAGE_SIZE,
                        skip,
                        ...sort,
                    });
                } else if (
                    activeCategory.id !== "all" &&
                    activeCategory.kind === "tag"
                ) {
                    data = await getRecipesByTag(activeCategory.id, {
                        limit: PAGE_SIZE,
                        skip,
                        ...sort,
                    });
                } else {
                    data = await getRecipes({
                        limit: PAGE_SIZE,
                        skip,
                        ...sort,
                    });
                }
                setRecipes(data.recipes);
                setTotal(data.total);
            } catch {
                showError(
                    "Something went wrong while loading recipes. Please try again.",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, query, activeCategory, sort]);

    const handleSelectCategory = (cat: Category) => {
        setActiveCategory(cat);
        setSearchInput("");
        setQuery("");
        setPage(1);
    };

    const handleSortChange = (key: string, value: SortValue) => {
        setSortKey(key);
        setSort(value);
        setPage(1);
    };

    const clearAll = () => {
        setSearchInput("");
        setQuery("");
        setActiveCategory(CATEGORIES[0]);
        setSortKey("default");
        setSort({});
        setPage(1);
    };

    const totalPages = Math.ceil(total / PAGE_SIZE);
    const hasActiveFilters = query !== "" || activeCategory.id !== "all";

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden bg-[var(--color-muted-bg)] border-b border-black/5">
                <div
                    className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-25 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, #d4734a50 0%, transparent 70%)",
                        transform: "translate(-35%, -35%)",
                    }}
                />
                <div
                    className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-15 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, #7a9e7e60 0%, transparent 70%)",
                        transform: "translate(35%, 35%)",
                    }}
                />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
                    <span className="text-xs font-semibold uppercase tracking-widest mb-5 px-3 py-1.5 rounded-full bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)]">
                        Fresh recipes every day
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-5 max-w-2xl text-[var(--color-navy)] font-[family-name:var(--font-serif)]">
                        Discover{" "}
                        <em className="text-[var(--color-terracotta)] not-italic">
                            delicious
                        </em>{" "}
                        recipes
                    </h1>
                    <p className="text-base sm:text-lg mb-8 max-w-md text-[var(--color-warmgray)]">
                        Find the perfect recipe for every moment and every
                        taste.
                    </p>

                    <div className="w-full max-w-xl flex flex-col gap-3">
                        <div className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[var(--color-card)] border-[1.5px] border-[var(--color-border)] shadow-[0_4px_24px_rgba(30,42,58,0.08)]">
                            <SearchIcon />
                            <input
                                type="text"
                                placeholder="Search recipes, ingredients, or cuisines..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-sm text-[var(--color-navy)]"
                            />
                            {searchInput && (
                                <button
                                    onClick={() => setSearchInput("")}
                                    className="text-[var(--color-warmgray)] hover:text-[var(--color-navy)] text-lg"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <SortSelect
                                activeKey={sortKey}
                                onChange={handleSortChange}
                            />
                            <RandomRecipeButton />
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAll}
                                    className="text-xs font-medium underline text-[var(--color-warmgray)]"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="py-7">
                    <CategoryChips
                        active={activeCategory.id}
                        onSelect={handleSelectCategory}
                    />
                </section>

                <section className="pb-12">
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-2xl sm:text-3xl font-normal text-[var(--color-navy)] font-[family-name:var(--font-serif)]">
                            {query
                                ? "Search results"
                                : activeCategory.id !== "all"
                                  ? activeCategory.label
                                  : "All recipes"}
                        </h2>
                        <span className="text-sm text-[var(--color-warmgray)]">
                            {total} {total === 1 ? "recipe" : "recipes"}
                        </span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <RecipeCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : recipes.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-4xl mb-3">🍽️</p>
                            <p className="text-lg font-medium mb-1 text-[var(--color-navy)]">
                                No recipes found
                            </p>
                            <p className="text-sm text-[var(--color-warmgray)]">
                                Try adjusting your search or filters.
                            </p>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAll}
                                    className="mt-4 px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--color-terracotta)] text-white"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
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

                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={(p) => {
                                    setPage(p);
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                            />
                        </>
                    )}
                </section>
            </div>
        </>
    );
}
