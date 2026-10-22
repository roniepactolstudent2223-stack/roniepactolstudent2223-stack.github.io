'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX, type ProjectGroup } from '@/lib/portfolio-config'
import ProjectVisualPreview from '@/components/projects/ProjectVisualPreview'

interface ProjectsIndexProps {
  projects: Project[]
}

const FILTERS: { id: 'all' | ProjectGroup; label: string }[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'work', label: 'Work · Wilcon Depot' },
  { id: 'personal', label: 'Personal · Word of Hope' },
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
        <header className="pb-6">
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
            Index of Work &amp; Systems
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Web systems built for Wilcon Depot&apos;s Finance and Treasury teams and Word of Hope Caloocan. Click any screenshot to open the <strong className="font-medium text-ink">Picture &amp; Complete Details modal</strong>, switch screens using the thumbnails below each photo, or tap <strong className="font-medium text-ink">What it does</strong> for a quick summary.
          </p>

          {/* Soft Borderless Filter Chips */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-6 flex flex-wrap gap-1.5"
          >
            {FILTERS.map((filter) => {
              const active = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={active}
                  className={`ledger-figures min-h-[34px] cursor-pointer px-3 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger ${
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
        </header>

        <ol className="mt-2 divide-y divide-rule/50">
          {filteredEntries.map(({ project, meta }, index) => (
            <li
              key={project.slug}
              className="py-8"
            >
              <div className="grid gap-6 sm:grid-cols-[18.5rem_1fr] sm:items-start sm:gap-8">
                {/* Left: Visual Screenshot Window */}
                <div className="w-full">
                  <ProjectVisualPreview
                    project={project}
                    meta={meta}
                    isOpenExternal={openModalSlug === project.slug}
                    onCloseExternal={() => setOpenModalSlug(null)}
                  />
                </div>

                {/* Right: Clean Typography & Soft Surfaces */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span className="ledger-figures text-xs text-ink-soft">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="ledger-figures text-xs text-ink-soft">·</span>
                    <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                      {meta.groupLabel}
                    </span>
                    <span className="ledger-figures text-xs text-ink-soft">·</span>
                    <span className="ledger-figures text-xs font-medium text-ledger">
                      {meta.status}
                    </span>
                  </div>

                  <h2 className="mt-1.5 font-serif text-2xl font-medium leading-snug text-ink">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {project.title}
                    </Link>
                  </h2>

                  {/* Highlighted 1-line plain-English Result */}
                  <div className="mt-3 border-l-2 border-ledger bg-paper-deep/55 py-2.5 pl-3.5 pr-3">
                    <p className="text-[15px] leading-relaxed text-ink">
                      <span className="ledger-figures mr-2 text-[11px] uppercase tracking-[0.08em] text-ledger font-medium">
                        Result:
                      </span>
                      <strong className="font-medium text-ink">{meta.result}</strong>
                    </p>
                  </div>

                  {/* 3 Soft Borderless Tag Words */}
                  <ul
                    aria-label="Key tools"
                    className="mt-3 flex flex-wrap items-center gap-1.5"
                  >
                    {meta.threeTags.map((tag) => (
                      <li
                        key={tag}
                        className="ledger-figures bg-paper-deep/75 px-2.5 py-0.5 text-xs text-ink"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Tap-to-Expand "What it does" + Links */}
                  <div className="mt-3.5">
                    <details className="group">
                      <summary className="inline-flex min-h-[34px] cursor-pointer list-none items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                        <span className="underline decoration-rule underline-offset-4 group-hover:decoration-ink">
                          What it does
                        </span>
                        <span
                          aria-hidden="true"
                          className="ledger-figures inline-block text-xs transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>

                      <dl className="mt-2.5 space-y-2.5 bg-paper-deep/40 p-4 text-sm">
                        <div className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                          <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-0.5">
                            Problem
                          </dt>
                          <dd className="leading-relaxed text-ink">{meta.problem}</dd>
                        </div>
                        <div className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                          <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-0.5">
                            What I built
                          </dt>
                          <dd className="leading-relaxed text-ink">{meta.whatIBuilt}</dd>
                        </div>
                        <div className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                          <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ledger font-medium sm:pt-0.5">
                            Result
                          </dt>
                          <dd className="font-medium leading-relaxed text-ink">{meta.resultDetail}</dd>
                        </div>
                        <div className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                          <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-0.5">
                            Tools
                          </dt>
                          <dd className="ledger-figures text-xs text-ink sm:pt-0.5">{meta.tools}</dd>
                        </div>
                      </dl>
                    </details>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <button
                        type="button"
                        onClick={() => setOpenModalSlug(project.slug)}
                        className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
                      >
                        Picture &amp; full details
                        <span aria-hidden="true">⤢</span>
                      </button>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                      >
                        Case study page
                        <span aria-hidden="true">→</span>
                      </Link>

                      {project.url && meta.kind === 'software' && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink"
                        >
                          Open live site ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
