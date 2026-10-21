import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX, type ProjectIndexEntry } from '@/lib/portfolio-config'

interface ProjectsIndexProps {
  projects: Project[]
}

// Labels are phrased as the question each field answers for the reader.
const FIELDS: { key: keyof Pick<ProjectIndexEntry, 'usedBy' | 'problem' | 'myPart' | 'stack'>; label: string }[] = [
  { key: 'usedBy', label: 'Used by' },
  { key: 'problem', label: 'Problem' },
  { key: 'myPart', label: 'What I did' },
  { key: 'stack', label: 'Stack' },
]

function Entry({ entry, project, number }: { entry: ProjectIndexEntry; project: Project; number: string }) {
  return (
    <article className="group border-t border-neutral-900 py-8 first:border-t-2">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-neutral-400" aria-hidden="true">{number}</span>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">
              {project.title}
            </Link>
          </h2>
        </div>
        <p className="flex shrink-0 items-center gap-2 pl-9 text-sm text-neutral-700 sm:pl-0">
          <span
            className={`h-2 w-2 rounded-full ${entry.live ? 'bg-emerald-500' : 'bg-neutral-300'}`}
            aria-hidden="true"
          />
          {entry.status}
        </p>
      </header>

      <dl className="mt-6 space-y-4 pl-9">
        {FIELDS.map((f) => (
          <div key={f.key} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-8">
            <dt className="text-sm font-medium text-neutral-500 sm:pt-0.5">{f.label}</dt>
            <dd className={`leading-relaxed text-neutral-900 ${f.key === 'stack' ? 'font-mono text-sm sm:pt-1' : 'text-base'}`}>
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
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  )
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]))
  const rows = PROJECT_INDEX.filter((e) => bySlug.has(e.slug))
  const software = rows.filter((e) => e.kind === 'software')
  const community = rows.filter((e) => e.kind === 'community')

  return (
    <div className="px-6 py-10">
      <div className="max-w-4xl">
        <header>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl">
            Projects
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
            {software.length} software projects used by a church and a nationwide retailer. Each one lists who
            uses it, the problem it fixed, and the part I built.
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
            <h2 id="community-heading" className="mb-2 text-sm font-medium text-neutral-500">
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
