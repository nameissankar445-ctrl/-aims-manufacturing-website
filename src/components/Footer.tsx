import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Factory, Award } from 'lucide-react';
import aimsLogo from '@/assets/aims-logo.png';

const SectionHeading = ({ children }: { children: ReactNode }) => (
  <div className="mb-3.5">
    <h3 className="text-sm font-bold text-white tracking-wide uppercase">{children}</h3>
    <div className="w-8 h-0.5 bg-primary mt-1.5" />
  </div>
);

const FooterLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="group inline-flex items-center text-sm text-white/70 hover:text-accent transition-colors duration-300">
    <span className="inline-block w-0 group-hover:w-2 group-hover:mr-1.5 h-px bg-accent transition-all duration-200" />
    {children}
  </Link>
);

const certifications = [
  { icon: ShieldCheck, label: 'ISO 9001:2015' },
  { icon: Factory, label: 'IECEx Certified' },
  { icon: Award, label: 'Aramco 9COM' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <div className="h-[3px] bg-gradient-to-r from-primary via-primary to-accent" />
      <div className="relative bg-[#081b21] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] texture-dots pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-primary/15 rounded-full blur-[110px] pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[110px] pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-4 pt-16 pb-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            <div className="sm:col-span-2 lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <img src={aimsLogo} alt="AIMS" className="h-10 w-auto object-contain" />
                <span className="font-extrabold text-lg">
                  <span className="text-primary-light">AIMS</span> <span className="text-accent">Manufacturing</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/70 max-w-sm">
                Precision-engineered analyzers, heat tracing systems, and custom fabrication —
                designed and manufactured within the GCC to global quality standards.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 rounded-full pl-1.5 pr-3.5 py-1.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <cert.icon size={12} className="text-primary" />
                    </span>
                    <span className="text-xs text-white/80 font-medium">{cert.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <SectionHeading>Company</SectionHeading>
              <ul className="space-y-2.5">
                <li><FooterLink to="/about">About Us</FooterLink></li>
                <li><FooterLink to="/products">Products</FooterLink></li>
                <li><FooterLink to="/industries">Industries</FooterLink></li>
                <li><FooterLink to="/gallery">Gallery</FooterLink></li>
                <li><FooterLink to="/contact">Contact</FooterLink></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <SectionHeading>Products</SectionHeading>
              <ul className="space-y-2.5">
                <li><FooterLink to="/products">Analyzers &amp; Instruments</FooterLink></li>
                <li><FooterLink to="/products">Heat Tracing &amp; Steam</FooterLink></li>
                <li><FooterLink to="/products">Shelters &amp; Enclosures</FooterLink></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <SectionHeading>Contact</SectionHeading>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5 text-white/70">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>Abu Dhabi, UAE &amp; Al Khobar, KSA</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="flex-shrink-0 text-primary" />
                  <a href="tel:+97126436114" className="text-white/70 hover:text-accent transition-colors">+971 2 643 6114</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="flex-shrink-0 text-primary" />
                  <a href="mailto:aims-mfg@aimsgt.com" className="text-white/70 hover:text-accent transition-colors break-words">
                    aims-mfg@aimsgt.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="footer-legal-bar" className="relative z-10 border-t border-white/10 bg-[#05141a]">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/60">
            <p>&copy; {year} AIMS Manufacturing. All rights reserved.</p>
            <p>ISO 9001:2015 Certified &middot; IECEx Certified Manufacturing</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
