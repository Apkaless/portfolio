"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Archive,
  ChevronDown,
  Code2,
  Filter,
  GitFork,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Star
} from "lucide-react";
import { useMemo, useState } from "react";
import type { PortfolioRepo, RepoStatus } from "@/lib/github";
import { formatNumber } from "@/lib/format";
import { RepoCard } from "./RepoCard";
import { SectionReveal } from "./SectionReveal";

type SortMode = "newest" | "stars" | "name";
type StatusMode = "all" | RepoStatus;

type RepoArchiveProps = {
  repos: PortfolioRepo[];
  error: string | null;
};

const sortOptions: Array<{ value: SortMode; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "stars", label: "Stars" },
  { value: "name", label: "Name" }
];

const statusOptions: Array<{ value: StatusMode; label: string }> = [
  { value: "all", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Legacy", label: "Legacy" },
  { value: "Archived-style", label: "Archived" }
];

function matchesSearch(repo: PortfolioRepo, query: string) {
  const haystack = [repo.name, repo.description ?? "", repo.language ?? "", ...repo.topics]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase().trim());
}

export function RepoArchive({ repos, error }: RepoArchiveProps) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [status, setStatus] = useState<StatusMode>("all");
  const [sort, setSort] = useState<SortMode>("newest");

  const stats = useMemo(() => {
    const languageCounts = new Map<string, number>();

    for (const repo of repos) {
      if (repo.language) {
        languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
      }
    }

    return {
      active: repos.filter((repo) => repo.status === "Active").length,
      stars: repos.reduce((total, repo) => total + repo.stars, 0),
      forks: repos.reduce((total, repo) => total + repo.forks, 0),
      languages: Array.from(languageCounts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    };
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => (language === "all" ? true : repo.language === language))
      .filter((repo) => (status === "all" ? true : repo.status === status))
      .filter((repo) => (query.trim() ? matchesSearch(repo, query) : true))
      .sort((a, b) => {
        if (sort === "stars") {
          return b.stars - a.stars || a.name.localeCompare(b.name);
        }

        if (sort === "name") {
          return a.name.localeCompare(b.name);
        }

        return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime();
      });
  }, [language, query, repos, sort, status]);

  return (
    <SectionReveal id="archive" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="archive-command-panel hud-corner relative z-50 overflow-visible p-5 sm:p-7">
          <div className="grid gap-7 lg:grid-cols-[1fr_23rem] lg:items-end">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-radar">
                Mission Archive
              </p>
              <h2 className="font-display mt-4 max-w-4xl text-3xl font-black uppercase text-white sm:text-5xl">
                Repository command deck.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-steel">
                Live GitHub operations for Apkaless, organized by status, language, activity, and
                signal strength.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Missions", value: repos.length, icon: Archive },
                { label: "Active", value: stats.active, icon: Activity },
                { label: "Stars", value: formatNumber(stats.stars), icon: Star },
                { label: "Forks", value: formatNumber(stats.forks), icon: GitFork }
              ].map((item) => (
                <div key={item.label} className="rounded border border-white/10 bg-black/[0.10] p-4 backdrop-blur-[2px]">
                  <item.icon className="h-4 w-4 text-radar" aria-hidden="true" />
                  <p className="font-display mt-3 text-2xl font-black uppercase text-white">{item.value}</p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-steel">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 border-t border-white/10 pt-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search repositories</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-radar" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search mission archive..."
                className="min-h-[3.25rem] w-full rounded border border-radar/20 bg-black/[0.12] py-4 pl-11 pr-4 text-sm text-white placeholder:text-steel/70 backdrop-blur-[2px]"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  data-sound
                  onClick={() => setSort(option.value)}
                  className={`rounded border px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition ${
                    sort === option.value
                      ? "border-radar/60 bg-radar/15 text-radar"
                      : "border-white/10 bg-black/[0.08] text-steel hover:border-radar/35 hover:bg-black/[0.14] hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded border border-white/10 bg-black/[0.08] px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-steel">
                <Filter className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
                Status
              </span>
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  data-sound
                  onClick={() => setStatus(option.value)}
                  className={`rounded border px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.13em] transition ${
                    status === option.value
                      ? "border-amber/55 bg-amber/15 text-amber"
                      : "border-white/10 bg-white/[0.03] text-steel hover:border-amber/35 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-56 z-20">
              <span className="sr-only">Filter by language</span>
              <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-steel z-10" aria-hidden="true" />
              
              <CustomSelect
                value={language}
                onChange={setLanguage}
                options={[
                  { value: "all", label: "All Languages" },
                  ...stats.languages.map(([item]) => ({ value: item, label: item }))
                ]}
              />
            </div>
          </div>

          {stats.languages.length > 0 ? (
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                data-sound
                onClick={() => setLanguage("all")}
                className={`shrink-0 rounded-full border px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] ${
                  language === "all"
                    ? "border-radar/60 bg-radar/15 text-radar"
                    : "border-white/10 bg-white/[0.03] text-steel"
                }`}
              >
                All Stacks
              </button>
              {stats.languages.map(([item, count]) => (
                <button
                  key={item}
                  type="button"
                  data-sound
                  onClick={() => setLanguage(item)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] transition ${
                    language === item
                      ? "border-radar/60 bg-radar/15 text-radar"
                      : "border-white/10 bg-white/[0.03] text-steel hover:border-radar/35 hover:text-white"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {item}
                  <span className="text-white/60">{count}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-steel">
          <p className="rounded border border-radar/20 bg-radar/10 px-4 py-2 font-semibold text-radar">
            {filteredRepos.length} / {repos.length} missions visible
          </p>
          <p className="text-xs uppercase tracking-[0.18em]">Source: GitHub public repository API</p>
        </div>

        {error ? (
          <div className="relative mt-5 overflow-hidden rounded border border-hazard/50 bg-hazard/10 p-4 text-sm leading-6 text-hazard animate-defcon-pulse">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,63,46,0.1)_50%,transparent_100%)] animate-scanline opacity-50 mix-blend-overlay" />
            <div className="relative z-10 flex items-center gap-3">
              <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              {error}
            </div>
          </div>
        ) : null}

        {repos.length === 0 && !error ? (
          <div className="tactical-panel mt-10 p-8 text-center text-steel">
            Loading mission data or no public repositories were returned.
          </div>
        ) : null}

        {filteredRepos.length > 0 ? (
          <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : repos.length > 0 ? (
          <div className="tactical-panel mt-10 p-8 text-center text-steel">
            No missions match the current archive filter.
          </div>
        ) : null}
      </div>
    </SectionReveal>
  );
}

function CustomSelect({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: {value: string, label: string}[] }) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative w-full">
      <button
        type="button"
        data-sound
        onClick={() => setOpen(!open)}
        className="flex min-h-11 w-full items-center justify-between rounded border border-white/10 bg-black/[0.12] pl-11 pr-4 text-sm text-white backdrop-blur-[2px] transition hover:border-radar/50 focus:border-radar/50 focus:outline-none"
      >
        <span>{selectedOption ? selectedOption.label : "Select..."}</span>
        <ChevronDown className={`h-4 w-4 text-steel transition-transform duration-300 ${open ? "rotate-180 text-radar" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded border border-radar/30 bg-[#0c0f10] shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            >
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                      value === option.value
                        ? "bg-radar/20 font-bold text-radar"
                        : "text-steel hover:bg-radar/10 hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
