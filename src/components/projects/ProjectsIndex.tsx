'use client'

import { useState } from 'react'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX, type ProjectGroup } from '@/lib/portfolio-config'
import ProjectVisualPreview from '@/components/projects/ProjectVisualPreview'

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

        <ol className="mt-8 space-y-8">
          {filteredEntries.map(({ project, meta }) => (
            <li key={project.slug}>
              <ProjectVisualPreview project={project} meta={meta} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
