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
  color: string; // The solid color from the screenshot
  textColor: string;
}

export default function Segments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Colors mapped strictly from the new uploaded palette
  const segments: SegmentItem[] = [
    {
      id: 'hotels',
      name: 'HOTELS',
      icon: Hotel,
      color: '#190019', // Deep Plum Black
      textColor: 'text-white'
    },
    {
      id: 'clubs',
      name: 'CLUB MANAGEMENT',
      icon: Users,
      color: '#2B124C', // Midnight Purple
      textColor: 'text-white'
    },
    {
      id: 'restaurant-bar',
      name: 'RESTAURANT & BAR',
      icon: GlassWater,
      color: '#522B5B', // Medium Purple
      textColor: 'text-white'
    },
    {
      id: 'qsrs',
      name: "QSR'S",
      icon: Utensils,
      color: '#854F6C', // Muted Rose
      textColor: 'text-white'
    },
    {
      id: 'lodging',
      name: 'LODGING',
      icon: Home,
      color: '#DFB6B2', // Soft Lilac Gray
      textColor: 'text-[#212842]'
    },
    {
      id: 'wine-beer',
      name: 'WINE / BEER SHOPS',
      icon: Wine,
      color: '#FBE4D8', // Warm Cream / Peach
      textColor: 'text-[#212842]'
    },
    {
      id: 'resort',
      name: 'RESORT',
      icon: Palmtree,
      color: '#190019',
      textColor: 'text-white'
    },
    {
      id: 'water-park',
      name: 'WATER PARK',
      icon: Waves,
      color: '#2B124C',
      textColor: 'text-white'
    },
    {
      id: 'banquet',
      name: 'BANQUET',
      icon: Building,
      color: '#522B5B',
      textColor: 'text-white'
    },
    {
      id: 'caterers',
      name: 'CATERERS',
      icon: PartyPopper,
      color: '#854F6C',
      textColor: 'text-white'
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.segment-card');
    const title = titleRef.current;

    let mm = gsap.matchMedia();

    // Desktop GSAP horizontal fan cards stacking deck
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
          { x: '100vw', scale: 0.9, rotate: idx % 2 === 0 ? 1 : -1 },
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

    // Mobile: clear inline properties and let layout handle centering
    mm.add("(max-width: 1023px)", () => {
      cards.forEach((card) => {
        gsap.set(card, { clearProps: "all" });
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
      className="min-h-screen py-24 lg:py-0 lg:h-screen flex flex-col justify-center items-center overflow-hidden bg-[var(--bg)] transition-colors duration-300 relative select-none"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-30" />
      
      {/* Centered Content Wrapper */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl px-6 relative z-20">
        
        {/* Header Title - Centered Poppins */}
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold uppercase tracking-[3px] text-[var(--accent)] mb-2">
            Brochure Modules
          </div>
          <h2 
            ref={titleRef}
            className="font-poppins text-4xl sm:text-6xl lg:text-[5vw] font-bold leading-none tracking-tighter text-[var(--text)] uppercase"
          >
            Segments We Cover
          </h2>
          <div className="w-16 h-[1px] bg-[var(--text)]/20 mx-auto mt-4" />
        </div>

        {/* Stacking Deck Container (mobile uses absolute stacking with offset, desktop uses GSAP) */}
        <div className="relative w-64 h-[650px] lg:w-[560px] lg:h-[340px] mx-auto mt-4">
          {segments.map((segment, idx) => {
            const Icon = segment.icon;
            return (
              <div
                key={segment.id}
                className="segment-card absolute lg:top-0 lg:left-0 w-64 h-64 rounded-[2rem] shadow-2xl p-6 flex flex-col justify-center items-center text-center gap-6 border border-white/5 shrink-0"
                style={{ 
                  backgroundColor: segment.color,
                  zIndex: idx + 10,
                  '--idx': idx,
                  // Desktop only base configuration
                  transform: idx === 0 ? 'translateX(0px) scale(1.0)' : undefined
                } as React.CSSProperties}
              >
                {/* Big defining Icon: Centered */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border shrink-0 mx-auto ${
                  segment.textColor === 'text-white' ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/5'
                }`}>
                  <Icon className={`w-10 h-10 stroke-[1.5] ${segment.textColor}`} />
                </div>

                {/* Text Label: Centered Felix Titling */}
                <h3 className={`font-felix font-bold text-lg sm:text-xl tracking-wider uppercase leading-tight ${segment.textColor}`}>
                  {segment.name}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
