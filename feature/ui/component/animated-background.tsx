"use client";

import { useEffect, useState, useMemo } from "react";
import { useTheme } from "@/feature/theme/ThemeContext";

const STAR_COUNT = 60;

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1.2,   // 1.2–3.2px
    duration: Math.random() * 5 + 4,    // 4–9s
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.3, // 0.3–0.8
  }));
}

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const stars = useMemo(() => generateStars(STAR_COUNT), []);
  const sunlightParticles = useMemo(() => generateStars(18), []); // Reduced count for cleaner look

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base background */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-[#070710] transition-colors duration-700" />

      {/* Grid – light in light mode, dim-white in dark mode */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Twinkling stars – only visible in dark mode */}
      {isDark && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Sunlight Particles – only visible in light mode */}
      {!isDark && (
        <div className="absolute inset-0">
          {sunlightParticles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size * 5}px`,
                height: `${p.size * 5}px`,
                opacity: p.opacity,
                animation: `float-up ${p.duration * 2}s ${p.delay}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Glowing orbs */}
      <div className="absolute inset-0">
        {/* Emerald – top-left */}
        <div
          className="absolute rounded-full animate-blob"
          style={{
            width: "600px",
            height: "600px",
            left: "-10%",
            top: "5%",
            background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
            filter: "blur(120px)",
            opacity: isDark ? 0.18 : 0.22,
          }}
        />
        {/* Cyan – bottom-right */}
        <div
          className="absolute rounded-full animate-blob-reverse"
          style={{
            width: "700px",
            height: "700px",
            right: "-8%",
            bottom: "5%",
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            filter: "blur(140px)",
            opacity: isDark ? 0.15 : 0.2,
          }}
        />
        {/* Indigo – center */}
        <div
          className="absolute rounded-full animate-blob"
          style={{
            width: "500px",
            height: "500px",
            left: "30%",
            top: "35%",
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            filter: "blur(110px)",
            opacity: isDark ? 0.1 : 0.13,
            animationDelay: "3s",
          }}
        />
      </div>
    </div>
  );
}
