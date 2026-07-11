import ContextPanel from '@/components/projects/ContextPanel'
import MobileNavigation from '@/components/navigation/MobileNavigation'
import { getProjects } from '@/lib/getProjects'

export default function DetailDefault() {
  const projects = getProjects()

  return (
    <>
      <MobileNavigation />
      <ContextPanel projects={projects} />
    </>
  )
}
