'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX, type ProjectGroup } from '@/lib/portfolio-config'
import ProjectVisualPreview from '@/components/projects/ProjectVisualPreview'

interface EntryLedgerProps {
  projects: Project[]
}

const HOME_ORDER = [
  'wilcon-month-end-closing',
  'wilcon-collection-deposit-report',
  'woh-attendance-system',
  'wilcon-enterprise-systems',
]

const FILTERS: { id: 'all' | ProjectGroup; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Wilcon Depot' },
  { id: 'personal', label: 'Word of Hope' },
]

export const TECH_SPECS_BY_SLUG: Record<
  string,
  {
    stack: string[]
    modules: string[]
    architecture: string
  }
> = {
  'wilcon-month-end-closing': {
    stack: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'REST API'],
    architecture: 'Role-Based Multi-Approver GL Pipeline',
    modules: [
      'Debit = Credit Entry Validator',
      '2-Step BU & Finance Approval',
      'Auto-Reversing Journal Entries',
      'Live Side-by-Side GL Balance Sync',
    ],
  },
  'wilcon-collection-deposit-report': {
    stack: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'PDF / Excel'],
    architecture: 'Multi-Branch Treasury Reporting Engine',
    modules: [
      'Interactive Check Breakdown Modal',
      'Separated Cash vs. Check Filters',
      'Auto Accounting Date Alignment',
      'Nationwide Branch Column & Export',
    ],
  },
  'woh-attendance-system': {
    stack: ['Laravel 12', 'PHP', 'MySQL', 'Tailwind CSS', 'QR API'],
    architecture: 'Real-Time QR Kiosk & Member Care CRM',
    modules: [
      'Camera & Handheld QR Check-In Kiosk',
      'Live Service Attendance Dashboard',
      '1–4 Week Absentee Follow-Up Queue',
      'Printable Member QR ID Generator',
    ],
  },
  'wilcon-enterprise-systems': {
    stack: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'REST APIs', 'Git'],
    architecture: 'Internal ERP & Financial Web Modules',
    modules: [
      'ERP Account & Vendor Data Sync',
      'Multi-Step Voucher Approval Routing',
      'Role-Based Department Permissions',
      'SQL Query & Report Optimization',
    ],
  },
}

export default function EntryLedger({ projects }: EntryLedgerProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectGroup>('all')
  const [openModalSlug, setOpenModalSlug] = useState<string | null>(null)

  const bySlug = new Map(projects.map((project) => [project.slug, project]))
  const allEntries = HOME_ORDER.map((slug) => ({
    project: bySlug.get(slug),
    meta: PROJECT_INDEX.find((entry) => entry.slug === slug),
  })).filter((entry): entry is { project: Project; meta: (typeof PROJECT_INDEX)[number] } =>
    Boolean(entry.project && entry.meta)
  )

  const filteredEntries =
    activeFilter === 'all'
      ? allEntries
      : allEntries.filter(({ meta }) => meta.group === activeFilter)

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-rule/60 px-6 py-10 sm:py-12">
      <div className="max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="projects-title"
            className="font-serif text-[1.85rem] font-medium leading-tight text-ink sm:text-3xl"
          >
            Projects
          </h2>

          <div
            role="group"
            aria-label="Filter projects"
            className="flex flex-wrap gap-1.5"
          >
            {FILTERS.map((filter) => {
              const active = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={active}
                  className={`ledger-figures min-h-[32px] cursor-pointer px-3 py-1 text-xs transition-colors ${
                    active
                      ? 'bg-ink text-paper font-medium'
                      : 'bg-paper-deep/65 text-ink-soft hover:bg-paper-deep hover:text-ink'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        <ol className="mt-7 space-y-10">
          {filteredEntries.map(({ project, meta }, index) => {
            const spec = TECH_SPECS_BY_SLUG[project.slug]
            const isFeatured = index === 0 && activeFilter === 'all'

            return (
              <li
                key={project.slug}
                className="bg-paper-deep/30 p-4 sm:p-6"
              >
                {/* Top Header Bar: Title + Stack + Quick Actions */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="ledger-figures text-xs font-medium text-ledger">
                        {meta.groupLabel}
                      </span>
                      {spec && (
                        <>
                          <span className="text-xs text-ink-soft">·</span>
                          <span className="ledger-figures text-xs text-ink-soft">
                            {spec.architecture}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="mt-1 font-serif text-2xl font-medium leading-snug text-ink sm:text-[1.7rem]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-ledger transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOpenModalSlug(project.slug)}
                      className="ledger-figures cursor-pointer bg-ink px-3.5 py-1.5 text-xs font-medium text-paper transition-colors hover:bg-ledger"
                    >
                      Inspect Screens
                    </button>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="ledger-figures bg-paper px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                    >
                      System Spec →
                    </Link>
                    {project.url && meta.kind === 'software' && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ledger-figures bg-ledger/12 px-3 py-1.5 text-xs font-medium text-ledger transition-colors hover:bg-ledger hover:text-paper"
                      >
                        Live App ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Large Visual Stage */}
                <ProjectVisualPreview
                  project={project}
                  meta={meta}
                  featured={isFeatured}
                  isOpenExternal={openModalSlug === project.slug}
                  onCloseExternal={() => setOpenModalSlug(null)}
                />

                {/* Bottom Technical Bar: Stack Pills + 4 Module Tiles */}
                <div className="mt-4 pt-3.5 border-t border-rule/50 space-y-3">
                  <ul
                    aria-label="Tech stack"
                    className="flex flex-wrap items-center gap-1.5"
                  >
                    {(spec?.stack || meta.threeTags).map((tag) => (
                      <li
                        key={tag}
                        className="ledger-figures bg-paper px-2.5 py-1 text-xs font-medium text-ink shadow-2xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {spec && (
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      {spec.modules.map((mod) => (
                        <li
                          key={mod}
                          className="bg-paper/85 px-3 py-2 text-xs font-medium text-ink"
                        >
                          {mod}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
