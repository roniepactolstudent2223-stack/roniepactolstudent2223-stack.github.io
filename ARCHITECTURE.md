# Architecture

See `read.md` for full AI context, patterns, and constraints.

```
src/app/          → Routes and layouts (Next.js App Router)
src/components/   → React components (layout/ and ui/)
src/lib/          → Types and data helpers
src/content/     → Static JSON data files
public/images/    → Static assets
```

Key rules:
- All data flows: `content/ → lib/getProjects.ts → pages → components`
- Single `Project` type in `lib/types.ts`
- No client components unless required
- No API routes, no database, no CMS
