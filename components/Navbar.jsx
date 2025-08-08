'use client';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handler = () => {
      const sections = ['home','about','resume','projects','certification','contact'];
      const fromTop = window.scrollY + 120;
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= fromTop) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const LinkItem = ({ id, label }) => (
    <a
      href={`#${id}`}
      onClick={() => setOpen(false)}
      className={`px-3 py-2 rounded-lg hover:bg-white/10 ${active===id? 'text-brand' : ''}`}
    >{label}</a>
  );

  return (
   <nav className="fixed top-0 inset-x-0 z-[200] backdrop-blur bg-white/60 dark:bg-[#0b0f17]/60 border-b border-white/10">
      <div className="section flex items-center justify-between py-3">
        <a href="#home" className="font-bold text-lg">Razib Hasan</a>
        <div className="hidden md:flex items-center gap-2">
          <LinkItem id="home" label="Home" />
          <LinkItem id="about" label="About" />
          <LinkItem id="resume" label="Resume" />
          <LinkItem id="projects" label="Projects" />
          <LinkItem id="certification" label="Certification" />
          <LinkItem id="contact" label="Contact" />
          <ThemeToggle />
        </div>
        <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Menu">☰</button>
      </div>
      {open && (
        <div className="md:hidden section pb-3 flex flex-col gap-1">
          <LinkItem id="home" label="Home" />
          <LinkItem id="about" label="About" />
          <LinkItem id="resume" label="Resume" />
          <LinkItem id="projects" label="Projects" />
          <LinkItem id="certification" label="Certification" />
          <LinkItem id="contact" label="Contact" />
          <div className="px-3 py-2"><ThemeToggle /></div>
        </div>
      )}
    </nav>
  );
}