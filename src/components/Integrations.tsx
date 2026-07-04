import { useEffect, useRef } from 'react';
import { 
  MessageSquare, Smartphone, CreditCard, Calculator, Cloud, 
  Utensils, ShoppingBag, Fingerprint, Key, Globe, Compass 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IntegrationItem {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  textColor: string;
}

export default function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const integrations: IntegrationItem[] = [
    { name: 'WhatsApp', icon: MessageSquare, color: '#190019', textColor: 'text-white' },
    { name: 'Pine Labs', icon: Smartphone, color: '#2B124C', textColor: 'text-white' },
    { name: 'Easebuzz', icon: CreditCard, color: '#522B5B', textColor: 'text-white' },
    { name: 'Tally Prime', icon: Calculator, color: '#854F6C', textColor: 'text-white' },
    { name: 'AWS Cloud', icon: Cloud, color: '#1F2A44', textColor: 'text-[#F0E7D5]' },
    { name: 'Zomato POS', icon: Utensils, color: '#17191D', textColor: 'text-white' },
    { name: 'Swiggy POS', icon: ShoppingBag, color: '#190019', textColor: 'text-white' },
    { name: 'eSSL Biometric', icon: Fingerprint, color: '#2B124C', textColor: 'text-white' },
    { name: 'Godrej Locks', icon: Key, color: '#522B5B', textColor: 'text-white' },
    { name: 'Go-MMT OTA', icon: Globe, color: '#854F6C', textColor: 'text-white' },
    { name: 'Booking.com', icon: Compass, color: '#1F2A44', textColor: 'text-[#F0E7D5]' }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.integration-card');
    const title = titleRef.current;

    let mm = gsap.matchMedia();

    // Desktop: 4x4 Grid reveal on scroll
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

      tl.fromTo(cards,
        { scale: 0.8, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 2.0,
          ease: 'power3.out'
        },
        '-=0.5'
      );
    });

    // Mobile: GSAP Vertical stacking deck overlay with visible label text positioned at the top
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: '+=1800',
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
          { y: '100vh', scale: 0.95 },
          {
            y: idx * 30,
            scale: 1 - (cards.length - idx) * 0.003,
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
      id="integrations" 
      className="h-screen flex flex-col justify-center items-center bg-[#212842] text-[#F0E7D5] transition-colors duration-300 text-left relative overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-10" />
      
      {/* Centered Content Wrapper */}
      <div className="flex flex-col items-center justify-center w-full max-w-6xl px-6 relative z-20">
        
        {/* Header Title - Centered */}
        <div className="text-center mb-6">
          <div className="text-[11px] font-bold uppercase tracking-[3px] text-[#C6A75E] mb-1">
            05 — INTEGRATIONS
          </div>
          <h2 
            ref={titleRef}
            className="font-display text-3xl sm:text-5xl lg:text-[4.5vw] font-black leading-none tracking-tight text-white uppercase"
          >
            E-Invoice & Channel Sync
          </h2>
          <div className="w-16 h-[1px] bg-[#F0E7D5]/20 mx-auto mt-3" />
        </div>

        {/* 4-Column Grid Layout on Desktop, Vertical Stack Deck on Mobile */}
        <div className="relative w-72 h-[380px] lg:h-auto lg:w-full grid grid-cols-1 lg:grid-cols-4 gap-6 justify-items-center mx-auto">
          {integrations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="integration-card absolute lg:relative w-full max-w-[280px] h-32 lg:h-20 rounded-[1.5rem] lg:rounded-full shadow-2xl p-4 lg:p-2.5 flex flex-col lg:flex-row items-center justify-start text-center lg:text-left gap-2 lg:gap-4 border border-white/5 origin-center shrink-0 lg:opacity-0"
                style={{ 
                  backgroundColor: item.color,
                  zIndex: idx + 10,
                  transform: idx === 0 ? 'translateY(0px) scale(1.0)' : 'translateY(100vh) scale(0.95)'
                }}
              >
                {/* Text Label: Placed at the top for mobile visibility during stacking, aligned left on desktop */}
                <div className="flex flex-col text-center lg:text-left order-1 lg:order-2">
                  <span className={`font-display font-bold text-sm lg:text-sm tracking-wider uppercase leading-none ${item.textColor}`}>
                    {item.name}
                  </span>
                  <span className={`text-[7px] lg:text-[8px] font-mono opacity-80 uppercase tracking-widest mt-1 font-semibold ${item.textColor}`}>
                    INTEGRATION SYNCED
                  </span>
                </div>

                {/* Circle Icon Container: Placed below text on mobile, left on desktop */}
                <div className={`w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center border shrink-0 order-2 lg:order-1 ${
                  item.textColor === 'text-white' ? 'bg-white/20 border-white/20' : 'bg-black/10 border-black/10'
                }`}>
                  <Icon className={`w-4 h-4 lg:w-6 lg:h-6 stroke-[1.5] ${item.textColor}`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
