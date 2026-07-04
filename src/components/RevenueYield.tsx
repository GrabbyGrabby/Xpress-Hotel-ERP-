import { useEffect, useRef } from 'react';
import { TrendingUp, RefreshCw, CalendarRange, Globe, CheckCircle2 } from 'lucide-react';
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

    // Desktop: Pin and stack cards one-by-one side-by-side on scroll
    mm.add("(min-width: 1024px)", () => {
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

      tl.fromTo(cardsEl,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 2.0,
          ease: 'power3.out'
        },
        '-=0.5'
      );
    });

    // Mobile: simple fade in, no pinning
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(cardsEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="revenue-yield" 
      className="min-h-screen py-24 lg:py-0 lg:h-screen flex flex-col justify-center bg-[#1F2A44] text-[#F0E7D5] relative overflow-hidden select-none border-t border-white/5 scroll-mt-20"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-5" />
      
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-display text-[20vw] font-black text-white/[0.01] tracking-tighter uppercase z-0">
        YIELD
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-[3px] block mb-2">
            04 — REVENUE ENGINE
          </span>
          <h2 
            ref={titleRef}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white uppercase"
          >
            Revenue Yield Sync
          </h2>
          <div className="w-16 h-[1px] bg-[#F0E7D5]/20 mx-auto mt-4" />
        </div>

        {/* 4 Cards Grid - Applying custom colors, animations, and Poppins font for details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.title}
                className="yield-card group relative rounded-3xl p-8 flex flex-col justify-between min-h-[320px] transition-all duration-500 hover:-translate-y-2.5 hover:shadow-2xl overflow-hidden lg:opacity-0"
                style={{ 
                  backgroundColor: card.bg, 
                  borderColor: card.border,
                  borderWidth: '1px'
                }}
              >
                {/* Top: Icon + Subtitle */}
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-6"
                    style={{ 
                      backgroundColor: card.iconBg,
                      color: card.textColor
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <span 
                    className="text-[9px] font-mono tracking-widest uppercase block mb-1 font-bold"
                    style={{ color: card.subColor }}
                  >
                    {card.subtitle}
                  </span>
                  
                  {/* Big Header */}
                  <h3 
                    className="font-display text-2xl font-black tracking-tighter uppercase leading-none mb-4"
                    style={{ color: card.textColor }}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Bottom: Description (Poppins Font as requested) */}
                <p 
                  className="font-poppins text-xs leading-relaxed font-semibold"
                  style={{ color: card.descColor }}
                >
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mini stats line */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/5 text-xs text-[#E8DCC8] uppercase tracking-wider font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C6A75E]" />
            <span>Zero Booking Commissions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C6A75E]" />
            <span>Real-time OTA Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C6A75E]" />
            <span>Seasonal Rate Rule Engine</span>
          </div>
        </div>

      </div>
    </section>
  );
}
