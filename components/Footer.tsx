import { Crosshair, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-radar/15 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-steel md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-base font-black uppercase text-white">Apkaless Command Center</p>
          <p className="mt-2">Developer. Tactician. Digital Soldier.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded border border-radar/20 bg-radar/10 px-3 py-2 text-radar">
            <Crosshair className="h-4 w-4" aria-hidden="true" />
            Mission Ready
          </span>
          <a
            href="https://github.com/Apkaless"
            target="_blank"
            rel="noreferrer"
            data-sound
            className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-2 transition hover:border-amber/40 hover:text-amber"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
