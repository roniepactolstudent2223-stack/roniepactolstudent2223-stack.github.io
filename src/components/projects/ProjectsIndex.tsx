'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX, type ProjectGroup } from '@/lib/portfolio-config'
import ProjectMockScreen from '@/components/projects/ProjectMockScreen'

interface ProjectsIndexProps {
  projects: Project[]
}

const FILTERS: { id: 'all' | ProjectGroup; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Work' },
  { id: 'personal', label: 'Personal' },
  { id: 'community', label: 'Community' },
]

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectGroup>('all')

  const bySlug = new Map(projects.map((p) => [p.slug, p]))
  const allEntries = PROJECT_INDEX.map((meta) => ({
    project: bySlug.get(meta.slug),
    meta,
  })).filter((entry): entry is { project: Project; meta: (typeof PROJECT_INDEX)[number] } =>
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
      <div className="max-w-3xl">
        <header className=" pb-6">
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
            Index of Work &amp; Systems
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Web systems built for Wilcon Depot&apos;s Finance and Treasury teams and Word of Hope Caloocan. Each row shows the workflow on the left and the plain-English result on the right. Tap <strong className="font-medium text-ink">What it does</strong> for the full breakdown.
          </p>

          {/* Filter Chips */}
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
                  className={`ledger-figures min-h-[36px] cursor-pointer border px-3 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger ${
                    active
                      ? 'border-ink bg-ink text-paper font-medium'
                      : 'border-rule bg-paper text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  {filter.label} ({countFor(filter.id)})
                </button>
              )
            })}
          </div>
        </header>

        <ol className="mt-2">
          {filteredEntries.map(({ project, meta }, index) => (
            <li
              key={project.slug}
              className="border-t border-rule py-7"
            >
              <div className="grid gap-5 sm:grid-cols-[13.5rem_1fr] sm:items-start sm:gap-6">
                {/* Left: Drawn mock screen */}
                <div className="w-full">
                  <ProjectMockScreen slug={project.slug} variant="thumb" />
                </div>

                {/* Right: Title, Highlighted Result, 3 Tag Words, Tap-to-Expand */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="ledger-figures text-xs text-ink-soft">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="ledger-figures text-xs text-ink-soft">·</span>
                    <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                      {meta.groupLabel}
                    </span>
                    <span className="ledger-figures text-xs text-ink-soft">·</span>
                    <span className="ledger-figures text-xs text-ledger">
                      {meta.status}
                    </span>
                  </div>

                  <h2 className="mt-1.5 text-xl font-medium leading-snug text-ink">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger"
                    >
                      {project.title}
                    </Link>
                  </h2>

                  {/* Highlighted 1-line plain-English Result */}
                  <div className="mt-3 border-l-2 border-ledger bg-paper-deep/60 py-2 pl-3 pr-2.5">
                    <p className="text-[15px] leading-relaxed text-ink">
                      <span className="ledger-figures mr-2 text-[11px] uppercase tracking-[0.08em] text-ledger font-medium">
                        Result:
                      </span>
                      <strong className="font-medium text-ink">{meta.result}</strong>
                    </p>
                  </div>

                  {/* 3 Tag Words */}
                  <ul
                    aria-label="Key tools"
                    className="mt-3 flex flex-wrap items-center gap-2"
                  >
                    {meta.threeTags.map((tag) => (
                      <li
                        key={tag}
                        className="ledger-figures border border-rule bg-paper-deep/40 px-2.5 py-0.5 text-xs text-ink"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {/* Tap-to-Expand "What it does" + Case Study Link */}
                  <div className="mt-3.5">
                    <details className="group">
                      <summary className="inline-flex min-h-[36px] cursor-pointer list-none items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger [&::-webkit-details-marker]:hidden">
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

                      <dl className="mt-3 space-y-2.5 border-t border-rule pt-3 text-sm">
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

                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger"
                      >
                        View case study
                        <span aria-hidden="true">→</span>
                      </Link>
                      {project.url && meta.kind === 'software' && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger"
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

        <div className="rule-double ledger-figures flex justify-between pt-3 text-xs uppercase tracking-[0.08em] text-ink">
          <span>Showing entries</span>
          <span>
            {filteredEntries.length} of {allEntries.length}
          </span>
        </div>
      </div>
    </div>
  )
}
