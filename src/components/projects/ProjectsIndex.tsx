'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX, type ProjectIndexEntry } from '@/lib/portfolio-config'

interface ProjectsIndexProps {
  projects: Project[]
}

const FIELDS: { key: keyof Pick<ProjectIndexEntry, 'usedBy' | 'problem' | 'myPart' | 'stack'>; label: string }[] = [
  { key: 'usedBy', label: 'Used by' },
  { key: 'problem', label: 'Problem' },
  { key: 'myPart', label: 'What I did' },
  { key: 'stack', label: 'Stack' },
]

function Entry({ entry, project, number }: { entry: ProjectIndexEntry; project: Project; number: string }) {
  return (
    <article
      data-project-entry
      className="group relative border-t border-neutral-900 py-8 first:border-t-2 transition-colors duration-300 hover:bg-neutral-50/70 -mx-4 px-4 rounded-xl"
    >
      <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-baseline gap-4">
          <span
            data-entry-num
            className="font-mono text-sm font-semibold text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neutral-900"
            aria-hidden="true"
          >
            {number}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 transition-transform duration-300 group-hover:translate-x-1">
            <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">
              {project.title}
            </Link>
          </h2>
        </div>
        <p className="pl-9 font-mono text-xs font-medium text-neutral-600 sm:pl-0 shrink-0">
          {entry.status}
        </p>
      </header>

      <dl className="mt-6 space-y-3.5 pl-9">
        {FIELDS.map((f) => (
          <div key={f.key} data-field-row className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-8">
            <dt className="text-sm font-medium text-neutral-500 sm:pt-0.5">{f.label}</dt>
            <dd className={`leading-relaxed text-neutral-900 ${f.key === 'stack' ? 'font-mono text-sm font-medium sm:pt-0.5' : 'text-base'}`}>
              {entry[f.key]}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 pl-9">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
        >
          Screenshots and details
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </Link>
      </div>
    </article>
  )
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bySlug = new Map(projects.map((p) => [p.slug, p]))
  const rows = PROJECT_INDEX.filter((e) => bySlug.has(e.slug))
  const software = rows.filter((e) => e.kind === 'software')
  const community = rows.filter((e) => e.kind === 'community')

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        el.querySelectorAll('[data-header-reveal]'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.08 }
      ).fromTo(
        el.querySelectorAll('[data-project-entry]'),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="px-6 py-10">
      <div className="max-w-4xl">
        <header>
          <p
            data-header-reveal
            className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500"
          >
            Production Systems &amp; Case Studies
          </p>
          <h1
            data-header-reveal
            className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl"
          >
            Projects
          </h1>
          <p
            data-header-reveal
            className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600"
          >
            {software.length} software systems built for Word of Hope Caloocan and Wilcon Depot&apos;s Finance and Treasury teams. Each entry lists who uses it, the problem it fixed, and the part I built.
          </p>
        </header>

        <section aria-label="Software projects" className="mt-14">
          {software.map((entry, i) => (
            <Entry
              key={entry.slug}
              entry={entry}
              project={bySlug.get(entry.slug)!}
              number={String(i + 1).padStart(2, '0')}
            />
          ))}
        </section>

        {community.length > 0 && (
          <section aria-labelledby="community-heading" className="mt-16">
            <h2
              id="community-heading"
              data-header-reveal
              className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500"
            >
              Outside of work
            </h2>
            {community.map((entry, i) => (
              <Entry
                key={entry.slug}
                entry={entry}
                project={bySlug.get(entry.slug)!}
                number={String(software.length + i + 1).padStart(2, '0')}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
