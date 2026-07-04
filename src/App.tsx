import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Segments from './components/Segments';
import PMSModule from './components/PMSModule';
import RestaurantModule from './components/RestaurantModule';
import RevenueYield from './components/RevenueYield';
import Integrations from './components/Integrations';
import Footer from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen selection:bg-[var(--accent)]/20 selection:text-[var(--accent)] transition-colors duration-300 relative z-10">
      {/* Floating Header & Mode Toggle */}
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      {/* Hero Section with GSAP reveals */}
      <Hero />

      {/* Segments: Colorful capsule cards from Page 1 */}
      <Segments />

      {/* PMS Module details & circular hub from Page 2 */}
      <PMSModule />

      {/* Restaurant/Bar Module details & circular hub from Page 3 */}
      <RestaurantModule />

      {/* Revenue Yield Sync section with 4 cards and big headers */}
      <RevenueYield />

      {/* Integration partner cards from Page 1 */}
      <Integrations />

      {/* Corporate headquarters footer from Page 1 */}
      <Footer />
    </div>
  );
}
