import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InteractiveNetwork from '../components/InteractiveNetwork';
import MouseBug from '../components/MouseBug';  // 👈 add this line

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Background effect */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <InteractiveNetwork />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Cursor bug */}
        <MouseBug size={24} />  {/* 👈 render it here */}

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
