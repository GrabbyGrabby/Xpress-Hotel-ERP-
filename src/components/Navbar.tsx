import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-[100] px-6 md:px-8 py-3.5 flex justify-between items-center bg-white/75 dark:bg-[#1a2135]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl rounded-full select-none transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0'
    }`}>
      <div className="font-display font-black text-2xl tracking-tighter text-[#212842] dark:text-[#F0E7D5] uppercase select-none">
        Xpress
      </div>
      <div className="flex gap-3.5 md:gap-6 items-center">
        <a href="#segments" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors">Segments</a>
        <a href="#pms" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors">PMS</a>
        <a href="#restaurant" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors">POS</a>
        <a href="#revenue-yield" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors">Revenue Yield</a>
        <a href="#integrations" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] transition-colors">Channel Sync</a>
        
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 cursor-pointer flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-all ml-1.5"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 stroke-[2] text-[#F0E7D5]" />
          ) : (
            <Moon className="w-3.5 h-3.5 stroke-[2] text-[#212842]" />
          )}
        </button>
      </div>
    </nav>
  );
}
