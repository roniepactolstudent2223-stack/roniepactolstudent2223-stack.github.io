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
  { id: 'all', label: 'All Systems' },
  { id: 'work', label: 'Wilcon Depot' },
  { id: 'personal', label: 'Word of Hope' },
]

/** Short technical module specs per project — no long paragraphs */
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

/**
 * Visual-first Projects section:
 * - Left (wider): Large interactive screenshot stage + thumbnails
 * - Right: Title, Tech Stack pills, and 4 concise technical module chips (zero long paragraphs)
 */
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

  const countFor = (id: 'all' | ProjectGroup) =>
    id === 'all' ? allEntries.length : allEntries.filter(({ meta }) => meta.group === id).length

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-rule/60 px-6 py-12 sm:py-14">
      <div className="max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
              Production Systems
            </p>
            <h2
              id="projects-title"
              className="mt-1 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl"
            >
              Projects
            </h2>
          </div>

          {/* Filter Chips */}
          <div
            role="group"
            aria-label="Filter projects by category"
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
                  {filter.label} ({countFor(filter.id)})
                </button>
              )
            })}
          </div>
        </div>

        <ol className="mt-6 divide-y divide-rule/50">
          {filteredEntries.map(({ project, meta }, index) => {
            const spec = TECH_SPECS_BY_SLUG[project.slug]

            return (
              <li key={project.slug} className="py-7">
                <div className="grid gap-6 md:grid-cols-[22rem_1fr] md:items-start md:gap-7">
                  {/* Left: Large Visual Screenshot Window */}
                  <div className="w-full">
                    <ProjectVisualPreview
                      project={project}
                      meta={meta}
                      isOpenExternal={openModalSlug === project.slug}
                      onCloseExternal={() => setOpenModalSlug(null)}
                    />
                  </div>

                  {/* Right: Concise Tech Specs Only (Zero Long Paragraphs) */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="ledger-figures text-xs text-ink-soft">
                        0{index + 1}
                      </span>
                      <span className="ledger-figures text-xs text-ink-soft">·</span>
                      <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                        {meta.groupLabel}
                      </span>
                      <span className="ledger-figures bg-ledger/12 px-2 py-0.5 text-[10px] font-medium text-ledger">
                        {meta.status}
                      </span>
                    </div>

                    <h3 className="mt-1.5 font-serif text-2xl font-medium leading-snug text-ink">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-ledger transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    {spec && (
                      <p className="ledger-figures mt-1 text-xs text-ink-soft">
                        {spec.architecture}
                      </p>
                    )}

                    {/* Tech Stack Pills */}
                    <ul
                      aria-label="Tech stack"
                      className="mt-3 flex flex-wrap items-center gap-1.5"
                    >
                      {(spec?.stack || meta.threeTags).map((tag) => (
                        <li
                          key={tag}
                          className="ledger-figures bg-paper-deep/85 px-2.5 py-0.5 text-xs font-medium text-ink"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    {/* 4 Short Technical Modules Built (2-Column Grid) */}
                    {spec && (
                      <ul className="mt-3.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {spec.modules.map((mod) => (
                          <li
                            key={mod}
                            className="flex items-center gap-1.5 bg-paper-deep/40 px-2.5 py-1.5 text-xs text-ink"
                          >
                            <span className="text-ledger font-medium" aria-hidden="true">
                              ✓
                            </span>
                            <span className="truncate">{mod}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Direct Visual Actions */}
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setOpenModalSlug(project.slug)}
                        className="ledger-figures inline-flex cursor-pointer items-center gap-1.5 bg-ink px-3.5 py-1.5 text-xs font-medium text-paper transition-colors hover:bg-ledger"
                      >
                        Inspect Screens ⤢
                      </button>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="ledger-figures inline-flex items-center gap-1 text-xs font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                      >
                        Technical Spec →
                      </Link>

                      {project.url && meta.kind === 'software' && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ledger-figures inline-flex items-center gap-1 text-xs text-ledger font-medium underline decoration-ledger/40 underline-offset-4 hover:decoration-ledger"
                        >
                          Live App ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
