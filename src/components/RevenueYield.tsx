import { TrendingUp, RefreshCw, CalendarRange, Globe, CheckCircle2 } from 'lucide-react';

export default function RevenueYield() {
  const cards = [
    {
      title: 'YIELD MANAGEMENT',
      subtitle: 'REVENUE OPTIMIZATION',
      icon: TrendingUp,
      desc: 'Automated seasonal tariff updates, yield algorithms, and direct inventory overrides to maximize average daily rate (ADR).',
      color: '#190019'
    },
    {
      title: 'CHANNEL MANAGER',
      subtitle: 'OTA INVENTORY SYNC',
      icon: RefreshCw,
      desc: 'Instant two-way rate and room inventory sync across all linked online channels (MakeMyTrip, Booking.com, Agoda) to eliminate double bookings.',
      color: '#2B124C'
    },
    {
      title: 'BOOKING ENGINE',
      subtitle: 'DIRECT RESERVATIONS',
      icon: CalendarRange,
      desc: 'Mobile-responsive booking module integrated into your hotel portal enabling commission-free guest checkouts, packages, and coupons.',
      color: '#522B5B'
    },
    {
      title: 'WEBSITE GROWTH',
      subtitle: 'BRANDED PORTAL',
      icon: Globe,
      desc: 'Custom, blazing-fast hotel website templates optimized for search engines, speed, and guest reservations conversion.',
      color: '#854F6C'
    }
  ];

  return (
    <section 
      id="revenue-yield" 
      className="py-24 bg-[#1F2A44] text-[#F0E7D5] relative overflow-hidden select-none border-t border-white/5 scroll-mt-20"
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
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white uppercase">
            Revenue Yield Sync
          </h2>
          <div className="w-16 h-[1px] bg-[#F0E7D5]/20 mx-auto mt-4" />
        </div>

        {/* 4 Cards Grid - Big Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.title}
                className="group relative rounded-3xl p-8 border border-white/10 flex flex-col justify-between min-h-[320px] transition-all duration-500 hover:-translate-y-2 hover:border-[#C6A75E]/30 hover:shadow-2xl overflow-hidden"
                style={{ backgroundColor: '#161d2f' }}
              >
                {/* Accent Hover Background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: card.color }}
                />

                {/* Top: Icon + Subtitle */}
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C6A75E] group-hover:scale-110 transition-transform duration-500 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <span className="text-[9px] font-mono text-[#C6A75E] tracking-widest uppercase block mb-1">
                    {card.subtitle}
                  </span>
                  
                  {/* Big Header */}
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase leading-snug mb-4">
                    {card.title}
                  </h3>
                </div>

                {/* Bottom: Description */}
                <p className="font-sans text-xs text-[#E8DCC8] leading-relaxed">
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
