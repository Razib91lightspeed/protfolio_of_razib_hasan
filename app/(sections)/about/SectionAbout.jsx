'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brain, Globe2, GraduationCap, NotebookText, Sparkles } from 'lucide-react';

import SkillsPanel from '../../../components/SkillsPanel';
import Counter from '../../../components/Counter';

export default function SectionAbout() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section id="about" className="section py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT: Skills */}
        <div>
          <SkillsPanel />
        </div>

        {/* RIGHT: About Me block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 md:p-8 shadow-xl"
        >
          {/* Soft glow accents */}
          <div className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

          {/* Avatar + Text */}
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-40 shrink-0">
              <Image
                src={`${base}/images/me.png`}
                alt="Razib Hasan"
                width={160}
                height={160}
                className="object-contain"
                priority
              />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold">About Me</h2>
              <p className="mt-2 text-gray-300">
                I am a passionate and results‑driven software engineer with strong foundations in
                automation, embedded systems, IoT, cloud computing, and data‑driven ML projects.
                I believe technology should enhance quality of life. I enjoy collaborating with teams
                to ship impactful products.
              </p>
            </div>
          </div>

          {/* Highlight cards */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard
              icon={<Brain className="h-5 w-5" />}
              title="Profile"
              body="Machine Learning, Embedded Systems, Data Science & Analytics"
            />
            <InfoCard
              icon={<Globe2 className="h-5 w-5" />}
              title="Expertise"
              body="Computer Science, Electronics, Software Engineering"
            />
            <InfoCard
              icon={<GraduationCap className="h-5 w-5" />}
              title="Education"
              body="Master's Degree in Computer Science"
              body1="Bachelor of Engineering"
            />
            <InfoCard
              icon={<NotebookText className="h-5 w-5" />}
              title="Languages"
              body="English, Finnish, Bangla, Hindi, Malay"
            />
            <InfoCard
              icon={<Sparkles className="h-5 w-5" />}
              title="BI & Tools"
              body="Power BI, Looker, Tableau; Web, PySpark, Excel, Git, JIRA, Confluence"
            />
            <InfoCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Interests"
              body="Traveling, Fishing, Astrophysics"
            />
          </div>
        </motion.div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        <Counter label="Achievements" value={20} />
        <Counter label="Projects" value={42} />
        <Counter label="Competitions Attended" value={10} />
        <Counter label="Won" value={4} />
      </div>
    </section>
  );
}

function InfoCard({ icon, title, body, body1 }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-brand/10 blur-2xl" />
      </div>
      <div className="flex items-center gap-2 text-brand">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <p className="mt-2 text-sm text-gray-300">{body}</p>
      {body1 && <p className="mt-1 text-sm text-gray-300">{body1}</p>}
    </div>
  );
}
