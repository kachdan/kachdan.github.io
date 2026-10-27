# kachdan.com: working rules

This is Dan Kachula's public portfolio. Copy and claims are approved by Dan word for word.

- Never invent, rewrite or "improve" copy, numbers or claims. Change only the lines asked for.
- No em dashes, and no dashes used as sentence connectors. Use commas and periods.
- Numerals for numbers, American spelling, Title Case job titles.
- No client names, logos, people's names or client data in anything public. Field report case study uses roles and the invented company "Ridgeline Interiors".
- No Moody's confidential screens or data.
- Keep edits surgical. Build and check desktop, phone, dark and light mode before pushing.
- Every push to `main` deploys to kachdan.com within a minute or two.

## Project map

- `src/App.tsx` is the home page: Hero, work cards, case studies 01 to 04, recommendations. Sections are components in that file.
- `src/components/primitives.tsx` holds the shared building blocks (Eyebrow, MetaStrip, MetricBand, ProseSection, PullQuote, DiagramFrame). Reuse them for new sections.
- `src/index.css` holds the color tokens for light and dark mode. The site always loads in dark mode, and the toggle is not remembered.
- `field-report/index.html` and `src/field-report.tsx` are the every-screen page for case study 04, at kachdan.com/field-report/. Screen data lives in `src/components/fieldReportScreens.ts`.
- Images live in `src/assets/`. Case study 04 screens are WebP exports at 2x from the cleaned Figma file.

## How changes get made

- Copy is drafted and approved by Dan in a doc before it goes on the site. Never write new copy straight into the code.
- Run `npm install` then `npm run dev` for a local preview. Check desktop, phone width, dark and light mode.
- Pull before editing. Another session may have pushed changes.
- Pushing to `main` runs the GitHub Actions workflow and publishes to kachdan.com in about a minute. Check the Actions tab if a change does not appear.
- The domain is managed in Spaceship. kachdan.com points at GitHub Pages, and HTTPS is enforced. Don't change DNS without asking Dan.
