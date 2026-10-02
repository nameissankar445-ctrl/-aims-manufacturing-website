import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO, { BASE_URL } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { allProducts, productCategories, detailedProductInfo } from '@/data/products';
import {
  Wrench,
  Zap,
  ArrowRight,
  Phone,
  Lightbulb,
  Settings,
  Flame,
  Box,
  Layers,
  ZoomIn,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import heroBg from '@/assets/industries/oil-gas-refinery.jpg';
import adnocLogo from '@/assets/certifications/adnoc-logo.svg';
import miiteLogo from '@/assets/certifications/miite-logo.png';
import iktvaLogo from '@/assets/certifications/iktva-logo.svg';
import imgFacilityTubeWinding from '@/assets/gallery/facility-tube-winding-floor.jpg';
import imgCncTurningOperator from '@/assets/gallery/operations-cnc-lathe-area.jpg';
import imgThermexFabricationBay from '@/assets/gallery/thermex-fabrication-bay.jpg';
import imgSparePartsPrinting from '@/assets/gallery/spare-parts-3d-printing.jpg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.4, delay },
});

const easeSmooth = [0.4, 0, 0.2, 1] as const;

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: easeSmooth } },
};

const credentials = [
  { icon: Wrench, label: 'Custom Fabrication' },
  { icon: Zap, label: 'Fast Turnaround' },
];


const CATEGORY_GLOW = {
  analyzer: 'bg-primary',
  heattracing: 'bg-accent',
  shelter: 'bg-primary-light',
} as const;

const facilityPhotos = [
  { image: imgFacilityTubeWinding, caption: 'Tube bundle production floor', icon: Box },
  { image: imgCncTurningOperator, caption: 'Precision CNC turning', icon: Settings },
  { image: imgThermexFabricationBay, caption: 'Thermex fabrication bay', icon: Flame },
  { image: imgSparePartsPrinting, caption: 'Metal additive manufacturing', icon: Layers },
];

const nationalPrograms = [
  {
    logo: adnocLogo,
    name: "ADNOC In-Country Value",
    description: 'In-Country Value framework driving local industrialization across the UAE energy sector.',
    stat: '76.73%',
    statLabel: 'ICV Score',
  },
  {
    logo: miiteLogo,
    name: 'Make it in the Emirates',
    description: "Aligned with the UAE's national industrial strategy for local manufacturing.",
  },
  {
    logo: iktvaLogo,
    name: 'Aramco iktva',
    description: "Registered under Saudi Arabia's In-Kingdom Total Value Add program.",
  },
];

const Home = () => {
  const featured = allProducts.slice(0, 7);
  const [activeProductId, setActiveProductId] = useState(featured[0]?.id);
  const activeProduct = featured.find((p) => p.id === activeProductId) ?? featured[0];
  const activeCategory = activeProduct ? productCategories.find((c) => c.id === activeProduct.category)?.name : undefined;
  const activeIndex = activeProduct ? featured.findIndex((p) => p.id === activeProduct.id) : -1;
  const [bigPhoto, ...smallPhotos] = facilityPhotos;

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useTransform(tiltY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(tiltX, [-0.5, 0.5], [-7, 7]);
  const handleStageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleStageMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Precision Manufacturing & Custom Fabrication"
        description="AIMS Manufacturing designs and manufactures IECEx-certified analyzers, heat tracing systems, and custom industrial enclosures across dual GCC facilities in Abu Dhabi and Al Khobar."
        keywords="AIMS Manufacturing, GCC manufacturing, IECEx analyzer, heat tracing, analyzer shelters, water cut meter"
        canonicalUrl={BASE_URL}
      />
      <Navigation />

      {/* Hero — compact cinematic banner */}
      <section className="relative overflow-hidden pt-[112px] pb-10">
        <motion.img
          src={heroBg}
          alt=""
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: easeSmooth }}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        {/* Blue-tinted dark scrim over the photo — keeps the AIMS cyan identity instead of a neutral black overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001217]/95 via-[#002733]/90 to-[#081b21]/96" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-accent/10" />
        <div className="absolute inset-0 opacity-[0.05] texture-dots" aria-hidden="true" />
        <div className="absolute -top-32 -left-20 w-[32rem] h-[32rem] bg-primary/25 rounded-full blur-[130px]" aria-hidden="true" />
        <div className="absolute -bottom-40 -right-20 w-[32rem] h-[32rem] bg-accent/20 rounded-full blur-[130px]" aria-hidden="true" />

        {/* corner frame accents — echoes the AIMS Group brand mark */}
        <span className="hidden md:block absolute top-28 left-8 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" aria-hidden="true" />
        <span className="hidden md:block absolute top-28 right-8 w-12 h-12 border-t-2 border-r-2 border-accent/40 rounded-tr-lg" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            <motion.div variants={heroItem} className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-px bg-accent" />
              <Lightbulb size={16} className="text-accent" />
              <span className="text-accent text-sm font-bold tracking-widest uppercase">AIMS Manufacturing</span>
              <span className="w-8 h-px bg-accent" />
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-[1.1]"
            >
              Precision Manufacturing &amp; Custom Fabrication{' '}
              <span className="text-accent">in the GCC</span>
            </motion.h1>

            <motion.p variants={heroItem} className="text-base md:text-lg text-white/75 mb-4 leading-relaxed max-w-2xl">
              Part of AIMS Group, the Middle East's leading provider of process technology,
              analytical instrumentation, and industrial manufacturing — from IECEx-certified
              analyzers to bolt-on heat tracing and custom hazardous-area enclosures, engineered
              and manufactured within the GCC.
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-wrap justify-center gap-2 mb-5">
              {credentials.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full shadow-sm">
                  <item.icon size={14} className="text-accent flex-shrink-0" />
                  <span className="text-sm text-white/90 font-medium whitespace-nowrap">{item.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={heroItem} className="flex flex-wrap justify-center gap-3">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent border-0 text-white shadow-glow hover:shadow-hero px-9 h-12 text-base rounded-full transition-all duration-300 hover:scale-[1.03]"
                >
                  Request Quote <ArrowRight size={16} className="ml-1.5" />
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent px-9 h-12 text-base transition-transform duration-300 hover:scale-[1.03]"
                >
                  View Products
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="h-[3px] bg-gradient-to-r from-primary via-primary to-accent" />

      {/* Featured products — interactive showcase */}
      <section className="py-14 bg-muted/40 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp()} className="flex items-end justify-between mb-4 flex-wrap gap-4">
            <div>
              <span className="text-primary text-xs font-bold tracking-widest uppercase">Our Catalog</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-1.5 mb-1.5">Featured Products</h2>
              <p className="text-muted-foreground max-w-xl text-sm">
                Select a product from the list to preview its specifications — designed and manufactured
                within the GCC.
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" size="sm" className="shadow-card">
                View All Products <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-x-6 gap-y-1.5 mb-6">
            <span className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {allProducts.length} Products Across {productCategories.length} Categories
            </span>
            <span className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              100% GCC Manufactured
            </span>
            <span className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              IECEx &amp; ISO 9001 Certified
            </span>
          </motion.div>

          {activeProduct && (
            <motion.div {...fadeUp(0.1)} className="relative">
              {/* Dynamic category-colored glow — cross-fades to match the active product */}
              {(Object.keys(CATEGORY_GLOW) as Array<keyof typeof CATEGORY_GLOW>).map((cat) => (
                <div
                  key={cat}
                  aria-hidden="true"
                  className={`absolute -inset-6 rounded-[40px] blur-3xl transition-opacity duration-700 pointer-events-none ${CATEGORY_GLOW[cat]} ${
                    activeProduct.category === cat ? 'opacity-25' : 'opacity-0'
                  }`}
                />
              ))}

              <div className="relative grid lg:grid-cols-[1fr_340px] lg:grid-rows-1 gap-5 lg:h-[420px]">
                {/* Stage — active product detail */}
                <div className="aims-card bg-white rounded-2xl border border-border shadow-elevated overflow-hidden grid sm:grid-cols-2 sm:grid-rows-1 lg:h-full">
                  <div
                    className="relative h-56 sm:h-full overflow-hidden bg-muted [perspective:800px]"
                    onMouseMove={handleStageMouseMove}
                    onMouseLeave={handleStageMouseLeave}
                  >
                    <motion.div style={{ rotateX, rotateY }} className="absolute inset-0">
                      <AnimatePresence initial={false}>
                        <motion.img
                          key={activeProduct.id}
                          src={activeProduct.image}
                          alt={activeProduct.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: easeSmooth }}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </AnimatePresence>
                    </motion.div>
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent z-10" />
                    {activeProduct.badge && (
                      <span className="absolute top-4 left-4 px-2.5 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-sm z-10">
                        {activeProduct.badge}
                      </span>
                    )}
                  </div>
                  <div className="relative p-5 lg:p-7 flex flex-col justify-center overflow-y-auto">
                    <motion.div
                      key={activeProduct.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, ease: easeSmooth }}
                    >
                        <span className="text-primary text-[11px] font-bold tracking-widest uppercase mb-2 block">
                          {activeCategory}
                        </span>
                        <h3 className="text-xl font-bold mb-2">{activeProduct.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{activeProduct.shortDescription}</p>

                        {detailedProductInfo[activeProduct.id]?.advantages && (
                          <ul className="flex flex-col gap-1.5 mb-4">
                            {detailedProductInfo[activeProduct.id].advantages.slice(0, 1).map((adv) => (
                              <li key={adv.title} className="flex items-start gap-2">
                                <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-foreground leading-relaxed">
                                  <span className="font-semibold">{adv.title}</span>
                                  <span className="text-muted-foreground"> — {adv.description}</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 mb-4">
                          {activeProduct.specs.slice(0, 4).map((spec) => (
                            <div key={spec.label} className="border-l-2 border-primary/30 pl-3">
                              <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">{spec.label}</p>
                              <p className="text-xs font-semibold text-foreground">{spec.value}</p>
                            </div>
                          ))}
                        </div>

                        <Link
                          to={`/products?product=${activeProduct.id}`}
                          className="group inline-flex items-center gap-2 text-primary font-semibold text-sm w-fit hover:gap-3 transition-all duration-300"
                        >
                          View Full Specifications
                          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Selector rail — browse and switch the active product */}
                <div className="aims-card bg-white rounded-2xl border border-border shadow-card p-2.5 flex flex-col lg:h-full overflow-hidden">
                  <div className="flex items-center justify-between px-2.5 py-1.5 flex-shrink-0">
                    <span className="text-[10.5px] font-bold text-muted-foreground uppercase tracking-wide">All Products</span>
                    <span className="text-[10.5px] font-semibold text-muted-foreground">
                      {activeIndex + 1} / {featured.length}
                    </span>
                  </div>
                  <div className="scrollbar-thin flex flex-col gap-0.5 overflow-y-auto pr-1">
                    {featured.map((product) => {
                      const categoryName = productCategories.find((c) => c.id === product.category)?.name;
                      const isActive = product.id === activeProduct.id;
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setActiveProductId(product.id)}
                          aria-pressed={isActive}
                          className="group relative flex items-center gap-2.5 p-2 rounded-lg text-left transition-all duration-200 hover:bg-muted/60 hover:translate-x-0.5"
                        >
                          {isActive && (
                            <motion.div
                              layoutId="featured-rail-highlight"
                              transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                              className="absolute inset-0 bg-primary/8 border border-primary/30 rounded-lg"
                            />
                          )}
                          <div className="relative z-10 w-9 h-9 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                            <img
                              src={product.image}
                              alt=""
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="relative z-10 flex-1 min-w-0">
                            <p className={`text-xs truncate transition-colors duration-200 ${isActive ? 'font-bold text-foreground' : 'font-semibold text-foreground/80 group-hover:text-foreground'}`}>
                              {product.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">{categoryName}</p>
                          </div>
                          {isActive && <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Facility proof — real production floor photography, editorial bento layout */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp()} className="flex items-end justify-between mb-6 flex-wrap gap-4">
            <div>
              <span className="text-primary text-xs font-bold tracking-widest uppercase">Behind the Product</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-1.5 mb-2">Inside Our Facility</h2>
              <p className="text-muted-foreground max-w-xl">
                From raw material to finished product — real production floors in Abu Dhabi, our
                people, our machines, our process.
              </p>
            </div>
            <Link to="/gallery">
              <Button variant="outline" className="shadow-card">
                View Full Gallery <ArrowRight size={15} className="ml-1.5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10">
            <span className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />2 GCC Manufacturing Facilities
            </span>
            <span className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />Abu Dhabi, UAE &amp; Al Khobar, KSA
            </span>
            <span className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />Design to Delivery, In-House
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-1 gap-5 lg:h-[560px]">
            {bigPhoto && (
              <motion.div
                {...fadeUp()}
                className="aims-card group relative rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-hero hover:border-primary/30 transition-all duration-500 h-80 lg:h-full lg:col-span-3"
              >
                <img
                  src={bigPhoto.image}
                  alt={bigPhoto.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center">
                  <bigPhoto.icon size={18} className="text-white" />
                </div>
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn size={16} className="text-white" />
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="block text-[11px] font-bold tracking-widest text-accent uppercase mb-1.5">
                    Step 01 — Raw Material &amp; Production Floor
                  </span>
                  <p className="text-lg font-semibold text-white leading-snug">{bigPhoto.caption}</p>
                </div>
              </motion.div>
            )}

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3 gap-5 lg:h-full">
              {smallPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.caption}
                  {...fadeUp(0.1 + idx * 0.08)}
                  className="aims-card group relative rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-500 h-48 lg:h-full"
                >
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center">
                    <photo.icon size={15} className="text-white" />
                  </div>
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={13} className="text-white" />
                  </div>
                  <div className="absolute bottom-3.5 left-3.5 right-3.5">
                    <span className="block text-[9.5px] font-bold tracking-widest text-accent uppercase mb-1">
                      Step 0{idx + 2}
                    </span>
                    <p className="text-sm font-medium text-white leading-snug">{photo.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* National Industrialization Programs — compact trust strip */}
      <section className="py-16 brand-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] texture-dots" aria-hidden="true" />
        <div className="absolute -top-24 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[110px]" aria-hidden="true" />
        <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[110px]" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp()} className="max-w-xl mx-auto text-center mb-8">
            <span className="inline-block px-3.5 py-1 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-full mb-3">
              National Industrialization
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Backing the Region&rsquo;s Local Content Goals
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Registered and compliant with the national content programs driving industrialization
              across the UAE and Saudi Arabia.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.05)}
            className="flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-white/5 border border-white/10 rounded-2xl max-w-3xl mx-auto overflow-hidden"
          >
            {nationalPrograms.map((program) => (
              <div
                key={program.name}
                title={program.description}
                className="flex items-center gap-3 px-6 py-5 flex-1 justify-center hover:bg-white/5 transition-colors duration-300"
              >
                <img src={program.logo} alt={program.name} className="h-7 w-auto object-contain flex-shrink-0" />
                <div className="text-left">
                  <p className="text-white font-semibold text-xs leading-snug whitespace-nowrap">{program.name}</p>
                  {program.stat && (
                    <p className="text-accent text-[11px] font-bold mt-0.5">
                      {program.stat} {program.statLabel}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA — light section, split with real facility photography */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="bg-white relative px-6 sm:px-10 py-14 flex flex-col justify-center gap-4">
            <span className="text-primary text-xs font-bold tracking-widest uppercase block">Let&rsquo;s Talk</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              Need Custom Manufacturing Solutions?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Our engineering team can design and manufacture solutions tailored to your specific
              requirements — from concept to delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <Link to="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 shadow-card w-full sm:w-auto">
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
            <img src={imgThermexFabricationBay} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
