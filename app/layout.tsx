import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import FavoritesProvider from "@/components/FavoritesProvider";
import AppNavbar from "@/components/AppNavbar";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "وصفاتي — اكتشفي وصفات لذيذة",
  description: "موقع لاكتشاف واختيار الوصفات المفضلة لديك",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${dmSerif.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-cream)]">
        <ToastProvider>
          <FavoritesProvider>
            <AppNavbar />
            <div className="flex-1">{children}</div>
            <footer className="py-10 text-center border-t border-black/5 text-[var(--color-warmgray)]">
              <p className="text-sm">
                صُنع بحب من{" "}
                <span className="text-[var(--color-terracotta)] font-[family-name:var(--font-serif)]">
                  وصفاتي
                </span>{" "}
                · اكتشفي شي لذيذ اليوم
              </p>
            </footer>
          </FavoritesProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
