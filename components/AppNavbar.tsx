"use client";

import Navbar from "./Navbar";
import { useFavorites } from "./FavoritesProvider";

export default function AppNavbar() {
  const { favoriteIds } = useFavorites();
  return <Navbar favoritesCount={favoriteIds.length} />;
}
