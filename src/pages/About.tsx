import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO, { BASE_URL } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Factory,
  FileCheck,
  Shield,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  Wrench,
  PackageSearch,
  Building2,
  ZoomIn,
  CheckCircle2,
  Check,
} from 'lucide-react';
import { allProducts } from '@/data/products';
import heroBg from '@/assets/industries/oil-gas-refinery.jpg';
import imgFacilityFloor from '@/assets/gallery/facility-tube-winding-floor.jpg';
import imgCncArea from '@/assets/gallery/operations-cnc-lathe-area.jpg';
import imgBoltOnTrace from '@/assets/gallery/operations-bolt-on-trace-forming.jpg';
import imgWaterCutMachining from '@/assets/gallery/water-cut-meter-machining.jpg';
import imgDssPart from '@/assets/gallery/dss-precision-part.jpg';
import imgSheltersReady from '@/assets/gallery/shelters-ready-for-dispatch.jpg';
import imgThermexBay from '@/assets/gallery/thermex-fabrication-bay.jpg';
import imgSparePartsPrinting from '@/assets/gallery/spare-parts-3d-printing.jpg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.4, delay },
});

/** Animates a number counting up once it scrolls into view. */
const Counter = ({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  return (
    <motion.span
      onViewportEnter={() => {
        if (started.current) return;
        started.current = true;
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(value * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
      viewport={{ once: true, margin: '-60px' }}
    >
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
};

const heroStats = [
  { value: 2, decimals: 0, suffix: '', label: 'GCC Manufacturing Facilities' },
  { value: 76.73, decimals: 2, suffix: '%', label: 'ADNOC ICV Score' },
  { value: allProducts.length, decimals: 0, suffix: '+', label: 'Precision Products Built' },
];

const facilities = [
  {
    id: 'abudhabi',
    name: 'Abu Dhabi, UAE',
    icon: MapPin,
    badge: '76.73% ICV',
    image: imgFacilityFloor,
    description:
      'Home of our Optical GC and AP5 analyzer manufacturing line — ADNOC In-Country Value (ICV) score of 76.73%.',
    stats: [
      { label: 'ICV Score', value: '76.73%' },
      { label: 'Product Line', value: 'Optical GC & AP5' },
      { label: 'Certification', value: 'ISO 9001:2015' },
    ],
  },
  {
    id: 'alkhobar',
    name: 'Al Khobar, KSA',
    icon: Building2,
    badge: '9COM Approved',
    image: imgCncArea,
    description:
      "9COM-approved facility registered under Saudi Arabia's IKTVA local content program, extending our regional footprint across the Kingdom.",
    stats: [
      { label: 'Local Content', value: 'Saudi IKTVA' },
      { label: 'Approval', value: 'Aramco 9COM' },
      { label: 'Certification', value: 'ISO 9001:2015' },
    ],
  },
];

const capabilities = [
  {
    icon: Wrench,
    title: 'Custom Fabrication',
    image: imgThermexBay,
    description: 'Bespoke engineering for applications that standard catalog products can\'t cover — non-standard dimensions, special materials, and specific hazardous-area certifications.',
    points: [
      'Non-standard dimensions & special materials',
      'IECEx, ATEX, FM & CSA hazardous-area certifications',
      'Full mechanical design & documentation',
      'Factory acceptance testing included',
    ],
  },
  {
    icon: PackageSearch,
    title: 'Spare Parts Manufacturing',
    image: imgSparePartsPrinting,
    description: 'Genuine spare parts and replacement components for every AIMS-manufactured analyzer, heat tracing system, and enclosure.',
    points: [
      'Built to original specification',
      'Supplied from stock or manufactured to order',
      'Covers every AIMS analyzer, heat tracing system & enclosure',
    ],
  },
];

const certifications = [
  { icon: FileCheck, name: 'ISO 9001:2015', description: 'Quality Management System' },
  { icon: Factory, name: 'IECEx Certified', description: 'Manufacturing — UAE & KSA' },
  { icon: Shield, name: 'Saudi Aramco 9COM', description: 'Registered Manufacturer' },
];

const processPhotos = [
  { image: imgBoltOnTrace, caption: 'Bolt-on trace profile forming' },
  { image: imgWaterCutMachining, caption: 'Precision CNC machining' },
  { image: imgDssPart, caption: 'Finished precision components' },
];

const About = () => {
  return (
  <div className="min-h-screen">
    <SEO
      title="About Us"
      description="AIMS Manufacturing operates dual GCC facilities in Abu Dhabi and Al Khobar, ISO 9001 and IECEx certified, delivering precision analyzers, heat tracing systems, and custom fabrication."
      keywords="AIMS Manufacturing about, ISO 9001, IECEx, Aramco 9COM, GCC manufacturing facility"
      canonicalUrl={`${BASE_URL}/about`}
    />
    <Navigation />

    {/* Hero */}
    <section className="relative overflow-hidden pt-[112px] pb-10">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#001217]/95 via-[#002733]/92 to-[#081b21]/96" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-accent/10" />
      <div className="absolute inset-0 opacity-[0.05] texture-dots" aria-hidden="true" />
      <div className="absolute -top-24 -left-16 w-96 h-96 bg-primary/20 rounded-full blur-[110px]" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-accent/15 rounded-full blur-[110px]" aria-hidden="true" />
      <span className="hidden md:block absolute top-28 left-8 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" aria-hidden="true" />
      <span className="hidden md:block absolute top-28 right-8 w-12 h-12 border-t-2 border-r-2 border-accent/40 rounded-tr-lg" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <motion.span
          {...fadeUp()}
          className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block"
        >
          Who We Are
        </motion.span>
        <motion.h1 {...fadeUp(0.05)} className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
          About AIMS Manufacturing
        </motion.h1>
        <motion.p {...fadeUp(0.1)} className="text-white/75 text-base leading-relaxed mb-5 max-w-2xl">
          We design, engineer, and manufacture precision industrial products from dual GCC
          facilities — supporting national industrialization and local content programs across
          the region, and serving operators in oil &amp; gas, petrochemical, and power generation.
        </motion.p>

        <motion.div {...fadeUp(0.15)} className="grid grid-cols-3 gap-3 max-w-xl">
          {heroStats.map((stat, idx) => (
            <div
              key={idx}
              className="hover-shine rounded-xl bg-white/[0.07] border border-white/15 backdrop-blur-sm px-3 py-3 text-center transition-colors duration-300 hover:bg-white/[0.12] hover:border-white/25"
            >
              <p className="text-lg sm:text-xl font-extrabold text-white tabular-nums">
                <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </p>
              <p className="text-[9px] sm:text-[10px] font-semibold text-white/55 uppercase tracking-wide mt-1 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    <div className="h-[3px] bg-gradient-to-r from-primary via-primary to-accent" />

    {/* Facilities */}
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="absolute -bottom-24 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp()} className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">Our Footprint</span>
          <h2 className="text-3xl font-bold mb-3">Our Manufacturing Facilities</h2>
          <p className="text-muted-foreground">
            Two ISO 9001 certified facilities give us the regional footprint to deliver locally
            manufactured products with rapid lead times across the GCC.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {facilities.map((f, idx) => (
            <motion.div
              key={f.id}
              {...fadeUp(idx * 0.1)}
              className="group rounded-3xl border border-border bg-white shadow-card hover:shadow-elevated transition-shadow duration-500 overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={f.image}
                  alt={f.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="hover-shine absolute top-5 left-5 w-11 h-11 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center">
                  <f.icon size={18} className="text-white" />
                </div>
                <span className="absolute top-5 right-5 px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-full shadow-sm">
                  {f.badge}
                </span>
                <h3 className="absolute bottom-5 left-5 right-5 font-bold text-xl text-white">{f.name}</h3>
              </div>

              <div className="p-6 lg:p-7">
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{f.description}</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {f.stats.map((stat, i) => {
                    const cyan = i % 2 === 0;
                    return (
                      <div
                        key={stat.label}
                        className={`rounded-xl border px-2.5 py-3 ${cyan ? 'bg-primary/8 border-primary/15' : 'bg-accent/8 border-accent/15'}`}
                      >
                        <p className={`text-[9px] font-semibold uppercase tracking-wide mb-1 leading-tight ${cyan ? 'text-primary/70' : 'text-accent/70'}`}>
                          {stat.label}
                        </p>
                        <p className={`text-xs font-bold leading-snug ${cyan ? 'text-primary' : 'text-accent'}`}>{stat.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Capabilities */}
    <section className="py-20 bg-muted/40 relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp()} className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">Beyond the Catalog</span>
          <h2 className="text-3xl font-bold mb-3">What We Offer</h2>
          <p className="text-muted-foreground">
            Beyond our standard product catalog, our facilities support the full lifecycle of a
            manufactured product.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.title}
              {...fadeUp(idx * 0.1)}
              className="group rounded-2xl border border-border bg-white shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-primary to-accent" />
              <div className="relative h-32 overflow-hidden">
                <img
                  src={cap.image}
                  alt={cap.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="hover-shine absolute top-3 left-3 w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent shadow-card flex items-center justify-center">
                  <cap.icon size={16} className="text-white" />
                </div>
                <span className="absolute bottom-2.5 right-3.5 text-3xl font-extrabold text-white/30 select-none">
                  0{idx + 1}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1.5">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3.5">{cap.description}</p>
                <ul className="space-y-1.5">
                  {cap.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-foreground/75 leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process photos — real production floor */}
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp()} className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-primary text-xs font-bold tracking-widest uppercase block mb-1.5">Behind the Scenes</span>
            <h2 className="text-3xl font-bold">Our People, Our Process</h2>
          </div>
          <Link to="/gallery">
            <Button variant="outline" className="shadow-card">
              View Full Gallery <ArrowRight size={15} className="ml-1.5" />
            </Button>
          </Link>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-6">
          {processPhotos.map((photo, idx) => (
            <motion.div
              key={photo.caption}
              {...fadeUp(idx * 0.08)}
              className="aims-card group relative rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-500 h-64"
            >
              <img
                src={photo.image}
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
              <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <ZoomIn size={14} className="text-white" />
              </span>
              <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white leading-snug translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Certifications */}
    <section className="py-20 bg-muted/40 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeUp()} className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">Trust &amp; Compliance</span>
          <h2 className="text-3xl font-bold">Certifications &amp; Approvals</h2>
        </motion.div>
        <motion.div
          {...fadeUp()}
          className="max-w-4xl mx-auto rounded-3xl border border-border bg-white shadow-elevated overflow-hidden grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border"
        >
          {certifications.map((cert, idx) => (
            <div key={idx} className="group text-center p-8">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <span className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 group-hover:rotate-180 transition-transform duration-700 ease-out" />
                <span className="absolute inset-[6px] rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                  <cert.icon size={26} className="text-primary" />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-white">
                  <Check size={12} strokeWidth={3} />
                </span>
              </div>
              <h3 className="font-bold mb-1">{cert.name}</h3>
              <p className="text-xs text-muted-foreground">{cert.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* CTA — light, split with real facility photography */}
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="bg-white relative px-6 sm:px-10 py-14 flex flex-col justify-center gap-4">
          <span className="text-primary text-xs font-bold tracking-widest uppercase block">Let&rsquo;s Talk</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">Want to Learn More?</h2>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Get in touch with our team to discuss your project requirements — from concept to
            delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent border-0 text-white shadow-glow hover:shadow-hero font-semibold px-8 rounded-full w-full sm:w-auto">
                Contact Us <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <a href="tel:+97126436114">
              <Button size="lg" variant="outline" className="font-semibold px-8 w-full sm:w-auto">
                <Phone size={18} className="mr-2" />
                Call Us Now
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1 pt-4 border-t border-border">
            <a href="tel:+97126436114" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone size={15} className="text-primary" />
              +971 2 643 6114
            </a>
            <a href="mailto:aims-mfg@aimsgt.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail size={15} className="text-primary" />
              aims-mfg@aimsgt.com
            </a>
          </div>
        </div>
        <div className="relative min-h-[220px] lg:min-h-0">
          <img src={imgSheltersReady} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default About;
