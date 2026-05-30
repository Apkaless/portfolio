"use client";

import { motion } from "framer-motion";
import { ArrowDown, Crosshair, Github, Mail, Shield } from "lucide-react";
import { TypewriterText } from "./TypewriterText";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            className="font-display text-xs font-bold uppercase tracking-[0.32em] text-radar"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            I&apos;m Just a Soldier
          </motion.p>
          <motion.h1
            className="font-display mt-5 max-w-4xl text-6xl font-black uppercase leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.28 }}
          >
            <TypewriterText text="Apkaless" delay={0.2} speed={80} />
          </motion.h1>
          <motion.div
            className="mt-5 max-w-2xl text-xl font-semibold text-amber sm:text-2xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.38 }}
          >
            <TypewriterText text="Developer. Tactician. Digital Soldier." delay={1.1} speed={40} />
          </motion.div>
          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 text-steel sm:text-lg"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.48 }}
          >
            A command-center portfolio for tools, automation, utilities, gaming optimizers,
            network experiments, and practical software missions built with precision.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.58 }}
          >
            <a
              href="#missions"
              data-sound
              className="target-lock-hover inline-flex min-h-12 items-center justify-center gap-2 rounded border border-radar/55 bg-radar/15 px-6 text-sm font-bold uppercase tracking-[0.14em] text-radar shadow-tactical-green transition hover:bg-radar/20"
            >
              <Crosshair className="h-4 w-4" aria-hidden="true" />
              View Missions
            </a>
            <a
              href="#contact"
              data-sound
              className="target-lock-hover inline-flex min-h-12 items-center justify-center gap-2 rounded border border-white/15 bg-white/7 px-6 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-amber/50 hover:text-amber"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact Me
            </a>
            <a
              href="https://github.com/Apkaless"
              target="_blank"
              rel="noreferrer"
              data-sound
              className="target-lock-hover inline-flex min-h-12 items-center justify-center gap-2 rounded border border-amber/45 bg-amber/10 px-6 text-sm font-bold uppercase tracking-[0.14em] text-amber transition hover:bg-amber/15"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub Profile
            </a>
          </motion.div>
        </div>

        <motion.div
          className="tactical-panel-strong hud-corner scanline-hover relative mx-auto w-full max-w-lg p-6"
          initial={{ opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.82, delay: 0.4 }}
        >
          <div className="grid gap-4">
            <div className="flex items-center justify-between border-b border-radar/15 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-steel">Operator</p>
                <div className="font-display mt-1 text-2xl font-black uppercase text-white">
                  <TypewriterText text="Apkaless" delay={2} speed={60} />
                </div>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-radar/30 bg-radar/10 text-radar">
                <Shield className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Primary", "Developer"],
                ["Focus", "Utilities"],
                ["Mode", "Automation"],
                ["Status", "Online"]
              ].map(([label, value]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-steel">{label}</p>
                  <p className="mt-2 font-display text-sm font-bold uppercase text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded border border-radar/20 bg-radar/[0.04] p-4">
              <p className="terminal-cursor font-mono text-xs uppercase tracking-[0.12em] text-radar">
                deploy --profile apkaless --mission portfolio
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        data-sound
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-steel transition hover:text-radar md:flex"
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
