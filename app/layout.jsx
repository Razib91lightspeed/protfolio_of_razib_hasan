export const metadata = {
  title: 'Razib Hasan | Portfolio',
  description: 'Software Engineer – Embedded, ML, Cloud'
};

import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InteractiveNetwork from '../components/InteractiveNetwork';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        {/* background (stays behind everything) */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <InteractiveNetwork />
          {/* subtle dark overlay so lines don’t overpower text */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <Navbar />
        <div className="pt-16 md:pt-20"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
