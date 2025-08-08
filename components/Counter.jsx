'use client';
import { useEffect, useRef, useState } from 'react';

export default function Counter({ value, label, duration = 1200 }) {
  const [num, setNum] = useState(0);
  const el = useRef(null);

  useEffect(() => {
    let obs;
    const onEnter = () => {
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        setNum(Math.floor(value * p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { onEnter(); obs.disconnect(); }
      }, { threshold: 0.4 });
      obs.observe(el.current);
    } else {
      onEnter();
    }
    return () => obs?.disconnect();
  }, [value, duration]);

  return (
    <div ref={el} className="card p-6 text-center">
      <div className="text-4xl font-extrabold">{num}</div>
      <div className="mt-1 text-sm text-gray-500">{label}</div>
    </div>
  );
}
