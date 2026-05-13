"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface ImageCompareSliderProps {
  originalImage: string;
  compressedImage: string;
  originalLabel?: string;
  compressedLabel?: string;
}

export const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({
  originalImage,
  compressedImage,
  originalLabel = "Original",
  compressedLabel = "Compressed",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      if (touch) {
        handleMove(touch.clientX);
      }
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", () => setIsDragging(false));
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", () => setIsDragging(false));
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl select-none group cursor-ew-resize bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        const touch = e.touches[0];
        if (touch) {
          handleMove(touch.clientX);
        }
      }}
      style={{ aspectRatio: "16/9" }}
    >
      {/* Base Image (Compressed) */}
      <Image
        src={compressedImage}
        alt="Compressed Image"
        fill
        sizes="(max-width: 896px) 100vw, 896px"
        className="object-cover pointer-events-none"
        priority
      />
      
      {/* Compressed Label */}
      <div className="absolute top-4 right-4 z-10 bg-zinc-900/70 backdrop-blur-md text-white text-xs md:text-sm px-3 py-1.5 rounded-full font-medium border border-zinc-700 shadow-lg">
        {compressedLabel}
      </div>

      {/* Overlay Image (Original) */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={originalImage}
          alt="Original Image"
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover pointer-events-none"
          priority
        />
        {/* Original Label */}
        <div className="absolute top-4 left-4 z-20 bg-zinc-900/70 backdrop-blur-md text-white text-xs md:text-sm px-3 py-1.5 rounded-full font-medium border border-zinc-700 shadow-lg">
          {originalLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute inset-y-0 z-30 flex items-center justify-center w-[2px] pointer-events-none bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-110">
          <svg
            className="w-5 h-5 text-zinc-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              transform="rotate(90 12 12)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
