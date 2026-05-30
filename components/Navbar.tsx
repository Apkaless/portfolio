"use client";

import { useRef, useState } from "react";
import { Github, Menu, RadioTower, X } from "lucide-react";
import { triggerCyberAttack } from "./CyberAttackOverlay";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Arsenal", href: "#skills" },
  { label: "Missions", href: "#missions" },
  { label: "Archive", href: "#archive" },
  { label: "Contact", href: "#contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickCount.current === 3) {
      triggerCyberAttack();
      clickCount.current = 0;
    }
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 1200);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-radar/15 bg-bunker/72 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <a href="#top" className="group flex items-center gap-3" data-sound aria-label="Apkaless home" onClick={handleLogoClick}>
          <span className="flex h-10 w-10 items-center justify-center rounded border border-radar/35 bg-radar/10 text-radar shadow-tactical-green">
            <RadioTower className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white">
            Apkaless
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-sound
              className="rounded px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-steel transition hover:bg-white/5 hover:text-radar"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com/Apkaless"
            target="_blank"
            rel="noreferrer"
            data-sound
            className="inline-flex items-center gap-2 rounded border border-amber/35 bg-amber/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-amber transition hover:border-amber hover:bg-amber/15"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </div>

        <button
          type="button"
          data-sound
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/15 bg-white/5 text-white md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div id="mobile-navigation" className="border-t border-radar/15 bg-bunker/94 px-4 py-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-sound
                onClick={() => setOpen(false)}
                className="rounded border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-steel"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://github.com/Apkaless"
              target="_blank"
              rel="noreferrer"
              data-sound
              className="mt-2 inline-flex items-center justify-center gap-2 rounded border border-amber/35 bg-amber/10 px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-amber"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub Profile
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
