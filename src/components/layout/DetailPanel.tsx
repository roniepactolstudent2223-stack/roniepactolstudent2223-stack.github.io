'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ContextPanel from '@/components/projects/ContextPanel'
import type { Project } from '@/lib/types'

interface DetailPanelProps {
  projects: Project[]
}

export default function DetailPanel({ projects }: DetailPanelProps) {
  const pathname = usePathname()

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  const project = projectMatch
    ? projects.find((p) => p.slug === projectMatch[1])
    : undefined

  if (project) {
    const otherProjects = projects.filter((p) => p.slug !== project.slug)

    return (
      <aside className="sticky top-0 h-screen overflow-y-auto p-8 space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            &larr; Back to all projects
          </Link>
        </div>

        <div className="space-y-6 border-b border-neutral-200 pb-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
            Project Overview
          </p>
          <h2 className="text-xl font-bold text-neutral-900">
            {project.title}
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-neutral-400">Role: </span>
              <span className="font-medium text-neutral-800">{project.role}</span>
            </div>
            {project.client && (
              <div>
                <span className="text-neutral-400">Client / Org: </span>
                <span className="font-medium text-neutral-800">{project.client}</span>
              </div>
            )}
            <div>
              <span className="text-neutral-400">Year: </span>
              <span className="font-medium text-neutral-800">{project.year}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-mono text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.url && (
            <div className="pt-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                Open Live System &rarr;
              </a>
            </div>
          )}
        </div>

        {otherProjects.length > 0 && (
          <div className="space-y-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
              Other Work & Community
            </p>
            <div className="space-y-3">
              {otherProjects.map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="group block rounded-xl border border-neutral-200 p-4 transition-all hover:border-neutral-400 hover:bg-neutral-50"
                >
                  <p className="text-xs font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {other.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] text-neutral-500">
                    {other.description}
                  </p>
                  <span className="mt-2 inline-flex items-center text-[10px] font-medium text-neutral-400 group-hover:text-neutral-800">
                    View project &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    )
  }

  return <ContextPanel projects={projects} />
}
