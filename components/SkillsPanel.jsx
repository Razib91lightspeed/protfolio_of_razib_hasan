'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Briefcase, MapPin, Award } from 'lucide-react';

const skills = [
  { label: 'Programming Languages: Java, C++, Python, JavaScript, Swift', value: 88 },
  { label: 'Front-End: Qt, JavaFX, React, Vue, Tailwind CSS', value: 82 },
  { label: 'Back-End: Node.js, Next.js, Spring Boot', value: 72 },
  { label: 'Data Viz & Analytics: Tableau, Power BI, MySQL, DynamoDB', value: 80 },
  { label: 'DevOps & Tools: Git, Docker', value: 92 },
  { label: 'Cloud: AWS, Azure', value: 84 },
  { label: 'Mobile: Flutter, React Native, iOS (Swift)', value: 81 },
  { label: 'ML & Embedded (Raspberry Pi, Arduino, Microcontroller, MQTT, Lider, OpAmp,RTOS, LTspice, MatLab, Sensors)', value: 80 },
  { label: 'OS: macOS, Windows, Linux', value: 98 },
];

export default function SkillsPanel() {
  const cardRef = useRef(null);

  // animate bars when the card scrolls into view
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !('IntersectionObserver' in window)) return;
    const bars = card.querySelectorAll('[data-bar]');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bars.forEach(el => el.classList.add('bar-in'));
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

  return (
    <aside
      ref={cardRef}
      className="
        group relative p-[1.5px] rounded-3xl
        bg-gradient-to-b from-brand/70 via-white/10 to-transparent
        overflow-hidden
      "
    >
      {/* subtle glow border */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl opacity-60 blur-2xl"
        style={{
          background:
            'radial-gradient(60% 120% at 10% 0%, rgba(255,189,57,.18), transparent 60%), radial-gradient(60% 120% at 90% 0%, rgba(255,255,255,.06), transparent 60%)'
        }}
      />
      {/* card body */}
      <div className="relative rounded-[22px] bg-[#0c1018]/85 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* decorative sparks */}
        <div className="pointer-events-none absolute inset-0">
          <span className="spark -left-2 top-10" />
          <span className="spark left-1/2 top-3" />
          <span className="spark right-6 bottom-10" />
        </div>

        {/* header */}
        <div className="flex items-center gap-4 p-6 md:p-7 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
          <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden ring-2 ring-brand/70 shadow-xl">
            <Image
              src="/images/about-me.png"
              alt="Razib Hasan"
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>

          <div className="min-w-0">
            <div className="text-sm text-gray-400 truncate">Name</div>
            <div className="text-xl font-semibold leading-tight">Razib Hasan</div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="chip">
                <Briefcase className="size-[14px]" />
                Software Engineer
              </span>
              <span className="chip">
                <Award className="size-[14px]" />
                2 Years 3 Months
              </span>
              <span className="chip">
                <MapPin className="size-[14px]" />
                Tampere, Finland
              </span>
            </div>
          </div>
        </div>

        {/* skills */}
        <div className="p-6 md:p-7">
          <h3 className="text-lg font-semibold tracking-tight">Skills</h3>

          <ul className="mt-5 space-y-5">
            {skills.map((s, i) => (
              <li key={i} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] md:text-sm text-gray-300">{s.label}</span>
                  <span className="text-[12px] md:text-xs text-gray-400 tabular-nums">
                    {s.value}%
                  </span>
                </div>

{/* Fancy meter */}
<div className="meter">
  <div className="meter-track" />
  <div className="meter-fill" style={{ width: `${s.value}%` }} />
  <div
    className="meter-dot"
    style={{ left: `calc(${s.value}% - 7px)` }}
    aria-hidden
  />
  <div
    className="meter-bubble"
    style={{ left: `calc(${s.value}% - 18px)` }}
  >
    {s.value}%
  </div>
</div>

              </li>
            ))}
          </ul>

          {/* badges / quick facts */}
          <div className="mt-7 flex flex-wrap gap-2">
            {['ML/DL', 'IoT', 'Cloud', 'DevOps', 'Data Viz', 'Mobile'].map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
