'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Typing from '../../../components/Typing';
import ThemeToggle from '../../../components/ThemeToggle';

export default function SectionHero() {
  // ✅ prefix for GitHub Pages subpath
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section id="home" className="relative py-16 md:py-24">
      <div className="section">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between md:hidden mb-4">
              <span className="text-brand text-base">Hello!</span>
              <ThemeToggle />
            </div>

            <p className="hidden md:block text-brand text-lg">Hello!</p>
            <h1 className="mt-2 text-4xl sm:text-6xl font-extrabold text-white leading-tight">
              I&apos;m <span className="text-brand">Razib Hasan</span>
            </h1>

            <div className="mt-3 text-white/90 text-xl sm:text-2xl font-semibold h-[34px] sm:h-[40px]">
              <Typing words={['Learner', 'Explorer', 'Not a Quitter']} />
            </div>

            <p className="mt-5 max-w-xl text-white/80">
              A Software Engineer building useful things across Embedded Systems, Cloud, and ML.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://www.youtube.com/channel/UCXXMUHx9qV_LtC4k6yC7IQg" className="btn btn-primary">YouTube</a>
              <a href="https://github.com/Razib91lightspeed" className="btn btn-outline">My Works</a>
              {/* ✅ prefix the PDF path */}
              <a href={`${prefix}/updatedresume.pdf`} className="btn btn-outline">Download CV</a>
            </div>
          </motion.div>

          {/* RIGHT: Portrait (fully inside the column) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-[520px] ml-auto overflow-hidden rounded-3xl shadow-2xl
                            h-[340px] sm:h-[420px] md:h-[520px] lg:h-[600px]">
              {/* ✅ prefix the image path */}
              <Image
                src={`${prefix}/images/bg_1.png`}
                alt="Razib Hasan portrait"
                fill
                priority
                className="object-cover object-[70%_center]"
                sizes="(min-width:1024px) 520px, (min-width:768px) 50vw, 90vw"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(11,15,23,0.6) 0%, rgba(11,15,23,0.2) 35%, rgba(11,15,23,0) 65%)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
