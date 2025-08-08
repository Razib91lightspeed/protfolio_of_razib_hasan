export default function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-white/10 text-center text-base">
      <div className="section">
        <p>
          © {new Date().getFullYear()} All rights reserved | Built with <span className="text-brand">♥</span>
        </p>
        <p className="mt-2 text-xs text-gray-500">Template reimagined with Next.js & Tailwind.</p>
      </div>
    </footer>
  );
}