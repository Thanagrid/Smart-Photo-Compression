import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/feature/i18n/LangContext";
import { LanguageSwitcher } from "@/feature/i18n/LanguageSwitcher";
import { ThemeProvider } from "@/feature/theme/ThemeContext";
import { ThemeSwitcher } from "@/feature/theme/ThemeSwitcher";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Smart Photo Compressor",
  description: "Smart Photo Compressor is a web application that allows you to compress photos to reduce their size without losing quality. It uses advanced compression algorithms to reduce the file size of photos while maintaining their original quality. It is a free and open-source application that can be used by anyone to compress their photos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${prompt.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LangProvider>
            {/* Combined toolbar: lang + theme */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full p-1 shadow-lg">
              <LanguageSwitcher />
              <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700" />
              <ThemeSwitcher />
            </div>
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

