"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Waves, MousePointer2 } from "lucide-react";

const MUSIC_SRC = "/audio/music.mp3";

// Web Audio API Synthesized Tactical Click Sound - bulletproof and does not require static files!
function playClickSynth(vol: number) {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(1500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.035);
    
    gain.gain.setValueAtTime(vol * 0.16, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch (e) {
    // Ignore any audio context blocking errors
  }
}

export function AudioControl() {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [volume, setVolume] = useState(0.38);
  const [prefsLoaded, setPrefsLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const music = new Audio();
    music.loop = true;
    music.preload = "auto";
    music.src = MUSIC_SRC;
    musicRef.current = music;

    const timeout = window.setTimeout(() => {
      const savedMuted = window.localStorage.getItem("apkaless-audio-muted");
      const savedVolume = Number(window.localStorage.getItem("apkaless-audio-volume"));
      const savedSfx = window.localStorage.getItem("apkaless-audio-sfx");

      if (savedSfx !== null) {
        setSfxEnabled(savedSfx === "true");
      }

      if (savedMuted !== null) {
        const isMuted = savedMuted === "true";
        setMuted(isMuted);
        music.muted = isMuted;
        music.volume = isMuted ? 0 : (Number.isNaN(savedVolume) ? 0.38 : savedVolume);
      }

      if (!Number.isNaN(savedVolume)) {
        setVolume(Math.min(1, Math.max(0, savedVolume)));
        if (savedMuted !== "true") {
          music.volume = Math.min(1, Math.max(0, savedVolume));
        }
      }

      setPrefsLoaded(true);

      music.play()
        .then(() => {
          setEnabled(true);
        })
        .catch((err) => {
          console.warn("Autoplay was prevented by the browser. Waiting for user interaction.", err);
        });
    }, 0);

    const onError = () => setAudioError(true);
    music.addEventListener("error", onError);

    return () => {
      window.clearTimeout(timeout);
      music.pause();
      music.removeEventListener("error", onError);
      musicRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!prefsLoaded) {
      return;
    }

    window.localStorage.setItem("apkaless-audio-muted", String(muted));
    window.localStorage.setItem("apkaless-audio-volume", String(volume));
    window.localStorage.setItem("apkaless-audio-sfx", String(sfxEnabled));

    if (musicRef.current) {
      musicRef.current.volume = muted ? 0 : volume;
      musicRef.current.muted = muted;
    }
  }, [muted, prefsLoaded, volume]);

  useEffect(() => {
    const playCue = () => {
      if (!sfxEnabled || muted) {
        return;
      }
      playClickSynth(volume);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-sound]")) {
        playCue();
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-sound]")) {
        playCue();
      }
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("click", onClick);
    };
  }, [enabled, muted, volume, sfxEnabled]);

  function toggleSfx() {
    setSfxEnabled((prev) => !prev);
  }

  function toggleAudio() {
    const music = musicRef.current;
    if (!music) {
      return;
    }

    if (enabled) {
      music.pause();
      setEnabled(false);
      return;
    }

    setMuted(false);
    music.muted = false;
    music.volume = volume;

    setAudioError(false);
    music.play()
      .then(() => {
        setEnabled(true);
      })
      .catch((err) => {
        console.error("Audio playback error:", err);
        setAudioError(true);
        setEnabled(false);
      });
  }

  function toggleMute() {
    const music = musicRef.current;
    if (!music) return;

    const nextMuted = !muted;
    setMuted(nextMuted);

    music.muted = nextMuted;
    music.volume = nextMuted ? 0 : volume;

    if (nextMuted) {
      music.pause();
      setEnabled(false);
    } else {
      if (!enabled) {
        setAudioError(false);
        void music.play()
          .then(() => setEnabled(true))
          .catch(() => setAudioError(true));
      }
    }
  }

  return (
    <div className="fixed bottom-3 right-3 z-50 w-[min(92vw,16.5rem)] rounded border border-radar/25 bg-bunker/82 p-2.5 shadow-tactical-green backdrop-blur-xl sm:bottom-4 sm:right-4 sm:w-[19rem] sm:p-3">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <button
          type="button"
          data-sound
          onClick={toggleAudio}
          className="inline-flex min-h-9 flex-1 items-center justify-center gap-2 rounded border border-radar/25 bg-radar/10 px-3 text-xs font-semibold uppercase text-radar transition hover:border-radar/60 hover:bg-radar/15 sm:min-h-10"
          aria-pressed={enabled}
          aria-label={enabled ? "Pause battlefield ambience" : "Play battlefield ambience"}
        >
          <Waves className="h-4 w-4" aria-hidden="true" />
          {enabled ? "Live" : "Audio"}
        </button>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleSfx}
            className={`inline-flex h-9 w-9 items-center justify-center rounded border transition sm:h-10 sm:w-10 ${sfxEnabled ? "border-white/20 bg-white/10 text-white hover:border-amber/60 hover:text-amber" : "border-white/10 bg-transparent text-white/40 hover:border-white/20 hover:text-white/70"}`}
            aria-label={sfxEnabled ? "Disable UI sounds" : "Enable UI sounds"}
            aria-pressed={sfxEnabled}
            title="Toggle interaction sounds"
          >
            <MousePointer2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            data-sound
            onClick={toggleMute}
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/12 bg-white/5 text-white transition hover:border-amber/60 hover:text-amber sm:h-10 sm:w-10"
            aria-label={muted ? "Unmute audio" : "Mute audio"}
            aria-pressed={muted}
            title="Mute all audio"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <label className="mt-2 block text-[0.64rem] uppercase tracking-[0.18em] text-steel sm:mt-3 sm:text-[0.68rem]" htmlFor="audio-volume">
        Signal Volume
      </label>
      <input
        id="audio-volume"
        className="range-control mt-1.5 w-full sm:mt-2"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(event) => setVolume(Number(event.target.value))}
        aria-label="Audio volume"
      />
      <p className="mt-2 hidden text-[0.7rem] text-steel sm:block">
        {audioError ? "Signal path offline. Retrying link..." : muted ? "Muted across the command deck." : "Ambient transmission ready."}
      </p>
    </div>
  );
}

