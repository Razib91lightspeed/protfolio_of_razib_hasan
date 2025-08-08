'use client';
import { motion } from 'framer-motion';
import { experience, education } from '../../../lib/data';

export default function SectionResume() {
  return (
    <section id="resume" className="section py-20 scroll-mt-24 md:scroll-mt-28">
      <h2 className="text-3xl font-bold text-center">Resume</h2>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Experienced in leading teams to develop integrated networking systems for IoT projects with Raspberry Pi, Flask, SQL, AutoSSH, SSH tunnel, cloud hosting, Jira, Confluence, and Git.
      </p>

      {/* EXPERIENCE */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">Experience</h3>
        <div className="grid lg:grid-cols-2 gap-10">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="card p-6"
            >
              <div className="text-base text-gray-500">{item.dates}</div>
              <div className="mt-1 font-semibold">{item.title}</div>
              <div className="text-base">{item.company}</div>
              {!!item.points?.length && (
                <ul className="mt-3 list-disc pl-5 text-base space-y-1">
                  {item.points.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* EDUCATION */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-6 text-center">Education</h3>
        <div className="grid lg:grid-cols-2 gap-10">
          {education.map((ed, i) => {
            // Split "Major:" and "Grade:" out of the bullets if the data array contains them.
            const meta = [];
            const rest = [];
            (ed.details || []).forEach((line) => {
              if (/^\s*major\s*:/i.test(line) || /^\s*grade\s*:/i.test(line)) {
                meta.push(line);
              } else {
                rest.push(line);
              }
            });

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="card p-6"
              >
                <div className="text-base text-gray-500">{ed.dates}</div>
                <div className="mt-1 font-semibold">{ed.degree}</div>
                <div className="text-base">{ed.school}</div>

                {/* Metadata lines (no bullets) */}
                {!!meta.length && (
                  <div className="mt-3 space-y-1 text-base">
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
                )}

                {/* Bulleted list for the rest */}
                {!!rest.length && (
                  <ul className="mt-3 list-disc pl-5 text-base space-y-1">
                    {rest.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <a href="/updatedresume.pdf" className="btn btn-primary">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
