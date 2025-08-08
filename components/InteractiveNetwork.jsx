'use client';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function InteractiveNetwork({ className = '' }) {
  const init = useCallback(async (engine) => {
    // load the slim bundle for smaller size
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={init}
      className={`absolute inset-0 -z-10 ${className}`}
      options={{
        fullScreen: { enable: false },          // we position it ourselves
        background: { color: 'transparent' },
        fpsLimit: 60,
        detectRetina: true,
        smooth: true,
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: { enable: true, mode: ['grab', 'repulse'] },
            onClick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            grab: { distance: 160, links: { opacity: 0.4 } },
            repulse: { distance: 120, duration: 0.3 },
            push: { quantity: 2 }
          }
        },
        particles: {
          number: { value: 70, density: { enable: true, area: 900 } },
          color: { value: "#FFD700" },                      // your brand yellow
          links: { enable: true, distance: 140, color: "#FFD700", opacity: 0.25, width: 1 },
          move: { enable: true, speed: 1, outModes: { default: 'bounce' } },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 3 } },
          shape: { type: 'circle' }
        }
      }}
    />
  );
}
