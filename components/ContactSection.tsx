"use client";

import { FormEvent, useState } from "react";
import type { ElementType } from "react";
import { FaDiscord, FaGithub, FaInstagram } from "react-icons/fa";
import {
  Check,
  Copy,
  ExternalLink,
  Mail,
  MessageSquare,
  Radio,
  Send,
  ShieldAlert,
  SignalHigh
} from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { TacticalGlobe } from "./TacticalGlobe";
import { TypewriterText } from "./TypewriterText";

type LinkContact = {
  kind: "link";
  label: string;
  value: string;
  href: string;
  icon: ElementType;
};

type CopyContact = {
  kind: "copy";
  label: string;
  value: string;
  copyValue: string;
  icon: ElementType;
  helper: string;
};

type ContactCard = LinkContact | CopyContact;

const emailAddress = "sabah.hsab1234@gmail.com";

const socialCards: ContactCard[] = [
  {
    kind: "link",
    label: "GitHub",
    value: "@Apkaless",
    href: "https://github.com/Apkaless",
    icon: FaGithub
  },
  {
    kind: "link",
    label: "Instagram",
    value: "@Apkaless",
    href: "https://www.instagram.com/Apkaless/",
    icon: FaInstagram
  },
  {
    kind: "copy",
    label: "Discord",
    value: "Apkaless",
    copyValue: "Apkaless",
    icon: FaDiscord,
    helper: "Copy username"
  },
  {
    kind: "link",
    label: "Email",
    value: emailAddress,
    href: `mailto:${emailAddress}`,
    icon: Mail
  }
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("All transmission fields are required.");
      setSubmitted(false);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Enter a valid email signal.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
    event.currentTarget.reset();
  }

  async function copyContact(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1600);
    } catch {
      setError(`Copy failed. Use ${value} manually.`);
    }
  }

  return (
    <SectionReveal id="contact" className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-40">
        <TacticalGlobe />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="contact-command-panel hud-corner overflow-x-hidden p-4 sm:p-5 md:p-7">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-5">
              <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-radar">
                Contact Command
              </p>
              <h2 className="font-display mt-4 max-w-2xl text-2xl font-black uppercase text-white sm:text-4xl md:text-5xl">
                <TypewriterText text="Open the Apkaless signal network." />
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-steel">
                Every social handle uses Apkaless. Use the live channels, copy Discord, or send a
                direct transmission to the active email route.
              </p>

              <div className="mt-6 overflow-hidden rounded border border-radar/18 bg-black/[0.08] px-4 py-3 backdrop-blur-[2px]">
                <div className="flex min-w-max animate-[drift_10s_ease-in-out_infinite] items-center gap-4 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-radar sm:text-[0.68rem] sm:tracking-[0.18em]">
                  <span>Signal online</span>
                  <span className="h-1 w-1 rounded-full bg-amber shadow-[0_0_12px_rgba(255,122,24,0.9)]" />
                  <span>GitHub active</span>
                  <span className="h-1 w-1 rounded-full bg-radar shadow-[0_0_12px_rgba(125,220,255,0.9)]" />
                  <span>Transmission channel open</span>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${emailAddress}`}
                  data-sound
                  className="cinematic-button inline-flex min-h-12 items-center justify-center gap-2 rounded border border-radar/45 bg-radar/[0.08] px-5 text-sm font-bold uppercase tracking-[0.14em] text-radar shadow-tactical-green transition hover:bg-radar/14"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email Apkaless
                </a>
                <a
                  href="https://github.com/Apkaless"
                  target="_blank"
                  rel="noreferrer"
                  data-sound
                  className="cinematic-button inline-flex min-h-12 items-center justify-center gap-2 rounded border border-amber/45 bg-amber/[0.06] px-5 text-sm font-bold uppercase tracking-[0.14em] text-amber transition hover:bg-amber/12"
                >
                  <FaGithub className="h-4 w-4" aria-hidden="true" />
                  GitHub Profile
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {socialCards.map((card) => {
                  const Icon = card.icon;
                  const content = (
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded border border-radar/25 bg-radar/[0.06] text-radar shadow-[0_0_20px_rgba(125,220,255,0.12)]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.025] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-steel">
                          {card.kind === "link" ? "Open" : copied === card.label ? "Copied" : "Copy"}
                        </span>
                      </div>
                      <h3 className="font-display mt-5 text-sm font-black uppercase text-white">{card.label}</h3>
                      <p className="mt-2 break-all text-sm text-steel sm:break-words">{card.value}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-radar">
                        {card.kind === "link" ? (
                          <>
                            Open channel
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </>
                        ) : copied === card.label ? (
                          <>
                            Copied
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          </>
                        ) : (
                          <>
                            {card.helper}
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          </>
                        )}
                      </span>
                    </div>
                  );

                  return card.kind === "link" ? (
                    <a
                      key={card.label}
                      href={card.href}
                      target={card.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={card.href.startsWith("mailto:") ? undefined : "noreferrer"}
                      data-sound
                      className="contact-glass-card scanline-hover min-w-0 rounded p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-radar/45 hover:shadow-tactical-green"
                    >
                      {content}
                    </a>
                  ) : (
                    <button
                      key={card.label}
                      type="button"
                      data-sound
                      onClick={() => copyContact(card.copyValue, card.label)}
                      className="contact-glass-card scanline-hover min-w-0 rounded p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-radar/45 hover:shadow-tactical-green"
                      aria-label={`Copy ${card.label} contact: ${card.value}`}
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="rounded border border-radar/18 bg-black/[0.08] p-3 backdrop-blur-[2px] sm:p-5">
                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { label: "Handle", value: "@Apkaless", icon: SignalHigh },
                    { label: "Email", value: "Live", icon: Mail },
                    { label: "Mode", value: "Open", icon: MessageSquare }
                  ].map((item) => (
                    <div key={item.label} className="contact-glass-card min-w-0 rounded p-4">
                      <item.icon className="h-4 w-4 text-amber" aria-hidden="true" />
                      <p className="font-display mt-3 text-sm font-black uppercase text-white truncate">{item.value}</p>
                      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-steel truncate">{item.label}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className={`relative rounded border p-5 backdrop-blur-[2px] sm:p-6 transition-all duration-500 ${error ? "animate-defcon-pulse border-hazard/60 bg-hazard/10" : "border-white/10 bg-black/[0.08]"}`} noValidate>
                  {error ? <div className="pointer-events-none absolute inset-0 rounded bg-[linear-gradient(180deg,transparent_0%,rgba(255,63,46,0.1)_50%,transparent_100%)] animate-scanline opacity-50 mix-blend-overlay" /> : null}
                  <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded border border-radar/30 bg-radar/[0.06] text-radar">
                      <Radio className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-black uppercase text-white">Transmission Form</h3>
                      <p className="text-sm text-steel">Frontend-only dispatch console</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-5">
                    <label htmlFor="transmission-name" className="grid gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-steel">Name</span>
                      <input
                        id="transmission-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className={`field-glass min-h-12 rounded border px-4 text-white placeholder:text-steel/70 transition-colors ${error ? "border-hazard/50 focus:border-hazard" : "border-white/10"}`}
                        placeholder="Operator name"
                        required
                      />
                    </label>
                    <label htmlFor="transmission-email" className="grid gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-steel">Email</span>
                      <input
                        id="transmission-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={`field-glass min-h-12 rounded border px-4 text-white placeholder:text-steel/70 transition-colors ${error ? "border-hazard/50 focus:border-hazard" : "border-white/10"}`}
                        placeholder="operator@example.com"
                        required
                      />
                    </label>
                    <label htmlFor="transmission-message" className="grid gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-steel">Message</span>
                      <textarea
                        id="transmission-message"
                        name="message"
                        rows={5}
                        className={`field-glass resize-y rounded border px-4 py-3 text-white placeholder:text-steel/70 transition-colors ${error ? "border-hazard/50 focus:border-hazard" : "border-white/10"}`}
                        placeholder="Mission details..."
                        required
                      />
                    </label>
                  </div>

                  {error ? (
                    <p className="mt-5 flex items-center gap-2 rounded border border-hazard/25 bg-hazard/10 px-4 py-3 text-sm text-hazard">
                      <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                      {error}
                    </p>
                  ) : null}

                  {submitted ? (
                    <p className="mt-5 rounded border border-radar/25 bg-radar/10 px-4 py-3 text-sm text-radar">
                      Transmission staged. Email route: {emailAddress}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    data-sound
                    className="cinematic-button mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded border border-radar/50 bg-radar/[0.08] px-6 text-sm font-bold uppercase tracking-[0.14em] text-radar shadow-tactical-green transition hover:bg-radar/14"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send Transmission
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
