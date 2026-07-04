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
  const containerRef      = useRef<HTMLDivElement>(null);
  const orbitRef          = useRef<HTMLDivElement>(null);
  const titleRef          = useRef<HTMLDivElement>(null);
  const interactiveHubRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const nodes: RestoNode[] = [
    { id: 'ease',    name: 'Ease of Billing',       icon: Sparkles,   desc: 'Fast, touch-optimized POS billing interface that completes transactions in 3 clicks, saving waiter time and cashier queues.' },
    { id: 'excise',  name: 'Excise & Bar Stock',     icon: BarChart3,  desc: 'Detailed liquor stock tracking, inventory batch audits, and automated state liquor excise reports compliance.' },
    { id: 'hw',      name: 'Hardware Free POS',      icon: Smartphone, desc: 'Hardware independent: runs smoothly on any standard Windows PC, Android tablet, iPad, or mobile phone.' },
    { id: 'lang',    name: 'Multilanguage POS',      icon: RefreshCw,  desc: 'Easily switch operator POS language to support local staff billing speeds and prevent cashier errors.' },
    { id: 'offline', name: 'Online/Offline Sync',    icon: ShieldCheck,desc: 'System continues to bill seamlessly during internet outages, auto-synchronizing later to prevent revenue leakages.' }
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

  // Circle geometry — fixed 240px circle
  const ORBIT_D  = 240; // orbit div diameter (px)
  const ORBIT_R  = 100; // radius from center to button center
  const BTN_HALF = 20;  // half of w-10 (40px button)

  useEffect(() => {
    const container      = containerRef.current;
    const orbit          = orbitRef.current;
    const title          = titleRef.current;
    const interactiveHub = interactiveHubRef.current;
    if (!container || !orbit || !title || !interactiveHub) return;

    const buttons = orbit.querySelectorAll('.resto-node-btn');
    const details = container.querySelectorAll('.resto-detail-block');

    // Start all detail blocks hidden
    gsap.set(details, { opacity: 0, y: 25 });

    const mm = gsap.matchMedia();

    /* ── DESKTOP: pin full section, full 360° spin ─────────────────────── */
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=2000',
          invalidateOnRefresh: true,
        }
      });

      tl.fromTo(title,
        { scale: 0.8, x: -40, opacity: 0 },
        { scale: 1,   x: 0,   opacity: 1, duration: 1, ease: 'power2.out' },
        0
      );

      tl.to(orbit,   { rotation: 360,  ease: 'none', duration: 10 }, 0)
        .to(buttons, { rotation: -360, ease: 'none', duration: 10 }, 0);

      details.forEach((block, idx) => {
        const btn   = buttons[idx];
        const start = 0.4 + idx * 1.8;

        tl.to(btn, { scale: 2.2, backgroundColor: '#C6A75E', color: '#212842', duration: 0.5 }, start)
          .fromTo(block,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0,  duration: 0.5, ease: 'power2.out' },
            start
          );

        if (idx < details.length - 1) {
          const end = start + 1.4;
          tl.to(btn,   { scale: 1, backgroundColor: '#FAF8F5', color: '#1F2A44', duration: 0.4 }, end)
            .to(block, { opacity: 0, y: -20, duration: 0.4 }, end);
        }
      });
    });

    /* ── MOBILE: pin hub, rotate 180° showing bottom half arc ───────────── */
    mm.add('(max-width: 1023px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: interactiveHub,
          pin: true,
          scrub: 1,
          start: 'top 8%',
          end: '+=2000',
          invalidateOnRefresh: true,
        }
      });

      tl.to(orbit,   { rotation: 180,  ease: 'none', duration: 10 }, 0)
        .to(buttons, { rotation: -180, ease: 'none', duration: 10 }, 0);

      details.forEach((block, idx) => {
        const btn   = buttons[idx];
        const start = 0.4 + idx * 1.8;

        tl.to(btn, { scale: 1.3, backgroundColor: '#C6A75E', color: '#212842', duration: 0.5 }, start)
          .fromTo(block,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0,  duration: 0.5, ease: 'power2.out' },
            start
          );

        if (idx < details.length - 1) {
          const end = start + 1.4;
          tl.to(btn,   { scale: 1, backgroundColor: '#FAF8F5', color: '#1F2A44', duration: 0.4 }, end)
            .to(block, { opacity: 0, y: -15, duration: 0.4 }, end);
        }
      });
    });

    return () => { mm.revert(); };
  }, []);

  return (
    <section
      ref={containerRef}
      id="restaurant"
      className="min-h-screen py-16 lg:py-0 lg:h-screen flex flex-col justify-center bg-[#E8DCC8] text-[#212842] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-display text-[26vw] font-black text-[#212842]/[0.06] tracking-tighter uppercase z-0">
        POS
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">

        {/* ── Interactive grid ─────────────────────────────────────────── */}
        <div
          ref={interactiveHubRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 lg:items-center mb-8 lg:mb-16 max-w-6xl mx-auto w-full"
        >

          {/* Left: title */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left pb-4 lg:pb-0">
            <div ref={titleRef} className="flex flex-col origin-left">
              <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-[3px] block mb-2">
                03 — MODULE DETAIL
              </span>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-5xl font-black leading-[0.92] tracking-tight text-[#212842] uppercase mb-4">
                RESTAURANT<br />&amp; BAR<br />MANAGEMENT
              </h2>
              <div className="w-16 h-[1px] bg-[#212842]/20 mt-1 mb-4" />
              <p className="text-[11px] text-[#1F2A44] uppercase tracking-wider font-semibold max-w-[260px] leading-relaxed">
                High-speed POS billing, digital menus, and state excise modules.
              </p>
            </div>
          </div>

          {/*
            Center: orbit circle
            ─────────────────────────────────────────────────────────────────
            • Mobile: container is 120px tall with overflow-hidden
              The orbit div is 240px but shifted up by -mt-[120px] (half its height).
              This places the orbit's CENTER exactly at the container's TOP EDGE.
              The bottom 120px of the orbit (the bowl arc) is visible. Top half is clipped.
              Buttons at radius 100px: only those with sin(angle) > 0 are in the visible zone.
            • Desktop: lg:mt-0 removes the shift; container is 360px tall with no clip.
              Full circle is visible, centered.
            • GSAP rotates the orbitRef div. margin-top never conflicts with GSAP transforms.
          */}
          <div className="lg:col-span-4 w-full flex justify-center items-start
                          h-[120px] overflow-hidden
                          lg:h-[360px] lg:overflow-visible lg:items-center">
            <div
              ref={orbitRef}
              className="relative flex items-center justify-center shrink-0 rounded-full
                         -mt-[120px] lg:mt-0"
              style={{ width: `${ORBIT_D}px`, height: `${ORBIT_D}px` }}
            >
              {/* Center hub — hidden on mobile, visible on desktop */}
              <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-tr from-[#1F2A44] to-[#2A354D] shadow-2xl hidden lg:flex items-center justify-center font-display font-black text-sm text-white uppercase tracking-widest select-none z-10 shrink-0">
                POS
              </div>

              {/* Orbit buttons — precisely placed on the arc */}
              {nodes.map((node, idx) => {
                const total = nodes.length;
                const angle = (idx * 2 * Math.PI) / total - Math.PI / 2;
                const x     = Math.round(ORBIT_R * Math.cos(angle));
                const y     = Math.round(ORBIT_R * Math.sin(angle));
                const NodeIcon = node.icon;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`resto-node-btn absolute w-10 h-10 rounded-full flex items-center justify-center shadow-xl origin-center z-20 cursor-pointer transition-colors duration-200 ${
                      activeIdx === idx
                        ? 'bg-[#C6A75E] text-[#212842] scale-[2.2]'
                        : 'bg-[#1F2A44] text-[#C6A75E] hover:bg-[#C6A75E] hover:text-[#212842]'
                    }`}
                    style={{
                      left: `calc(50% + ${x}px - ${BTN_HALF}px)`,
                      top:  `calc(50% + ${y}px - ${BTN_HALF}px)`,
                    }}
                  >
                    <NodeIcon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: detail content — GSAP fades one in at a time */}
          <div className="lg:col-span-4 relative w-full h-[200px] lg:h-[240px] mt-2 lg:mt-0">
            {nodes.map((node, idx) => (
              <div
                key={node.id}
                className="resto-detail-block absolute inset-0 flex flex-col justify-center w-full px-1"
              >
                <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-[3px] block mb-2">
                  0{idx + 1} — Core Module
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-black text-[#212842] uppercase tracking-tight mb-3 leading-tight">
                  {node.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#1F2A44] leading-relaxed max-w-xs">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Secondary feature lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto pt-8 border-t border-[#212842]/10">
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
