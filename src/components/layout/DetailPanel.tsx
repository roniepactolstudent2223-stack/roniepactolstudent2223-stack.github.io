'use client'

import { usePathname } from 'next/navigation'
import ContextPanel from '@/components/projects/ContextPanel'
import type { Project } from '@/lib/types'

interface DetailPanelProps {
  projects: Project[]
}

export default function DetailPanel({ projects }: DetailPanelProps) {
  const pathname = usePathname()

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  const currentProject = projectMatch
    ? projects.find((p) => p.slug === projectMatch[1])
    : undefined

  return <ContextPanel projects={projects} currentProject={currentProject} />
}
