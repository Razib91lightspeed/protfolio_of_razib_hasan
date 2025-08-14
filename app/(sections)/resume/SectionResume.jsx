'use client';
import { motion } from 'framer-motion';
import { experience, education } from '../../../lib/data';

function ResumeCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="
        relative overflow-hidden rounded-2xl
        border border-yellow-300/20
        bg-gradient-to-b from-yellow-400/10 to-yellow-300/5
        shadow-lg
        hover:shadow-yellow-400/30 hover:translate-y-[-2px]
        transition
      "
    >
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -top-14 -right-16 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-20 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

export default function SectionResume() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section id="resume" className="section py-20 scroll-mt-24 md:scroll-mt-28">
      <h2 className="text-3xl font-bold text-center">Resume</h2>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Experienced in leading teams to develop integrated networking systems for IoT projects with Raspberry Pi, Flask,
        SQL, AutoSSH, SSH tunnel, cloud hosting, Jira, Confluence, and Git.
      </p>

      {/* EXPERIENCE */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-center">Experience</h3>
        <div className="mt-6 grid lg:grid-cols-2 gap-8">
          {experience.map((item, i) => (
            <ResumeCard key={i}>
              <div className="text-base text-gray-500">{item.dates}</div>
              <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div className="font-semibold">{item.title}</div>
                <div className="text-base text-gray-300/90">{item.company}</div>
              </div>
              <div className="mt-4 h-px bg-yellow-300/20" />
              {!!item.points?.length && (
                <ul className="mt-4 list-disc pl-5 text-base space-y-1">
                  {item.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              )}
            </ResumeCard>
          ))}
        </div>
      </div>

      {/* EDUCATION */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-center">Education</h3>
        <div className="mt-6 grid lg:grid-cols-2 gap-8">
          {education.map((ed, i) => {
            const meta = [];
            const rest = [];
            (ed.details || []).forEach((line) => {
              if (/^\s*major\s*:/i.test(line) || /^\s*grade\s*:/i.test(line)) meta.push(line);
              else rest.push(line);
            });

            return (
              <ResumeCard key={i}>
                <div className="text-base text-gray-500">{ed.dates}</div>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="font-semibold">{ed.degree}</div>
                  <div className="text-base text-gray-300/90">{ed.school}</div>
                </div>
                {!!meta.length && (
                  <>
                    <div className="mt-4 h-px bg-yellow-300/20" />
                    <div className="mt-4 space-y-1 text-base">
                      {meta.map((m, idx) => {
                        const [label, ...restText] = m.split(':');
                        return (
                          <p key={idx}>
                            <span className="font-medium">{label.trim()}:</span>{' '}
                            {restText.join(':').trim()}
                          </p>
                        );
                      })}
                    </div>
                  </>
                )}
                {!!rest.length && (
                  <>
                    {!meta.length && <div className="mt-4 h-px bg-yellow-300/20" />}
                    <ul className="mt-4 list-disc pl-5 text-base space-y-1">
                      {rest.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </>
                )}
              </ResumeCard>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <a href={`${base}/updatedresume.pdf`} className="btn btn-primary">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
