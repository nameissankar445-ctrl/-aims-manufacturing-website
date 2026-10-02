import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO, { BASE_URL } from '@/components/SEO';
import CTABanner from '@/components/CTABanner';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Phone, ZoomIn } from 'lucide-react';

import imgAP5 from '@/assets/manufacturing/AP_5.jpg';
import imgSentech from '@/assets/manufacturing/Sentech.jpg';
import imgThermex from '@/assets/manufacturing/Thermex.jpg';
import imgBestotube from '@/assets/manufacturing/Bestotube.jpg';
import imgVenturi from '@/assets/manufacturing/AIMS_Century.jpg';
import imgShelters from '@/assets/manufacturing/Shelters.jpg';
import imgCabinets from '@/assets/manufacturing/Cabinets.jpg';
import imgCustomEnclosures from '@/assets/manufacturing/Custom_Enclosures.jpg';

import imgFacilityTubeWinding from '@/assets/gallery/facility-tube-winding-floor.jpg';
import imgBoltOnTraceForming from '@/assets/gallery/operations-bolt-on-trace-forming.jpg';
import imgCncTurningOperator from '@/assets/gallery/operations-cnc-lathe-area.jpg';
import imgThermexFabricationBay from '@/assets/gallery/thermex-fabrication-bay.jpg';
import imgWaterCutMeterMachining from '@/assets/gallery/water-cut-meter-machining.jpg';
import imgSparePartsPrinting from '@/assets/gallery/spare-parts-3d-printing.jpg';

import imgWaterCutMeterHero from '@/assets/gallery/water-cut-meter-hero.jpg';
import imgDssPrecisionPart from '@/assets/gallery/dss-precision-part.jpg';
import imgDssProductCutout from '@/assets/gallery/dss-product-cutout.png';
import imgShelterProductCutout from '@/assets/gallery/shelter-product-cutout.jpg';

import imgSheltersReadyForDispatch from '@/assets/gallery/shelters-ready-for-dispatch.jpg';
import imgBlastProofExterior from '@/assets/gallery/blast-proof-shelter-exterior.jpg';
import imgBlastProofInterior from '@/assets/gallery/blast-proof-shelter-interior.jpg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.4, delay },
});

interface GalleryItem {
  image: string;
  title: string;
  caption: string;
}

interface GallerySection {
  title: string;
  description: string;
  items: GalleryItem[];
}

const sections: GallerySection[] = [
  {
    title: 'Inside Our Facility',
    description: 'Real production floors in Abu Dhabi — our people, our machines, our process.',
    items: [
      {
        image: imgFacilityTubeWinding,
        title: 'Tube Bundle Production Floor',
        caption: 'The tube-bundle winding line at our Abu Dhabi facility, spooling sample lines for dispatch.',
      },
      {
        image: imgBoltOnTraceForming,
        title: 'Bolt-On Trace Profile Forming',
        caption: 'Our team operating the profile-forming machine for AIMS Bolt-On Trace heat tracing.',
      },
      {
        image: imgCncTurningOperator,
        title: 'CNC Turning in Progress',
        caption: 'An AIMS machinist running a precision turning job on our 2-axis CNC lathe.',
      },
      {
        image: imgThermexFabricationBay,
        title: 'Thermex Fabrication Bay',
        caption: 'Pipe bending and profile fabrication equipment in our Thermex production area.',
      },
      {
        image: imgWaterCutMeterMachining,
        title: 'Precision Machining in Progress',
        caption: 'A water cut meter component being CNC-machined under coolant on our production floor.',
      },
      {
        image: imgSparePartsPrinting,
        title: 'Metal Additive Manufacturing for Spare Parts',
        caption: 'Our large-format metal 3D printing platform, depositing a stainless steel part — used to manufacture spare parts on demand.',
      },
    ],
  },
  {
    title: 'Products We Build',
    description: 'Finished components and assemblies, manufactured and tested in-house.',
    items: [
      {
        image: imgWaterCutMeterHero,
        title: 'AIMS-Sentech Water Cut Meter — Finished Unit',
        caption: 'A completed water cut meter assembly, precision-manufactured for wellhead and pipeline service.',
      },
      {
        image: imgDssPrecisionPart,
        title: 'DSS Precision Component',
        caption: 'A precision-machined DSS fitting, finished to tight dimensional tolerances.',
      },
      {
        image: imgDssProductCutout,
        title: 'DSS Valve Body',
        caption: 'A machined valve body stamped with the AIMS mark, manufactured in-house.',
      },
      {
        image: imgAP5,
        title: 'AIMS-AP5 Analyzer',
        caption: 'Precision electronics assembly for our IECEx-certified gas analyzer, built in-house from circuit board to enclosure.',
      },
      {
        image: imgShelterProductCutout,
        title: 'Analyzer Shelter',
        caption: 'A completed analyzer shelter, fully outfitted with electrical and HVAC systems.',
      },
      {
        image: imgShelters,
        title: 'Analyzer Shelters',
        caption: 'Walk-in analyzer shelter fully outfitted with HVAC, electrical, and purge systems prior to dispatch.',
      },
      {
        image: imgCustomEnclosures,
        title: 'Custom Enclosures',
        caption: 'Interior of a custom multi-analyzer enclosure with integrated sample conditioning and instrumentation.',
      },
      {
        image: imgCabinets,
        title: 'Analyzer Cabinets',
        caption: 'Weatherproof analyzer cabinet fabricated and wired in-house for Zone 1/2 hazardous area installation.',
      },
      {
        image: imgSentech,
        title: 'AIMS-Sentech Water Cut Meter',
        caption: 'Machined stainless steel water cut meter assemblies, precision-manufactured for wellhead and pipeline service.',
      },
      {
        image: imgThermex,
        title: 'AIMS-Thermex Heat Tracing',
        caption: 'Bolt-on heat tracing clamp installed on process piping — no welding or hot work required.',
      },
      {
        image: imgBestotube,
        title: 'AIMS-Bestotube Tube Bundles',
        caption: 'Factory-assembled sample tube bundles spooled and ready for dispatch from our production line.',
      },
      {
        image: imgVenturi,
        title: 'AIMS-Venturi Steam Trap',
        caption: 'Precision-machined venturi steam trap internals manufactured to tight dimensional tolerances.',
      },
    ],
  },
  {
    title: 'Ready for Delivery',
    description: 'Completed units, staged and finished for handover to site.',
    items: [
      {
        image: imgSheltersReadyForDispatch,
        title: 'Analyzer Cabinets Staged for Dispatch',
        caption: 'A batch of completed analyzer cabinets on pallets, ready for shipment from our facility.',
      },
      {
        image: imgBlastProofExterior,
        title: 'Blast-Resistant Shelter',
        caption: 'A completed blast-resistant shelter unit, finished and ready for site delivery.',
      },
      {
        image: imgBlastProofInterior,
        title: 'Shelter Interior, Ready for Handover',
        caption: 'A fitted-out shelter interior, complete with furniture and finishes ahead of client handover.',
      },
    ],
  },
];

const galleryItems: GalleryItem[] = sections.flatMap((section) => section.items);
const sectionStartIndex = sections.map((_, idx) =>
  sections.slice(0, idx).reduce((sum, s) => sum + s.items.length, 0),
);

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);
  const showPrev = useCallback(
    () => setSelectedIndex((i) => (i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length)),
    [],
  );
  const showNext = useCallback(
    () => setSelectedIndex((i) => (i === null ? i : (i + 1) % galleryItems.length)),
    [],
  );

  const selected = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO
        title="Gallery"
        description="A look inside AIMS Manufacturing — real photos of our Abu Dhabi facility, production floor, and the analyzers, heat tracing systems, tube bundles, and enclosures we manufacture."
        keywords="AIMS manufacturing gallery, GCC manufacturing facility, analyzer manufacturing photos, industrial fabrication gallery"
        canonicalUrl={`${BASE_URL}/gallery`}
      />
      <Navigation />

      <section className="pt-32 pb-10 brand-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/15" />
        <div className="absolute inset-0 opacity-[0.05] texture-dots" aria-hidden="true" />
        <div className="absolute -top-24 -right-16 w-80 h-80 bg-primary/25 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Manufacturing Gallery</h1>
          <p className="text-white/70 max-w-2xl">
            A closer look at what we build. From the shop floor to the finished product, everything
            shown here is designed, fabricated, and tested at our own facilities in Abu Dhabi, UAE
            and Al Khobar, KSA.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {sections.map((section, sectionIdx) => (
          <div key={section.title}>
            <motion.div {...fadeUp()} className="mb-6">
              <h2 className="text-2xl font-bold mb-1.5">{section.title}</h2>
              <p className="text-sm text-muted-foreground max-w-2xl">{section.description}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item, itemIdx) => {
                const globalIndex = sectionStartIndex[sectionIdx] + itemIdx;
                return (
                  <motion.button
                    key={`${section.title}-${itemIdx}`}
                    {...fadeUp((itemIdx % 3) * 0.08)}
                    type="button"
                    onClick={() => setSelectedIndex(globalIndex)}
                    className="aims-card text-left group bg-white rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-shadow duration-300"
                  >
                    <div className="relative h-52 overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-sm mb-1.5">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.caption}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && close()}>
        <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto p-0 gap-0 sm:max-w-3xl">
          {selected && (
            <>
              <div className="relative bg-muted">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selected.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    src={selected.image}
                    alt={selected.title}
                    className="w-full max-h-[55vh] object-contain bg-black"
                  />
                </AnimatePresence>

                {galleryItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              <div className="p-6">
                <DialogTitle className="text-lg font-bold mb-1.5">{selected.title}</DialogTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">{selected.caption}</p>
                {selectedIndex !== null && (
                  <p className="text-xs text-muted-foreground/70 mt-3">
                    {selectedIndex + 1} of {galleryItems.length}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <CTABanner
        icon={Phone}
        image={imgDssPrecisionPart}
        heading="See Our Products Up Close"
        description="Explore the full specification sheet for any product shown here, or get in touch to discuss a custom requirement."
        primary={{ label: 'View Products', to: '/products' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />

      <Footer />
    </div>
  );
};

export default Gallery;
