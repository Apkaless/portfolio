"use client";

import { Target } from "lucide-react";
import type { PortfolioRepo } from "@/lib/github";
import { RepoCard } from "./RepoCard";
import { SectionReveal } from "./SectionReveal";

type FeaturedMissionsProps = {
  repos: PortfolioRepo[];
};

export function FeaturedMissions({ repos }: FeaturedMissionsProps) {
  return (
    <SectionReveal id="missions" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-radar">Featured Missions</p>
            <h2 className="font-display mt-4 max-w-3xl text-4xl font-black uppercase text-white sm:text-5xl">
              Clean deployments pulled from the front line.
            </h2>
          </div>
          <div className="inline-flex items-center gap-3 rounded border border-amber/25 bg-amber/10 px-4 py-3 text-sm font-semibold text-amber">
            <Target className="h-5 w-5" aria-hidden="true" />
            Ranked by quality signals and recency
          </div>
        </div>

        {repos.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} featured />
            ))}
          </div>
        ) : (
          <div className="tactical-panel mt-10 p-8 text-center text-steel">
            Featured mission telemetry is waiting on GitHub data.
          </div>
        )}
      </div>
    </SectionReveal>
  );
}
