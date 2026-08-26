# CreditPassport Consulting

Consultancy-first website for CreditPassport: credit strategy, decision intelligence, risk analytics, financial data, AI/ML, and research.

## Strategic direction

The public site positions CreditPassport as a consulting and research practice today. Future product infrastructure remains a separate productization track.

The visual language is inspired by the editorial rhythm of the Optimus reference site: oversized typography, restrained monochrome presentation, numbered modules, fine borders, structured grids and technical storytelling. The implementation adapts that design grammar to CreditPassport rather than copying its content or brand.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Motion
- Lucide
- Vercel-ready

## Routes

- `/` — consultancy-first homepage
- `/consulting` — service architecture
- `/research` — research practice and topics
- `/case-studies` — evidence-led publishing area
- `/about` — company model and thesis
- `/contact` — engagement-intake placeholder

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Next implementation slices

1. Import and reconcile the existing CreditPassport brand assets.
2. Add motion/scroll interactions after the static visual system is approved.
3. Add MDX publishing for research and case studies.
4. Connect the consultation intake flow.
5. Add SEO, analytics, accessibility QA and deployment configuration.
