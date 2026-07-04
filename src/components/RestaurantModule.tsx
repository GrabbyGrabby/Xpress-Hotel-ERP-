import { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, BarChart3, Smartphone, ShieldCheck, CheckCircle2, RefreshCw 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RestoNode {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  desc: string;
}

export default function RestaurantModule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const nodes: RestoNode[] = [
    { id: 'ease', name: 'Ease of Billing', icon: Sparkles, desc: 'Fast, touch-optimized POS billing interface that completes transactions in 3 clicks, saving waiter time and cashier queues.' },
    { id: 'excise', name: 'Excise & Bar Stock', icon: BarChart3, desc: 'Detailed liquor stock tracking, inventory batch audits, and automated state liquor excise reports compliance.' },
    { id: 'hw', name: 'Hardware Free POS', icon: Smartphone, desc: 'Hardware independent: runs smoothly on any standard Windows PC, Android tablet, iPad, or mobile phone.' },
    { id: 'lang', name: 'Multilanguage POS', desc: 'Easily switch operator POS language to support local staff billing speeds and prevent cashier errors.', icon: RefreshCw },
    { id: 'offline', name: 'Online/Offline Sync', desc: 'System continues to bill seamlessly during internet outages, auto-synchronizing later to prevent revenue leakages.', icon: ShieldCheck }
  ];

  const keyFeatures = [
    'Xpress Owner Apps for revenue logs',
    'Paperless E-bills & WhatsApp Bill PDFs',
    'QR Code based digital touch menus',
    'Guest feedback survey apps & ratings',
    'Dynamic payment UPI QR on Bill printouts',
    'XpressKOT Captain mobile ordering apps',
    'Kitchen Display KDS cook station screens',
    'Customer ordering portals & self-kiosks',
    'Payment gateway terminal integrations',
    'Table reservations & floor map planners'
  ];

  const coreList = [
    'Ease of Billing / Touch POS',
    'In Depth Accounts & Cashbooks',
    'Barcode Billing & Fast Scanning',
    'Works Online & Offline Sync',
    'Prevent Revenue Leakage & Voids',
    'Hardware Independent Layouts',
    'Support Multilanguage operators',
    'Bar Stock & Excise Reporting',
    'Inventory & Stock management',
    'Basic Employee Payroll ledger'
  ];

  useEffect(() => {
    const container = containerRef.current;
    const orbit = orbitRef.current;
    const title = titleRef.current;
    if (!container || !orbit || !title) return;

    const buttons = orbit.querySelectorAll('.resto-node-btn');
    const details = container.querySelectorAll('.resto-detail-block');

    let mm = gsap.matchMedia();

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

      tl.fromTo(title,
        { scale: 0.75, x: -50, opacity: 0 },
        { scale: 1, x: 0, opacity: 1, duration: 1.8, ease: 'power2.out' }
      );

      tl.to(orbit, { rotation: 360, ease: 'none', duration: 8 }, 'rotate-start')
        .to(buttons, { rotation: -360, ease: 'none', duration: 8 }, 'rotate-start');

      details.forEach((block, idx) => {
        const btn = buttons[idx];
        const startOffset = idx * 1.5;

        tl.to(btn, { scale: 1.25, backgroundColor: '#C6A75E', color: '#212842', duration: 0.8 }, `rotate-start+=${startOffset}`)
          .fromTo(block, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            `rotate-start+=${startOffset}`
          );

        if (idx < details.length - 1) {
          tl.to(btn, { scale: 1, backgroundColor: '#FAF8F5', color: '#1F2A44', duration: 0.5 }, `rotate-start+=${startOffset + 1.2}`)
            .to(block, { opacity: 0, y: -20, duration: 0.5 }, `rotate-start+=${startOffset + 1.2}`);
        }
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Clear desktop styles on mobile
      details.forEach((block) => {
        gsap.set(block, { clearProps: "all" });
      });
      buttons.forEach((btn) => {
        gsap.set(btn, { clearProps: "all" });
      });
      gsap.set(orbit, { clearProps: "all" });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="restaurant" 
      className="min-h-screen py-24 lg:py-0 lg:h-screen flex flex-col justify-center bg-[#E8DCC8] text-[#212842] transition-colors duration-300 text-left relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-20" />

      {/* Faint background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-display text-[26vw] font-black text-[#212842]/[0.06] tracking-tighter uppercase z-0">
        POS
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Widescreen 3-Column Grid Layout: Title Left, Wheel Center, Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 max-w-6xl mx-auto">
          
          {/* Left Column: Aligned Perfectly Left Section Header with Zoom Effect */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left">
            <div ref={titleRef} className="flex flex-col origin-left">
              <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-[3px] block mb-2">
                03 — MODULE DETAIL
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-5.5xl font-bold leading-[0.95] tracking-tighter text-[#212842] uppercase mb-4">
                RESTAURANT<br />& BAR<br />MANAGEMENT
              </h2>
              <div className="w-16 h-[1px] bg-[#212842]/20 mt-2 mb-4" />
              <p className="text-[11px] text-[#1F2A44] uppercase tracking-wider font-semibold max-w-[240px] leading-relaxed">
                High-speed POS billing, digital menus, and state excise modules.
              </p>
            </div>
          </div>

          {/* Center Column: Rotating Orbit Diagram */}
          <div className="lg:col-span-4 flex justify-center items-center h-[350px] relative">
            <div 
              ref={orbitRef}
              className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] rounded-full border-2 border-dashed border-[#212842]/10 relative flex items-center justify-center"
            >
              {/* Central base node - Enlarged and styled with gold border */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#FAF8F5] to-[#E8DCC8] border-2 border-[#C6A75E] shadow-[0_0_20px_rgba(198,167,94,0.15)] flex items-center justify-center font-display font-black text-sm sm:text-base text-[#212842] uppercase tracking-widest select-none z-10">
                Resto
              </div>

              {/* Orbiting Nodes */}
              {nodes.map((node, idx) => {
                const total = nodes.length;
                const angle = (idx * 2 * Math.PI) / total - Math.PI / 2; // Start from top
                const radius = 135; // Orbit radius
                const x = Math.round(radius * Math.cos(angle));
                const y = Math.round(radius * Math.sin(angle));
                const NodeIcon = node.icon;

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`resto-node-btn absolute w-11 h-11 sm:w-12 sm:h-12 rounded-full border-0 flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-300 origin-center z-20 cursor-pointer ${
                      activeIdx === idx 
                        ? 'bg-[#C6A75E] text-[#212842] scale-125' 
                        : 'bg-black/60 text-white hover:bg-black/80'
                    }`}
                    style={{ 
                      left: `calc(50% + ${x}px - 22px)`,
                      top: `calc(50% + ${y}px - 22px)`
                    }}
                  >
                    <NodeIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Big Active Content Blocks (dynamic toggles for mobile, GSAP reveals on desktop) */}
          <div className="lg:col-span-4 flex items-center min-h-[220px] relative">
            {nodes.map((node, idx) => (
              <div
                key={node.id}
                className={`resto-detail-block flex flex-col justify-center transition-all duration-300 lg:transition-none lg:absolute lg:inset-0 ${
                  activeIdx === idx 
                    ? 'opacity-100 translate-y-0 relative z-10' 
                    : 'opacity-0 translate-y-8 absolute pointer-events-none'
                }`}
              >
                <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-[3px] block mb-1">
                  0{idx + 1} — Core Module
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#212842] uppercase tracking-tight mb-3">
                  {node.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#1F2A44] leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* core checklist, Key Features grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto pt-8 border-t border-[#212842]/10">
          
          {/* core checklist Column */}
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#C6A75E] uppercase tracking-[3px] mb-3">Core Functionality Checklist</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-xs">
              {coreList.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-[#212842] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A75E] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features Column */}
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#C6A75E] uppercase tracking-[3px] mb-3">Resto Key Features</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-xs">
              {keyFeatures.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-[#212842] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A75E] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
