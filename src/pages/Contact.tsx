import { useState, type FormEvent, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO, { BASE_URL } from '@/components/SEO';
import CTABanner from '@/components/CTABanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Headphones,
  MessageSquare,
  Loader2,
  Building2,
  ExternalLink,
  Phone,
  ShieldCheck,
  Factory,
  Globe2,
} from 'lucide-react';
import bannerImg from '@/assets/industries/oil-gas-refinery.jpg';
import ctaImg from '@/assets/gallery/operations-cnc-lathe-area.jpg';
import imgAbuDhabiFacility from '@/assets/gallery/facility-tube-winding-floor.jpg';
import imgAlKhobarFacility from '@/assets/gallery/thermex-fabrication-bay.jpg';

const CONTACT_EMAIL = 'aims-mfg@aimsgt.com';
const KSA_EMAIL = 'aims-mfr.ksa@aimsgt.com';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.4, delay },
});

const productInterests = [
  { value: 'analyzers', label: 'Analyzers & Instruments' },
  { value: 'heattracing', label: 'Heat Tracing & Steam' },
  { value: 'shelters', label: 'Shelters & Enclosures' },
  { value: 'custom', label: 'Custom Fabrication' },
  { value: 'other', label: 'Other / Not Sure' },
];

const infoRows = [
  { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: MapPin, label: 'Facilities', value: 'Abu Dhabi, UAE & Al Khobar, KSA' },
];

const offices = [
  {
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    isHeadquarters: true,
    title: 'Manufacturing Facility & Headquarters',
    address: 'Plot 23-WR43, ICAD 3, Musaffah, Abu Dhabi, UAE',
    phone: '+971 2 643 6114',
    phone2: undefined as string | undefined,
    email: CONTACT_EMAIL,
    hours: 'Mon – Fri, 8:00 AM – 6:00 PM',
    mapQuery: 'Plot 23-WR43, ICAD 3, Musaffah, Abu Dhabi, UAE',
    image: imgAbuDhabiFacility,
  },
  {
    city: 'Al Khobar',
    country: 'Kingdom of Saudi Arabia',
    isHeadquarters: false,
    title: 'Manufacturing Facility (9COM Approved)',
    address: '#2, Sahaab Industrial Complex, Al Thuqba Industrial Area, Al Khobar, Saudi Arabia',
    phone: '+966 56 331 6999',
    phone2: '+966 54 751 2345',
    email: KSA_EMAIL,
    hours: 'Sun – Thu, 8:00 AM – 6:00 PM',
    mapQuery: '#2, Sahaab Industrial Complex, Al Thuqba Industrial Area, Al Khobar, Saudi Arabia',
    image: imgAlKhobarFacility,
  },
];

const supportFeatures = [
  { icon: ShieldCheck, title: 'ISO 9001 Certified', caption: 'Quality-managed processes at every facility' },
  { icon: Factory, title: 'Dual GCC Facilities', caption: 'Manufacturing in Abu Dhabi, UAE and Al Khobar, KSA' },
  { icon: Globe2, title: 'IECEx Certified', caption: 'Manufacturing certified for hazardous-area equipment' },
];

const OfficeCard = ({ office, delay }: { office: (typeof offices)[number]; delay: number }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`;
  const stopBubble = (e: MouseEvent) => e.stopPropagation();

  return (
    <motion.div
      {...fadeUp(delay)}
      onClick={() => window.open(mapUrl, '_blank', 'noopener,noreferrer')}
      className="group cursor-pointer rounded-3xl border border-border bg-white shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300 overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-40 overflow-hidden flex-shrink-0">
        <img
          src={office.image}
          alt={office.city}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="hover-shine absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center">
          <Building2 size={16} className="text-white" />
        </div>
        {office.isHeadquarters && (
          <span className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            HQ
          </span>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl leading-tight">{office.city}</h3>
          <p className="text-white/80 text-sm">{office.country}</p>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col bg-white">
        <p className="text-sm font-semibold text-primary mb-4">{office.title}</p>
        <div className="space-y-3 text-sm text-foreground/80 flex-1">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin size={14} className="text-primary" />
            </span>
            <span className="pt-1.5">{office.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone size={14} className="text-primary" />
            </span>
            <span onClick={stopBubble} className="flex items-center flex-wrap gap-x-1.5">
              <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                {office.phone}
              </a>
              {office.phone2 && (
                <>
                  <span className="text-muted-foreground/40">/</span>
                  <a href={`tel:${office.phone2.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                    {office.phone2}
                  </a>
                </>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail size={14} className="text-primary" />
            </span>
            <a
              href={`mailto:${office.email}`}
              onClick={stopBubble}
              className="hover:text-primary transition-colors break-all"
            >
              {office.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock size={14} className="text-primary" />
            </span>
            <span>{office.hours}</span>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-border flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-4 rounded-xl shadow-card group-hover:shadow-glow transition-all duration-300">
          <MapPin size={15} /> View on Map <ExternalLink size={13} />
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', interest: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    const interestLabel = productInterests.find((p) => p.value === form.interest)?.label ?? 'Not specified';
    const subject = encodeURIComponent(`Manufacturing Inquiry — ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nProduct Interest: ${interestLabel}\n\nMessage:\n${form.message}`,
    );
    window.setTimeout(() => {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setSending(false);
    }, 500);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact"
        description="Get in touch with AIMS Manufacturing for product inquiries, custom fabrication requests, or general questions — teams in Abu Dhabi, UAE and Al Khobar, KSA."
        keywords="AIMS Manufacturing contact, request quote, custom fabrication inquiry"
        canonicalUrl={`${BASE_URL}/contact`}
      />
      <Navigation />

      {/* Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={bannerImg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#081b21]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/20" />
        <div className="absolute inset-0 opacity-[0.05] texture-dots" aria-hidden="true" />
        <div className="absolute -top-24 -right-16 w-80 h-80 bg-accent/25 rounded-full blur-[100px]" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-5">
            <Headphones size={15} className="text-accent" />
            <span className="text-white text-sm font-medium">Engineering Support Available</span>
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get in Touch with AIMS Manufacturing
          </h1>
          <p className="text-white/75 text-lg leading-relaxed mb-8">
            Whether it&rsquo;s a standard product or a fully custom fabrication, our engineering
            team is ready to help — reach out for quotes, technical support, or general inquiries
            across our GCC facilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+97126436114">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold px-8 h-14 shadow-hero">
                <Phone size={18} className="mr-2" /> Call Us Now
              </Button>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold px-8 h-14">
                <Mail size={18} className="mr-2" /> Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Main split contact card */}
      <section className="pt-14 pb-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 8%, transparent) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="aims-card rounded-3xl shadow-elevated overflow-hidden max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Dark info panel */}
              <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary-dark to-[#081b21] text-white p-8 lg:p-10 flex flex-col justify-center">
                <div className="absolute inset-0 opacity-[0.06] texture-dots" aria-hidden="true" />
                <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-accent/20 rounded-full blur-[90px]" aria-hidden="true" />
                <div className="absolute -top-20 -left-16 w-56 h-56 bg-primary-light/20 rounded-full blur-[90px]" aria-hidden="true" />

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 text-xs font-semibold rounded-full uppercase tracking-wide mb-5">
                    <MessageSquare size={12} /> We&rsquo;re Here to Help
                  </span>
                  <h2 className="text-2xl font-bold mb-3 leading-tight">
                    Reach Our <span className="text-accent">Engineering Team</span>
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed mb-8">
                    Prefer to talk directly? Call or email us, or use the form to send full
                    details of your requirement.
                  </p>

                  <div className="space-y-5">
                    {infoRows.map((row, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 group">
                        <div className="w-11 h-11 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center flex-shrink-0">
                          <row.icon size={18} className="text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-white/50 font-medium uppercase tracking-wide">{row.label}</p>
                          {row.href ? (
                            <a href={row.href} className="text-sm font-medium group-hover:text-accent transition-colors">
                              {row.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium">{row.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                    {offices.map((office, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{office.city}</span>
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-sm text-accent hover:underline">
                          {office.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form panel */}
              <div className="lg:col-span-3 bg-card p-8 lg:p-10">
                <h2 className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Send Us a Message
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Describe your requirements and our engineering team will respond with a
                  tailored solution.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold mb-1.5 block" htmlFor="name">
                        Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="name"
                        required
                        className="h-12 focus-visible:border-primary focus-visible:ring-primary/30"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-1.5 block" htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="h-12 focus-visible:border-primary focus-visible:ring-primary/30"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold mb-1.5 block" htmlFor="company">
                        Company <span className="text-muted-foreground font-normal text-xs">(Optional)</span>
                      </label>
                      <Input
                        id="company"
                        className="h-12 focus-visible:border-primary focus-visible:ring-primary/30"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-1.5 block" htmlFor="phone">
                        Phone <span className="text-muted-foreground font-normal text-xs">(Optional)</span>
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        className="h-12 focus-visible:border-primary focus-visible:ring-primary/30"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">
                      Product Interest <span className="text-muted-foreground font-normal text-xs">(Optional)</span>
                    </label>
                    <Select value={form.interest} onValueChange={(v) => setForm({ ...form, interest: v })}>
                      <SelectTrigger className="h-12 w-full focus-visible:border-primary focus-visible:ring-primary/30">
                        <SelectValue placeholder="Select a product category" />
                      </SelectTrigger>
                      <SelectContent>
                        {productInterests.map((p) => (
                          <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block" htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us about your requirement..."
                      className="focus-visible:border-primary focus-visible:ring-primary/30"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent border-0 rounded-full text-white shadow-glow hover:shadow-hero transition-all duration-300 disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Inquiry <Send size={17} className="ml-2" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Submitting opens your email client with this message addressed to our team.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office cards */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp()} className="max-w-2xl mx-auto text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Our Facilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Regional Manufacturing Facilities
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Two ISO 9001 certified facilities across the GCC — click a card below to view it on the map.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {offices.map((office, idx) => (
              <OfficeCard key={office.city} office={office} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Emergency support CTA */}
      <CTABanner
        icon={Headphones}
        image={ctaImg}
        heading="Need Urgent Manufacturing Support?"
        description="For urgent product or service issues, reach our engineering team directly — by phone or email."
        primary={{ label: 'Call Emergency Hotline', href: 'tel:+97126436114', icon: Phone }}
        secondary={{ label: 'Email Support Team', href: `mailto:${CONTACT_EMAIL}`, icon: Mail }}
        badge={
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Support Team Available
          </span>
        }
        large
      >
        <motion.div {...fadeUp(0.1)} className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {supportFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="hover-shine group text-center p-6 bg-white border border-border rounded-2xl shadow-card hover:shadow-elevated hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3 shadow-card transition-transform duration-300 group-hover:scale-110">
                <feature.icon size={26} className="text-white" />
              </div>
              <h3 className="text-foreground font-semibold mb-1.5">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.caption}</p>
            </div>
          ))}
        </motion.div>
      </CTABanner>

      <Footer />
    </div>
  );
};

export default Contact;
