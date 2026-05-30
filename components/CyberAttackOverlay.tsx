"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const triggerCyberAttack = () => {
  window.dispatchEvent(new Event("cyber-attack-toggle"));
};

export function CyberAttackOverlay() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleToggle = () => {
      setIsActive((prev) => {
        const next = !prev;
        if (next) {
          document.documentElement.classList.add("defcon-override");
        } else {
          document.documentElement.classList.remove("defcon-override");
        }
        return next;
      });
    };
    window.addEventListener("cyber-attack-toggle", handleToggle);
    return () => window.removeEventListener("cyber-attack-toggle", handleToggle);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden mix-blend-overlay"
        >
          <div className="absolute inset-0 animate-crt-flicker bg-hazard/10" />
          <div className="absolute left-4 top-24 sm:left-10 sm:top-32 font-mono text-xl sm:text-4xl font-bold text-hazard shadow-tactical-amber mix-blend-screen opacity-90 animate-pulseGlow">
            [WARNING] SYSTEM COMPROMISED<br/>
            [WARNING] OVERRIDE PROTOCOL ACTIVATED
          </div>
          <div className="absolute right-4 bottom-24 sm:right-10 sm:bottom-32 text-right font-mono text-xl sm:text-4xl font-bold text-hazard shadow-tactical-amber mix-blend-screen opacity-90 animate-pulseGlow">
            HEX DUMP CORRUPTION DETECTED<br/>
            DATA STREAM HIJACKED
          </div>
          <div className="absolute -inset-[100%] animate-hex-dump bg-[linear-gradient(0deg,transparent_0%,rgba(255,0,0,0.5)_50%,transparent_100%)] bg-[length:100%_8px] mix-blend-color-dodge opacity-60" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
