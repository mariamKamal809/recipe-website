import { SortField, SortOrder } from "@/types/recipe";

export interface SortValue {
  sortBy?: SortField;
  order?: SortOrder;
}

const OPTIONS: { key: string; label: string; value: SortValue }[] = [
  { key: "default", label: "الترتيب الافتراضي", value: {} },
  { key: "rating-desc", label: "الأعلى تقييماً", value: { sortBy: "rating", order: "desc" } },
  { key: "rating-asc", label: "الأقل تقييماً", value: { sortBy: "rating", order: "asc" } },
  { key: "prep-asc", label: "الأسرع تحضيراً", value: { sortBy: "prepTimeMinutes", order: "asc" } },
  { key: "prep-desc", label: "الأطول تحضيراً", value: { sortBy: "prepTimeMinutes", order: "desc" } },
  { key: "calories-asc", label: "الأقل سعرات", value: { sortBy: "caloriesPerServing", order: "asc" } },
  { key: "calories-desc", label: "الأكثر سعرات", value: { sortBy: "caloriesPerServing", order: "desc" } },
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
