'use client';
import { useEffect, useRef } from 'react';

export default function MouseBug({ size = 80 }) {
  const elRef   = useRef(null);
  const posRef  = useRef({ x: 0, y: 0 });
  const velRef  = useRef({ x: 0, y: 0 });
  const tgtRef  = useRef({ x: 0, y: 0 });
  const speedRef = useRef(200);
  const rafRef  = useRef(0);

  useEffect(() => {
    const w = innerWidth, h = innerHeight;
    posRef.current = { x: w / 2, y: h / 2 };

    const pickTarget = () => {
      const m = 120, off = Math.random() < 0.18;
      let x, y;
      if (off) {
        const e = Math.floor(Math.random() * 4);
        x = [ -m, w + m, Math.random() * w, Math.random() * w ][e];
        y = [ Math.random() * h, Math.random() * h, -m, h + m ][e];
      } else {
        x = Math.random() * w;
        y = Math.random() * h;
      }
      tgtRef.current = { x, y };
      speedRef.current = 120 + Math.random() * 260;
    };
    pickTarget();
    const id = setInterval(pickTarget, 1500 + Math.random() * 2000);

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.max(0.001, (now - last) / 1000); last = now;

      const pos = posRef.current, vel = velRef.current, tgt = tgtRef.current;
      const dx = tgt.x - pos.x, dy = tgt.y - pos.y;
      const dist = Math.hypot(dx, dy) || 1;

      const desiredX = (dx / dist) * speedRef.current;
      const desiredY = (dy / dist) * speedRef.current;

      // steer + jitter
      vel.x += (desiredX - vel.x) * 0.9 * dt + (Math.random() - 0.5) * 20;
      vel.y += (desiredY - vel.y) * 0.9 * dt + (Math.random() - 0.5) * 20;

      pos.x += vel.x * dt;
      pos.y += vel.y * dt;

      if (dist < 24) pickTarget();

      const angle = Math.atan2(vel.y, vel.x) * 180 / Math.PI;
      const speed = Math.hypot(vel.x, vel.y); // px/s

      const el = elRef.current;
      if (el) {
        // map speed -> gait duration (fast speed = shorter duration)
        const dur = clamp(map(speed, 60, 380, 420, 140), 120, 480); // ms
        el.style.setProperty('--gait', `${dur}ms`);
        el.style.transform =
          `translate3d(${pos.x - size/2}px, ${pos.y - size/2}px,0) rotate(${angle}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => { /* prevent runaway off-screen */ pickTarget(); };
    addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(id);
      removeEventListener('resize', onResize);
    };
  }, [size]);

  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed top-0 left-0 z-[99999]"
      style={{ width: size, height: size, willChange: 'transform', opacity: 0.95 }}
      aria-hidden="true"
    >
      {/* WALKING BUG (animated legs) */}
      <svg viewBox="0 0 64 64" width={size} height={size}>
        <defs>
          <radialGradient id="shine" cx="30%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#fff59d" stopOpacity=".95"/>
            <stop offset="60%" stopColor="#ffbd39" stopOpacity=".75"/>
            <stop offset="100%" stopColor="#ffb300" stopOpacity=".95"/>
          </radialGradient>
          <filter id="sh" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,.45)"/>
          </filter>
        </defs>

        {/* legs — grouped so we can swing them with CSS */}
        <g filter="url(#sh)" stroke="#704c00" strokeLinecap="round" strokeWidth="3" fill="none"
           style={{ transformBox: 'fill-box' }}>
          {/* left legs */}
          <g className="leg legA left"  style={{ transformOrigin: '24px 32px' }}><path d="M22 28 L10 22"/></g>
          <g className="leg legB left"  style={{ transformOrigin: '24px 36px' }}><path d="M22 34 L9 34"/></g>
          <g className="leg legC left"  style={{ transformOrigin: '24px 40px' }}><path d="M22 40 L10 46"/></g>
          {/* right legs */}
          <g className="leg legA right" style={{ transformOrigin: '40px 32px' }}><path d="M42 28 L54 22"/></g>
          <g className="leg legB right" style={{ transformOrigin: '40px 36px' }}><path d="M42 34 L55 34"/></g>
          <g className="leg legC right" style={{ transformOrigin: '40px 40px' }}><path d="M42 40 L54 46"/></g>
        </g>

        {/* body */}
        <g filter="url(#sh)">
          <ellipse cx="32" cy="38" rx="12" ry="14" fill="url(#shine)" stroke="#704c00" strokeWidth="2"/>
          <circle cx="32" cy="26" r="9" fill="#ffcf33" stroke="#704c00" strokeWidth="2"/>
          <rect x="30.5" y="26" width="3" height="24" rx="1.5" fill="#e6a800" opacity=".85"/>
        </g>

        {/* eyes */}

        <circle cx="28.3" cy="23.8" r=".8" fill="#fff" opacity=".9"/>
        <circle cx="34.3" cy="23.8" r=".8" fill="#fff" opacity=".9"/>

        {/* antennae (tiny wiggle) */}
        <g stroke="#704c00" strokeLinecap="round" strokeWidth="2" fill="none">
          <path className="antenna L" d="M28 18 Q26 14 22 12" />
          <path className="antenna R" d="M36 18 Q38 14 42 12" />
        </g>
      </svg>

      {/* walking animation styles */}
      <style jsx>{`
        /* gait is controlled by --gait set from JS (based on speed) */
        .leg {
          animation: swing var(--gait, 320ms) ease-in-out infinite;
        }
        /* phase offsets to create alternating gait */
        .legA.left  { animation-delay: 0ms; }
        .legB.left  { animation-delay: calc(var(--gait) * .25); }
        .legC.left  { animation-delay: calc(var(--gait) * .5); }
        .legA.right { animation-delay: calc(var(--gait) * .5); }
        .legB.right { animation-delay: calc(var(--gait) * .75); }
        .legC.right { animation-delay: calc(var(--gait) * 1.0); }

        @keyframes swing {
          0%   { transform: rotate(10deg); }
          50%  { transform: rotate(-12deg); }
          100% { transform: rotate(10deg); }
        }

        .antenna.L { animation: wiggle var(--gait, 320ms) ease-in-out infinite; transform-origin: 26px 16px; transform-box: fill-box; }
        .antenna.R { animation: wiggle var(--gait, 320ms) ease-in-out infinite reverse; transform-origin: 38px 16px; transform-box: fill-box; }

        @keyframes wiggle {
          0%,100% { transform: rotate(2deg); }
          50%     { transform: rotate(-3deg); }
        }
      `}</style>
    </div>
  );
}

/* helpers */
function map(v, inMin, inMax, outMin, outMax) {
  return outMin + (outMax - outMin) * ((v - inMin) / (inMax - inMin));
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
