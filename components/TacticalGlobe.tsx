"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "framer-motion";

export function TacticalGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  
  const springPhi = useSpring(0, {
    mass: 1,
    stiffness: 280,
    damping: 40
  });

  useEffect(() => {
    let width = 0;
    let currentPhi = 0;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();
    
    if (!canvasRef.current) return;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.03, 0.04, 0.05],
      markerColor: [1, 0.48, 0.09], // Amber text-amber
      glowColor: [0.49, 0.86, 1], // Cyan text-radar
      markers: [
        { location: [37.7595, -122.4367], size: 0.05 }, // SF
        { location: [40.7128, -74.0060], size: 0.05 }, // NY
        { location: [51.5072, -0.1276], size: 0.04 }, // London
        { location: [35.6895, 139.6917], size: 0.06 }, // Tokyo
        { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
        { location: [1.3521, 103.8198], size: 0.04 }, // Singapore
      ],
      onRender: (state: Record<string, any>) => {
        if (!pointerInteracting.current) {
          currentPhi += 0.003;
        }
        state.phi = currentPhi + springPhi.get();
        state.width = width * 2;
        state.height = width * 2;
      }
    } as any);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [springPhi]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-3xl">
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-60 mix-blend-screen transition-opacity duration-1000"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          canvasRef.current!.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            springPhi.set(delta / 200);
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            springPhi.set(delta / 100);
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
        }}
      />
    </div>
  );
}
