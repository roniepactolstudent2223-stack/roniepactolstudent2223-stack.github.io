'use client'

import { usePathname } from 'next/navigation'
import ContextPanel from '@/components/projects/ContextPanel'
import ProjectDetail from '@/components/projects/ProjectDetail'
import MobileNavigation from '@/components/navigation/MobileNavigation'
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

  return (
    <>
      <MobileNavigation />
      {project ? (
        <ProjectDetail project={project} />
      ) : (
        <ContextPanel projects={projects} />
      )}
    </>
  )
}
