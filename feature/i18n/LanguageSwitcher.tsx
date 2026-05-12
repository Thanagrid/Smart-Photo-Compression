"use client";

import { useLang } from "./LangContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
          lang === "en" ? "bg-emerald-500 text-white" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("th")}
        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
          lang === "th" ? "bg-emerald-500 text-white" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
        }`}
      >
        TH
      </button>
    </div>
  );
}

