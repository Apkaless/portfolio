"use client";

import {
  Bot,
  Cpu,
  GitBranch,
  Globe2,
  Network,
  ShieldCheck,
  Terminal,
  Wrench
} from "lucide-react";
import { FaGithub, FaHtml5, FaLinux, FaPython, FaWindows } from "react-icons/fa";
import { SectionReveal } from "./SectionReveal";

const skills = [
  {
    name: "Python",
    description: "Automation, utilities, scripts, and operational tooling.",
    icon: FaPython,
    accent: "text-radar"
  },
  {
    name: "HTML",
    description: "Clean page structure, semantic markup, and web basics.",
    icon: FaHtml5,
    accent: "text-amber"
  },
  {
    name: "Shell Scripting",
    description: "Command-line workflows for repeatable deployments.",
    icon: Terminal,
    accent: "text-radar"
  },
  {
    name: "Windows Utilities",
    description: "Practical tools for desktop maintenance and tuning.",
    icon: FaWindows,
    accent: "text-sky-300"
  },
  {
    name: "Linux Tools",
    description: "Terminal-first utilities and system workflow experiments.",
    icon: FaLinux,
    accent: "text-white"
  },
  {
    name: "Automation",
    description: "Task runners, scripts, and workflow accelerators.",
    icon: Bot,
    accent: "text-radar"
  },
  {
    name: "Networking Tools",
    description: "Connectivity, gaming optimization, and protocol learning.",
    icon: Network,
    accent: "text-amber"
  },
  {
    name: "Git & GitHub",
    description: "Version control, public missions, and repo operations.",
    icon: FaGithub,
    accent: "text-white"
  },
  {
    name: "Web Development Basics",
    description: "Frontend foundations, responsive UI, and deployment habits.",
    icon: Globe2,
    accent: "text-radar"
  },
  {
    name: "Security Research",
    description: "Cybersecurity learning with responsible research practices.",
    icon: ShieldCheck,
    accent: "text-hazard"
  }
];

export function SkillsArsenal() {
  return (
    <SectionReveal id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-radar">Skills Arsenal</p>
            <h2 className="font-display mt-4 max-w-3xl text-4xl font-black uppercase text-white sm:text-5xl">
              Tools loaded for field-ready development.
            </h2>
          </div>
          <div className="tactical-panel hidden max-w-sm p-4 text-sm leading-6 text-steel md:block">
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-amber" aria-hidden="true" />
              <span>Command stack calibrated for utilities, automation, and systems practice.</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((skill) => (
            <article
              key={skill.name}
              className="scanline-hover rounded border border-white/10 bg-bunker/62 p-5 transition hover:-translate-y-1 hover:border-radar/35 hover:bg-command/70 hover:shadow-tactical-green"
            >
              <skill.icon className={`h-7 w-7 ${skill.accent}`} aria-hidden="true" />
              <h3 className="font-display mt-5 text-base font-black uppercase text-white">{skill.name}</h3>
              <p className="mt-3 text-sm leading-6 text-steel">{skill.description}</p>
              <div className="mt-5 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-radar/80">
                <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                Arsenal Item
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded border border-amber/20 bg-amber/[0.05] p-5 text-sm leading-7 text-amber">
          <div className="flex items-start gap-3">
            <Wrench className="mt-1 h-5 w-5 flex-none" aria-hidden="true" />
            <p>
              The stack is intentionally practical: scripts that save time, interfaces that stay
              clear, and experiments that keep the operator learning.
            </p>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
