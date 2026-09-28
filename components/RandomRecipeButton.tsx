"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRandomRecipeId } from "@/services/recipeService";
import { useToast } from "./ToastProvider";
import { ShuffleIcon } from "./icons";

export default function RandomRecipeButton({
    className = "",
}: {
    className?: string;
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showError } = useToast();

    const handleClick = async () => {
        setLoading(true);
        try {
            const id = await getRandomRecipeId();
            router.push(`/recipes/${id}`);
        } catch {
            showError("Couldn't load a random recipe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all bg-[var(--color-card)] border border-black/10 text-[var(--color-navy)] hover:bg-white disabled:opacity-60 ${className}`}
        >
            <ShuffleIcon size={15} />
            {loading ? "Picking a recipe..." : "Random recipe"}
        </button>
    );
}
