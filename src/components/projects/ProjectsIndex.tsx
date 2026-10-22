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

        <ol className="mt-8 space-y-10">
          {filteredEntries.map(({ project, meta }, index) => {
            const spec = TECH_SPECS_BY_SLUG[project.slug]
            const isFeatured = index === 0 && activeFilter === 'all'

            return (
              <li
                key={project.slug}
                className="bg-paper-deep/30 p-4 sm:p-6"
              >
                {/* Header Row */}
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

                    <h2 className="mt-1 font-serif text-2xl font-medium leading-snug text-ink sm:text-[1.7rem]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-ledger transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h2>
                  </div>

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

                {/* Bottom Technical Bar */}
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
    </div>
  )
}
