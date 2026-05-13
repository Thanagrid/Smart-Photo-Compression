"use client";

import { useEffect, useState } from "react";

export function FloatingMascot() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false); // To ensure we start fresh
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* The Mascot */}
      <div 
        className="absolute w-24 h-24 transition-all duration-700 ease-in-out animate-float-around"
        style={{
          filter: 'drop-shadow(0 10px 15px rgba(16,185,129,0.3))',
        }}
      >
        <img 
          src="/mascot.png" 
          alt="Mascot" 
          className="w-full h-full object-contain" 
        />
        
        {/* Sparkles/Trail */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute w-2 h-2 bg-emerald-400 rounded-full blur-[2px] animate-ping" style={{ left: '10%', top: '20%' }} />
            <div className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[1px] animate-ping" style={{ right: '15%', bottom: '30%', animationDelay: '0.5s' }} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-around {
          0% {
            left: 5%;
            top: 20%;
            transform: rotate(0deg) scale(1);
          }
          25% {
            left: 80%;
            top: 15%;
            transform: rotate(10deg) scale(1.1);
          }
          50% {
            left: 70%;
            top: 70%;
            transform: rotate(-10deg) scale(1);
          }
          75% {
            left: 10%;
            top: 60%;
            transform: rotate(5deg) scale(0.9);
          }
          100% {
            left: 5%;
            top: 20%;
            transform: rotate(0deg) scale(1);
          }
        }
        .animate-float-around {
          animation: float-around 25s infinite linear;
        }
      `}</style>
    </div>
  );
}
