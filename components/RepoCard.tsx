"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  Code2,
  ExternalLink,
  GitFork,
  Github,
  RadioTower,
  Star,
  TerminalSquare
} from "lucide-react";
import type { PortfolioRepo, RepoStatus } from "@/lib/github";
import { formatNumber, formatRepoDate } from "@/lib/format";

type RepoCardProps = {
  repo: PortfolioRepo;
  featured?: boolean;
};

const statusClasses: Record<RepoStatus, string> = {
  Active: "border-radar/40 bg-radar/10 text-radar shadow-[0_0_18px_rgba(125,220,255,0.14)]",
  Legacy: "border-amber/40 bg-amber/10 text-amber shadow-[0_0_18px_rgba(255,184,77,0.1)]",
  "Archived-style": "border-hazard/40 bg-hazard/10 text-hazard"
};

function activityWidth(status: RepoStatus) {
  if (status === "Active") {
    return "w-[92%]";
  }

  if (status === "Legacy") {
    return "w-[56%]";
  }

  return "w-[24%]";
}

export function RepoCard({ repo, featured = false }: RepoCardProps) {
  const techBadge = repo.language ?? repo.topics[0] ?? "Utility";
  const description =
    repo.description ??
    "No field notes published yet. Open the repository to inspect the mission payload.";
  const visibleTopics = repo.topics.slice(0, 3);

  return (
    <motion.article
      layout
      className="scanline-hover repo-card-panel group relative flex h-full min-h-[21rem] flex-col overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-radar/45 hover:shadow-tactical-green"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-radar via-amber to-transparent opacity-70" />
      <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full border border-radar/10">
        <div className="absolute inset-4 rounded-full border border-amber/10" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-full animate-hex-dump bg-[linear-gradient(0deg,transparent_0%,rgba(125,220,255,0.1)_50%,transparent_100%)] bg-[length:100%_4px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(125,220,255,0.08)_1px,transparent_1px)] bg-[length:12px_100%] opacity-50" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/[0.08] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-steel backdrop-blur-[2px]">
            <TerminalSquare className="h-3.5 w-3.5 text-radar" aria-hidden="true" />
            {featured ? "Featured Mission" : "Repository File"}
          </p>
          <h3 className="font-display break-words text-xl font-black uppercase text-white">
            {repo.name}
          </h3>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] ${statusClasses[repo.status]}`}>
          {repo.status === "Archived-style" ? "Archived" : repo.status}
        </span>
      </div>

      <p className="relative mt-4 line-clamp-4 flex-1 text-sm leading-6 text-steel">{description}</p>

      <div className="relative mt-5">
        <div className="mb-2 flex items-center justify-between text-[0.66rem] uppercase tracking-[0.16em] text-steel">
          <span>Activity Signal</span>
          <span>{repo.status === "Active" ? "High" : repo.status === "Legacy" ? "Medium" : "Low"}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
          <div className={`h-full rounded-full bg-gradient-to-r from-radar to-amber ${activityWidth(repo.status)}`} />
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-radar/20 bg-radar/10 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-radar">
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
          {techBadge}
        </span>
        {visibleTopics.map((topic) => (
          <span key={topic} className="rounded-full border border-white/10 bg-white/[0.018] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-steel backdrop-blur-[2px]">
            {topic}
          </span>
        ))}
        {repo.fork ? (
          <span className="rounded-full border border-white/12 bg-white/[0.02] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-steel backdrop-blur-[2px]">
            Fork
          </span>
        ) : null}
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-sm text-steel">
        <span className="flex items-center gap-1.5 rounded border border-white/10 bg-black/[0.06] px-2 py-2 backdrop-blur-[2px]">
          <Star className="h-4 w-4 text-amber" aria-hidden="true" />
          {formatNumber(repo.stars)}
        </span>
        <span className="flex items-center gap-1.5 rounded border border-white/10 bg-black/[0.06] px-2 py-2 backdrop-blur-[2px]">
          <GitFork className="h-4 w-4 text-radar" aria-hidden="true" />
          {formatNumber(repo.forks)}
        </span>
        <span className="flex min-w-0 items-center gap-1.5 rounded border border-white/10 bg-black/[0.06] px-2 py-2 backdrop-blur-[2px]">
          <CalendarClock className="h-4 w-4 shrink-0 text-steel" aria-hidden="true" />
          <span className="truncate">{formatRepoDate(repo.lastActivityAt)}</span>
        </span>
      </div>

      <div className="relative mt-5 grid grid-cols-[1fr_auto] gap-2">
        <div className="target-lock-hover flex">
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noreferrer"
            data-sound
            className="cinematic-button w-full relative z-10 inline-flex min-h-11 items-center justify-center gap-2 rounded border border-radar/35 bg-radar/[0.06] px-4 text-sm font-bold uppercase tracking-[0.14em] text-radar transition hover:border-radar/70 hover:bg-radar/12"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            Open Mission
          </a>
        </div>
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noreferrer"
          data-sound
          className="cinematic-button relative z-10 inline-flex h-11 w-11 items-center justify-center rounded border border-white/12 bg-white/[0.018] text-white transition hover:border-amber/45 hover:text-amber"
          aria-label={`Open ${repo.name} in a new tab`}
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div className="relative mt-4 flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.16em] text-steel">
        <RadioTower className="h-3.5 w-3.5 text-radar" aria-hidden="true" />
        Telemetry synced from GitHub
      </div>
    </motion.article>
  );
}
