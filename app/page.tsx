"use client";

import Link from "next/link";
import { useLang } from "@/feature/i18n/LangContext";

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-emerald-500/30">
      <main className="flex flex-col items-center justify-center w-full max-w-4xl px-6 py-24 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          {t("badge.processing")}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          {t("home.title.smart")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t("home.title.compress")}</span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed">
          {t("home.desc")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            href="/png-compress"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 font-medium text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 w-full sm:w-auto min-w-[240px]"
          >
            <span className="relative z-10 flex items-center gap-2 text-lg font-semibold">
              {t("home.btn.png")}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </Link>

          <Link 
            href="/jpg-compress"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 font-medium text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 w-full sm:w-auto min-w-[240px]"
          >
            <span className="relative z-10 flex items-center gap-2 text-lg font-semibold">
              {t("home.btn.jpg")}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </Link>
        </div>
        
        {/* Feature Highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full border-t border-zinc-200 dark:border-zinc-800 pt-16">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-semibold">{t("home.feat1.title")}</h3>
            <p className="text-zinc-500 dark:text-zinc-500">{t("home.feat1.desc")}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </div>
            <h3 className="text-xl font-semibold">{t("home.feat2.title")}</h3>
            <p className="text-zinc-500">{t("home.feat2.desc")}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-purple-500 dark:text-purple-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-xl font-semibold">{t("home.feat3.title")}</h3>
            <p className="text-zinc-500">{t("home.feat3.desc")}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
