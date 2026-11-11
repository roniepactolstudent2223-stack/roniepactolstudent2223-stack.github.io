# Ronie Pactol's portfolio

A static Astro portfolio with Tailwind CSS, native dialogs, and small TypeScript interactions. The production domain in `astro.config.mjs` matches `CNAME`: `https://roniepactol.me`.

## Development

Install with `npm install`. On Windows, use `npm.cmd` if PowerShell blocks npm's script wrapper.

| Command | Purpose |
| --- | --- |
| `npm run astro -- dev --background` | Start the background development server |
| `npm run astro -- dev status` | Check the server |
| `npm run astro -- dev logs` | Inspect server logs |
| `npm run astro -- dev stop` | Stop the server |
| `npm run build` | Generate the static site in `dist/` |
| `npm run preview` | Preview the production build |

## Structure

- `src/pages/`: home, projects, experience, community, certificates, and notes routes.
- `src/content/projects/`: shared factual project records, contribution scope, and screenshot metadata.
- `src/components/`: page sections, contact form, navigation, and image viewer.
- `src/styles/tokens.css`: shared palette, control sizes, and motion timing.
- `src/styles/global.css`: shared layout, typography, navigation, and controls. Page compositions live in scoped component styles.
- `src/styles/motion.css`: page, dialog, and disclosure transitions with reduced-motion support.

The home page reuses project records in `SelectedWork.astro`. Dashboard previews use Astro image optimization; the image viewer retains links to the original files. No framework hydration is needed for the static content.

## Interaction behavior

Page-loading feedback follows Astro's actual navigation loader and clears on completion, error, or cancellation. Contact and experience dialogs open immediately. The screenshot viewer reports real image loading or failure and preserves an original-file link. Native links and disclosures remain usable when enhancement is unavailable.

## Message form delivery

The Message dialog posts to FormSubmit for `roniepactol@gmail.com` using a native multipart form. FormSubmit opens in a separate tab for verification and confirmation while the portfolio remains open. Messages and attachments pass through FormSubmit; no email credentials are stored in the repository.

Before launch, submit the form yourself and confirm the activation email in that inbox (check spam). Then send another message with a small attachment to verify delivery. Opening the verification tab does not confirm inbox delivery. Live delivery has not been verified by automated checks.

Visitors can add or remove file fields, with a combined limit of 10 MB. See [FormSubmit documentation](https://formsubmit.co/documentation).

## Certificate access

Certificate previews and originals are served by Google Drive. Public visitors require the files to be shared for viewing; the site does not change Drive permissions. Failed thumbnails show a fallback that preserves the original link. Do not describe a certificate as independently verified unless its issuer or verification record has actually been checked.

## Design and review

The portfolio keeps compact desktop proportions while giving different kinds of text explicit roles. Newsreader is used for page and section titles, IBM Plex Sans for reading text and controls, and IBM Plex Mono for field labels, dates, indices, and categories. Font assets are hosted locally with their original licenses in `public/fonts/`; all four files total about 185 KB. Only reading and regular display faces are preloaded, and `font-display: swap` keeps content visible during loading.

Home combines project evidence, availability, and development focus. Projects separates project context, scope, and implementation. Experience has a chapter rail and mobile detail sheet. Community uses photo plates and captions; Certificates uses document headers and labelled facts. The footer presents a clear email action. On phones the page shell is fluid and content stacks in reading order.

The content-first ordering was informed by [Josh W. Comeau's developer site](https://www.joshwcomeau.com/), whose main page directly exposes the work it offers. Typography references are [IBM's Plex specimen](https://www.ibm.com/plex/) and the [Newsreader project](https://github.com/productiontype/Newsreader): a related sans/mono pair distinguishes technical annotations from reading text, while a dedicated text/display serif establishes major headings. These inform hierarchy rather than a copied page design. Implementation references: [Astro components](https://docs.astro.build/en/basics/astro-components/), [scoped styling](https://docs.astro.build/en/guides/styling/), and [navigation lifecycle](https://docs.astro.build/en/guides/view-transitions/).

Build and source-level checks do not establish visual quality. Before deployment, inspect 320px and 390px phones, 768px tablet, and 1280px desktop, plus the 760px and 900px breakpoint edges. Exercise navigation/back, contact close/Escape/focus return, image fit/actual/error, experience sheet, certificate fallbacks, and reduced motion. Browser capture was unavailable during this revision; rendered responsive and keyboard checks remain outstanding.
