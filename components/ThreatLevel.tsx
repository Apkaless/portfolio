"use client";

import { useEffect } from "react";

/**
 * ThreatLevel — shifts ambient CSS custom properties from cyan (recon)
 * at the top of the page to amber (deployment) at the bottom.
 *
 * It sets three CSS variables on <html>:
 *   --threat-cyan-opacity   (1 → 0.15)
 *   --threat-amber-opacity  (0.15 → 1)
 *   --threat-hue            (195 → 28)   cyan hue → amber hue
 */
export function ThreatLevel() {
  useEffect(() => {
    function update() {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const t = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

      // Interpolate values
      const cyanOpacity = 1 - t * 0.85;       // 1.0 → 0.15
      const amberOpacity = 0.15 + t * 0.85;    // 0.15 → 1.0
      const hue = 195 - t * 167;               // 195 (cyan) → 28 (amber)

      const root = document.documentElement;
      root.style.setProperty("--threat-cyan-opacity", cyanOpacity.toFixed(3));
      root.style.setProperty("--threat-amber-opacity", amberOpacity.toFixed(3));
      root.style.setProperty("--threat-hue", hue.toFixed(1));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      {/* Top-left ambient glow — cyan fading out */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-0 h-[60vh] w-[40vw]"
        style={{
          background: "radial-gradient(ellipse at 0% 0%, rgba(125,220,255,0.08), transparent 70%)",
          opacity: "var(--threat-cyan-opacity, 1)",
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Bottom-right ambient glow — amber fading in */}
      <div
        className="pointer-events-none fixed bottom-0 right-0 z-0 h-[60vh] w-[40vw]"
        style={{
          background: "radial-gradient(ellipse at 100% 100%, rgba(255,122,24,0.1), transparent 70%)",
          opacity: "var(--threat-amber-opacity, 0.15)",
          transition: "opacity 0.3s ease",
        }}
      />
    </>
  );
}
