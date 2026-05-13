"use client";

import { useTheme } from "./ThemeContext";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayTheme, setDisplayTheme] = useState(theme);

  const cycle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      const next = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
      setTheme(next);
      setDisplayTheme(next);
      setIsAnimating(false);
    }, 200);
  };

  useEffect(() => {
    setDisplayTheme(theme);
  }, [theme]);

  return (
    <button
      onClick={cycle}
      aria-label="Toggle theme"
      title={`Theme: ${theme} — click to cycle`}
      className="relative w-9 h-9 flex items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors overflow-hidden"
    >
      {/* ☀️ Sun – Light */}
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out"
        style={{
          opacity: displayTheme === "light" ? 1 : 0,
          transform:
            displayTheme === "light"
              ? isAnimating
                ? "rotate(90deg) scale(0)"
                : "rotate(0deg) scale(1)"
              : "rotate(-90deg) scale(0)",
        }}
      >
        <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.72 17.72l1.06 1.06M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.72 6.28l1.06-1.06" />
          <circle cx="12" cy="12" r="3.75" />
        </svg>
      </span>

      {/* 🌙 Moon – Dark */}
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out"
        style={{
          opacity: displayTheme === "dark" ? 1 : 0,
          transform:
            displayTheme === "dark"
              ? isAnimating
                ? "rotate(-90deg) scale(0)"
                : "rotate(0deg) scale(1)"
              : "rotate(90deg) scale(0)",
        }}
      >
        <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.752 15.002A9.718 9.718 0 0112.003 21c-5.385 0-9.75-4.365-9.75-9.75 0-4.128 2.565-7.658 6.188-9.079a.75.75 0 01.964.96 7.5 7.5 0 0010.392 10.392.75.75 0 01.955.479z" />
        </svg>
      </span>

      {/* 🖥️ Monitor – System */}
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out"
        style={{
          opacity: displayTheme === "system" ? 1 : 0,
          transform:
            displayTheme === "system"
              ? isAnimating
                ? "scale(0)"
                : "scale(1)"
              : "scale(0)",
        }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
        </svg>
      </span>
    </button>
  );
}
