"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/feature/i18n/LangContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  angle: number;
  distance: number;
}

function generateParticles(count: number): Particle[] {
  const colors = [
    "#10b981", // emerald
    "#06b6d4", // cyan
    "#8b5cf6", // violet
    "#34d399", // emerald-light
    "#67e8f9", // cyan-light
    "#a78bfa", // violet-light
    "#ffffff",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 60,
    y: 50 + (Math.random() - 0.5) * 40,
    size: Math.random() * 6 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 1.5,
    angle: Math.random() * 360,
    distance: Math.random() * 180 + 60,
  }));
}

interface CompressionOverlayProps {
  isVisible: boolean;
  fileName?: string;
}

export function CompressionOverlay({ isVisible, fileName }: CompressionOverlayProps) {
  const { t } = useLang();
  const [progress, setProgress] = useState(0);
  const [particles] = useState(() => generateParticles(40));
  const [stage, setStage] = useState(0); // 0: analyzing, 1: compressing, 2: finalizing

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setStage(0);
      return;
    }

    setProgress(0);
    setStage(0);

    // Animate progress: 0 → 30 fast (analyzing), 30 → 85 steady (compressing), 85 → 99 slow (finalizing)
    let raf: number;
    let start: number | null = null;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;

      let p = 0;
      if (elapsed < 600) {
        p = (elapsed / 600) * 30;
        setStage(0);
      } else if (elapsed < 2000) {
        p = 30 + ((elapsed - 600) / 1400) * 55;
        setStage(1);
      } else {
        p = Math.min(99, 85 + ((elapsed - 2000) / 1000) * 14);
        setStage(2);
      }

      setProgress(Math.floor(p));

      if (p < 99) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  const stageLabels = [
    t("compress.overlay.analyzing"),
    t("compress.overlay.compressing"),
    t("compress.overlay.finalizing")
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md">
      {/* Particle Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-0"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              animation: `particle-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
              transform: `translateX(${Math.cos((p.angle * Math.PI) / 180) * p.distance}px) translateY(${Math.sin((p.angle * Math.PI) / 180) * p.distance}px)`,
            }}
          />
        ))}
      </div>

      {/* Center Content */}
      <div className="relative flex flex-col items-center gap-8 px-8 max-w-sm w-full">

        {/* Pulsing Ring + Icon */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulse rings */}
          <div className="absolute w-36 h-36 rounded-full border border-emerald-500/30 animate-ping" style={{ animationDuration: "2s" }} />
          <div className="absolute w-28 h-28 rounded-full border border-cyan-500/40 animate-ping" style={{ animationDuration: "1.5s", animationDelay: "0.5s" }} />

          {/* Spinning gradient ring */}
          <div className="absolute w-24 h-24 rounded-full" style={{
            background: "conic-gradient(from 0deg, #10b981, #06b6d4, #8b5cf6, #10b981)",
            animation: "spin 2s linear infinite",
          }} />
          <div className="absolute w-20 h-20 rounded-full bg-zinc-950" />

          {/* Progress number */}
          <span className="relative text-2xl font-black text-white tabular-nums">{progress}%</span>
        </div>

        {/* Stage Label */}
        <div className="text-center">
          <p className="text-zinc-100 font-semibold text-lg mb-1">{stageLabels[stage]}</p>
          {fileName && (
            <p className="text-zinc-500 text-sm truncate max-w-[220px]">{fileName}</p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full">
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, #10b981, #06b6d4)",
                boxShadow: "0 0 10px rgba(16,185,129,0.6)",
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-600 mt-2 font-mono">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

      </div>

      {/* Keyframes via style tag */}
      <style>{`
        @keyframes particle-float {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.5); }
          20%  { opacity: 1; }
          80%  { opacity: 0.7; }
          100% { opacity: 0; transform: translate(
            calc(var(--dx, 80px)),
            calc(var(--dy, -80px))
          ) scale(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
