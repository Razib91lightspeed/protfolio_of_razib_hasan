'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function SectionContact() {
  const [status, setStatus] = useState(null);

  // ✅ prefix for GitHub Pages subpath
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section id="contact" className="section py-20">
      <h2 className="text-3xl font-bold text-center">Contact Me</h2>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">Feel free to reach out.</p>

      <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative w-full aspect-[4/3]">
          {/* ✅ prefix local image */}
          <Image
            src={`${prefix}/images/about.png`}
            alt="About"
            fill
            className="object-cover rounded-2xl"
            sizes="(min-width:1024px) 600px, 90vw"
            priority
          />
        </div>

        <form
          action="https://formspree.io/f/xgvwwawd"
          method="POST"
          onSubmit={() => setStatus('Sending...')}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Your Name"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <input
            name="subject"
            placeholder="Subject"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Message"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
          />
          <button className="btn btn-primary" type="submit">Send Message</button>
          {status && <div className="text-base text-gray-500">{status}</div>}
        </form>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="card p-6">
          <div className="text-base text-gray-500">Address</div>
          <div>Ruskontie 55, 33710 Tampere, Finland</div>
        </div>
        <div className="card p-6">
          <div className="text-base text-gray-500">Phone</div>
          <a className="link" href="tel:+358407692735">+358 40 769 2735</a>
        </div>
        <div className="card p-6">
          <div className="text-base text-gray-500">Email</div>
          <a className="link" href="mailto:razib.hasan2@outlook.com">razib.hasan2@outlook.com</a>
        </div>
        <div className="card p-6">
          <div className="text-base text-gray-500">Resume</div>
          {/* ✅ prefix local PDF */}
          <a className="link" href={`${prefix}/updatedresume.pdf`} target="_blank" rel="noreferrer">Download</a>
        </div>
      </div>

      <ul className="mt-10 flex items-center justify-center gap-5 text-base">
        <li><a className="link" href="https://www.youtube.com/channel/UCXXMUHx9qV_LtC4k6yC7IQg">YouTube</a></li>
        <li><a className="link" href="https://www.linkedin.com/in/razibhasan2/">LinkedIn</a></li>
        <li><a className="link" href="https://twitter.com/@RazibHa28487029">Twitter</a></li>
        <li><a className="link" href="https://facebook.com/razib.hasan2">Facebook</a></li>
        <li><a className="link" href="https://www.instagram.com/wonderboy21s">Instagram</a></li>
      </ul>
    </section>
  );
}
