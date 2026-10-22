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
  { id: 'all', label: 'All' },
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

  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="max-w-4xl">
        <header className="border-b border-rule/60 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              Projects
            </h1>

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
        </header>

        <ol className="divide-y divide-rule/50">
          {filteredEntries.map(({ project, meta }) => {
            const spec = TECH_SPECS_BY_SLUG[project.slug]

            return (
              <li key={project.slug} className="py-8">
                <div className="grid gap-6 md:grid-cols-[22rem_1fr] md:items-start md:gap-7">
                  {/* Left: Large Visual Screenshot Stage */}
                  <div className="w-full">
                    <ProjectVisualPreview
                      project={project}
                      meta={meta}
                      isOpenExternal={openModalSlug === project.slug}
                      onCloseExternal={() => setOpenModalSlug(null)}
                    />
                  </div>

                  {/* Right: Title, Stack & Modules Built */}
                  <div className="min-w-0">
                    <p className="ledger-figures text-xs text-ink-soft">
                      {meta.groupLabel}
                    </p>

                    <h2 className="mt-1 font-serif text-2xl font-medium leading-snug text-ink">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-ledger transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h2>

                    {spec && (
                      <p className="ledger-figures mt-0.5 text-xs text-ink-soft">
                        {spec.architecture}
                      </p>
                    )}

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

                    {spec && (
                      <ul className="mt-3.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {spec.modules.map((mod) => (
                          <li
                            key={mod}
                            className="truncate bg-paper-deep/40 px-2.5 py-1.5 text-xs text-ink"
                          >
                            {mod}
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
                        View Screens
                      </button>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="ledger-figures inline-flex items-center gap-1 text-xs font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                      >
                        Details →
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
