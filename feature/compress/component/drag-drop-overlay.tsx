"use client";

import { useEffect, useState, useRef } from "react";

interface DragDropOverlayProps {
  onFileDrop: (file: File) => void;
  acceptedMime: string[];
  fileTypeLabel: string; // e.g. "PNG" or "JPG"
}

export function DragDropOverlay({ onFileDrop, acceptedMime, fileTypeLabel }: DragDropOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const enterCount = useRef(0); // tracks nested dragenter/dragleave

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      enterCount.current++;
      if (enterCount.current === 1) {
        // check if the dragged item is a valid file type
        const items = Array.from(e.dataTransfer?.items ?? []);
        const hasFile = items.some((i) => i.kind === "file");
        if (!hasFile) return;

        const valid = items.some((i) => acceptedMime.includes(i.type));
        setIsValid(valid);
        setIsVisible(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      enterCount.current--;
      if (enterCount.current === 0) {
        setIsVisible(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      enterCount.current = 0;
      setIsVisible(false);

      const files = Array.from(e.dataTransfer?.files ?? []);
      if (files.length > 0 && files[0]) {
        const file = files[0];
        if (acceptedMime.includes(file.type)) {
          onFileDrop(file);
        }
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, [onFileDrop, acceptedMime]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      style={{
        background: isValid
          ? "rgba(0,0,0,0.65)"
          : "rgba(60,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      {/* Animated dashed border frame */}
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
      {[
        "top-6 left-6 border-t-4 border-l-4 rounded-tl-2xl",
        "top-6 right-6 border-t-4 border-r-4 rounded-tr-2xl",
        "bottom-6 left-6 border-b-4 border-l-4 rounded-bl-2xl",
        "bottom-6 right-6 border-b-4 border-r-4 rounded-br-2xl",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-12 h-12 pointer-events-none ${cls}`}
          style={{
            borderColor: isValid ? "#10b981" : "#ef4444",
            opacity: 0.9,
          }}
        />
      ))}

      {/* Center content */}
      <div className="flex flex-col items-center gap-5 select-none">
        {/* Bouncing icon */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: isValid
              ? "linear-gradient(135deg, #10b981, #06b6d4)"
              : "linear-gradient(135deg, #ef4444, #f97316)",
            animation: "bounce-icon 1s ease-in-out infinite",
            boxShadow: isValid
              ? "0 8px 40px rgba(16,185,129,0.5)"
              : "0 8px 40px rgba(239,68,68,0.5)",
          }}
        >
          {isValid ? (
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          ) : (
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>

        <div className="text-center">
          {isValid ? (
            <>
              <p className="text-white text-2xl font-bold mb-1">Drop to compress!</p>
              <p className="text-emerald-400 text-base font-medium">
                Release your {fileTypeLabel} file here
              </p>
            </>
          ) : (
            <>
              <p className="text-white text-2xl font-bold mb-1">Wrong file type</p>
              <p className="text-red-400 text-base font-medium">
                Only {fileTypeLabel} files are accepted
              </p>
            </>
          )}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
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
        @keyframes dash-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes bounce-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes particle-drift {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
