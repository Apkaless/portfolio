"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "top", label: "HQ" },
  { id: "about", label: "INTEL" },
  { id: "skills", label: "ARSENAL" },
  { id: "missions", label: "OPS" },
  { id: "archive", label: "ARCHIVE" },
  { id: "contact", label: "COMMS" },
];

export function Minimap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    function update() {
      let current = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = i;
            break;
          }
        }
      }
      setActiveIndex(current);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div
      className="fixed bottom-8 left-4 z-40 hidden flex-col items-start md:flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col items-start">
        {/* Vertical rail behind the dots */}
        <div
          className="absolute top-0 h-full w-[1px] bg-white/10"
          style={{ left: "5px" }}
        />

        {/* Active segment fill on the rail */}
        <motion.div
          className="absolute w-[1px] bg-radar/50"
          style={{ left: "5px", top: 0 }}
          animate={{
            height: `${(activeIndex / Math.max(sections.length - 1, 1)) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />

        {/* Waypoints */}
        {sections.map((section, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              className="group relative z-10 flex items-center gap-3 py-[7px]"
              aria-label={`Navigate to ${section.label}`}
            >
              {/* Dot */}
              <motion.div
                className={`rounded-full border transition-colors duration-300 ${
                  isActive
                    ? "border-radar bg-radar shadow-[0_0_12px_rgba(125,220,255,0.8)]"
                    : "border-white/20 bg-white/5 group-hover:border-radar/50 group-hover:bg-radar/20"
                }`}
                animate={{
                  width: isActive ? 11 : 7,
                  height: isActive ? 11 : 7,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />

              {/* Label — slides in on container hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -6, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: "auto" }}
                    exit={{ opacity: 0, x: -6, width: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className={`overflow-hidden whitespace-nowrap text-[0.58rem] font-bold uppercase tracking-[0.22em] ${
                      isActive ? "text-radar drop-shadow-[0_0_4px_rgba(125,220,255,0.6)]" : "text-steel/60"
                    }`}
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}
