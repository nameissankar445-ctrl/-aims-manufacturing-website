# AIMS Manufacturing Website — Project Handoff

## Concept

A standalone marketing website for **AIMS Manufacturing** — the manufacturing division of AIMS Group, being spun off onto its own domain. Content was sourced from the existing AIMS Group corporate site's "Manufacturing Division" page and expanded into a full independent site: precision analyzers, heat tracing systems, and custom hazardous-area enclosures, manufactured across two GCC facilities (Abu Dhabi, UAE and Al Khobar, KSA).

The site intentionally shares AIMS Group's visual brand language (same logo, same cyan/orange color system, same animation/card techniques as the parent AIMSGT site) so it reads as part of the same family, while standing on its own as a dedicated Manufacturing brand.

## Tech Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `src/index.css`, no `tailwind.config.ts`)
- **shadcn/ui** (Radix-based primitives) for Button, Dialog, Tabs, Select, Dropdown Menu, etc.
- **framer-motion** for scroll-triggered entrance animations
- **react-router-dom v7** for client-side routing
- No backend — this is a fully static site. The contact form opens the visitor's email client (`mailto:`) rather than posting anywhere.

## Run it

```bash
npm install
npm run dev      # http://localhost:5183 (or default 5173)
npm run build    # production build to dist/
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, product category overview, featured products, "Why AIMS Manufacturing" |
| `/products` | Full catalog (8 products across Analyzers, Heat Tracing, Shelters) with a filterable grid and a detail modal (specs, applications, advantages, technical tab) |
| `/industries` | Oil & Gas, Petrochemical, Power Generation — application use cases per industry |
| `/about` | Company facilities, milestones, certifications |
| `/contact` | Split dark/light contact card, office cards for both facilities, emergency-support CTA |

## Brand system

Colors were **sampled directly from the pixels of `src/assets/aims-logo.png`**, not guessed:

| Token | Hex | Source |
|---|---|---|
| Primary (blue) | `#00A8C6` | Same hue family as logo blue (`#32C8F0`), darkened for text/button contrast |
| Accent (orange) | `#FA961E` | Exact sampled logo orange |

All dark section backgrounds (footer, hero scrim, contact panel) were deliberately kept in the same ~193° hue family as the logo — an earlier pass had drifted into a generic indigo/slate dark tone that didn't read as "AIMS blue," which has since been corrected.

Key reusable visual patterns, defined once in `src/index.css`:
- `.aims-card` — animated rotating conic-gradient border (fires on hover), used on every card throughout the site
- `.texture-dots` — subtle dot-grid overlay for dark sections
- `.brand-gradient-dark` — the dark hero/CTA gradient
- `shadow-card` / `shadow-elevated` / `shadow-hero` / `shadow-glow` — brand-tinted shadows (not neutral gray)

## Known open items

- **Al Khobar phone number is a placeholder** (`+966 13 000 0000`) — marked `TODO` in `src/pages/Contact.tsx`. Needs the real number before launch.
- **No backend / no analytics** — contact form is `mailto:`-only by design (this was an explicit scope decision, not an oversight). Revisit if lead capture becomes a requirement.
- **Not yet a git repository** — no version control has been initialized in this folder.
- **Domain/hosting** — not yet deployed anywhere; ready for `npm run build` → static hosting (Vercel, Netlify, S3, etc.) whenever the domain purchase is finalized.

## Suggested next steps

1. Confirm the Al Khobar phone number and swap the placeholder.
2. Initialize git and push to a repo once you're ready to track history.
3. Decide on hosting and point the purchased domain at it.
4. If lead capture is needed later, wire the contact form to a real backend (Supabase, a form service, etc.) — the UI is already built, only the submission target needs to change.
