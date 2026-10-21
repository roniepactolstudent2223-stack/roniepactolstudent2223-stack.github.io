import type { Metadata } from 'next'
import ProjectsIndex from '@/components/projects/ProjectsIndex'
import MobileNavigation from '@/components/navigation/MobileNavigation'
import { getProjects } from '@/lib/getProjects'

export const metadata: Metadata = {
  title: 'Projects — Ronie Pactol',
  description:
    'Laravel and Vue.js projects in production: WOH church attendance system and Wilcon Depot Treasury reporting.',
}

export default function Projects() {
  return (
    <div>
      <MobileNavigation />
      <ProjectsIndex projects={getProjects()} />
    </div>
  )
}
