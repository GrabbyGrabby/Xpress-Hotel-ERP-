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
    { name: 'AWS Cloud', icon: Cloud, color: '#DFB6B2', textColor: 'text-[#212842]' },
    { name: 'Zomato POS', icon: Utensils, color: '#FBE4D8', textColor: 'text-[#212842]' },
    { name: 'Swiggy POS', icon: ShoppingBag, color: '#190019', textColor: 'text-white' },
    { name: 'eSSL Biometric', icon: Fingerprint, color: '#2B124C', textColor: 'text-white' },
    { name: 'Godrej Locks', icon: Key, color: '#522B5B', textColor: 'text-white' },
    { name: 'Go-MMT OTA', icon: Globe, color: '#854F6C', textColor: 'text-white' },
    { name: 'Booking.com', icon: Compass, color: '#DFB6B2', textColor: 'text-[#212842]' }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.integration-card');
    const title = titleRef.current;

    // Timeline for vertical stacking partner capsules with faster scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.8, // Snappier scrub damping
        start: 'top top',
        end: '+=1600', // Reduced scroll length to make it faster
        invalidateOnRefresh: true,
      }
    });

    // Zoom title on scroll
    if (title) {
      tl.fromTo(title,
        { scale: 0.8, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 1.0, ease: 'power2.out' }
      );
    }

    // Staggered vertical stacking of pill capsules
    cards.forEach((card, idx) => {
      if (idx === 0) return; // Base card sits in place

      // Slide up from bottom and stop to stack vertically
      tl.fromTo(card,
        { y: '100vh', scale: 0.95, rotate: idx % 2 === 0 ? 0.5 : -0.5 },
        {
          y: idx * 22, // Vertical folder stack offset (22px shift per card)
          scale: 1 - (cards.length - idx) * 0.003,
          opacity: 1,
          duration: 1.2, // Reduced duration from 2.2 for faster transition
          ease: 'power2.out'
        },
        '-=0.9' // Snappier overlap
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="integrations" 
      className="h-screen flex flex-col justify-center items-center bg-[#212842] text-[#F0E7D5] transition-colors duration-300 text-left relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-10" />
      
      {/* Centered Content Wrapper */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl px-6 relative z-20">
        
        {/* Header Title - Centered */}
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold uppercase tracking-[3px] text-[#C6A75E] mb-2">
            04 — INTEGRATIONS
          </div>
          <h2 
            ref={titleRef}
            className="font-poppins text-5xl sm:text-7xl lg:text-[5vw] font-bold leading-none tracking-tighter text-white uppercase"
          >
            E-Invoice & Channel Sync
          </h2>
          <div className="w-16 h-[1px] bg-[#F0E7D5]/20 mx-auto mt-4" />
        </div>

        {/* Vertical Stacking Deck Container - Aligned Vertically (w-80 h-20 capsule elements) */}
        <div className="relative w-[320px] h-[220px] sm:w-[340px] sm:h-[240px] mx-auto mt-4">
          {integrations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="integration-card absolute top-0 left-0 w-80 h-20 rounded-full shadow-2xl p-2.5 pr-8 flex items-center gap-4 border border-white/5 origin-center"
                style={{ 
                  backgroundColor: item.color,
                  zIndex: idx + 10,
                  // First card sits at base, others start off-screen
                  transform: idx === 0 ? 'translateY(0px) scale(1.0)' : 'translateY(100vh) scale(0.95)'
                }}
              >
                {/* Left Circle Icon Container (with big icon) */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border shrink-0 ${
                  item.textColor === 'text-white' ? 'bg-white/20 border-white/20' : 'bg-black/10 border-black/10'
                }`}>
                  <Icon className={`w-6 h-6 stroke-[1.5] ${item.textColor}`} />
                </div>

                {/* Big Clear Label: Main Focus */}
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
