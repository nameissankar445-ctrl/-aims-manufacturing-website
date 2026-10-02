import rawSpareParts from './spareParts.json';

export interface SparePart {
  local_pn: string;
  description: string;
  category: string;
  material: [string, string][];
  dimensions: [string, string][];
  supply: string;
  image: string;
}

// These source photos have a third-party OEM brand/logo covered with a pasted-on gray box or
// blur patch rather than cleanly removed — several leave part of the mark still legible at the
// edges (e.g. AME-10307's nameplate text above the patch). Since the patch itself is a visible
// tell and doesn't fully de-identify the part, we don't display the photo at all; the catalog
// falls back to its placeholder icon instead. AME-10278's watermark tiles across the whole frame
// (not a single region), so it gets the same treatment.
const BRANDED_IMAGE_PNS = new Set([
  'AME-10277', 'AME-10278', 'AME-10279', 'AME-10283', 'AME-10286', 'AME-10297', 'AME-10298',
  'AME-10299', 'AME-10303', 'AME-10307', 'AME-10309', 'AME-10333', 'AME-10335', 'AME-10338',
  'AME-10345', 'AME-10348', 'AME-10354', 'AME-10355', 'AME-10359', 'AME-10364', 'AME-10374',
  'AME-10382', 'AME-10384', 'AME-10388', 'AME-10389', 'AME-10402', 'AME-10403', 'AME-10412',
  'AME-10416', 'AME-10423', 'AME-10445', 'AME-10449', 'AME-10451', 'AME-10463', 'AME-10475',
  'AME-10476',
]);

// "Operating conditions" entries are boilerplate copied from the parent (third-party) equipment's
// manual — e.g. heated-cell temperatures and hazardous-area ratings that describe the host
// instrument, not the part itself. Every one of the 120 records carries one of only 8 variants,
// which would fingerprint the underlying OEM analyzer line. Stripped site-wide; only the part's own
// material and sizing/rating data is shown.
const isOperatingConditions = ([label]: [string, string]) =>
  label.trim().toLowerCase() === 'operating conditions';

// Source-data typo: "Probe / Sample- system" (missing space, stray hyphen). Cosmetic only.
const CATEGORY_FIXES: Record<string, string> = {
  'Probe / Sample- system': 'Probe / Sample System',
};

// AME-10445/10447/10451 all share the literal description "Ceramic Filter Assembly" — the only
// duplicate description in the whole catalog. AME-10445 has its own "30 MICRON" rating in the
// source data, so that's folded in; AME-10447 vs AME-10451 have no distinguishing spec at all
// (identical material, dimensions, and photo), so "Type I"/"Type II" is a nominal label only, not
// a real technical difference — every entry just needs a description distinct from the others.
//
// The rest below fold in a spec that's already sitting in that same part's own Dimensions &
// Ratings but wasn't mentioned in the description — nothing invented, just surfaced.
const DESCRIPTION_FIXES: Record<string, string> = {
  'AME-10445': 'Ceramic Filter Assembly, 30 Micron',
  'AME-10447': 'Ceramic Filter Assembly, Type I',
  'AME-10451': 'Ceramic Filter Assembly, Type II',
  'AME-10263': 'Spring-Return Ball Valve, 1/4 in',
  'AME-10274': 'Silicone O-Ring Seal, 2.350 in ID x 0.210 in W',
  'AME-10277': 'Battery, 12 V, 5.2 Ah',
  'AME-10278': 'Micro Plug-In Fuse, 125 V, 250 mA',
  'AME-10291': 'Flowmeter, Stainless Steel (Water), 79 cc/min',
  'AME-10295': 'Rubber Heater, 4 x 5, 240 V, 100 W',
  'AME-10302': 'Time-Lag Fuse, 80 mA, 5 x 20 mm',
  'AME-10332': 'Rotameter Kit, Aluminium, 250 sccm',
  'AME-10362': 'O-Ring, EPR (Baked), Size 125',
  'AME-10372': 'Tested Enclosure Assembly (Field-Replaceable), 230 V',
  'AME-10387': 'Cartridge Heater, 1/4 in x 1 in, 120 V, 75 W',
  'AME-10389': 'Pressure Transducer, 0-100 PSIA',
  'AME-10399': 'Orifice, 250 um, 1/8 in, 1000 sccm, 30 PSIG',
  'AME-10400': 'PTFE Washer, 0.625 in OD x 0.438 in ID',
  'AME-10403': 'Adapter Assembly, 1/8 in Tube (Field-Replaceable)',
  'AME-10413': 'Pressure Gauge, 0-160 PSI',
};

export const spareParts: SparePart[] = (rawSpareParts as SparePart[]).map((part) => ({
  ...part,
  description: DESCRIPTION_FIXES[part.local_pn] ?? part.description,
  category: CATEGORY_FIXES[part.category] ?? part.category,
  dimensions: part.dimensions.filter((row) => !isOperatingConditions(row)),
  image: BRANDED_IMAGE_PNS.has(part.local_pn) ? '' : part.image,
}));

// Vite: eagerly resolve every spare-part photo to a build-time URL, keyed by filename.
const sparePartImages = import.meta.glob('@/assets/spare-parts/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const imageByFilename: Record<string, string> = {};
for (const path in sparePartImages) {
  const filename = path.split('/').pop();
  if (filename) imageByFilename[filename] = sparePartImages[path];
}

export const getSparePartImage = (filename: string): string | null =>
  (filename && imageByFilename[filename]) || null;

export const sparePartCategories: string[] = Array.from(
  new Set(spareParts.map((p) => p.category)),
).sort((a, b) => a.localeCompare(b));

export const getSparePartByPn = (pn: string): SparePart | undefined =>
  spareParts.find((p) => p.local_pn.toLowerCase() === pn.toLowerCase());
