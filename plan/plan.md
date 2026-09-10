# LZR TAG — Landing Page Shell + Hero: Plan

## What will be built
A single scrolling landing page for LZR TAG (mining consumables brand), aimed at procurement and technical buyers at underground mining companies. This round delivers the page shell and a finished hero section; the remaining sections exist as working anchor targets, ready to be filled in later.

## Included in this round
- **Top navigation bar** — fixed at the top of the page, with the LZR TAG logo on the left and four links: Intro, Products, Where to Buy, Get a Quote. Each link smooth-scrolls to its section. The nav collapses to a simple menu on small screens.
- **Hero section** (fully built):
  - The attached LZR TAG logo, displayed prominently
  - Tagline: "Stay Covered. Stay Visible."
  - One paragraph of placeholder intro copy (clearly placeholder, to be swapped when final copy arrives)
  - A red CTA button ("Get a Quote") that smooth-scrolls to the quote section
- **Section stubs** — Intro, Products, Where to Buy, and Get a Quote each exist as clearly marked placeholder blocks on the light grey page background (white content cards, per the brochure style), so the nav anchors all work and the page structure is final. The numbered red circular badge motif from the brochure is used to mark each section.
- **Simple footer** with the logo and a copyright line.

## Design decisions (from the attached brochure)
- Header band and accents in brand red **#E00A02**
- Light grey page background, white content cards
- **Oswald** for headings, **Poppins** for body text (loaded from Google Fonts)
- Numbered red circular badges as the recurring visual motif
- Overall tone: bold, no-nonsense, industrial — no decorative flourishes

## Technical shape
- **Fully static site** — no backend, no database, no API calls. The output is plain static files suitable for drag-and-drop hosting on Cloudflare Pages.
- Everything (logo, fonts, styles) is self-contained so hosting needs zero configuration.

## Explicitly not in this round (as agreed)
- Fillout quote form integration — the Get a Quote section ships as a placeholder; Fillout gets embedded in a later round once the form exists.
- Final marketing copy — placeholder text stands in for now.
- Real product data, distributor listings, or any backend functionality.

## Assumptions made
- The attached price-list PDF is used only as a visual/style reference for this round; its product content is not added to the page yet.
- Nav and hero use the attached logo image as-is.
