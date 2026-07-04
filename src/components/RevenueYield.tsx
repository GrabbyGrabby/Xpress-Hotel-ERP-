import { useEffect, useRef } from 'react';
import { TrendingUp, RefreshCw, CalendarRange, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RevenueYield() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const cards = [
    {
      title: 'YIELD MANAGEMENT',
      subtitle: 'REVENUE OPTIMIZATION',
      icon: TrendingUp,
      desc: 'Automated seasonal tariff updates, yield algorithms, and direct inventory overrides to maximize average daily rate (ADR).',
      bg: '#17191D',
      textColor: '#D4BCC8',
      descColor: '#F0E7D5',
      subColor: '#C6A75E',
      iconBg: 'rgba(212, 188, 200, 0.1)',
      border: 'rgba(212, 188, 200, 0.15)'
    },
    {
      title: 'CHANNEL MANAGER',
      subtitle: 'OTA INVENTORY SYNC',
      icon: RefreshCw,
      desc: 'Instant two-way rate and room inventory sync across all linked online channels (MakeMyTrip, Booking.com, Agoda) to eliminate double bookings.',
      bg: '#D4BCC8',
      textColor: '#17191D',
      descColor: '#212842',
      subColor: '#1F2A44',
      iconBg: 'rgba(23, 25, 29, 0.08)',
      border: 'rgba(23, 25, 29, 0.12)'
    },
    {
      title: 'BOOKING ENGINE',
      subtitle: 'DIRECT RESERVATIONS',
      icon: CalendarRange,
      desc: 'Mobile-responsive booking module integrated into your hotel portal enabling commission-free guest checkouts, packages, and coupons.',
      bg: '#17191D',
      textColor: '#D4BCC8',
      descColor: '#F0E7D5',
      subColor: '#C6A75E',
      iconBg: 'rgba(212, 188, 200, 0.1)',
      border: 'rgba(212, 188, 200, 0.15)'
    },
    {
      title: 'WEBSITE GROWTH',
      subtitle: 'BRANDED PORTAL',
      icon: Globe,
      desc: 'Custom, blazing-fast hotel website templates optimized for search engines, speed, and guest reservations conversion.',
      bg: '#D4BCC8',
      textColor: '#17191D',
      descColor: '#212842',
      subColor: '#1F2A44',
      iconBg: 'rgba(23, 25, 29, 0.08)',
      border: 'rgba(23, 25, 29, 0.12)'
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cardsEl = container.querySelectorAll('.yield-card');
    const title = titleRef.current;

    let mm = gsap.matchMedia();

    // Desktop: 2 cards appear per scroll step
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: '+=2000',
          invalidateOnRefresh: true,
        }
      });

      if (title) {
        tl.fromTo(title,
          { scale: 0.8, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' },
          0
        );
      }

      // First 2 cards appear together on first scroll
      tl.fromTo([cardsEl[0], cardsEl[1]],
        { scale: 0.85, opacity: 0, y: 60 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.2, duration: 2.0, ease: 'power3.out' },
        0.5
      );

      // Second 2 cards appear together on second scroll
      tl.fromTo([cardsEl[2], cardsEl[3]],
        { scale: 0.85, opacity: 0, y: 60 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.2, duration: 2.0, ease: 'power3.out' },
        3.5
      );
    });

    // Mobile: Vertical overlay card stack driven by GSAP on scroll (keeping labels visible)
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: '+=1600',
          invalidateOnRefresh: true,
        }
      });

      if (title) {
        tl.fromTo(title,
          { scale: 0.8, opacity: 0.3 },
          { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }
        );
      }

      cardsEl.forEach((card, idx) => {
        if (idx === 0) return;
        tl.fromTo(card,
          { y: '100vh', scale: 0.95 },
          {
            y: idx * 42,
            scale: 1 - (cardsEl.length - idx) * 0.005,
            opacity: 1,
            duration: 2.0,
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
      id="revenue-yield" 
      className="h-screen flex flex-col justify-center bg-[#1F2A44] text-[#F0E7D5] relative overflow-hidden select-none border-t border-white/5 scroll-mt-20"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-5" />
      
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-display text-[20vw] font-black text-white/[0.01] tracking-tighter uppercase z-0">
        YIELD
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-[3px] block mb-2">
            04 — REVENUE ENGINE
          </span>
          <h2 
            ref={titleRef}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase"
          >
            Revenue Yield Sync
          </h2>
          <div className="w-16 h-[1px] bg-[#F0E7D5]/20 mx-auto mt-4" />
        </div>

        {/* 4 Cards Grid - Responsive stack on mobile, grid on desktop */}
        <div className="relative w-80 h-[380px] lg:h-auto lg:w-full grid grid-cols-1 lg:grid-cols-4 gap-8 mx-auto">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.title}
                className="yield-card absolute lg:relative w-full max-w-[280px] h-60 lg:h-[320px] rounded-3xl p-6 flex flex-col justify-start overflow-hidden lg:opacity-0 border border-white/5 pt-5 gap-2"
                style={{ 
                  backgroundColor: card.bg, 
                  borderColor: card.border,
                  borderWidth: '1px',
                  zIndex: idx + 10,
                  transform: idx === 0 ? 'translateY(0px) scale(1.0)' : 'translateY(100vh) scale(0.95)'
                }}
              >
                {/* Top: Big Header Title (always visible when stacked) */}
                <div>
                  <h3 
                    className="font-display text-base lg:text-lg font-black tracking-tighter uppercase leading-none mb-1"
                    style={{ color: card.textColor }}
                  >
                    {card.title}
                  </h3>
                  <span 
                    className="text-[7px] font-mono tracking-widest uppercase block font-bold"
                    style={{ color: card.subColor }}
                  >
                    {card.subtitle}
                  </span>
                </div>

                {/* Middle: Description */}
                <p 
                  className="font-poppins text-[9px] lg:text-xs leading-relaxed font-semibold"
                  style={{ color: card.descColor }}
                >
                  {card.desc}
                </p>

                {/* Bottom: Icon */}
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mt-auto shrink-0"
                  style={{ 
                    backgroundColor: card.iconBg,
                    color: card.textColor
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
