import { getProject } from '@/lib/getProjects'
import ProjectDetail from '@/components/projects/ProjectDetail'
import { notFound } from 'next/navigation'

export default async function DetailProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
