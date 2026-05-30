"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SniperScope() {
  const [isScoped, setIsScoped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === "z" || e.key === "Z" || e.key === "Shift") {
        if (!isScoped) setIsScoped(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "z" || e.key === "Z" || e.key === "Shift") {
        setIsScoped(false);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isScoped) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isScoped]);

  return (
    <AnimatePresence>
      {isScoped && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
        >
          {/* Heavy Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.98)_65%,#000_100%)] backdrop-blur-sm" />
          
          {/* Crosshair moves slightly with mouse (Parallax) */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * -0.05,
              y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * -0.05,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            {/* Reticle Lines */}
            <div className="absolute h-[1px] w-full bg-radar/40" />
            <div className="absolute h-full w-[1px] bg-radar/40" />
            
            {/* Center Rings */}
            <div className="absolute h-96 w-96 rounded-full border-2 border-radar/20" />
            <div className="absolute h-64 w-64 rounded-full border border-radar/50 shadow-[0_0_15px_rgba(125,220,255,0.3)]" />
            <div className="absolute h-2 w-2 rounded-full bg-radar shadow-[0_0_10px_rgba(125,220,255,0.8)]" />
            
            {/* Range Markings Y */}
            <div className="absolute h-[15px] w-px -translate-y-16 bg-radar/80" />
            <div className="absolute h-[15px] w-px -translate-y-32 bg-radar/80" />
            <div className="absolute h-[15px] w-px translate-y-16 bg-radar/80" />
            <div className="absolute h-[15px] w-px translate-y-32 bg-radar/80" />
            
            {/* Range Markings X */}
            <div className="absolute h-px w-[15px] -translate-x-16 bg-radar/80" />
            <div className="absolute h-px w-[15px] -translate-x-32 bg-radar/80" />
            <div className="absolute h-px w-[15px] translate-x-16 bg-radar/80" />
            <div className="absolute h-px w-[15px] translate-x-32 bg-radar/80" />
            
            {/* Scope data */}
            <div className="absolute left-[calc(50%+4rem)] top-[calc(50%+4rem)] font-mono text-xs font-bold text-radar shadow-tactical-amber">
              DIST: {Math.floor(Math.random() * 10 + 100)}m<br />
              ELV: +1.2&deg;<br />
              WND: 3kph
            </div>
            <div className="absolute right-[calc(50%+4rem)] bottom-[calc(50%+4rem)] font-mono text-xs font-bold text-radar">
              TGT_LOCK: ACTIVE<br />
              MAG: 4X
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
