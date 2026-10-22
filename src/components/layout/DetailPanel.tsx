'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ContextPanel from '@/components/projects/ContextPanel'
import { PROJECT_INDEX } from '@/lib/portfolio-config'
import type { Project } from '@/lib/types'

interface DetailPanelProps {
  projects: Project[]
}

export default function DetailPanel({ projects }: DetailPanelProps) {
  const pathname = usePathname()

  // Project Detail Route
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  const project = projectMatch
    ? projects.find((p) => p.slug === projectMatch[1])
    : undefined

  if (project) {
    const indexEntry = PROJECT_INDEX.find((e) => e.slug === project.slug)
    const otherProjects = projects.filter(
      (p) => p.slug !== project.slug && p.slug !== 'wordpress-ph-community'
    )

    return (
      <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/20 px-6 py-7 space-y-6">
        <div className="bg-paper-deep/55 p-4 space-y-3">
          <h2 className="font-serif text-lg font-medium text-ink">
            {project.title}
          </h2>

          <div className="space-y-2 bg-paper p-3 text-xs">
            <div>
              <span className="block text-[11px] text-ink-soft">Role</span>
              <span className="font-medium text-ink">{project.role}</span>
            </div>
            {indexEntry?.usedBy && (
              <div>
                <span className="block text-[11px] text-ink-soft">Used By</span>
                <span className="text-ink">{indexEntry.usedBy}</span>
              </div>
            )}
            <div>
              <span className="block text-[11px] text-ink-soft">Stack</span>
              <span className="ledger-figures text-[11px] text-ledger">
                {project.tags.join(' · ')}
              </span>
            </div>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-figures flex items-center justify-between bg-ink px-3.5 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
            >
              <span>Open Live System</span>
              <span>↗</span>
            </a>
          )}
        </div>

        {otherProjects.length > 0 && (
          <div>
            <h3 className="mb-2 px-1 text-xs font-medium text-ink">
              Other Systems
            </h3>
            <div className="space-y-1.5">
              {otherProjects.map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="group flex items-center justify-between gap-2 bg-paper-deep/50 px-3 py-2.5 text-xs transition-colors hover:bg-paper-deep"
                >
                  <span className="truncate font-medium text-ink group-hover:text-ledger">
                    {other.title}
                  </span>
                  <span className="text-ink-soft group-hover:translate-x-0.5 transition-transform">
                    →
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
