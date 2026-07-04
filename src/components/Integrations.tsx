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

    // Desktop: Pin and build a 3x3 grid on scroll
    mm.add("(min-width: 1024px)", () => {
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

      // Populating the grid layout on scroll
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

    // Mobile: Simple scroll reveal fade in, no pinning
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
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
      id="integrations" 
      className="min-h-screen py-24 lg:py-0 lg:h-screen flex flex-col justify-center items-center bg-[#212842] text-[#F0E7D5] transition-colors duration-300 text-left relative overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-10" />
      
      {/* Centered Content Wrapper */}
      <div className="flex flex-col items-center justify-center w-full max-w-6xl px-6 relative z-20">
        
        {/* Header Title - Centered */}
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold uppercase tracking-[3px] text-[#C6A75E] mb-2">
            05 — INTEGRATIONS
          </div>
          <h2 
            ref={titleRef}
            className="font-poppins text-4xl sm:text-6xl lg:text-[4.5vw] font-bold leading-none tracking-tighter text-white uppercase"
          >
            E-Invoice & Channel Sync
          </h2>
          <div className="w-16 h-[1px] bg-[#F0E7D5]/20 mx-auto mt-4" />
        </div>

        {/* 4x4/4-Column Grid Layout on Desktop, Auto Wrap Flex on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto justify-items-center">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="integration-card w-full max-w-[280px] h-20 rounded-full shadow-2xl p-2.5 pr-6 flex items-center gap-4 border border-white/5 origin-center shrink-0 lg:opacity-0"
                style={{ 
                  backgroundColor: item.color
                }}
              >
                {/* Left Circle Icon Container */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border shrink-0 ${
                  item.textColor === 'text-white' ? 'bg-white/20 border-white/20' : 'bg-black/10 border-black/10'
                }`}>
                  <Icon className={`w-6 h-6 stroke-[1.5] ${item.textColor}`} />
                </div>

                {/* Integration Details */}
                <div className="flex flex-col text-left">
                  <span className={`font-poppins font-bold text-sm tracking-wider uppercase leading-none ${item.textColor}`}>
                    {item.name}
                  </span>
                  <span className={`text-[8px] font-mono opacity-80 uppercase tracking-widest mt-1 font-semibold ${item.textColor}`}>
                    INTEGRATION SYNCED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
