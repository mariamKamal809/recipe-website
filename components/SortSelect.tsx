import { SortField, SortOrder } from "@/types/recipe";

export interface SortValue {
    sortBy?: SortField;
    order?: SortOrder;
}

const OPTIONS: { key: string; label: string; value: SortValue }[] = [
    { key: "default", label: "Default sorting", value: {} },
    {
        key: "rating-desc",
        label: "Highest rated",
        value: { sortBy: "rating", order: "desc" },
    },
    {
        key: "rating-asc",
        label: "Lowest rated",
        value: { sortBy: "rating", order: "asc" },
    },
    {
        key: "prep-asc",
        label: "Quickest prep",
        value: { sortBy: "prepTimeMinutes", order: "asc" },
    },
    {
        key: "prep-desc",
        label: "Longest prep",
        value: { sortBy: "prepTimeMinutes", order: "desc" },
    },
    {
        key: "calories-asc",
        label: "Lowest calories",
        value: { sortBy: "caloriesPerServing", order: "asc" },
    },
    {
        key: "calories-desc",
        label: "Highest calories",
        value: { sortBy: "caloriesPerServing", order: "desc" },
    },
];

export default function SortSelect({
    activeKey,
    onChange,
}: {
    activeKey: string;
    onChange: (key: string, value: SortValue) => void;
}) {
    return (
        <select
            value={activeKey}
            onChange={(e) => {
                const opt = OPTIONS.find((o) => o.key === e.target.value);
                if (opt) onChange(opt.key, opt.value);
            }}
            className="px-3 py-2 rounded-xl text-sm outline-none bg-[var(--color-card)] border border-black/10 text-[var(--color-navy)] cursor-pointer"
        >
            {OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
