// ─────────────────────────────────────────────────────────────────────────────
// FILE: lib/hooks/use-sound-engine.ts
// PURPOSE: Procedural Web Audio API sounds. Zero audio files.
// USAGE:   const { play } = useSoundEngine();   play("lidClose");
//
// All synthesis callbacks read `isSoundEnabled` at call-time via closure
// over the stable callback ref — no stale captures from the outer scope.
// AudioContext is lazy-initialised on first call (browser autoplay policy).
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useRef, useCallback } from "react";
import { useExperienceStore } from "@/store/use-experience-store";

export type SoundName = "lidClose" | "ssdEject" | "ssdInsert" | "boot" | "keyTick";

export function useSoundEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const isSoundEnabled = useExperienceStore((s) => s.isSoundEnabled);

  // ── Lazy AudioContext (satisfies browser autoplay policy) ─────────────────
  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )();
    }
    // Resume if suspended (tab-switch, autoplay policy blocking)
    if (ctxRef.current.state === "suspended") {
      void ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // ── Lid close: low sine burst, 0.25s decay ────────────────────────────────
  const playLidClose = useCallback(() => {
    if (!isSoundEnabled) return;
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    const osc  = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + 0.14);
    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc.start(t);
    osc.stop(t + 0.28);
  }, [isSoundEnabled, getCtx]);

  // ── SSD eject: bandpass white-noise click ────────────────────────────────
  const playSSDEject = useCallback(() => {
    if (!isSoundEnabled) return;
    const c = getCtx(); if (!c) return;
    const t         = c.currentTime;
    const frames    = Math.floor(c.sampleRate * 0.15);
    const buf       = c.createBuffer(1, frames, c.sampleRate);
    const data      = buf.getChannelData(0);
    const decay     = c.sampleRate * 0.035;
    for (let i = 0; i < frames; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / decay);
    }
    const src  = c.createBufferSource();
    const filt = c.createBiquadFilter();
    const gain = c.createGain();
    filt.type          = "bandpass";
    filt.frequency.value = 3400;
    filt.Q.value       = 1.8;
    src.buffer = buf;
    src.connect(filt);
    filt.connect(gain);
    gain.connect(c.destination);
    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    src.start(t);
  }, [isSoundEnabled, getCtx]);

  // ── SSD insert: chunk + low thud ─────────────────────────────────────────
  const playSSDInsert = useCallback(() => {
    if (!isSoundEnabled) return;
    const c = getCtx(); if (!c) return;
    const t      = c.currentTime;
    // White noise burst
    const frames = Math.floor(c.sampleRate * 0.08);
    const buf    = c.createBuffer(1, frames, c.sampleRate);
    const data   = buf.getChannelData(0);
    const decay  = c.sampleRate * 0.015;
    for (let i = 0; i < frames; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / decay);
    }
    const src  = c.createBufferSource();
    const gain = c.createGain();
    src.buffer = buf;
    src.connect(gain);
    gain.connect(c.destination);
    gain.gain.setValueAtTime(0.32, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    src.start(t);
    // Low thud underneath
    const osc = c.createOscillator();
    const og  = c.createGain();
    osc.connect(og);
    og.connect(c.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.1);
    og.gain.setValueAtTime(0.18, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    osc.start(t);
    osc.stop(t + 0.14);
  }, [isSoundEnabled, getCtx]);

  // ── Boot: ascending C5-E5-G5 chime ───────────────────────────────────────
  const playBoot = useCallback(() => {
    if (!isSoundEnabled) return;
    const c = getCtx(); if (!c) return;
    const t = c.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      const st = t + i * 0.18;
      gain.gain.setValueAtTime(0, st);
      gain.gain.linearRampToValueAtTime(0.14, st + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.65);
      osc.start(st);
      osc.stop(st + 0.65);
    });
  }, [isSoundEnabled, getCtx]);

  // ── Key tick: faint 0.03s click ──────────────────────────────────────────
  const playKeyTick = useCallback(() => {
    if (!isSoundEnabled) return;
    const c = getCtx(); if (!c) return;
    const t      = c.currentTime;
    const frames = Math.floor(c.sampleRate * 0.025);
    const buf    = c.createBuffer(1, frames, c.sampleRate);
    const data   = buf.getChannelData(0);
    const decay  = c.sampleRate * 0.004;
    for (let i = 0; i < frames; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / decay);
    }
    const src  = c.createBufferSource();
    const gain = c.createGain();
    src.buffer = buf;
    src.connect(gain);
    gain.connect(c.destination);
    gain.gain.value = 0.07;
    src.start(t);
  }, [isSoundEnabled, getCtx]);

  // ── Public API ────────────────────────────────────────────────────────────
  const play = useCallback(
    (name: SoundName) => {
      const map: Record<SoundName, () => void> = {
        lidClose:  playLidClose,
        ssdEject:  playSSDEject,
        ssdInsert: playSSDInsert,
        boot:      playBoot,
        keyTick:   playKeyTick,
      };
      map[name]?.();
    },
    [playLidClose, playSSDEject, playSSDInsert, playBoot, playKeyTick]
  );

  return {
    play,
    playLidClose,
    playSSDEject,
    playSSDInsert,
    playBoot,
    playKeyTick,
  };
}
