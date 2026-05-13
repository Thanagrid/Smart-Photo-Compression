"use client";

import Link from "next/link";
import { useLang } from "@/feature/i18n/LangContext";

export default function HomePage() {
  const { t } = useLang();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="pointer-events-none absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-40 dark:opacity-30 blur-[100px]"></div>
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-cyan-500 opacity-40 dark:opacity-30 blur-[120px]"></div>
      <div className="pointer-events-none absolute top-[40%] left-[-10%] -z-10 h-[300px] w-[300px] rounded-full bg-purple-500 opacity-30 dark:opacity-20 blur-[100px]"></div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6 py-24 text-center">
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

        {/* Footer */}
        <footer className="mt-24 w-full border-t border-zinc-200 dark:border-zinc-800 pt-10 pb-16 text-center text-sm text-zinc-500 dark:text-zinc-400 flex flex-col items-center">
          <div className="max-w-2xl mb-10">
            <p className="mb-2">
              {t("home.footer.p1")}
            </p>
            <p>
              {t("home.footer.p2")}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-zinc-900 dark:text-zinc-100 font-semibold mb-4 text-sm tracking-widest uppercase">Contact</h4>
            <div className="flex items-center justify-center gap-6 font-medium">
              <a 
                href="https://www.linkedin.com/in/tanagrid-saekaew-80b955402" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors group"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-[#0A66C2] transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
                LinkedIn
              </a>
              <a 
                href="https://github.com/Thanagrid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors group"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              <a 
                href="mailto:tanagridsaekaew@gmail.com" 
                className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors group"
              >
                <svg className="w-5 h-5 text-zinc-400 group-hover:text-rose-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
