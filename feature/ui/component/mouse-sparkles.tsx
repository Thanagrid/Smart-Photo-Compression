"use client";

import { useEffect, useRef } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  life: number;       // 0–1, ลดทีละนิดจนหายไป
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
}

const COLORS = [
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#a78bfa", // violet
  "#f0abfc", // fuchsia
  "#fde68a", // amber
  "#ffffff",
];

let idCounter = 0;

export function MouseSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const rafRef = useRef<number>(0);
  const lastPos = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Resize canvas to match window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Spawn sparkles on mouse move
    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Back to previous threshold
      if (dist < 6) return;
      lastPos.current = { x: e.clientX, y: e.clientY };

      const count = 1; 
      for (let i = 0; i < count; i++) {
        sparklesRef.current.push({
          id: idCounter++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 3, // Increased size: 3–7px
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 0.8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // Click burst – 6 stars (Slightly larger)
    const onClick = (e: MouseEvent) => {
      const burstCount = 6;
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        sparklesRef.current.push({
          id: idCounter++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 5 + 4, // Increased size: 4–9px
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: 0.8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
        });
      }
    };
    window.addEventListener("click", onClick);

    // Draw star polygon
    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerR: number,
      innerR: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(
          cx + Math.cos(rot) * outerR,
          cy + Math.sin(rot) * outerR
        );
        rot += step;
        ctx.lineTo(
          cx + Math.cos(rot) * innerR,
          cy + Math.sin(rot) * innerR
        );
        rot += step;
      }
      ctx.lineTo(cx, cy - outerR);
      ctx.closePath();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparklesRef.current = sparklesRef.current.filter((s) => s.life > 0);

      for (const s of sparklesRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.04;     // gravity
        s.life -= 0.025;  // fade speed
        s.rotation += s.rotationSpeed;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = Math.max(0, s.life);

        // Glow
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;

        ctx.fillStyle = s.color;
        drawStar(ctx, 0, 0, 4, s.size, s.size * 0.4);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
    />
  );
}
