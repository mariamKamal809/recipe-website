"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface FavoritesContextValue {
    favoriteIds: number[];
    isFavorite: (id: number) => boolean;
    toggleFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = "recipe-favorites";

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) {
        throw new Error("useFavorites must be used within FavoritesProvider");
    }
    return ctx;
}

export default function FavoritesProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Load saved favorites when the page opens.
    useEffect(() => {
        const load = () => {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (raw) setFavoriteIds(JSON.parse(raw));
            } catch {
                // Ignore storage read errors.
            } finally {
                setLoaded(true);
            }
        };
        load();
    }, []);

    // Persist changes to favorites.
    useEffect(() => {
        if (!loaded) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    }, [favoriteIds, loaded]);

    const isFavorite = (id: number) => favoriteIds.includes(id);

    const toggleFavorite = (id: number) => {
        setFavoriteIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    };

    return (
        <FavoritesContext.Provider
            value={{ favoriteIds, isFavorite, toggleFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}
