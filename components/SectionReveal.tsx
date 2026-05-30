"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionRevealProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function SectionReveal({ children, id, className = "" }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={`relative ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Scanner Line */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 z-50 h-[1px] bg-radar shadow-[0_0_15px_rgba(125,220,255,0.9)]"
        variants={{
          hidden: { top: "0%", opacity: 0 },
          visible: { top: ["0%", "100%", "100%"], opacity: [0, 1, 0] }
        }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
      {/* Content Reveal */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30, filter: "brightness(0) blur(8px)" },
          visible: { opacity: 1, y: 0, filter: "brightness(1) blur(0px)" }
        }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
