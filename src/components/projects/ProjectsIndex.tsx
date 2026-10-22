'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX, type ProjectGroup } from '@/lib/portfolio-config'
import ProjectVisualPreview from '@/components/projects/ProjectVisualPreview'
import { TECH_SPECS_BY_SLUG } from '@/components/home/EntryLedger'

interface ProjectsIndexProps {
  projects: Project[]
}

const FILTERS: { id: 'all' | ProjectGroup; label: string }[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'work', label: 'Wilcon Depot' },
  { id: 'personal', label: 'Word of Hope' },
]

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectGroup>('all')
  const [openModalSlug, setOpenModalSlug] = useState<string | null>(null)

  const bySlug = new Map(projects.map((p) => [p.slug, p]))
  const allEntries = PROJECT_INDEX.filter((meta) => meta.kind === 'software')
    .map((meta) => ({
      project: bySlug.get(meta.slug),
      meta,
    }))
    .filter((entry): entry is { project: Project; meta: (typeof PROJECT_INDEX)[number] } =>
      Boolean(entry.project)
    )

  const filteredEntries =
    activeFilter === 'all'
      ? allEntries
      : allEntries.filter(({ meta }) => meta.group === activeFilter)

  const countFor = (id: 'all' | ProjectGroup) =>
    id === 'all' ? allEntries.length : allEntries.filter(({ meta }) => meta.group === id).length

  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="max-w-4xl">
        <header className="border-b border-rule/60 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
                Visual System Index
              </p>
              <h1 className="mt-1 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
                Projects
              </h1>
            </div>

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
        </header>

        <ol className="divide-y divide-rule/50">
          {filteredEntries.map(({ project, meta }, index) => {
            const spec = TECH_SPECS_BY_SLUG[project.slug]

            return (
              <li key={project.slug} className="py-8">
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

                  {/* Right: Concise Tech Specs Only */}
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

                    <h2 className="mt-1.5 font-serif text-2xl font-medium leading-snug text-ink">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-ledger transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h2>

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

                    {/* 4 Short Technical Modules Built */}
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
    </div>
  )
}
