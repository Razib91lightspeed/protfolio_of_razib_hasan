'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brain, Globe2, GraduationCap, NotebookText, Sparkles } from 'lucide-react';

import SkillsPanel from '../../../components/SkillsPanel';
import Counter from '../../../components/Counter';

export default function SectionAbout() {
  // Use this for GitHub Pages (or any basePath) so images always load
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section id="about" className="section py-20">
      {/* 50 / 50 layout on large screens */}
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT: Profile + Skill bars */}
        <div>
          <SkillsPanel />
        </div>

        {/* RIGHT: Fancy About block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 md:p-8 shadow-xl"
        >
          {/* soft glow accents */}
          <div className="pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

          <div className="flex items-start gap-4">
            {/* avatar */}
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/20">
  <Image
    src={`${base}/images/me.png`}
    alt="Razib Hasan"
    fill
    className="object-cover"
  />
</div>


            <div>
              <h2 className="text-3xl font-bold">About Me</h2>
              <p className="mt-2 text-gray-300">
                I am a passionate and results‑driven software engineer with strong foundations in
                automation, embedded systems, IoT, cloud computing, and data‑driven ML projects.
                I believe technology should enhance quality of life. I enjoy working with teams to
                ship impactful products.
              </p>
            </div>
          </div>

          {/* highlight cards */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCard
              icon={<Brain className="h-5 w-5" />}
              title="Profile"
              body="Machine Learning, Embedded System, Data Science & Analytics"
            />
            <InfoCard
              icon={<Globe2 className="h-5 w-5" />}
              title="Domain"
              body="Computer Sciences, Electronics & Software Engineering"
            />
            <InfoCard
              icon={<GraduationCap className="h-5 w-5" />}
              title="Education"
              body="Master's Degree in Computer Sciences"
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

      {/* Counters row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        <Counter label="Achievements" value={20} />
        <Counter label="Projects" value={42} />
        <Counter label="Competitions Attended" value={10} />
        <Counter label="Won" value={4} />
      </div>
    </section>
  );
}

function InfoCard({ icon, title, body }) {
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
    </div>
  );
}
