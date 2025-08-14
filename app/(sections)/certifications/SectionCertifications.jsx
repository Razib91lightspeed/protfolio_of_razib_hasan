'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const certs = [
  { title: 'Ethical Hacker', img: `${prefix}/images/cisco.png`, url: 'https://www.credly.com/badges/54a07564-e7d7-4aee-841d-e18f69cd217c' },
  { title: 'Data Analytics Essentials', img: `${prefix}/images/cisco.png`, url: 'https://www.credly.com/badges/4f9c6322-b9d5-43bf-a92a-3840a2f22518' },
  { title: 'Introduction to Networks', img: `${prefix}/images/cisco.png`, url: 'https://www.credly.com/badges/3916a167-5a08-4227-9809-67556334236d' },
  { title: 'AWS Academy Intro to Cloud', img: `${prefix}/images/aws.png`, url: 'https://www.credly.com/badges/70084bf2-f899-4754-a4b7-feb91bffa6fb' },
  { title: 'AWS Academy Cloud Developing', img: `${prefix}/images/aws.png`, url: 'https://www.credly.com/badges/82db5147-0962-4088-9ef8-92b10829eb62' },
  { title: 'Python Essentials 1', img: `${prefix}/images/cisco.png`, url: 'https://www.credly.com/badges/8ca3c27e-2ae4-4b96-92df-7f1a1f04f8fc' },
  { title: 'Python Essentials 2', img: `${prefix}/images/cisco.png`, url: 'https://www.credly.com/badges/f61827d3-6631-4277-8928-71a4c5cbb910' },
  { title: 'Introduction to Data Science', img: `${prefix}/images/cisco.png`, url: 'https://www.credly.com/badges/debe7116-6ef0-4e6a-a380-6e541fa439f7' },
  { title: 'Jira Fundamentals', img: `${prefix}/images/jira.png`, url: 'https://university.atlassian.com/student/award/Dn2YXCXBsZHvxEnEc7a4QA9u' },
  { title: 'Confluence Fundamentals', img: `${prefix}/images/con.png`, url: 'https://university.atlassian.com/student/award/JvXuLZ3aGWZGjKxmB3a7YQuA' },
  { title: 'Data Analysis with Python', img: `${prefix}/images/free.png`, url: 'https://www.freecodecamp.org/certification/fcc87ee5424-b261-4be8-ba17-0b4a3c15fc06/data-analysis-with-python-v7' },
  { title: 'Data Visualization', img: `${prefix}/images/free.png`, url: 'https://www.freecodecamp.org/certification/fcc87ee5424-b261-4be8-ba17-0b4a3c15fc06/data-visualization' },
  { title: 'Machine Learning with Python', img: `${prefix}/images/free.png`, url: 'https://www.freecodecamp.org/certification/fcc87ee5424-b261-4be8-ba17-0b4a3c15fc06/machine-learning-with-python-v7' }
];

export default function SectionCertifications() {
  return (
    <section id="certification" className="section py-20">
      <h2 className="text-3xl font-bold text-center">Certifications</h2>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
        A selection of badges & courses
      </p>
      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {certs.map((c, i) => (
          <motion.a
            key={i}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -4 }}
            className="
              relative overflow-hidden rounded-2xl
              border border-yellow-300/20
              bg-gradient-to-b from-yellow-400/10 to-yellow-300/5
              shadow-lg
              hover:shadow-yellow-400/30 hover:-translate-y-1
              transition
            "
          >
            {/* Soft glow accents */}
            <div className="pointer-events-none absolute -top-14 -right-16 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-20 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />

            <div className="p-4 flex flex-col items-center text-center">
              <div className="relative w-[160px] h-[120px]">
                <Image src={c.img} alt={c.title} fill className="object-contain" />
              </div>
              <div className="mt-3 font-medium">{c.title}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
