"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartIcon, MenuIcon, XIcon } from "./icons";
import RandomRecipeButton from "./RandomRecipeButton";

export default function Navbar({ favoritesCount }: { favoritesCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-cream)]/95 backdrop-blur border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-[var(--color-terracotta)]">
              🍴
            </div>
            <span className="text-lg font-medium text-[var(--color-navy)] font-[family-name:var(--font-serif)]">
              وصفاتي
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-card)] transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/favorites"
              className="px-4 py-2 rounded-full text-sm font-medium text-[var(--color-navy)] hover:bg-[var(--color-card)] transition-colors"
            >
              المفضلة
            </Link>
            <RandomRecipeButton />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/favorites"
              className="relative hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium bg-[var(--color-card)] border border-black/10 text-[var(--color-navy)]"
            >
              <HeartIcon filled={favoritesCount > 0} />
              <span>محفوظة</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-[var(--color-terracotta)] text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 rounded-xl"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="القائمة"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-black/5">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="w-full text-right px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-navy)]"
          >
            الرئيسية
          </Link>
          <Link
            href="/favorites"
            onClick={() => setMenuOpen(false)}
            className="w-full text-right px-4 py-3 rounded-xl text-sm font-medium text-[var(--color-navy)]"
          >
            المفضلة ({favoritesCount})
          </Link>
          <div onClick={() => setMenuOpen(false)}>
            <RandomRecipeButton className="w-full justify-center mt-1" />
          </div>
        </div>
      )}
    </header>
  );
}
