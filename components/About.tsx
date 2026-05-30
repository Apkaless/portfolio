import { Binary, Boxes, Cpu, Radar, Rocket } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const profileStats = [
  { label: "Operations", value: "Tools" },
  { label: "Deployments", value: "Web" },
  { label: "Systems", value: "Win/Linux" },
  { label: "Protocol", value: "GitHub" }
];

export function About() {
  return (
    <SectionReveal id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-radar">Mission Brief</p>
          <h2 className="font-display mt-4 text-4xl font-black uppercase text-white sm:text-5xl">
            Built for practical digital operations.
          </h2>
        </div>

        <div className="tactical-panel hud-corner p-6 sm:p-8">
          <p className="text-lg leading-8 text-steel">
            Apkaless builds software with a battlefield identity and a professional engineering
            mindset. The work centers on useful tools, automation scripts, gaming and network
            optimizers, Windows utilities, Linux workflows, and small web deployments that solve
            real operational problems.
          </p>
          <p className="mt-5 text-lg leading-8 text-steel">
            The portfolio treats every project as a mission: scoped, deployed, maintained, and
            documented through GitHub. The tone is tactical, but the execution stays clean,
            accessible, and focused on the craft.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {profileStats.map((stat) => (
              <div key={stat.label} className="rounded border border-white/10 bg-black/22 p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-steel">{stat.label}</p>
                <p className="font-display mt-2 text-lg font-black uppercase text-radar">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Cpu,
                title: "Systems Mindset",
                copy: "Utilities and scripts shaped around repeatable workflows and daily-use reliability."
              },
              {
                icon: Radar,
                title: "Tactical Delivery",
                copy: "Projects organized like operations: clear goal, quick deployment, visible telemetry."
              },
              {
                icon: Boxes,
                title: "Developer Arsenal",
                copy: "A growing set of experiments across web basics, terminals, automation, and research."
              }
            ].map((item) => (
              <div key={item.title} className="rounded border border-radar/15 bg-command/45 p-5">
                <item.icon className="h-6 w-6 text-amber" aria-hidden="true" />
                <h3 className="font-display mt-4 text-sm font-black uppercase text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel">{item.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-steel">
            <span className="inline-flex items-center gap-2 rounded border border-radar/20 bg-radar/10 px-3 py-2 text-radar">
              <Binary className="h-4 w-4" aria-hidden="true" />
              Code Ready
            </span>
            <span className="inline-flex items-center gap-2 rounded border border-amber/20 bg-amber/10 px-3 py-2 text-amber">
              <Rocket className="h-4 w-4" aria-hidden="true" />
              Deployment Focused
            </span>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
