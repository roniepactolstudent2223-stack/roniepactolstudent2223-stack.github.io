## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

# Development Principles

- **Think before coding.** Understand the existing architecture, patterns, and project structure.
- **Keep it simple.** Avoid overengineering, unnecessary abstractions, dependencies, and extra files.
- **Respect architecture.** Place code in the appropriate folder, following existing conventions and separation of concerns.
- **Write maintainable code.** Prefer readable, reusable, modular, and consistent solutions without premature abstraction.
- **Make minimal changes.** Modify only what's necessary. Reuse existing components and utilities before creating new ones.
- **Design with intention.** Avoid generic AI-generated UI patterns, excessive rounded corners, unnecessary bold text, decorative borders, and repetitive layouts.
- **Prioritize UX.** Use thoughtful spacing, typography, hierarchy, alignment, and visual consistency. Every design choice should serve a purpose.
- **Avoid unnecessary complexity.** Don't add features, fallbacks, validations, or configurations without a clear reason.
- **Stay consistent.** Follow the project's existing design system, coding style, and architectural decisions.
- **Responsive.** if new design task , think the responsive design before implement.
- **Deliver clean results.** Remove unused code, avoid duplication, and verify changes before finishing.

**Core principle:** Build only what's needed, put it where it belongs, and make every implementation and design decision intentional.
portfolio/
├── public/
│   ├── images/
│   ├── icons/
│   ├── favicon.ico
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Badge.astro
│   │   │   └── SectionHeading.astro
│   │   ├── Navbar.astro
│   │   ├── ProjectCard.astro
│   │   └── Footer.astro
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── projects/
│   │   │   └── index.astro
│   │   └── notes/
│   │       └── index.astro
│   │
│   ├── content/
│   │   ├── projects/
│   │   └── notes/
│   │
│   └── styles/
│       ├── global.css
│       └── tokens.css
│
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── AGENTS.md