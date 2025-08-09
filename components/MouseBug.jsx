'use client';
import { useEffect, useRef, useState } from 'react';

export default function MouseBug({
  size = 72,           // bug size in px
  hideOnMobile = true, // don’t render on small screens
}) {
  const elRef   = useRef(null);
  const posRef  = useRef({ x: 0, y: 0 });
  const velRef  = useRef({ x: 0, y: 0 });
  const tgtRef  = useRef({ x: 0, y: 0 });
  const modeRef = useRef('wander');  // <— replaces “state” so we never hit your error
  const speedRef = useRef(160);      // px/s, tweaked randomly
  const rafRef  = useRef(0);

  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Respect mobile + reduced-motion
    if (hideOnMobile && window.matchMedia('(max-width: 768px)').matches) {
      setEnabled(false);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEnabled(false);
      return;
    }

    // start roughly on the right side
    const w = window.innerWidth;
    const h = window.innerHeight;
    posRef.current = { x: w * 0.7, y: h * 0.4 };
    velRef.current = { x: 0, y: 0 };

    const pickTarget = (opts = {}) => {
      const margin = 120;
      const offscreen = Math.random() < 0.18; // sometimes exit the screen
      let x, y;
      if (offscreen) {
        // pick a random edge then come back in
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { x = -margin;        y = Math.random() * h; }
        if (edge === 1) { x = w + margin;     y = Math.random() * h; }
        if (edge === 2) { x = Math.random() * w; y = -margin; }
        if (edge === 3) { x = Math.random() * w; y = h + margin; }
      } else {
        x = Math.random() * w;
        y = Math.random() * h;
      }
      tgtRef.current = { x, y };
      speedRef.current = 120 + Math.random() * 220; // 120–340 px/s
      modeRef.current = opts.mode || 'wander';
    };

    pickTarget();

    // occasionally pick a brand-new target, faster or slower
    const interval = setInterval(() => {
      const fast = Math.random() < 0.4;
      pickTarget({ mode: fast ? 'sprint' : 'wander' });
    }, 1600 + Math.random() * 2200);

    // main loop
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.max(0.001, (now - last) / 1000); // seconds
      last = now;

      const pos = posRef.current;
      const vel = velRef.current;
      const tgt = tgtRef.current;

      // steering toward target
      const dx = tgt.x - pos.x;
      const dy = tgt.y - pos.y;
      const dist = Math.hypot(dx, dy) || 1;

      // desired velocity (normalized) * speed
      const desiredX = (dx / dist) * speedRef.current;
      const desiredY = (dy / dist) * speedRef.current;

      // simple steering + damping (random-ish jitter)
      const steerX = (desiredX - vel.x) * 0.9;
      const steerY = (desiredY - vel.y) * 0.9;

      vel.x += steerX * dt;
      vel.y += steerY * dt;

      // a tiny noise to make it feel buggy
      vel.x += (Math.random() - 0.5) * 18;
      vel.y += (Math.random() - 0.5) * 18;

      // apply velocity
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;

      // if close enough → pick a new place
      if (dist < 24) {
        pickTarget();
      }

      // keep transform updated
      const angle = Math.atan2(vel.y, vel.x) * 180 / Math.PI;
      const el = elRef.current;
      if (el) {
        el.style.transform =
          `translate3d(${pos.x - size/2}px, ${pos.y - size/2}px, 0) rotate(${angle}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    const onResize = () => { /* nothing special; targets pick new bounds automatically */ };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(interval);
      window.removeEventListener('resize', onResize);
    };
  }, [hideOnMobile, size]);

  if (!enabled) return null;

  // Inline SVG bug (bright yellow) — no external file needed
  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed top-0 left-0 z-[2] opacity-90"
      style={{ width: size, height: size, willChange: 'transform' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" width={size} height={size}>
        <defs>
          <radialGradient id="shine" cx="30%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#fff59d" stopOpacity="0.95"/>
            <stop offset="60%" stopColor="#ffbd39" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#ffb300" stopOpacity="0.9"/>
          </radialGradient>
          <filter id="sh" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,.45)"/>
          </filter>
        </defs>

        {/* legs */}
        <g filter="url(#sh)" stroke="#704c00" strokeLinecap="round" strokeWidth="3" fill="none">
          <path d="M22 28 L10 22"/>
          <path d="M22 34 L9 34"/>
          <path d="M22 40 L10 46"/>
          <path d="M42 28 L54 22"/>
          <path d="M42 34 L55 34"/>
          <path d="M42 40 L54 46"/>
        </g>

        {/* body */}
        <g filter="url(#sh)">
          <ellipse cx="32" cy="38" rx="12" ry="14" fill="url(#shine)" stroke="#704c00" strokeWidth="2"/>
          <circle cx="32" cy="26" r="9" fill="#ffcf33" stroke="#704c00" strokeWidth="2"/>
          <rect x="30.5" y="26" width="3" height="24" rx="1.5" fill="#e6a800" opacity="0.85"/>
        </g>

        {/* eyes */}
        <circle cx="29" cy="24.5" r="2.2" fill="#191919"/>
        <circle cx="35" cy="24.5" r="2.2" fill="#191919"/>
        <circle cx="28.3" cy="23.8" r="0.8" fill="#ffffff" opacity="0.9"/>
        <circle cx="34.3" cy="23.8" r="0.8" fill="#ffffff" opacity="0.9"/>

        {/* antennae */}
        <g stroke="#704c00" strokeLinecap="round" strokeWidth="2" fill="none">
          <path d="M28 18 Q26 14 22 12"/>
          <path d="M36 18 Q38 14 42 12"/>
        </g>
      </svg>
    </div>
  );
}
