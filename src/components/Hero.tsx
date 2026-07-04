import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTitleRef = useRef<HTMLDivElement>(null);
  const rightTitleRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Entrance animation for the massive left branding on load
    const leftChars = leftTitleRef.current?.querySelectorAll('.char');
    if (leftChars) {
      gsap.fromTo(leftChars,
        { y: '120%', opacity: 0, rotate: 6 },
        { y: '0%', opacity: 1, rotate: 0, duration: 1.2, stagger: 0.03, ease: 'power4.out' }
      );
    }

    // 2. Scroll-Triggered Word-by-Word Text Reveal Animation
    const scrollWords = container.querySelectorAll('.scroll-word');
    if (scrollWords.length > 0) {
      gsap.fromTo(scrollWords,
        { opacity: 0.15, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom center',
            scrub: 1.0,
          }
        }
      );
    }

    // 3. Right Title "ENGINEERED HOSPITALITY" moves downward during scroll
    if (rightTitleRef.current) {
      gsap.to(rightTitleRef.current, {
        y: 160,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  }, []);

  // Helper to split text into characters for left side slide-up
  const splitIntoChars = (text: string) => {
    return text.split('').map((char, idx) => (
      <span
        key={idx}
        className="char inline-block translate-y-[120%] opacity-0 origin-bottom"
        style={{ display: char === ' ' ? 'inline-block' : 'inline-block', width: char === ' ' ? '0.25em' : 'auto' }}
      >
        {char}
      </span>
    ));
  };

  // Helper to split a string into words wrapped in span tags for scroll animations
  const splitIntoWords = (text: string) => {
    return text.split(' ').map((word, idx) => (
      <span 
        key={idx} 
        className="scroll-word inline-block mr-[0.25em] opacity-[0.15] translate-y-4"
      >
        {word}
      </span>
    ));
  };

  const handleModelClick = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    setShowDropdown(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="min-h-screen flex flex-col lg:flex-row overflow-hidden relative select-none w-full"
    >
      {/* LEFT SIDE: Midnight Indigo Background with Massive XPRESS HOTEL ERP */}
      <div className="w-full lg:w-1/2 bg-[#212842] flex flex-col justify-between p-8 md:p-16 text-left relative min-h-[50vh] lg:min-h-screen border-b lg:border-b-0 lg:border-r border-[#F0E7D5]/10">
        <div className="hidden" />

        {/* Massive branding title */}
        <div className="max-w-xl z-10 mb-8 lg:mb-12 mt-24 lg:mt-36">
          <h1 
            ref={leftTitleRef}
            className="font-display text-[10vw] sm:text-[8vw] lg:text-[5.5vw] font-bold leading-[0.9] tracking-tighter text-[#F0E7D5] uppercase flex flex-col"
          >
            <span className="overflow-hidden block py-1">
              {splitIntoChars("XPRESS")}
            </span>
            <span className="overflow-hidden block py-1">
              {splitIntoChars("HOTEL")}
            </span>
            <span className="overflow-hidden block py-1 text-[#C6A75E]">
              {splitIntoChars("ERP")}
            </span>
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE: Vanilla Cream Background with smaller EMERGING HOSPITALITY at the TOP */}
      <div className="w-full lg:w-1/2 bg-[#F0E7D5] flex flex-col justify-between p-8 md:p-16 text-left min-h-[50vh] lg:min-h-screen relative">
        <div className="hidden" />

        {/* Header title positioned at the top of right side content with animated watermark behind it */}
        <div 
          ref={rightTitleRef}
          className="max-w-2xl z-10 mt-24 lg:mt-36 relative"
        >
          {/* Animated Apartments Emerging behind emerging hospitality */}
          <div className="absolute -top-16 left-0 right-0 h-32 overflow-hidden pointer-events-none select-none z-0 flex items-end justify-start gap-1 opacity-[0.06] dark:opacity-[0.04]">
            <div className="w-7 bg-[#212842] dark:bg-[#F0E7D5] rounded-t-md animate-building-rise" style={{ height: '65%', animationDelay: '0.1s' }} />
            <div className="w-9 bg-[#212842] dark:bg-[#F0E7D5] rounded-t-md animate-building-rise" style={{ height: '85%', animationDelay: '0.3s' }} />
            <div className="w-6 bg-[#212842] dark:bg-[#F0E7D5] rounded-t-md animate-building-rise" style={{ height: '50%', animationDelay: '0.2s' }} />
            <div className="w-8 bg-[#212842] dark:bg-[#F0E7D5] rounded-t-md animate-building-rise" style={{ height: '75%', animationDelay: '0.5s' }} />
            <div className="w-11 bg-[#212842] dark:bg-[#F0E7D5] rounded-t-md animate-building-rise" style={{ height: '40%', animationDelay: '0.4s' }} />
            <div className="w-7 bg-[#212842] dark:bg-[#F0E7D5] rounded-t-md animate-building-rise" style={{ height: '70%', animationDelay: '0.6s' }} />
          </div>

          <h2 className="font-display text-[6vw] sm:text-[5vw] lg:text-[3vw] font-bold leading-[1.0] tracking-tighter text-[#212842] uppercase flex flex-wrap relative z-10">
            {splitIntoWords("EMERGING HOSPITALITY")}
          </h2>
        </div>

        {/* Sub details area at the bottom */}
        <div 
          ref={rightContentRef}
          className="max-w-2xl z-10 flex flex-col gap-6 border-t border-[#212842]/10 pt-6 mt-12 lg:mt-auto"
        >
          {/* Made significantly bigger */}
          <p className="font-display text-2xl sm:text-3xl lg:text-[2.2vw] font-extrabold text-[#212842] uppercase tracking-tight leading-none flex flex-wrap text-left">
            {splitIntoWords("INDIA & UK | 14+ Years | 75+ Cities")}
          </p>
          
          <p className="font-sans text-xs sm:text-sm text-[#1F2A44] leading-relaxed flex flex-wrap">
            {splitIntoWords("Precision-crafted management systems merging database-grade performance with uncompromising interface design.")}
          </p>

          {/* Interactive buttons / Action cards (Made larger and thicker) */}
          <div className="relative">
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="mailto:sales@rnsoftwares.co.in?subject=Demo%20Request"
                className="px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest bg-[#212842] text-[#F0E7D5] hover:bg-[#1b2136] hover:text-[#F0E7D5] transition-all shadow-md text-center"
              >
                Book a Demo
              </a>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest border-2 border-[#212842] text-[#212842] hover:bg-[#212842] hover:text-[#F0E7D5] transition-all text-center cursor-pointer select-none"
              >
                Explore Models {showDropdown ? '▲' : '▼'}
              </button>
            </div>

            {/* Dropdown displaying all links from the header (opens upward to stay visible) */}
            {showDropdown && (
              <div className="absolute left-0 bottom-full mb-3 w-72 rounded-2xl bg-white border border-[#212842]/15 shadow-2xl p-3 z-50 flex flex-col gap-1.5 animate-float duration-[8000ms]">
                <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-wider px-3 py-1 block">
                  Select a Module to Explore:
                </span>
                <button 
                  onClick={(e) => handleModelClick(e, 'segments')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#212842] hover:bg-[#F0E7D5] transition-colors cursor-pointer"
                >
                  Segments
                </button>
                <button 
                  onClick={(e) => handleModelClick(e, 'pms')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#212842] hover:bg-[#F0E7D5] transition-colors cursor-pointer"
                >
                  Property Management System (PMS)
                </button>
                <button 
                  onClick={(e) => handleModelClick(e, 'restaurant')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#212842] hover:bg-[#F0E7D5] transition-colors cursor-pointer"
                >
                  Restaurant POS
                </button>
                <button 
                  onClick={(e) => handleModelClick(e, 'revenue-yield')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#212842] hover:bg-[#F0E7D5] transition-colors cursor-pointer"
                >
                  Revenue Yield Sync
                </button>
                <button 
                  onClick={(e) => handleModelClick(e, 'integrations')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#212842] hover:bg-[#F0E7D5] transition-colors cursor-pointer"
                >
                  Channel Sync
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#212842]">
            <span>24x7 Support</span>
            <a 
              href="http://www.xpresshotelerp.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#C6A75E] hover:underline"
            >
              www.xpresshotelerp.com
            </a>
          </div>
        </div>

        {/* Pulse scroll indicator on right side bottom */}
        <div className="absolute bottom-16 right-8 md:right-16 flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[2px] text-[#212842]/60 [writing-mode:vertical-rl] font-bold">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-[#212842]/40 animate-scroll-pulse" />
        </div>
      </div>
    </section>
  );
}
