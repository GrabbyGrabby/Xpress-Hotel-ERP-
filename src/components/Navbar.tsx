import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export default function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return; // Keep visible if mobile menu is open
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
  }, [lastScrollY, menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-[100] px-6 md:px-8 py-3.5 flex justify-between items-center bg-white/75 dark:bg-[#1a2135]/80 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-xl rounded-full select-none transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0'
      }`}>
        <div className="font-display font-black text-2xl tracking-tighter text-[#212842] dark:text-[#F0E7D5] uppercase select-none">
          Xpress
        </div>
        
        {/* Desktop Links (Hidden on mobile) */}
        <div className="hidden lg:flex gap-6 items-center">
          <a href="#segments" className="text-[11px] font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] transition-colors">Segments</a>
          <a href="#pms" className="text-[11px] font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] transition-colors">PMS</a>
          <a href="#restaurant" className="text-[11px] font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] transition-colors">POS</a>
          <a href="#revenue-yield" className="text-[11px] font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] transition-colors">Revenue Yield</a>
          <a href="#integrations" className="text-[11px] font-bold uppercase tracking-wider text-[#212842]/80 dark:text-[#F0E7D5]/80 hover:text-[var(--accent)] transition-colors">Channel Sync</a>
        </div>

        {/* Action Controls (Theme switch + Hamburger) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 cursor-pointer flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 stroke-[2] text-[#F0E7D5]" />
            ) : (
              <Moon className="w-3.5 h-3.5 stroke-[2] text-[#212842]" />
            )}
          </button>

          {/* Hamburger Toggle (Visible only on mobile/tablet) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-8 h-8 rounded-full border border-black/10 dark:border-white/10 cursor-pointer flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-all text-[#212842] dark:text-[#F0E7D5]"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay Dropdown */}
      {menuOpen && (
        <div className="fixed inset-x-5 top-24 z-[99] p-6 rounded-3xl bg-white/95 dark:bg-[#1a2135]/95 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-2xl flex flex-col gap-4 select-none lg:hidden animate-float duration-[8000ms]">
          <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-wider block border-b border-black/5 dark:border-white/5 pb-2">
            Navigation Menu:
          </span>
          <a onClick={handleLinkClick} href="#segments" className="text-sm font-bold uppercase tracking-wider text-[#212842] dark:text-[#F0E7D5] hover:text-[var(--accent)] transition-colors py-1">Segments</a>
          <a onClick={handleLinkClick} href="#pms" className="text-sm font-bold uppercase tracking-wider text-[#212842] dark:text-[#F0E7D5] hover:text-[var(--accent)] transition-colors py-1">PMS Module</a>
          <a onClick={handleLinkClick} href="#restaurant" className="text-sm font-bold uppercase tracking-wider text-[#212842] dark:text-[#F0E7D5] hover:text-[var(--accent)] transition-colors py-1">Restaurant POS</a>
          <a onClick={handleLinkClick} href="#revenue-yield" className="text-sm font-bold uppercase tracking-wider text-[#212842] dark:text-[#F0E7D5] hover:text-[var(--accent)] transition-colors py-1">Revenue Yield Sync</a>
          <a onClick={handleLinkClick} href="#integrations" className="text-sm font-bold uppercase tracking-wider text-[#212842] dark:text-[#F0E7D5] hover:text-[var(--accent)] transition-colors py-1">Channel Sync</a>
        </div>
      )}
    </>
  );
}
