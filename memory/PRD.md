# LZR TAG — Landing Page PRD

## Original Problem Statement
Build a one-page industrial B2B landing page for LZR TAG, a mining consumables brand, aimed at procurement and technical staff at underground mining companies. Single scrolling page with top nav linking to four anchor sections (Intro, Products, Where to Buy, Get a Quote); hero with logo, tagline "Stay Covered. Stay Visible.", placeholder intro copy, and a CTA scrolling to the quote section. Design must match the attached brochure: bold red header band (#E00A02), light grey page background, white content cards, Oswald headings, Poppins body, numbered red circular badges. Must run as a fully static site (no backend/database) for Cloudflare Pages hosting. Fillout quote form comes later.

## User Personas
- Procurement staff at underground mining companies (no-nonsense industrial buyers)
- Technical/survey staff evaluating consumables

## Architecture
- Fully static site: plain HTML/CSS/JS, no backend, no database, no API calls
- Source of truth: `/app/frontend/public/` (index.html, styles.css, main.js, assets/logo.webp) — this folder is the drag-and-drop deployable for Cloudflare Pages
- Fonts: Oswald + Poppins via Google Fonts CDN
- Preview served via the existing frontend dev server on port 3000 (React entry `/app/frontend/src/index.js` is a deliberate no-op so the dev server injects a harmless bundle)
- Backend service left running but unused by the site

## Core Requirements (static)
1. Single scrolling page, fixed top nav with 4 anchor links + mobile menu
2. Hero: logo, tagline, placeholder intro paragraph, CTA → #quote
3. Four section stubs (Intro, Products, Where to Buy, Get a Quote) as white cards with numbered red badges 01–04
4. Brochure-matched design: #E00A02 red, light grey bg, white cards, Oswald/Poppins
5. Simple footer with logo + copyright
6. Static-hostable output for Cloudflare Pages

## Implemented
- 2026-07 (round 1): Page shell + hero complete. Fixed red header (#E00A02) with logo, desktop nav, mobile hamburger menu; hero with transparent WebP logo, "Stay Covered. Stay Visible." tagline, clearly-marked placeholder copy, red CTA smooth-scrolling to quote section; four numbered-badge section cards; charcoal footer with logo, tagline, nav, copyright. All interactive elements carry data-testids.
- 2026-07 (round 2): Hero reworked to a single centered column — enlarged logo on top overlapping a new black band (#141519) above the hero, then eyebrow (letter-spacing tightened to 0.14em), headline, paragraph, and CTA all center-aligned. Other sections untouched.
- 2026-07 (round 3): Hero sizing tuned — logo scaled to 400px (matches headline width), black band slimmed to 72px accent, tighter wrap margins so the full hero fits the first desktop screen. Layout/alignment unchanged.
- 2026-07 (round 4, user-approved plan): Page-top restructure — thin black strip (12px) now sits above the red nav bar; the nav logo enlarged to 148px (104px mobile) so it overlaps up into the strip and down past the red bar into the page; brand wordmark text removed; the hero's black band and large centered logo deleted so eyebrow/headline/copy/CTA start right under the nav; added CSS-only masked line-by-line headline reveal + staggered fades as the on-load moment. Kept fully static (no framer-motion/lenis) per the user's Cloudflare Pages static-site constraint.
- 2026-07 (round 5): Scroll-scrubbed color animation on the hero headline — superseded by round 6.
- 2026-07 (round 6): Hero rebuilt as a 220vh scroll track with the hero pinned via position: sticky (top: 0, height: 100vh). Only "Stay Visible." animates: word-by-word #d9d9d9 → #E00803 scrubbed over the first half of the track, completing before the hero unpins and Intro scrolls in; "Stay Covered." is static black. All other entrance animations removed (logo pop-in, masked line reveal, rise/fade-in). Logo now renders immediately with no animation and no white circle behind it (drop-shadow only). Reduced-motion users get final colors with no JS.
- 2026-07 (round 7): Intro section removed entirely (card + placeholder copy); Intro nav links removed from header, mobile menu, and footer; remaining badges renumbered — Products 01, Where to Buy 02, Get a Quote 03. Page now flows hero → Products.
- 2026-07 (round 8): Products section built out with the real 12-item catalogue. Cards follow the theperformancelab.ca reference: hairline border with corner plus marks, top row SKU (left, light grey) + index number (right), full-bleed 4:3 photo, red category label, bold name, description, spec list, RRP + MOQ row, red #E00803 "Get a Quote" CTA with arrow → #quote. RRP/MOQ taken from the 2026 price list PDF (source of truth). Real photos extracted from the product-list DOCX for LZR-001, LZR-002, SS-01, SS-02, SS-03, SS-04 (stored in public/assets/products/). NU-01, NU-02, NU-03, NU-04 photos were named in the brief but NOT present in either upload — they show a "Photo coming soon" placeholder along with SS-05 and CUSTOM. Grid: 3/2/1 columns responsive.
- 2026-07 (round 9): Hero headline bumped 25% (clamp 3.25rem/6.75vw/5.25rem → 84px desktop). All 12 product CTAs rebuilt as split-buttons per theperformancelab.ca reference: default = square arrow panel left + label panel right (#E00803 fill, off-white #F5F2EC text, 3px gap, sharp corners); hover (hover-capable devices only) slides the label panel left while the left arrow rotates out rotateY(-90) and a second arrow rotates in from the right rotateY(90→0), clipped by overflow:hidden, 450ms ease-in-out, outer dimensions fixed. Touch devices keep default layout with a darker pressed state.
- 2026-07 (round 10): Hero dot-grid background added — .hero-dots layer (26px-spaced white radial-gradient dots on the light grey hero), scoped absolutely inside the sticky hero only, opacity scrubbed 0→1 on the exact same scroll progress/smoothstep as the "Stay Visible." word transition (static position, opacity only; defaults to visible for reduced-motion/no-JS). Hero CTA converted to the shared split-button component (same .product-cta markup/CSS as product cards, 320px centered via .hero-cta); old .cta-button styles removed.
- 2026-07 (round 11): Products intro paragraph gets word-by-word #d9d9d9→#17181C scroll scrub (main.js second watcher; triggers as it enters 85%→50% of viewport; reduced-motion shows final near-black via CSS). Product grid changed to a horizontal rail on desktop: 480px oversized cards (440px ≤1100px), flex + overflow-x auto, scroll-snap proximity, hidden scrollbar, next card cropped at right edge; ≤860px reverts to single-column stack.
- 2026-07 (round 12): Get a Quote section — placeholder replaced with the live Zite form (https://giyjwyy9mj.zite.so) as an iframe, width matched to the section content column, height tuned to 1120px (1250px ≤640px) after measuring the rendered form (1118px) so there is no internal scrollbar. Heading/intro copy kept as-is. No API key, no backend — form submits directly to Zite. Test submission NOT sent (would land in the client's live form results).
- 2026-07 (round 13): SCROLL LOCK FIX — user reported scroll forced back to ~2000px (Products section), lower sections unreachable. troubleshoot_agent RCA: orphaned scroll-snap-align on product cards when the rail collapses to stacked grid ≤860px — cards became snap targets for the document scroller under smooth scrolling, fighting scroll past Products. Fix: removed scroll-snap-type and scroll-snap-align entirely (rail is smooth without snap). Verified full sweep to page bottom, quote + footer reachable.
- 2026-07 (round 14): Card reveal FIXED for the horizontal rail — round 13 drove reveal off vertical position only, so all 12 rail cards shared one trigger and revealed together before the user scrolled sideways (user saw no animation). Now each card's reveal progress = min(vertical entry, horizontal position within the rail); a paintCards listener also hooks the rail's own scroll event. Cards unroll top-down as they enter from the rail's right edge, and re-cover when scrolled away. Verified with screenshots of actual mid-animation states (card 07 half-covered during horizontal scroll; blinds down while section enters; all re-covered back at top). [SUPERSEDED by round 15 — rail replaced entirely]
- 2026-07 (round 15): Products rail REPLACED with vertical sticky-stack deck (theperformancelab.ca Our Services pattern). Cards are now landscape panels (44% photo | 56% info, top row spans, height min(600px, viewport-capped)) with position: sticky and per-card top offsets (header+16px, +14px per card) so prior cards show as layered strips; margin-bottom 20vh between cards for reading time; incoming card casts upward shadow. Pure CSS sticky = natively scroll-scrubbed and reversible, no JS. Card-reveal overlay JS/CSS removed. Mobile (≤860px): static single-column cards, no pinning. Verified with 4 mid-transition screenshots (cards 2/5/9/12 partially covering their predecessors, strips visible).
- 2026-07 (round 16): Hero dot-grid corrected — colors inverted to light grey dots (rgb 206,208,214) on near-white, and hero background now lerps #EFEFF1 → white in JS over the same smoothstepped scroll progress as the "Stay Visible." word color change; dots fade in on the identical progress value (all three start/finish together). Dots static, hero-scoped, sections below untouched.
- 2026-07 (round 17): Footer rebuilt per Zaro reference in brand red #E00803 (black top border): logo + tagline left; three columns — Site (Home/Products/Where to Buy/Get a Quote) with Contact underneath (consumables@egspatial.com, from the price-list PDF's Australian partner — needs client confirmation), Products 1–6, More Products 7–12. Product links scroll to cards via JS-assigned ids (from data-testid) with a :target red ring highlight. White headings, rgba(255,255,255,0.7) links; low-opacity white divider; bottom row © year + Privacy/Terms in small-caps letter-spaced Oswald. Legal links are # placeholders.

## Backlog (prioritized)
- P0: Fillout quote form embed in Get a Quote section (planned, user-confirmed for later)
- P0: Final marketing copy for hero + Intro (client pending)
- P1: Products section — real catalogue from LZR_TAG_Consumables_Price_List_2026.pdf (12 products, 5 categories, pricing/RRP bands)
- P1: Where to Buy — Australian partner, international partner, independent reseller listings (from PDF page 2)
- P2: Customer/partner logo strip (brochure footer motif)
- P2: Deploy to Cloudflare Pages

## Next Tasks
1. Embed Fillout quote form once form URL is provided
2. Swap placeholder hero copy for final approved text
3. Build Products grid from the 2026 price list PDF
