"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function LaserSight() {
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(500);
  
  const springX = useSpring(mouseX, { damping: 40, stiffness: 600 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 600 });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Origin point of the laser: bottom-left off-screen
  const originX = -100;
  const originY = windowSize.height + 100;

  return (
    <svg className="pointer-events-none fixed inset-0 z-50 h-full w-full mix-blend-screen" aria-hidden="true">
      <defs>
        <linearGradient id="laser-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="70%" stopColor="rgba(255, 63, 46, 0.1)" />
          <stop offset="98%" stopColor="rgba(255, 63, 46, 0.6)" />
          <stop offset="100%" stopColor="#ff3f2e" />
        </linearGradient>
        <filter id="laser-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <motion.line
        x1={originX}
        y1={originY}
        x2={springX}
        y2={springY}
        stroke="url(#laser-gradient)"
        strokeWidth="1.5"
        filter="url(#laser-glow)"
        strokeLinecap="round"
      />
    </svg>
  );
}
