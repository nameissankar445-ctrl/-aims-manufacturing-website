import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO, { BASE_URL } from '@/components/SEO';
import CTABanner from '@/components/CTABanner';
import { Droplet, Flame, Zap, Phone } from 'lucide-react';
import heroBg from '@/assets/industries/oil-gas-refinery.jpg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.4, delay },
});

const industries = [
  {
    icon: Droplet,
    name: 'Oil & Gas',
    description:
      'Pipeline gas quality analysis, wellhead water cut measurement, and hazardous-area analyzer shelters for upstream, midstream, and downstream operations.',
    applications: [
      'Custody transfer & pipeline gas quality (AIMS-AP5)',
      'Wellhead & multiphase water cut measurement (AIMS-Sentech)',
      'Oil-water separator interface control',
      'Zone 1/2 analyzer shelters & cabinets',
    ],
  },
  {
    icon: Flame,
    name: 'Petrochemical',
    description:
      'Bolt-on heat tracing for viscous process media, factory-assembled sample tube bundles, and custom enclosures engineered for chemical plant environments.',
    applications: [
      'Viscous fluid & sulfur line heat tracing (AIMS-Thermex)',
      'Analyzer & CEMS sample transport (AIMS-Bestotube)',
      'Multi-analyzer shelters with sample conditioning',
      'Chemical injection line tube bundles',
    ],
  },
  {
    icon: Zap,
    name: 'Power Generation',
    description:
      'Real-time fuel gas quality analysis for gas turbine control, and steam trap systems that reduce boiler fuel costs across power plant steam networks.',
    applications: [
      'BTU, Wobbe Index & Methane Number analysis (AIMS-AP5)',
      'Boiler steam trap replacement (AIMS-Venturi)',
      'CEMS shelters for emissions monitoring',
      'Steam & condensate distribution tube bundles',
    ],
  },
];

const Industries = () => (
  <div className="min-h-screen bg-muted/30">
    <SEO
      title="Industries"
      description="AIMS Manufacturing products serve oil & gas, petrochemical, and power generation operators across the GCC — from pipeline analyzers to boiler steam traps."
      keywords="oil and gas manufacturing, petrochemical instrumentation, power generation analyzers, GCC industrial manufacturing"
      canonicalUrl={`${BASE_URL}/industries`}
    />
    <Navigation />

    <section className="pt-32 pb-10 brand-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/15" />
      <div className="absolute inset-0 opacity-[0.05] texture-dots" aria-hidden="true" />
      <div className="absolute -top-24 -right-16 w-80 h-80 bg-primary/25 rounded-full blur-[100px]" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Industries We Serve</h1>
        <p className="text-white/70 max-w-2xl">
          Our products are engineered for the most demanding process environments across the
          region's core industrial sectors.
        </p>
      </div>
    </section>

    <div className="container mx-auto px-4 py-16 space-y-10">
      {industries.map((ind, idx) => (
        <motion.div
          key={idx}
          {...fadeUp(idx * 0.1)}
          className="aims-card bg-white rounded-2xl border border-border shadow-card hover:shadow-elevated transition-shadow duration-300 overflow-hidden"
        >
          <div className="p-8 grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <ind.icon size={22} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">{ind.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{ind.description}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Relevant Applications
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {ind.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <CTABanner
      icon={Phone}
      image={heroBg}
      heading="Discuss Your Application"
      description="Talk to our engineering team about the right product for your process requirements."
      primary={{ label: 'Contact Us', to: '/contact' }}
      secondary={{ label: 'View Products', to: '/products' }}
    />

    <Footer />
  </div>
);

export default Industries;
