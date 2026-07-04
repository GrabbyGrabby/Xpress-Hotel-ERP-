import { useEffect, useRef } from 'react';
import { 
  Building, Calendar, DollarSign, Users, FileText, CheckCircle2, ChevronRight 
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
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const nodes: PMSNode[] = [
    { id: 'res', name: 'Reservations Management', icon: Calendar, desc: 'Interactive check-in booking calendar with room auto-mapping, drag-and-drop availability overrides, and corporate group bookings.' },
    { id: 'hk', name: 'Housekeeping Sync', icon: Building, desc: 'Real-time room status update sync, clean/dirty room checklists, laundry billing coordinates, and direct operator logs.' },
    { id: 'grc', name: 'Digital GRC Forms', icon: FileText, desc: 'Contactless guest onboarding with paperless registration cards, identity document scans, and encrypted digital signatures.' },
    { id: 'conf', name: 'Banquet & Event Billing', icon: Users, desc: 'Configure venue reservation calendars, stage hire packages, caterer menus, and unified event billing invoices.' },
    { id: 'acc', name: 'Accounts Sync System', icon: DollarSign, desc: 'Track accounts payable/receivable, ledger cashbooks, customer deposits, and export vouchers to Tally Prime.' }
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

  const revenueMgmt = [
    { title: 'Revenue Management', desc: 'Hotel revenue yield management as well as inventory distribution in a balanced and effective way.' },
    { title: 'Channel Manager', desc: 'Channel manager helps you to manage rates and inventories on all the channels you are connected.' },
    { title: 'Booking Engine', desc: 'Hotel booking engine allows your visitors to do direct booking from anywhere, anytime.' },
    { title: 'Website Development', desc: 'We develop user-friendly and responsive websites for increase your business.' }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const orbit = orbitRef.current;
    const title = titleRef.current;
    if (!container || !orbit || !title) return;

    const buttons = orbit.querySelectorAll('.pms-node-btn');
    const details = container.querySelectorAll('.pms-detail-block');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.8, // Slightly faster feedback
        start: 'top top',
        end: '+=1800', // Significantly reduced from +=4500 to make scroll faster
        invalidateOnRefresh: true,
      }
    });

    // 1. Left Title Zoom & Parallax Slide on Scroll
    tl.fromTo(title,
      { scale: 0.75, x: -50, opacity: 0 },
      { scale: 1, x: 0, opacity: 1, duration: 1.8, ease: 'power2.out' }
    );

    // 2. Rotate orbit circle clockwise (360 degrees) and counter-rotate buttons to keep icons upright
    tl.to(orbit, { rotation: 360, ease: 'none', duration: 8 }, 'rotate-start')
      .to(buttons, { rotation: -360, ease: 'none', duration: 8 }, 'rotate-start');

    // 3. Stagger-reveal description blocks on the right in sequence during the rotation
    details.forEach((block, idx) => {
      const btn = buttons[idx];
      const startOffset = idx * 1.5;

      // Active state highlight: scale up & change color
      tl.to(btn, { scale: 1.25, backgroundColor: '#C6A75E', color: '#212842', duration: 0.8 }, `rotate-start+=${startOffset}`)
        .fromTo(block, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          `rotate-start+=${startOffset}`
        );

      // Deactivate state transition (except last element)
      if (idx < details.length - 1) {
        tl.to(btn, { scale: 1, backgroundColor: '#1F2A44', color: '#E8DCC8', duration: 0.5 }, `rotate-start+=${startOffset + 1.2}`)
          .to(block, { opacity: 0, y: -20, duration: 0.5 }, `rotate-start+=${startOffset + 1.2}`);
      }
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="pms" 
      className="h-screen flex flex-col justify-center bg-[#212842] text-[#F0E7D5] transition-colors duration-300 text-left relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-mesh pointer-events-none opacity-10" />
      
      {/* Faint background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-display text-[26vw] font-black text-white/[0.02] tracking-tighter uppercase z-0">
        PMS
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Widescreen 3-Column Grid Layout: Title Left, Wheel Center, Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 max-w-6xl mx-auto">
          
          {/* Left Column: Aligned Perfectly Left Section Header with Zoom Effect */}
          <div className="lg:col-span-4 flex flex-col justify-center text-left">
            <div ref={titleRef} className="flex flex-col origin-left">
              <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-[3px] block mb-2">
                02 — MODULE DETAIL
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-5.5xl font-bold leading-[0.95] tracking-tighter text-white uppercase mb-4">
                PROPERTY<br />MANAGEMENT<br />SYSTEM
              </h2>
              <div className="w-16 h-[1px] bg-[#F0E7D5]/20 mt-2 mb-4" />
              <p className="text-[11px] text-[#E8DCC8] uppercase tracking-wider font-semibold max-w-[240px] leading-relaxed">
                Database-grade core hub managing full hotel operations.
              </p>
            </div>
          </div>

          {/* Center Column: Rotating Orbit Diagram */}
          <div className="lg:col-span-4 flex justify-center items-center h-[350px] relative">
            <div 
              ref={orbitRef}
              className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] rounded-full border-2 border-dashed border-[#F0E7D5]/10 relative flex items-center justify-center"
            >
              {/* Central base node */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#1F2A44] border border-[#F0E7D5]/15 shadow-md flex items-center justify-center font-display font-bold text-xs text-[#F0E7D5] uppercase select-none z-10">
                Xpress
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
                  <div
                    key={node.id}
                    className="pms-node-btn absolute w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center shadow-lg bg-[#1F2A44] border-[#F0E7D5]/15 text-[#E8DCC8] origin-center z-20"
                    style={{ 
                      left: `calc(50% + ${x}px - 22px)`,
                      top: `calc(50% + ${y}px - 22px)`
                    }}
                  >
                    <NodeIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Big Active Content Blocks */}
          <div className="lg:col-span-4 flex items-center h-[220px] relative">
            {nodes.map((node, idx) => (
              <div
                key={node.id}
                className="pms-detail-block absolute inset-0 flex flex-col justify-center opacity-0 translate-y-8"
              >
                <span className="text-[10px] font-bold text-[#C6A75E] uppercase tracking-[3px] block mb-1">
                  0{idx + 1} — Core Module
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-3">
                  {node.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#E8DCC8] leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* PMS secondary features list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-8 border-t border-[#F0E7D5]/10">
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

          <div id="channel-sync" className="flex flex-col scroll-mt-24">
            <span className="text-[11px] font-bold text-[#C6A75E] uppercase tracking-[3px] mb-3">Revenue Yield Sync</span>
            <div className="flex flex-col gap-3">
              {revenueMgmt.map((rev) => (
                <div key={rev.title} className="flex flex-col text-left">
                  <span className="font-display font-semibold text-xs text-white uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#C6A75E]" />
                    {rev.title}
                  </span>
                  <p className="font-sans text-[10px] text-[#E8DCC8] leading-relaxed pl-5">
                    {rev.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
