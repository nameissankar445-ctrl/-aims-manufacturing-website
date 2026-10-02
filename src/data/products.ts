import imgAP5 from '@/assets/manufacturing/AP_5.jpg';
import imgBestotube from '@/assets/manufacturing/Bestotube.jpg';
import imgCabinets from '@/assets/manufacturing/Cabinets.jpg';
import imgCustomEnclosures from '@/assets/manufacturing/Custom_Enclosures.jpg';
import imgSentech from '@/assets/manufacturing/Sentech.jpg';
import imgShelters from '@/assets/manufacturing/Shelters.jpg';
import imgThermex from '@/assets/manufacturing/Thermex.jpg';
import imgVenturi from '@/assets/manufacturing/AIMS_Century.jpg';

export interface ProductDetailInfo {
  fullName: string;
  tagline: string;
  technology: string;
  principle: string;
  measurableGases: string[];
  applications: { name: string; description: string }[];
  advantages: { title: string; description: string }[];
  whyAIMS: string;
  labels?: {
    principle?: string;
    technology?: string;
    gases?: string;
  };
}

export interface ProductData {
  id: string;
  category: 'analyzer' | 'heattracing' | 'shelter';
  name: string;
  image: string;
  shortDescription: string;
  certifications?: string[];
  badge?: string;
  specs: { label: string; value: string }[];
  hasDetailedInfo?: boolean;
}

export const productCategories = [
  { id: 'analyzer', name: 'Analyzers & Instruments' },
  { id: 'heattracing', name: 'Heat Tracing & Steam' },
  { id: 'shelter', name: 'Shelters & Enclosures' },
] as const;

export const detailedProductInfo: Record<string, ProductDetailInfo> = {
  'aims-ap5': {
    fullName: 'AIMS-AP5 Tunable Filter Spectroscopy Analyzer',
    tagline: 'First IECEx Certified Analyzer Manufactured in the GCC',
    technology: 'The AIMS-AP5 TFS™ (Tunable Filter Spectrometer) is a patented first-principle gas analyzer requiring no carrier gas, no fuel gas, no instrument air, and no consumables — eliminating the ongoing operating costs of conventional analyzers. It measures hydrocarbon compositions (C1–C6), BTU, Wobbe Index, Methane Number, and acid gases in real-time with repeatability better than 0.1% and accuracy of ±0.3 mol% (or ±1% of Full Scale, whichever is greater). Designed, engineered, and manufactured in the GCC to global quality standards, the AP5 operates unattended in Zone 1 hazardous areas at ambient temperatures from -20°C to +60°C.',
    principle: 'The AP5 sensor platform consists of a light source, sample cell, wavelength separating element (spectrometer), and photo-detector. The wavelength separating element slices the broadband light into components that interact with sample molecules — some are absorbed, some transmitted. This first-principle optical measurement requires no periodic on-site calibration, responds in less than one second, and is linear throughout its range with no cross-interference between gas components. Remote and completely unattended operation is standard.',
    measurableGases: [
      'Hydrocarbon compositions C1–C6',
      'BTU / Calorific Value',
      'Wobbe Index',
      'Methane Number',
      'Acid gases (CO₂, H₂S)',
      'Flare gas composition',
      'Fuel gas quality',
    ],
    applications: [
      { name: 'Pipeline Gas Quality', description: 'Continuous C1–C6 hydrocarbon and acid gas analysis for pipeline gas quality monitoring and custody transfer for sales gas' },
      { name: 'Power Generation', description: 'BTU, Wobbe Index, and Methane Number measurement for gas turbine fuel control and power generation optimization' },
      { name: 'Flare & Fuel Gas', description: 'Real-time flare gas and fuel gas monitoring for environmental compliance and combustion efficiency' },
      { name: 'Petrochemical Processing', description: 'Multi-channel online unattended analyzer for continuous petrochemical process monitoring' },
      { name: 'Terminal Unloading', description: 'Gas quality analysis at truck, ship, and rail car unloading terminals' },
      { name: 'Gas Exploration', description: 'Portable and temporary analysis for offshore and land-based gas exploration and well testing' },
    ],
    advantages: [
      { title: 'IECEx Certified', description: 'First IECEx certified analyzer designed and manufactured in the GCC — Ex d flameproof enclosure, Zone 1, Tamb -20 to +60°C' },
      { title: 'No Carrier Gas / No Calibration', description: 'Requires no carrier gas, fuel gas, instrument air, or consumables — and no periodic on-site calibration. Lowest lifecycle cost of any GC-equivalent system' },
      { title: 'Sub-Second Response', description: '< 1 second response time — real-time analysis for fast process control and safety applications' },
      { title: 'GCC Manufacturing', description: 'Manufactured within the GCC with regional engineering support, rapid spare parts supply, and on-site service across all served countries' },
    ],
    whyAIMS: 'AIMS-AP5 demonstrates the GCC\'s industrial manufacturing capability — a fully IECEx certified process analyzer engineered and built within the region to global standards. With no carrier gas, no calibration, and no consumables, the AP5 delivers the lowest lifecycle cost of any comparable analyzer. Regional production means shorter lead times to all GCC markets, competitive pricing, and direct on-site technical support across UAE, Saudi Arabia, Qatar, Kuwait, and Oman.',
  },
  'analyzer-shelters': {
    fullName: 'Analyzer Shelters — Walk-in & Mini Shelters',
    tagline: 'Turnkey Analyzer Housing — Advanced Engineering, Full Lifecycle Support',
    technology: 'We design and manufacture purpose-built analyzer shelters for walk-in and mini configurations, engineered to safeguard vital analyzer infrastructure in demanding operational environments. Each shelter integrates a comprehensive set of engineered systems: climate control (HVAC/cooling), fire suppression and safety systems, purge and pressurization for hazardous area classification, secure access and monitoring, process analyzer and instrumentation installation, electrical and mechanical equipment, and control systems and communication infrastructure. High-grade steel, aluminum, and composite construction with premium materials. From design and engineering through fabrication and testing, every aspect of production is controlled in-house.',
    principle: 'Purge and pressurization systems reduce the hazardous area classification inside the shelter by continuously supplying clean instrument air at positive pressure. Type X purge reduces Zone 1 surrounding area to safe-area inside; Type Z reduces Zone 2 to non-hazardous inside. The purge controller enforces a safe startup sequence before energizing, alarms on purge failure, and de-energizes on pressure loss. Integrated HVAC maintains analyzer operating temperature within specification across the full GCC ambient temperature range.',
    measurableGases: ['Houses all analyzer types', 'Process gas analyzers', 'CEMS / stack analyzers', 'Liquid analyzers', 'Moisture and trace analyzers'],
    applications: [
      { name: 'Refinery & Gas Processing', description: 'Process analyzer housing for refinery and gas plant applications — engineered to ADNOC and Aramco design requirements' },
      { name: 'CEMS Shelters', description: 'Continuous Emission Monitoring shelter installations for power plants, refineries, and industrial stacks with integrated CEMS sample systems' },
      { name: 'Petrochemical Plants', description: 'Chemical plant multi-analyzer shelters with integrated sample conditioning, calibration gas manifolds, and utility systems' },
      { name: 'Offshore & Remote Sites', description: 'Marine-rated and remote-site shelters with enhanced structural specification, satellite communication, and full HVAC redundancy' },
    ],
    advantages: [
      { title: 'Complete Turnkey System', description: 'Climate control, fire suppression, purge system, secure access, instrumentation, electrical, and communication — all engineered and integrated as one package' },
      { title: 'Hazardous Area Purge & Pressurization', description: 'Type X and Type Z purge and pressurization for Zone 1 and Zone 2 hazardous area installation, engineered to project-specific classification requirements' },
      { title: 'Full Lifecycle Support', description: 'Full lifecycle support — from initial consultation and design through installation, commissioning, and ongoing maintenance' },
      { title: 'GCC Manufacturing', description: 'Designed and manufactured at GCC facilities — serving all regional markets with rapid delivery and full customization to client specifications' },
    ],
    whyAIMS: 'Analyzer shelters are designed and manufactured at our GCC manufacturing facilities, serving customers across UAE, Saudi Arabia, Qatar, Kuwait, and Oman. Trusted by industry leaders including all ADNOC entities and Aramco for protection solutions in mission-critical analyzer operations. Regional production enables full customization, rapid delivery, and competitive pricing that imported shelters cannot match.',
    labels: { principle: 'Design Features & Environment Control', technology: 'Hazardous Area Compliance', gases: 'Compatible Analyzer Systems' },
  },
  'aims-venturi': {
    fullName: 'AIMS-Venturi Steam Traps',
    tagline: '20-Year Guarantee — No Moving Parts, No Maintenance, 20–30% Fuel Savings',
    technology: 'Venturi technology permanently eliminates steam trap maintenance by removing all moving parts. Unlike mechanical steam traps that fail open or closed, the AIMS-Venturi continuously drains condensate while preventing steam loss through a fixed venturi orifice — with no mechanical wear, no survey requirements, and no failure modes. The result is a reduction in boiler fuel costs of 20%–30% and improved heat transfer throughout the steam system.',
    principle: 'The venturi effect creates a pressure differential that continuously moves condensate through the trap while the steam pressure differential prevents steam from passing. With no moving parts there is nothing to wear, corrode, or jam — the trap handles varying loads and constant loads with equal reliability. The design eliminates both the maintenance cost of traditional trap programmes and the hidden energy cost of failed-open traps leaking live steam.',
    measurableGases: ['Steam / Condensate', 'Flash steam prevention', 'Varying and constant loads'],
    applications: [
      { name: 'Steam Distribution Headers', description: 'Continuous condensate drainage from process steam headers — eliminates survey programmes and trap replacement cycles' },
      { name: 'Heat Tracing Lines', description: 'Steam trace condensate removal with no maintenance requirement — set and forget for the life of the plant' },
      { name: 'Heat Exchangers', description: 'Condensate drainage from shell-and-tube and plate heat exchangers with improved heat transfer efficiency' },
      { name: 'Process Vessels & Equipment', description: 'Industrial steam equipment drainage where reliability and zero-maintenance are critical process requirements' },
    ],
    advantages: [
      { title: '20-Year Guarantee', description: 'Industry-leading 20-year guarantee — no other steam trap technology offers comparable service life assurance' },
      { title: 'No Moving Parts', description: 'Zero mechanical wear — no maintenance, no surveys, no replacement cycles for the life of the installation' },
      { title: '20–30% Fuel Savings', description: 'Reduces boiler fuel costs by 20%–30% through elimination of steam loss and improved heat transfer across the steam system' },
      { title: 'Handles Any Load', description: 'Manages varying and constant condensate loads with equal reliability — no hunting, no water hammer, no blowthrough' },
    ],
    whyAIMS: 'AIMS-Venturi steam traps permanently solve the two biggest problems in steam systems: maintenance cost and energy loss. With a 20-year guarantee, no moving parts, and proven 20%–30% boiler fuel savings, the AIMS-Venturi pays for itself rapidly and then delivers savings for the life of the plant. Our engineers provide full sizing, selection, and installation support across all GCC markets.',
    labels: { principle: 'Operating Mechanism', technology: 'Technical Specifications', gases: 'Application Parameters' },
  },
  'aims-centec': {
    fullName: 'AIMS-Sentech Water Cut & Level Profiler',
    tagline: 'Full-Bore Non-Intrusive Water Cut Meter & Multi-Point Level Profiler — See Through the Walls',
    technology: 'The AIMS-Sentech delivers two complementary measurement solutions: (1) a Level Profiler for oil-water interface detection in separators and vessels — allowing operators to "see through the walls" of separators, with vertical resolution down to 1 cm and an optional in-situ flushing system for sensor cleaning without interrupting production — and (2) a full-bore, completely non-intrusive Water Cut Meter that measures water content in any oil-based liquid as well as in multiphase flow (oil, water, gas), scaling to 24-inch pipe diameters and larger. The water cut meter introduces no pressure drop, has no intrusive elements, and averages measurements at multiple locations around the pipe for maximum accuracy. Both instruments are manufactured and calibrated within the GCC.',
    principle: 'The Level Profiler uses capacitance measurement cells arranged along a probe spanning the full vessel height. Each cell exploits the difference in dielectric constants between oil (~2.2) and water (~80) to determine the fluid fraction at each elevation — constructing a complete real-time fluid distribution profile, with resolution as fine as 1 cm depending on project requirements. The Water Cut Meter operates on a non-intrusive full-bore principle: measurements are averaged at multiple locations around the pipe cross-section, providing detection of oil/water distribution as well as overall water cut — suitable for two-phase and multiphase flow in any pipe diameter, 0–100% water-in-oil range, including direct wellhead measurement without upstream gas/liquid separation.',
    measurableGases: [
      'Water Cut % (0–100%, full-bore non-intrusive)',
      'Oil-Water Interface Level (multi-point)',
      'Water Layer Thickness',
      'Fluid Distribution Profile',
      'Free Water Level',
      'Multiphase flow (oil, water, gas)',
    ],
    applications: [
      { name: 'Oil-Water Separators', description: 'Interface detection and level control in three-phase separators — including tight emulsions, long settling times, and severe foaming conditions' },
      { name: 'Crude Oil Storage Tanks', description: 'Free water bottom detection and interface monitoring in storage tanks without pressure drop or intrusive elements' },
      { name: 'Desalter Vessels', description: 'Emulsion layer profiling and interface control in crude desalter units where conventional instruments cannot see through emulsion layers' },
      { name: 'Produced Water & Pipeline Metering', description: 'Non-intrusive water cut measurement in produced water facilities and pipeline multiphase flow — no process shutdown for installation' },
      { name: 'Wellhead & Multiphase Well Testing', description: 'Direct water cut measurement at the wellhead without upstream gas/liquid separation — enabling real-time multiphase well testing' },
    ],
    advantages: [
      { title: 'Full-Bore Non-Intrusive', description: 'Water cut meter is completely non-intrusive — no pressure drop, scales to 24-inch pipe diameters and larger, installs without process shutdown' },
      { title: 'Multiphase Capable', description: 'Measures water content in two-phase and multiphase flow (oil, water, gas) — not limited to single-phase or separated flow' },
      { title: '±0.5–1% Water Cut Accuracy', description: 'High accuracy water cut measurement — ±0.5% in continuous oil flow, ±1% in continuous water flow — for process optimization and production accounting, 0–100% range for all pipe sizes' },
      { title: 'In-Situ Sensor Cleaning', description: 'Optional flushing system cleans Level Profiler sensors in place without interrupting production — eliminating pull-and-clean maintenance downtime' },
      { title: 'GCC Manufacturing', description: 'Manufactured and calibrated within the GCC, with local content compliance for UAE (ICV) and KSA (IKTVA) programs' },
    ],
    whyAIMS: 'The AIMS-Sentech is a regionally designed and manufactured product, giving us the flexibility to provide custom calibration, rapid spare parts supply, and responsive technical support that imported products cannot match. The non-intrusive water cut meter and the multi-point level profiler address measurement challenges where conventional floats, DP transmitters, and guided wave radar instruments fail — particularly in heavy crudes, emulsions, and high-water-cut production.',
    labels: { principle: 'Measurement Principles', technology: 'Technology & Design', gases: 'Measurement Outputs' },
  },
  'aims-thermax': {
    fullName: 'AIMS-Thermex Bolt-On Heat Tracing System',
    tagline: 'The Preferred Bolt-On Steam, Hot Oil & Glycol Heat Tracing Solution Since 1980',
    technology: 'AIMS-Thermex is the preferred bolt-on heat tracing solution for heating pipes, tanks, and vessels — a proven technology with over 500 miles in service in plants and refineries around the globe since 1980. The system consists of pre-engineered heat transfer saddles that bolt directly onto the outside of piping and equipment using steam, hot oil, or glycol as the heating medium, eliminating the need for welding or hot work permits. A heat transfer compound between the saddle and the pipe or vessel wall eliminates air gaps for optimal contact and doubles as a corrosion barrier. Configurations scale from 1/2-inch piping up to storage tanks and vessels up to 35 meters in diameter. Panels are designed in accordance with ASME Boiler and Pressure Vessel Code Section VIII, Div.1, and can be used as a redundant heating system alongside existing steam tracing.',
    principle: 'Heat transfer saddles bolt directly to pipe or vessel walls, maximizing contact area for uniform heat distribution. Steam, hot oil, or glycol circulated through each saddle maintains precise temperature along the full run with no hot spots. All in-line components remain line-sized, and optimized circuit lengths reduce steam consumption versus fully jacketed piping. The bolt-on approach allows installation and removal without breaking pressure containment — ideal for operating plants where hot work permits are restricted.',
    measurableGases: ['Viscous crude oil (pour point maintenance)', 'Bitumen (viscosity/pumpability maintenance)', 'Liquid sulfur (solidification prevention)', 'Amine and glycol systems', 'Cooling water (freeze protection)', 'Chemical injection lines', 'Steam and condensate lines on tanks/vessels'],
    applications: [
      { name: 'Piping — Viscous & Freeze Protection', description: 'Maintain crude oil above pour point, prevent liquid sulfur solidification, and protect water and chemical lines from freezing in cold climates' },
      { name: 'Tanks & Vessels', description: 'Panel configuration on tank and vessel walls for temperature maintenance of storage and process vessels — no welding, no hot work permits required' },
      { name: 'Sulfur & Amine Systems', description: 'Heat tracing for liquid sulfur lines, amine, glycol, and chemical injection systems requiring precise temperature maintenance' },
      { name: 'Petrochemical & Specialty Chemicals', description: 'Temperature maintenance for bitumen, polycarbonates, and specialty chemicals requiring precise process temperature control' },
      { name: 'Redundant Heat Tracing', description: 'Used as a redundant heating system alongside existing steam tracing for critical process lines where loss of heating is unacceptable' },
    ],
    advantages: [
      { title: 'No Welding — No Hot Work', description: 'Bolt-on installation eliminates hot work permits and weld inspection requirements — can be installed and removed without breaking pressure containment' },
      { title: 'No Cross Contamination', description: 'Heating medium is completely isolated from the process — no risk of contamination between the steam, hot oil, or glycol heating medium and the process fluid' },
      { title: 'ASME BPVC Sec. VIII Compliant', description: 'Designed per ASME Boiler and Pressure Vessel Code Section VIII, Div.1 — accepted for pressure vessel and equipment applications' },
      { title: 'Any Size, Any Medium', description: 'Scales from 1/2-inch piping to tanks and vessels up to 35 meters in diameter, using steam, hot oil, or glycol as the heating medium' },
      { title: '500+ Miles Globally', description: 'Over 500 miles of bolt-on heat tracing in service in plants and refineries worldwide since 1980 — proven long-term reliability' },
    ],
    whyAIMS: 'AIMS-Thermex is manufactured at our GCC facilities, providing regional supply, engineering support, and rapid delivery to all GCC markets. Our engineers design heat tracing systems from heat loss calculations through to supply and installation supervision — with service teams deployed across UAE, Saudi Arabia, Qatar, Kuwait, and Oman.',
    labels: { principle: 'Operating Principle', technology: 'Design & Global Track Record', gases: 'Applicable Process Media' },
  },
  'aims-bitstube': {
    fullName: 'AIMS-Bestotube Factory-Assembled Tube Bundle Systems',
    tagline: 'Pre-Tested, Pre-Insulated Tubing Bundles for Analyzer, CEMS, and Process Applications',
    technology: 'AIMS-Bestotube are factory-assembled, pre-tested, and pre-insulated tubing bundle systems that consolidate multiple process and signal tubes — along with heat tracing and insulation — into a single ready-to-install assembly. Applications include analyzer sample transport, CEMS (Continuous Emission Monitoring) sample lines, steam and condensate distribution, jacketed tubing, instrumentation impulse tubing freeze protection, and personal protection tubing. The antistatic PVC or TPU outer jacket is 100% thickness-controlled by laser measurement, 100% traceable, and length-marked for easy field installation and planning. Bundles are supplied coiled — up to 250m for heat-traced configurations and up to 500m for pre-insulated tubing — or in straight sticks for shorter runs.',
    principle: 'Tube bundles consolidate multiple individual tubes (process sample, calibration gas, instrument air, electrical cables, steam/condensate return) into a single pre-insulated, pre-traced assembly. Factory assembly ensures correct tube routing, tracing contact, and insulation integrity — eliminating the field joint failures and insulation voids that are the most common causes of sample line and trace failures. Each bundle is factory pressure-tested, leak-tested, and continuity-tested before shipment, removing the need for full pressure testing after field installation.',
    measurableGases: [
      'Analyzer sample transport (process gas)',
      'CEMS / stack emission sample lines',
      'Calibration gas distribution',
      'Steam & condensate return',
      'Chemical injection lines',
      'Instrumentation impulse lines',
    ],
    applications: [
      { name: 'Analyzer Sample Lines', description: 'Heated tube bundles transporting process samples from tap to analyzer shelter — maintaining sample above dew point throughout, with electropolished, oxygen-cleaned, or Sulfinert-coated tubing available for high-purity and trace-level sampling' },
      { name: 'CEMS & Stack Monitoring', description: 'Continuous Emission Monitoring sample lines from stack extraction point to CEMS shelter, with heat tracing and insulation per EPA/EN requirements' },
      { name: 'Steam & Condensate Distribution', description: 'Pre-insulated steam supply and condensate return lines for heat tracing distribution systems — including lead and tail lines' },
      { name: 'Jacketed Tubing', description: 'Jacketed tube-within-tube configurations for secondary containment of hazardous or high-value process fluids' },
      { name: 'Instrumentation Impulse Lines', description: 'Traced and insulated bundles for pressure transmitter impulse lines requiring freeze protection' },
      { name: 'Chemical Injection', description: 'Multi-tube bundles for chemical injection systems with laser-marked length identification and individual tube traceability' },
    ],
    advantages: [
      { title: 'Factory Pre-Tested', description: 'All tubes pressure, leak, and continuity-tested at factory — no field pressure testing required, zero-defect delivery guaranteed' },
      { title: 'Laser-Controlled Quality', description: 'Jacket thickness 100% controlled by laser measurement, 100% traceable, length-marked — faster installation and full material traceability' },
      { title: 'Full Material Range', description: '316SS, 304SS, copper, PFA, PTFE, Hastelloy, duplex, 6Mo — matching tube material to process fluid for any corrosive or high-purity application' },
      { title: 'Custom Lengths', description: 'Manufactured to precise field-measured lengths — no field cutting, no field joints, 60%+ reduction in installation time' },
      { title: 'Precision Sample Tubing Finishes', description: 'Electropolished tubing to ≤0.4Ra µm surface roughness, oxygen-cleaned to ASTM G93 Level A, or Sulfinert-coated to prevent adsorption of reactive sulfur, mercury, and ammonia — maintaining sample integrity for low ppm/ppb analyzer measurements' },
    ],
    whyAIMS: 'AIMS-Bestotube are manufactured at our GCC facilities using high-quality tube, insulation, and tracing materials. Our engineering team designs the bundle configuration, tube sizing, and tracing specification for each project across all GCC markets — supported by heat signature simulation and heat-loss calculations — and our factory testing program ensures zero-defect delivery to site.',
    labels: { principle: 'Design Concept', technology: 'Construction, Materials & Jacket', gases: 'Transported Media' },
  },
  'analyzer-cabinets': {
    fullName: 'Analyzer Cabinets & Purged Enclosures',
    tagline: 'Compact IP66/NEMA 4X Analyzer Enclosures for Single to Dual Analyzer Installations',
    technology: 'We manufacture compact analyzer cabinets for single and dual analyzer installations in outdoor and hazardous area environments. Cabinets are constructed from 316 stainless steel or GRP (glass reinforced plastic) with IP66/NEMA 4X weather protection. Hazardous area versions incorporate Type X or Type Z pneumatic purge and pressurization systems, enabling standard analyzers to operate safely in Zone 1 or Zone 2 classified areas. Cooling is provided by air conditioner or vortex cooler.',
    principle: 'Purge and pressurization reduces the hazardous area classification inside the enclosure by continuously supplying clean instrument air at positive pressure, displacing any flammable gas that may enter. Type X purge (to safe area) or Type Z purge (Zone 2 to non-hazardous inside) is selected based on the surrounding area classification and analyzer type. The purge controller ensures a safe startup sequence before energizing, alarm on purge failure, and de-energization on pressure loss.',
    measurableGases: ['All analyzer types accommodated', 'Process gas analyzers', 'CEMS analyzers', 'Liquid analyzers'],
    applications: [
      { name: 'Zone 1 / Zone 2 Areas', description: 'Analyzer cabinets with Type X/Z purge for hazardous area installation' },
      { name: 'Outdoor Installations', description: 'IP66/NEMA 4X weatherproof cabinets for desert and coastal environments' },
      { name: 'Single Analyzer Stations', description: 'Compact cabinets for single GC, moisture, or CEMS analyzer installations' },
      { name: 'Retrofit Installations', description: 'Standardized cabinet dimensions for direct replacement of aging analyzer housings' },
    ],
    advantages: [
      { title: 'GCC Manufacturing', description: 'Manufactured within the GCC — faster regional delivery, full customization, competitive lead times for all GCC markets' },
      { title: 'Hazardous Area Documentation', description: 'Complete hazardous area design documentation prepared for authority approval in GCC jurisdictions' },
      { title: 'Compact Footprint', description: 'Smaller than walk-in shelters — suitable for space-constrained installations' },
      { title: 'Quick Delivery', description: 'Standard cabinet configurations available for rapid delivery from stock designs' },
    ],
    whyAIMS: 'We have designed and manufactured analyzer cabinets for ADNOC, Aramco, and other major GCC operators. Regional manufacturing means we can accommodate non-standard dimensions, special material requirements, and short delivery schedules that international suppliers cannot match — with engineering teams on-the-ground across the GCC.',
    labels: { principle: 'Purge & Pressurization', technology: 'Construction & Specifications', gases: 'Compatible Analyzers' },
  },
  'custom-enclosures': {
    fullName: 'Custom-Designed Industrial Enclosures',
    tagline: 'Bespoke Engineering for Non-Standard Applications and Special Requirements',
    technology: 'We design and manufacture custom industrial enclosures for applications that cannot be accommodated by standard catalog products. Custom scope includes: non-standard dimensions or configurations, special material requirements (duplex SS, titanium, exotic alloys), integrated process connections, specific hazardous area certifications (IECEx, ATEX, FM, CSA), specialized cooling solutions, and offshore/marine environmental protection. Full mechanical design, IECEx documentation, and FAT are included.',
    principle: 'Custom enclosure projects start with a detailed technical requirement review covering: hazardous area classification, environmental conditions (temperature, humidity, sand, corrosive atmosphere), contents (equipment types and heat loads), access requirements, process connections, and authority approval requirements. A detailed GA drawing and specification is produced for client approval before fabrication begins.',
    measurableGases: ['Any equipment type accommodated', 'Process analyzers', 'Control systems', 'Safety instrumentation', 'Custom process assemblies'],
    applications: [
      { name: 'Non-Standard Analyzer Systems', description: 'Custom enclosures for unique analyzer configurations not fitting standard cabinet sizes' },
      { name: 'Offshore Modules', description: 'Marine-rated enclosures engineered for offshore platform installation' },
      { name: 'High-Temperature Environments', description: 'Specially insulated enclosures for desert high-ambient-temperature installations' },
      { name: 'High-Pressure Systems', description: 'Pressure-vessel rated enclosures for high-pressure process integration' },
    ],
    advantages: [
      { title: 'Fully Custom', description: 'No compromise — designed exactly to your requirements' },
      { title: 'IECEx/ATEX Documentation', description: 'Complete hazardous area documentation package for authority approval' },
      { title: 'FAT Included', description: 'Factory acceptance testing with client witness option — accessible to customers across the GCC' },
      { title: 'Short Lead Time', description: 'GCC-based fabrication enables faster delivery than imported custom enclosures, with no international freight delays or customs complications' },
    ],
    whyAIMS: 'We have manufactured custom enclosures for ADNOC, Aramco, and other major GCC operators for requirements that could not be met by standard products. Our in-house engineering team works directly with clients across all GCC markets from concept through FAT, ensuring the final product meets every technical and regional regulatory requirement.',
    labels: { principle: 'Design Process', technology: 'Construction & Capabilities', gases: 'Compatible Equipment' },
  },
};

export const analyzerProducts: ProductData[] = [
  {
    id: 'aims-ap5',
    category: 'analyzer',
    name: 'AIMS-AP5',
    image: imgAP5,
    badge: 'IECEx Certified',
    certifications: ['IECEx', 'Ex d'],
    shortDescription: 'First IECEx certified analyzer designed and manufactured in the GCC.',
    hasDetailedInfo: true,
    specs: [
      { label: 'Response', value: '< 1 second' },
      { label: 'Accuracy', value: '±0.3 mol% / <0.1% repeat.' },
      { label: 'Operating Temp', value: '-20 to +60°C (certified)' },
      { label: 'Certification', value: 'IECEx Ex d, Zone 1' },
    ],
  },
  {
    id: 'aims-centec',
    category: 'analyzer',
    name: 'AIMS-Sentech',
    image: imgSentech,
    certifications: ['Water Cut', 'Level'],
    shortDescription: 'Full-bore non-intrusive water cut meter & multi-point level profiler for separators and storage tanks.',
    hasDetailedInfo: true,
    specs: [
      { label: 'Water Cut Range', value: '0-100%' },
      { label: 'Accuracy', value: '±0.5-1%' },
      { label: 'Response', value: 'Continuous' },
      { label: 'Process Temp', value: 'Up to 225°C' },
    ],
  },
];

export const heatTracingProducts: ProductData[] = [
  {
    id: 'aims-thermax',
    category: 'heattracing',
    name: 'AIMS-Thermex',
    image: imgThermex,
    badge: 'No Welding',
    certifications: ['ASME BPVC VIII'],
    shortDescription: 'Bolt-on heat tracing for pipes, tanks & vessels — no welding, since 1980.',
    hasDetailedInfo: true,
    specs: [
      { label: 'Heating Medium', value: 'Steam / Hot Oil / Glycol' },
      { label: 'Size Range', value: '1/2" pipe to 35m tanks' },
      { label: 'Compliance', value: 'ASME BPVC Sec. VIII' },
      { label: 'Installation', value: 'Bolt-on' },
    ],
  },
  {
    id: 'aims-bitstube',
    category: 'heattracing',
    name: 'AIMS-Bestotube',
    image: imgBestotube,
    certifications: ['Pre-tested'],
    shortDescription: 'Factory-assembled, pre-tested tube bundles for analyzers, CEMS, steam, and chemical injection.',
    hasDetailedInfo: true,
    specs: [
      { label: 'Materials', value: 'SS316, SS304, Hastelloy' },
      { label: 'Tube Sizes', value: '1/4" to 1"' },
      { label: 'Max Temp', value: 'Up to 550°C' },
      { label: 'Insulation', value: 'Non-Hygroscopic Fiberglass' },
    ],
  },
  {
    id: 'aims-venturi',
    category: 'heattracing',
    name: 'AIMS-Venturi',
    image: imgVenturi,
    badge: '20-Year Warranty',
    certifications: ['No Moving Parts'],
    shortDescription: 'Venturi steam traps — no moving parts, 20-year guarantee, 20–30% boiler fuel savings.',
    hasDetailedInfo: true,
    specs: [
      { label: 'Pressure', value: 'Up to 62 barg' },
      { label: 'Temperature', value: 'Up to 450°C' },
      { label: 'Material', value: '316 SS (CF3M Body)' },
      { label: 'Warranty', value: '20 Years' },
    ],
  },
];

export const shelterProducts: ProductData[] = [
  {
    id: 'analyzer-shelters',
    category: 'shelter',
    name: 'Analyzer Shelters',
    image: imgShelters,
    badge: 'Turnkey',
    certifications: ['Zone 1 / 2', 'Purge System'],
    shortDescription: 'Purpose-built analyzer shelters with integrated HVAC and purge.',
    hasDetailedInfo: true,
    specs: [
      { label: 'Construction', value: 'Steel / Aluminum' },
      { label: 'Classification', value: 'Zone 1 / Zone 2' },
      { label: 'Climate Control', value: 'HVAC + Purge' },
      { label: 'Purge Type', value: 'Type X / Type Z' },
    ],
  },
  {
    id: 'analyzer-cabinets',
    category: 'shelter',
    name: 'Analyzer Cabinets',
    image: imgCabinets,
    certifications: ['IP66', 'NEMA 4X'],
    shortDescription: 'Compact analyzer enclosures for single or dual analyzers.',
    hasDetailedInfo: true,
    specs: [
      { label: 'Rating', value: 'IP66 / NEMA 4X' },
      { label: 'Material', value: '316 SS / GRP' },
      { label: 'Cooling', value: 'AC / Vortex' },
      { label: 'Purge', value: 'Type Z / Type X' },
    ],
  },
  {
    id: 'custom-enclosures',
    category: 'shelter',
    name: 'Custom Enclosures',
    image: imgCustomEnclosures,
    certifications: ['IECEx', 'ATEX'],
    shortDescription: 'Custom-designed enclosures for special applications.',
    hasDetailedInfo: true,
    specs: [
      { label: 'Design', value: 'To Customer Spec' },
      { label: 'Certification', value: 'IECEx / ATEX' },
      { label: 'FAT', value: 'Included' },
      { label: 'Lead Time', value: '6-8 Weeks' },
    ],
  },
];

export const allProducts: ProductData[] = [...analyzerProducts, ...heatTracingProducts, ...shelterProducts];
