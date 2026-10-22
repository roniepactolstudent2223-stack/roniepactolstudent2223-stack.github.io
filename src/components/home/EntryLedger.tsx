import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX } from '@/lib/portfolio-config'

interface EntryLedgerProps {
  projects: Project[]
}

/** Wilcon work first, because it is the most recent and the most recognisable employer. */
const HOME_ORDER = [
  'wilcon-month-end-closing',
  'wilcon-collection-deposit-report',
  'woh-attendance-system',
  'wilcon-enterprise-systems',
  'wordpress-ph-community',
]

/**
 * Projects as ledger entries: numbered rows separated by hairlines, a totals
 * row closed with a double rule. No cards, no boxes. Only the "View case
 * study" link is clickable, so text stays selectable.
 */
export default function EntryLedger({ projects }: EntryLedgerProps) {
  const bySlug = new Map(projects.map((project) => [project.slug, project]))
  const entries = HOME_ORDER.map((slug) => ({
    project: bySlug.get(slug),
    meta: PROJECT_INDEX.find((entry) => entry.slug === slug),
  })).filter((entry) => entry.project && entry.meta)

  return (
    <section aria-labelledby="projects-title" className="border-t border-rule px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">Entries</p>
        <h2 id="projects-title" className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl">
          Projects
        </h2>

        <ol className="mt-8">
          {entries.map(({ project, meta }, index) => (
            <li
              key={project!.slug}
              className="grid gap-x-6 gap-y-1 border-t border-rule py-6 sm:grid-cols-[3rem_1fr]"
            >
              <span className="ledger-figures text-xs text-ink-soft sm:pt-1.5">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <h3 className="text-xl font-medium leading-snug text-ink">{project!.title}</h3>
                <p className="ledger-figures mt-1 text-xs text-ink-soft">{meta!.status}</p>
                <p className="mt-3 text-base leading-relaxed text-ink">{meta!.problem}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{meta!.myPart}</p>
                <p className="ledger-figures mt-3 text-[13px] text-ink">{meta!.stack}</p>
                <p className="mt-3">
                  <Link
                    href={`/projects/${project!.slug}`}
                    className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger"
                  >
                    View case study
                    <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rule-double ledger-figures flex justify-between pt-3 text-xs uppercase tracking-[0.08em] text-ink">
          <span>Total entries</span>
          <span>{entries.length}</span>
        </div>
      </div>
    </section>
  )
}
