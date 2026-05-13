"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { setPendingFile } from "@/feature/home/store/pending-file-store";
import { useLang } from "@/feature/i18n/LangContext";

const ACCEPTED_MIME = ["image/png", "image/jpeg", "image/jpg"];

type DragState = "idle" | "valid" | "invalid";

export function SmartDropZone() {
  const { t } = useLang();
  const router = useRouter();
  const [dragState, setDragState] = useState<DragState>("idle");
  const [dragLabel, setDragLabel] = useState<string>("");
  const enterCount = useRef(0);
  const zoneRef = useRef<HTMLDivElement>(null);

  // ── Window-level overlay drag detection ──────────────────────────────────
  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      e.preventDefault();
      enterCount.current++;
      if (enterCount.current !== 1) return;
      const items = Array.from(e.dataTransfer?.items ?? []);
      if (!items.some((i) => i.kind === "file")) return;
      const valid = items.some((i) => ACCEPTED_MIME.includes(i.type));
      const mime = items.find((i) => i.kind === "file")?.type ?? "";
      setDragLabel(mime === "image/png" ? "PNG" : mime.includes("jpeg") || mime.includes("jpg") ? "JPG" : "");
      setDragState(valid ? "valid" : "invalid");
    };
    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      enterCount.current--;
      if (enterCount.current === 0) setDragState("idle");
    };
    const onDragOver = (e: DragEvent) => e.preventDefault();
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      enterCount.current = 0;
      setDragState("idle");
      const file = e.dataTransfer?.files?.[0];
      if (!file) return;
      routeFile(file);
    };

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("drop", onDrop);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routeFile = useCallback((file: File) => {
    if (file.type === "image/png") {
      setPendingFile(file);
      router.push("/png-compress");
    } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
      setPendingFile(file);
      router.push("/jpg-compress");
    }
  }, [router]);

  const handleClickUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/jpg";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) routeFile(file);
    };
    input.click();
  };

  const isOverlayVisible = dragState !== "idle";
  const isValid = dragState === "valid";

  return (
    <>
      {/* ── Fullscreen Drag Overlay ───────────────────────────────────────── */}
      {isOverlayVisible && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{
            background: isValid ? "rgba(0,0,0,0.65)" : "rgba(60,0,0,0.65)",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Animated dashed border */}
          <div
            className="absolute inset-6 rounded-3xl pointer-events-none"
            style={{
              border: `3px dashed ${isValid ? "#10b981" : "#ef4444"}`,
              animation: "dash-glow 1.5s ease-in-out infinite",
              boxShadow: isValid
                ? "0 0 40px rgba(16,185,129,0.4), inset 0 0 40px rgba(16,185,129,0.05)"
                : "0 0 40px rgba(239,68,68,0.4), inset 0 0 40px rgba(239,68,68,0.05)",
            }}
          />
          {/* Corner accents */}
          {(["top-6 left-6 border-t-4 border-l-4 rounded-tl-2xl","top-6 right-6 border-t-4 border-r-4 rounded-tr-2xl","bottom-6 left-6 border-b-4 border-l-4 rounded-bl-2xl","bottom-6 right-6 border-b-4 border-r-4 rounded-br-2xl"] as const).map((cls, i) => (
            <div key={i} className={`absolute w-12 h-12 pointer-events-none ${cls}`}
              style={{ borderColor: isValid ? "#10b981" : "#ef4444", opacity: 0.9 }} />
          ))}
          {/* Center content */}
          <div className="flex flex-col items-center gap-5 select-none">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: isValid
                  ? "linear-gradient(135deg,#10b981,#06b6d4)"
                  : "linear-gradient(135deg,#ef4444,#f97316)",
                animation: "bounce-icon 1s ease-in-out infinite",
                boxShadow: isValid
                  ? "0 8px 40px rgba(16,185,129,0.5)"
                  : "0 8px 40px rgba(239,68,68,0.5)",
              }}
            >
              {isValid ? (
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <div className="text-center">
              {isValid ? (
                <>
                  <p className="text-white text-2xl font-bold mb-1">
                    {t("home.smartdrop.drop", { fileType: dragLabel })}
                  </p>
                  <p className="text-emerald-400 text-base font-medium">
                    {t("home.smartdrop.route", { fileType: dragLabel })}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-white text-2xl font-bold mb-1">{t("home.smartdrop.unsupported")}</p>
                  <p className="text-red-400 text-base font-medium">{t("home.smartdrop.only")}</p>
                </>
              )}
            </div>
          </div>
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: isValid ? "#10b981" : "#ef4444",
                  opacity: 0.3 + Math.random() * 0.4,
                  animation: `particle-drift ${2 + Math.random() * 3}s ${Math.random() * 2}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes dash-glow { 0%,100%{opacity:1} 50%{opacity:0.6} }
            @keyframes bounce-icon { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
            @keyframes particle-drift { 0%,100%{transform:translateY(0) scale(1);opacity:0.3} 50%{transform:translateY(-30px) scale(1.2);opacity:0.7} }
          `}</style>
        </div>
      )}

      {/* ── Visible Drop Zone Card ────────────────────────────────────────── */}
      <div
        ref={zoneRef}
        onClick={handleClickUpload}
        className="w-full max-w-2xl mx-auto mt-10 cursor-pointer group"
      >
        <div
          className="relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-8 py-10 transition-all duration-300"
          style={{
            borderColor: "#10b981",
            background: "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.05))",
            boxShadow: "0 0 0 0 rgba(16,185,129,0)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(16,185,129,0.2)";
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(16,185,129,0.10), rgba(6,182,212,0.10))";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(16,185,129,0)";
            (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(6,182,212,0.05))";
          }}
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-1">
              {t("home.smartdrop.title")}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {t("home.smartdrop.desc")}
            </p>
          </div>

          {/* Badges */}
          <div className="flex gap-3 mt-1">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
              PNG
            </span>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/15 text-cyan-500 border border-cyan-500/30">
              JPG / JPEG
            </span>
          </div>

          <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">{t("home.smartdrop.browse")}</p>
        </div>
      </div>
    </>
  );
}
