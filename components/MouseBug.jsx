'use client';
import { useEffect, useRef, useState } from 'react';

// If you deploy to GitHub Pages with a basePath, set NEXT_PUBLIC_BASE_PATH in the workflow
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function MouseBug({
  size = 78,  // bigger default
  ease = 0.12,
  rotate = true,
  hideOnMobile = true,
}) {

  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (hideOnMobile && window.matchMedia('(max-width: 768px)').matches) {
      setEnabled(false);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEnabled(false);
      return;
    }

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      const el = ref.current;
      if (el) {
        let angle = 0;
        if (rotate) {
          const dx = target.current.x - pos.current.x;
          const dy = target.current.y - pos.current.y;
          angle = Math.atan2(dy, dx) * (180 / Math.PI);
        }
        el.style.transform = `translate3d(${pos.current.x - size/2}px, ${pos.current.y - size/2}px, 0) rotate(${angle}deg)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [ease, rotate, hideOnMobile]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[2] opacity-80"
      style={{ width: size, height: size, willChange: 'transform' }}
      aria-hidden="true"
    >
      <img
        src={`${base}/images/bug.png`}
        alt=""
        width={size}
        height={size}
        style={{ display: 'block', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.35))' }}
      />
    </div>
  );
}
