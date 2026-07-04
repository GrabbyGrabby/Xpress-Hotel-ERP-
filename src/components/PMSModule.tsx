import { useEffect, useRef, useState } from 'react';
import { 
  Building, Calendar, DollarSign, Users, FileText, CheckCircle2 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PMSNode {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  desc: string;
}

export default function PMSModule() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const orbitRef        = useRef<HTMLDivElement>(null);
  const titleRef        = useRef<HTMLDivElement>(null);
  const interactiveHubRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const nodes: PMSNode[] = [
    { id: 'res',  name: 'Reservations Management', icon: Calendar,   desc: 'Interactive check-in booking calendar with room auto-mapping, drag-and-drop availability overrides, and corporate group bookings.' },
    { id: 'hk',   name: 'Housekeeping Sync',         icon: Building,   desc: 'Real-time room status update sync, clean/dirty room checklists, laundry billing coordinates, and direct operator logs.' },
    { id: 'grc',  name: 'Digital GRC Forms',          icon: FileText,   desc: 'Contactless guest onboarding with paperless registration cards, identity document scans, and encrypted digital signatures.' },
    { id: 'conf', name: 'Banquet & Event Billing',    icon: Users,      desc: 'Configure venue reservation calendars, stage hire packages, caterer menus, and unified event billing invoices.' },
    { id: 'acc',  name: 'Accounts Sync System',       icon: DollarSign, desc: 'Track accounts payable/receivable, ledger cashbooks, customer deposits, and export vouchers to Tally Prime.' }
  ];

  const keyFeatures = [
    'Digital Tariff Cards & seasonal overrides',
    'E Bills & automated WhatsApp PDF receipts',
    'Direct door lock server sync & encoder links',
    'Guest digital feedback App & service reviews',
    'Room booking & online precheckin checksheets',
    'Xpress Owner Apps for revenue dashboarding'
  ];

  const valueAdded = [
    'CRM with customer loyalty points levels',
    'Biometric attendance sync for staff payroll',
    'One-click Tally voucher integrations',
    'Room maintenance logs & dispatch ticketing',
    'Bulk SMS & WhatsApp marketing campaigns'
  ];

  // Circle geometry — keep buttons perfectly on the arc
  const ORBIT_D   = 240; // orbit div diameter (px)
  const ORBIT_R   = 100; // radius from center to button center
  const BTN_HALF  = 20;  // half of button size (w-10 = 40px)

  useEffect(() => {
    const container      = containerRef.current;
    const orbit          = orbitRef.current;
    const title          = titleRef.current;
    const interactiveHub = interactiveHubRef.current;
    if (!container || !orbit || !title || !interactiveHub) return;

    const buttons = orbit.querySelectorAll('.pms-node-btn');
    const details = container.querySelectorAll('.pms-detail-block');

    // All detail blocks start hidden
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
          tl.to(btn,   { scale: 1, backgroundColor: '#1F2A44', color: '#E8DCC8', duration: 0.4 }, end)
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

        tl.to(btn, { scale: 2.2, backgroundColor: '#C6A75E', color: '#212842', duration: 0.5 }, start)
          .fromTo(block,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0,  duration: 0.5, ease: 'power2.out' },
            start
          );

        if (idx < details.length - 1) {
          const end = start + 1.4;
          tl.to(btn,   { scale: 1, backgroundColor: '#1F2A44', color: '#E8DCC8', duration: 0.4 }, end)
            .to(block, { opacity: 0, y: -15, duration: 0.4 }, end);
        }
      });
    });

    return () => { mm.revert(); };
  }, []);

  return (
    <section
      ref={containerRef}
      id="pms"
      className="min-h-screen py-16 lg:py-0 lg:h-screen flex flex-col justify-center bg-[#212842] text-[#F0E7D5] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-display text-[26vw] font-black text-white/[0.02] tracking-tighter uppercase z-0">
        PMS
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
                02 — MODULE DETAIL
              </span>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-5xl font-black leading-[0.92] tracking-tight text-white uppercase mb-4">
                PROPERTY<br />MANAGEMENT<br />SYSTEM
              </h2>
              <div className="w-16 h-[1px] bg-[#F0E7D5]/20 mt-1 mb-4" />
              <p className="text-[11px] text-[#E8DCC8] uppercase tracking-wider font-semibold max-w-[260px] leading-relaxed">
                Database-grade core hub managing full hotel operations.
              </p>
            </div>
          </div>

          {/* Center: orbit — clipped to bottom half on mobile ──────────── */}
          {/*
            Strategy:
            • Container is h-[120px] with overflow-hidden on mobile
              → only the bottom 120px of the 240px circle is visible = perfect bowl arc
            • -mt-[120px] on the orbit div shifts the circle up by half its height
              so its CENTER is at y=0 of the container, bottom half hangs below
            • lg:mt-0 removes the shift on desktop; container is taller so full circle shows
            • GSAP rotates the orbitRef div — margin-top never conflicts with rotation
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
              <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-full bg-gradient-to-tr from-[#1F2A44] to-[#2A354D] shadow-2xl hidden lg:flex items-center justify-center font-display font-black text-sm sm:text-base text-white uppercase tracking-widest select-none z-10 shrink-0">
                PMS
              </div>

              {/* Orbit buttons — precisely placed on the circle */}
              {nodes.map((node, idx) => {
                const total = nodes.length;
                const angle = (idx * 2 * Math.PI) / total - Math.PI / 2;
                const x = Math.round(ORBIT_R * Math.cos(angle));
                const y = Math.round(ORBIT_R * Math.sin(angle));
                const NodeIcon = node.icon;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`pms-node-btn absolute w-10 h-10 rounded-full flex items-center justify-center shadow-xl origin-center z-20 cursor-pointer transition-colors duration-200 ${
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
                className="pms-detail-block absolute inset-0 flex flex-col justify-center w-full px-1"
              >
                <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-[3px] block mb-2">
                  0{idx + 1} — Core Module
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-black text-[#C6A75E] uppercase tracking-tight mb-3 leading-tight">
                  {node.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#E8DCC8] leading-relaxed max-w-xs">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Secondary feature lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto pt-8 border-t border-[#F0E7D5]/10">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#C6A75E] uppercase tracking-[3px] mb-3">PMS Key Features</span>
            <ul className="flex flex-col gap-2.5 font-sans text-xs">
              {keyFeatures.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-[#E8DCC8] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A75E] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#C6A75E] uppercase tracking-[3px] mb-3">Value Added Services</span>
            <ul className="flex flex-col gap-2.5 font-sans text-xs">
              {valueAdded.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-[#E8DCC8] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A75E] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
