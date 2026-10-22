'use client'

import { useState } from 'react'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX, type ProjectGroup } from '@/lib/portfolio-config'
import ProjectVisualPreview from '@/components/projects/ProjectVisualPreview'

interface EntryLedgerProps {
  projects: Project[]
}

export const TECH_SPECS_BY_SLUG: Record<
  string,
  {
    overline: string
    roleLabel: string
    summaryLine: string
    stack: string[]
    modules: string[]
    architecture: string
    department: string
  }
> = {
  'wilcon-month-end-closing': {
    overline: 'WILCON DEPOT · FINANCE & ACCOUNTING',
    roleLabel: 'Full Stack Developer',
    summaryLine:
      'Built the 2-step BU & Finance approval pipeline, Debit = Credit validation, and live General Ledger balance sync.',
    stack: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'REST API'],
    architecture: 'Role-Based Multi-Approver GL Pipeline',
    department: 'Finance & Accounting Dept',
    modules: [
      'Debit = Credit Entry Validator',
      '2-Step BU & Finance Approval',
      'Auto-Reversing Journal Entries',
      'Live Side-by-Side GL Balance Sync',
    ],
  },
  'wilcon-collection-deposit-report': {
    overline: 'WILCON DEPOT · TREASURY DEPARTMENT',
    roleLabel: 'Full Stack Developer',
    summaryLine:
      'Upgraded nationwide daily Treasury reporting with interactive check breakdowns and Cash vs. Check reconciliation.',
    stack: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'PDF / Excel'],
    architecture: 'Multi-Branch Treasury Reporting Engine',
    department: 'Treasury Department',
    modules: [
      'Interactive Check Breakdown Modal',
      'Separated Cash vs. Check Filters',
      'Auto Accounting Date Alignment',
      'Nationwide Branch Column & Export',
    ],
  },
  'woh-attendance-system': {
    overline: 'WORD OF HOPE CALOOCAN · SOLO PRODUCTION APP',
    roleLabel: 'Sole Developer',
    summaryLine:
      'Sole developer, from real-time camera & handheld QR check-in kiosk to 1–4 week absentee follow-up dashboard.',
    stack: ['Laravel 12', 'PHP', 'MySQL', 'Tailwind CSS', 'QR API'],
    architecture: 'Real-Time QR Kiosk & Member Care CRM',
    department: 'Solo Full-Stack Production App',
    modules: [
      'Camera & Handheld QR Check-In Kiosk',
      'Live Service Attendance Dashboard',
      '1–4 Week Absentee Follow-Up Queue',
      'Printable Member QR ID Generator',
    ],
  },
  'wilcon-enterprise-systems': {
    overline: 'WILCON DEPOT · INTERNAL ENTERPRISE SYSTEMS',
    roleLabel: 'Full Stack Developer',
    summaryLine:
      'Developed internal financial web modules, ERP master-data synchronization, and multi-step voucher approval workflows.',
    stack: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'REST APIs', 'Git'],
    architecture: 'Internal ERP & Financial Web Modules',
    department: 'Internal Enterprise Systems',
    modules: [
      'ERP Account & Vendor Data Sync',
      'Multi-Step Voucher Approval Routing',
      'Role-Based Department Permissions',
      'SQL Query & Report Optimization',
    ],
  },
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

export default function EntryLedger({ projects }: EntryLedgerProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectGroup>('all')

  const bySlug = new Map(projects.map((project) => [project.slug, project]))
  const allEntries = HOME_ORDER.map((slug) => ({
    project: bySlug.get(slug),
    meta: PROJECT_INDEX.find((entry) => entry.slug === slug),
  })).filter(
    (entry): entry is { project: Project; meta: (typeof PROJECT_INDEX)[number] } =>
      Boolean(entry.project && entry.meta)
  )

  const filteredEntries =
    activeFilter === 'all'
      ? allEntries
      : allEntries.filter(({ meta }) => meta.group === activeFilter)

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-t border-rule/60 px-6 py-10 sm:py-12"
    >
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

        <ol className="mt-7 space-y-8">
          {filteredEntries.map(({ project, meta }) => (
            <li key={project.slug}>
              <ProjectVisualPreview project={project} meta={meta} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
