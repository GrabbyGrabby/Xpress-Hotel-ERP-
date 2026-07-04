import { MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-20 border-t border-[var(--text)]/10 bg-[var(--bg)] transition-colors duration-300 text-left font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Brand Column — Left 4 cols */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="font-display font-bold text-3xl text-[var(--text)] tracking-tighter uppercase select-none">
            Xpress Hotel ERP
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
            A premium modular ERP suite by **RN Softwares** engineered to empower hotels, resorts, and lounge bars globally since 2015.
          </p>
          <div className="flex items-center gap-2 text-xs text-[var(--accent)] font-bold uppercase tracking-wider mt-2">
            <ShieldCheck className="w-5 h-5" />
            <span>RN Softwares // Towards Betterment</span>
          </div>
        </div>

        {/* Address & Office Column — Right 4 cols */}
        <div className="md:col-span-4 flex flex-col gap-4 text-sm">
          <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-[2px] block border-b border-[var(--text)]/5 pb-2 mb-2">Corporate HQ Office</span>
          
          <div className="flex items-start gap-3 text-[var(--text)] text-sm">
            <MapPin className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              11th Lane Rajarampuri,<br />
              Above IDBI Bank, Kolhapur,<br />
              Maharashtra, India. Pin 416008
            </span>
          </div>

          <div className="flex items-center gap-3 text-[var(--text)] mt-2 text-sm">
            <Mail className="w-5 h-5 text-[var(--accent)] shrink-0" />
            <a href="mailto:sales@rnsoftwares.co.in" className="hover:text-[var(--accent)] transition-colors">
              sales@rnsoftwares.co.in
            </a>
          </div>

          <div className="flex flex-col gap-1 text-[var(--text-secondary)] pl-8 text-sm">
            <a href="http://www.xpresshotelerp.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">www.xpresshotelerp.com</a>
            <a href="http://www.rnsoftwares.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">www.rnsoftwares.co.in</a>
          </div>
        </div>

        {/* Phone & Technical Support Lines Column — Right 4 cols */}
        <div className="md:col-span-4 flex flex-col gap-4 text-sm">
          <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-[2px] block border-b border-[var(--text)]/5 pb-2 mb-2">Support & Contact Lines</span>
          
          <div className="flex items-start gap-3 text-[var(--text)] text-sm">
            <Phone className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[var(--text)]">Sales & General Desk:</span>
              <a href="tel:+917276388003" className="hover:text-[var(--accent)] transition-colors">+91 7276388003</a>
              <a href="tel:+919960625394" className="hover:text-[var(--accent)] transition-colors">+91 9960625394</a>
              <a href="tel:02312520811" className="hover:text-[var(--accent)] transition-colors">0231 2520811</a>
            </div>
          </div>

          <div className="flex items-start gap-3 text-[var(--text)] mt-2 text-sm">
            <Phone className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[var(--accent)]">Tech Support Hotlines:</span>
              <a href="tel:+917769869888" className="hover:text-[var(--accent)] transition-colors">+91 7769869888</a>
              <a href="tel:+917769864003" className="hover:text-[var(--accent)] transition-colors">+91 7769864003</a>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-[var(--text)]/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[var(--text-secondary)]">
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)] transition-colors">Twitter</a>
        </div>
        <span>© 2026 RN Softwares. All rights reserved.</span>
      </div>
    </footer>
  );
}
