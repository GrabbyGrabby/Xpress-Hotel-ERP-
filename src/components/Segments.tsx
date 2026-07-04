import { useEffect, useRef } from 'react';
import { 
  Hotel, Users, GlassWater, Utensils, Home, Wine, Palmtree, 
  Waves, Building, PartyPopper 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SegmentItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  textColor: string;
}

export default function Segments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const segments: SegmentItem[] = [
    { id: 'hotels', name: 'HOTELS', icon: Hotel, color: '#190019', textColor: 'text-white' },
    { id: 'clubs', name: 'CLUB MANAGEMENT', icon: Users, color: '#2B124C', textColor: 'text-white' },
    { id: 'restaurant-bar', name: 'RESTAURANT & BAR', icon: GlassWater, color: '#522B5B', textColor: 'text-white' },
    { id: 'qsrs', name: "QSR'S", icon: Utensils, color: '#854F6C', textColor: 'text-white' },
    { id: 'lodging', name: 'LODGING', icon: Home, color: '#DFB6B2', textColor: 'text-[#212842]' },
    { id: 'wine-beer', name: 'WINE / BEER SHOPS', icon: Wine, color: '#FBE4D8', textColor: 'text-[#212842]' },
    { id: 'resort', name: 'RESORT', icon: Palmtree, color: '#190019', textColor: 'text-white' },
    { id: 'water-park', name: 'WATER PARK', icon: Waves, color: '#2B124C', textColor: 'text-white' },
    { id: 'banquet', name: 'BANQUET', icon: Building, color: '#522B5B', textColor: 'text-white' },
    { id: 'caterers', name: 'CATERERS', icon: PartyPopper, color: '#854F6C', textColor: 'text-white' }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.segment-card');
    const title = titleRef.current;

    let mm = gsap.matchMedia();

    // Desktop: Horizontal fan card stack on scroll
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.0,
          start: 'top top',
          end: '+=2500',
          invalidateOnRefresh: true,
        }
      });

      if (title) {
        tl.fromTo(title,
          { scale: 0.8, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
        );
      }

      cards.forEach((card, idx) => {
        if (idx === 0) return;
        tl.fromTo(card,
          { x: '100vw', y: 0, scale: 0.9, rotate: idx % 2 === 0 ? 1 : -1 },
          { 
            x: idx * 32, 
            y: 0,
            scale: 1 - (cards.length - idx) * 0.005, 
            opacity: 1, 
            duration: 2.2, 
            ease: 'power2.out' 
          },
          '-=1.4'
        );
      });
    });

    // Mobile: Vertical overlay card stack on scroll (keeping labels visible)
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.0,
          start: 'top top',
          end: '+=2500',
          invalidateOnRefresh: true,
        }
      });

      if (title) {
        tl.fromTo(title,
          { scale: 0.8, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }
        );
      }

      cards.forEach((card, idx) => {
        if (idx === 0) return;
        tl.fromTo(card,
          { y: '100vh', x: 0, scale: 0.95 },
          { 
            y: idx * 42, 
            x: 0,
            scale: 1 - (cards.length - idx) * 0.005, 
            opacity: 1, 
            duration: 2.2, 
            ease: 'power2.out' 
          },
          '-=1.4'
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="segments" 
      className="h-screen flex flex-col justify-center items-center overflow-hidden bg-[var(--bg)] transition-colors duration-300 relative select-none"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-30" />
      
      {/* Centered Content Wrapper */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl px-6 relative z-20">
        
        {/* Header Title - Centered */}
        <div className="text-center mb-6">
          <div className="text-[11px] font-bold uppercase tracking-[3px] text-[var(--accent)] mb-1">
            Brochure Modules
          </div>
          <h2 
            ref={titleRef}
            className="font-display text-3xl sm:text-5xl lg:text-[5vw] font-black leading-none tracking-tight text-[var(--text)] uppercase"
          >
            Segments We Cover
          </h2>
          <div className="w-16 h-[1px] bg-[var(--text)]/20 mx-auto mt-3" />
        </div>

        {/* Dynamic Card Stacking deck - Resized to fit mobile portrait viewport height limits */}
        <div className="relative w-64 h-[440px] lg:w-[560px] lg:h-[340px] mx-auto mt-4">
          {segments.map((segment, idx) => {
            const Icon = segment.icon;
            return (
              <div
                key={segment.id}
                className="segment-card absolute top-0 left-0 w-64 h-48 lg:h-64 rounded-[2rem] shadow-2xl p-6 flex flex-col justify-start items-center text-center gap-3 lg:gap-5 border border-white/5 pt-5"
                style={{ 
                  backgroundColor: segment.color,
                  zIndex: idx + 10,
                  transform: idx === 0 ? 'translateY(0px) scale(1.0)' : 'translateY(100vh) scale(0.95)'
                }}
              >
                {/* Text Label: Placed at the top so it is visible during stacking */}
                <h3 className={`font-display font-extrabold text-xs lg:text-base tracking-wider uppercase leading-tight ${segment.textColor} block mb-1 shrink-0`}>
                  {segment.name}
                </h3>

                {/* Big defining Icon: Placed below text label */}
                <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center border shrink-0 mx-auto ${
                  segment.textColor === 'text-white' ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/5'
                }`}>
                  <Icon className={`w-6 h-6 lg:w-8 lg:h-8 stroke-[1.5] ${segment.textColor}`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
