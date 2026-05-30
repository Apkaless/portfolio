"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 19) % 100}%`,
  delay: (index % 8) * 0.22,
  duration: 4.8 + (index % 6) * 0.62
}));

const embers = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 53 + 11) % 100}%`,
  top: `${(index * 29 + 17) % 100}%`,
  delay: (index % 9) * 0.28,
  duration: 6.2 + (index % 5) * 0.7
}));

const characterScenes = [
  {
    key: "left-operator",
    sections: ["top"],
    label: "Recon",
    spotlight: "17% 44%",
    spotlightX: "17%",
    spotlightY: "44%",
    panX: "5%",
    panY: "0%",
    scale: 1.16,
    mobileSpotlight: "36% 45%",
    mobileSpotlightX: "36%",
    mobileSpotlightY: "45%",
    mobilePanX: "2%",
    mobilePanY: "0%",
    mobileScale: 1.04,
    mobileObjectPosition: "18% center",
    accent: "rgba(125,220,255,0.2)"
  },
  {
    key: "shadow-operator",
    sections: ["about", "skills"],
    label: "Systems",
    spotlight: "36% 43%",
    spotlightX: "36%",
    spotlightY: "43%",
    panX: "2%",
    panY: "0%",
    scale: 1.18,
    mobileSpotlight: "43% 44%",
    mobileSpotlightX: "43%",
    mobileSpotlightY: "44%",
    mobilePanX: "1%",
    mobilePanY: "0%",
    mobileScale: 1.05,
    mobileObjectPosition: "39% center",
    accent: "rgba(125,220,255,0.18)"
  },
  {
    key: "center-operator",
    sections: ["missions"],
    label: "Command",
    spotlight: "51% 42%",
    spotlightX: "51%",
    spotlightY: "42%",
    panX: "-2%",
    panY: "0%",
    scale: 1.18,
    mobileSpotlight: "52% 43%",
    mobileSpotlightX: "52%",
    mobileSpotlightY: "43%",
    mobilePanX: "0%",
    mobilePanY: "0%",
    mobileScale: 1.05,
    mobileObjectPosition: "54% center",
    accent: "rgba(255,122,24,0.2)"
  },
  {
    key: "right-operator",
    sections: ["archive", "contact"],
    label: "Assault",
    spotlight: "76% 43%",
    spotlightX: "76%",
    spotlightY: "43%",
    panX: "-6%",
    panY: "0%",
    scale: 1.16,
    mobileSpotlight: "65% 45%",
    mobileSpotlightX: "65%",
    mobileSpotlightY: "45%",
    mobilePanX: "-2%",
    mobilePanY: "0%",
    mobileScale: 1.04,
    mobileObjectPosition: "82% center",
    accent: "rgba(255,122,24,0.24)"
  }
] as const;

type CharacterScene = (typeof characterScenes)[number];

function sceneForSection(sectionId: string): CharacterScene {
  return characterScenes.find((scene) => scene.sections.some((section) => section === sectionId)) ?? characterScenes[0];
}

export function BattlefieldBackground() {
  const [activeSection, setActiveSection] = useState("top");
  const [isCompact, setIsCompact] = useState(false);
  const activeScene = useMemo(() => sceneForSection(activeSection), [activeSection]);
  const sceneView = useMemo(
    () => ({
      spotlight: isCompact ? activeScene.mobileSpotlight : activeScene.spotlight,
      spotlightX: isCompact ? activeScene.mobileSpotlightX : activeScene.spotlightX,
      spotlightY: isCompact ? activeScene.mobileSpotlightY : activeScene.spotlightY,
      panX: isCompact ? activeScene.mobilePanX : activeScene.panX,
      panY: isCompact ? activeScene.mobilePanY : activeScene.panY,
      scale: isCompact ? activeScene.mobileScale : activeScene.scale,
      objectPosition: isCompact ? activeScene.mobileObjectPosition : "center center"
    }),
    [activeScene, isCompact]
  );
  const sceneTransition = useMemo(
    () => ({
      duration: isCompact ? 0.9 : 1.2,
      ease: [0.22, 1, 0.36, 1] as const
    }),
    [isCompact]
  );
  const visibleParticles = isCompact ? particles.slice(0, 18) : particles;
  const visibleEmbers = isCompact ? embers.slice(0, 10) : embers;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateCompactMode = () => setIsCompact(mediaQuery.matches);

    updateCompactMode();
    mediaQuery.addEventListener("change", updateCompactMode);

    return () => mediaQuery.removeEventListener("change", updateCompactMode);
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  const parallaxX = useTransform(smoothMouseX, [0, 1], ["-1.5%", "1.5%"]);
  const parallaxY = useTransform(smoothMouseY, [0, 1], ["-1.5%", "1.5%"]);
  const parallaxSpotlightX = useTransform(smoothMouseX, [0, 1], ["-4%", "4%"]);
  const parallaxSpotlightY = useTransform(smoothMouseY, [0, 1], ["-4%", "4%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const sectionIds = characterScenes.flatMap((scene) => scene.sections);
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.12, 0.22, 0.36, 0.5]
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bunker" aria-hidden="true">
      <motion.div className="absolute -inset-[5%]" style={{ x: parallaxX, y: parallaxY, willChange: "transform" }}>
        <motion.div
          className="absolute -inset-[16%] sm:-inset-[8%]"
          animate={{
            x: sceneView.panX,
            y: sceneView.panY,
            scale: sceneView.scale
          }}
          transition={sceneTransition}
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/battlefield-4k.jpg"
            alt=""
            fill
            priority
            sizes={isCompact ? "170vw" : "120vw"}
            className="object-cover opacity-60 blur-xl transition-[object-position,opacity,filter] duration-700"
            style={{ objectPosition: sceneView.objectPosition }}
          />
        </motion.div>

        <motion.div
          className="absolute -inset-[14%] sm:-inset-[6%]"
          animate={{
            x: sceneView.panX,
            y: sceneView.panY,
            scale: sceneView.scale
          }}
          transition={sceneTransition}
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/battlefield-4k.jpg"
            alt=""
            fill
            priority
            sizes={isCompact ? "160vw" : "112vw"}
            className="object-cover opacity-78 transition-[object-position,opacity,filter] duration-700"
            style={{ objectPosition: sceneView.objectPosition }}
          />
        </motion.div>

        <motion.div
          className="absolute -inset-[14%] sm:-inset-[6%]"
          animate={{
            x: sceneView.panX,
            y: sceneView.panY,
            scale: sceneView.scale
          }}
          transition={sceneTransition}
          style={{ willChange: "transform" }}
        >
          <motion.div
            className="absolute inset-0 transition-[mask-image,-webkit-mask-image] duration-700"
            style={{
              WebkitMaskImage: `radial-gradient(circle at ${sceneView.spotlight}, black 0%, black 13%, transparent 34%)`,
              maskImage: `radial-gradient(circle at ${sceneView.spotlight}, black 0%, black 13%, transparent 34%)`
            }}
          >
            <Image
              src="/images/battlefield-4k.jpg"
              alt=""
              fill
              priority
              sizes={isCompact ? "160vw" : "112vw"}
              className="object-cover opacity-95 contrast-125 saturate-125 transition-[object-position,opacity,filter] duration-700"
              style={{ objectPosition: sceneView.objectPosition }}
            />
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,8,0.72)_0%,rgba(6,7,8,0.34)_44%,rgba(6,7,8,0.68)_100%),linear-gradient(180deg,rgba(6,7,8,0.12),#060708_96%)]" />

        <motion.div
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(circle at ${sceneView.spotlight}, ${activeScene.accent} 0%, rgba(255,122,24,0.11) 13%, transparent 30%), radial-gradient(circle at ${sceneView.spotlight}, transparent 0 16%, rgba(6,7,8,0.22) 32%, rgba(6,7,8,0.72) 100%), radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.78) 100%)`
          }}
          transition={sceneTransition}
        />
      </motion.div>

      <div className="absolute inset-0 [perspective:1000px]">
        <motion.div
          className="absolute inset-[-50%] bg-tactical-grid bg-[length:40px_40px] opacity-[0.11] sm:bg-[length:56px_56px] sm:opacity-[0.16]"
          style={{ transformOrigin: "top", transform: "rotateX(60deg)" }}
          animate={{ translateY: ["0px", "56px"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
      </div>
      <div className="noise-mask absolute inset-0 opacity-25 mix-blend-screen sm:opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,8,0)_0%,rgba(6,7,8,0.34)_66%,#060708_100%)]" />

      <motion.div className="absolute inset-0" style={{ x: parallaxSpotlightX, y: parallaxSpotlightY, willChange: "transform" }}>
        <motion.div
          className="absolute h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-radar/35 sm:h-52 sm:w-52 md:h-72 md:w-72"
          animate={{
            left: sceneView.spotlightX,
            top: sceneView.spotlightY,
            opacity: [0.5, 0.78, 0.5]
          }}
          transition={{
            left: sceneTransition,
            top: sceneTransition,
            opacity: { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="absolute inset-0 rounded-full border border-radar/20 shadow-[0_0_40px_rgba(125,220,255,0.18)]" />
          <div className="absolute inset-4 rounded-full border border-radar/25 sm:inset-5" />
          <div className="absolute inset-8 rounded-full border border-amber/24 sm:inset-11" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-radar/30 to-transparent" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-radar/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radar shadow-[0_0_18px_rgba(125,220,255,0.9)]" />
          <motion.div
            className="absolute left-1/2 top-1/2 -ml-[0.5px] -mt-[1px] h-[2px] w-16 origin-left bg-gradient-to-r from-radar via-radar/60 to-transparent sm:w-24 md:w-36"
            animate={{ rotate: 360 }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0% 50%" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full mix-blend-color-dodge"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(125,220,255,0.45), transparent 20%, transparent 100%)"
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute left-[32%] top-[38%] h-2 w-2 rounded-full bg-amber shadow-[0_0_16px_rgba(255,122,24,0.95)]"
            animate={{ scale: [1, 1.9, 1], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute right-[28%] top-[58%] h-1.5 w-1.5 rounded-full bg-radar shadow-[0_0_14px_rgba(125,220,255,0.9)]"
            animate={{ scale: [1, 1.7, 1], opacity: [0.28, 0.86, 0.28] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
          />
          <div className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded border border-radar/25 bg-black/40 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-radar backdrop-blur md:block">
            Tracking: {activeScene.label}
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute left-4 top-24 hidden gap-2 md:grid">
        {characterScenes.map((scene, index) => (
          <div
            key={scene.key}
            className={`h-1.5 w-11 rounded-full transition ${
              scene.key === activeScene.key ? "bg-amber shadow-tactical-amber" : "bg-white/16"
            }`}
          >
            <span className="sr-only">
              Character {index + 1}: {scene.label}
            </span>
          </div>
        ))}
      </div>

      <motion.div
        className="absolute left-[-18%] top-[12%] h-60 w-60 rounded-full bg-radar/10 blur-3xl md:h-[32rem] md:w-[32rem]"
        animate={{ x: [0, isCompact ? 18 : 36, 0], y: [0, isCompact ? -14 : -28, 0], opacity: [0.24, 0.46, 0.24] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[14%] right-[-18%] h-64 w-64 rounded-full bg-amber/14 blur-3xl md:h-[34rem] md:w-[34rem]"
        animate={{ x: [0, isCompact ? -18 : -42, 0], y: [0, isCompact ? 14 : 26, 0], opacity: [0.16, 0.38, 0.16] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-[-30%] top-[30%] h-8 w-[90%] rotate-[-9deg] bg-gradient-to-r from-transparent via-radar/16 to-transparent blur-xl sm:left-[-20%] sm:h-10 sm:w-[70%]"
        animate={{ x: ["-20%", "120%"], opacity: [0, 0.5, 0] }}
        transition={{ duration: isCompact ? 10.5 : 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-30%] top-[44%] h-9 w-[86%] rotate-[11deg] bg-gradient-to-r from-transparent via-amber/20 to-transparent blur-xl sm:right-[-20%] sm:h-12 sm:w-[62%]"
        animate={{ x: ["20%", "-125%"], opacity: [0, 0.42, 0] }}
        transition={{ duration: isCompact ? 12 : 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />

      <div className="absolute inset-x-0 top-0 h-[5vh] bg-gradient-to-b from-black via-black/76 to-transparent sm:h-[7vh]" />
      <div className="absolute inset-x-0 bottom-0 h-[7vh] bg-gradient-to-t from-black via-black/78 to-transparent sm:h-[9vh]" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-radar/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-bunker to-transparent sm:h-44" />

      {visibleParticles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-0.5 w-0.5 rounded-full bg-radar/45 shadow-[0_0_12px_rgba(125,220,255,0.8)] sm:h-1 sm:w-1"
          style={{ left: particle.left, top: particle.top, willChange: "transform, opacity" }}
          animate={{ y: [0, isCompact ? -10 : -18, 0], opacity: [0.05, 0.58, 0.05], scale: [1, isCompact ? 1.45 : 1.8, 1] }}
          transition={{
            delay: particle.delay,
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {visibleEmbers.map((ember) => (
        <motion.span
          key={ember.id}
          className="absolute h-1 w-1 rounded-full bg-amber/70 shadow-[0_0_14px_rgba(255,122,24,0.88)] sm:h-1.5 sm:w-1.5"
          style={{ left: ember.left, top: ember.top, willChange: "transform, opacity" }}
          animate={{
            x: [isCompact ? -6 : -12, isCompact ? 12 : 24, isCompact ? -3 : -6],
            y: [isCompact ? 10 : 18, isCompact ? -20 : -34, isCompact ? 4 : 8],
            opacity: [0, 0.82, 0],
            scale: [0.65, isCompact ? 1.2 : 1.45, 0.7]
          }}
          transition={{
            delay: ember.delay,
            duration: ember.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
