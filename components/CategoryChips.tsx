import { Category } from "@/types/recipe";

export const CATEGORIES: Category[] = [
    { id: "all", label: "All", emoji: "🍽️", kind: "tag" },
    { id: "breakfast", label: "Breakfast", emoji: "🥞", kind: "meal" },
    { id: "lunch", label: "Lunch", emoji: "🥗", kind: "meal" },
    { id: "dinner", label: "Dinner", emoji: "🍝", kind: "meal" },
    { id: "snack", label: "Snacks", emoji: "🍪", kind: "meal" },
    { id: "Italian", label: "Italian", emoji: "🇮🇹", kind: "tag" },
    { id: "Asian", label: "Asian", emoji: "🥢", kind: "tag" },
    { id: "Vegetarian", label: "Vegetarian", emoji: "🌱", kind: "tag" },
    { id: "Dessert", label: "Desserts", emoji: "🍰", kind: "tag" },
];

interface CategoryChipsProps {
    active: string;
    onSelect: (category: Category) => void;
}

export default function CategoryChips({
    active,
    onSelect,
}: CategoryChipsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat)}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        active === cat.id
                            ? "bg-[var(--color-terracotta)] text-white"
                            : "bg-[var(--color-card)] text-[var(--color-navy)] border border-black/10"
                    }`}
                >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                </button>
            ))}
        </div>
    );
}
