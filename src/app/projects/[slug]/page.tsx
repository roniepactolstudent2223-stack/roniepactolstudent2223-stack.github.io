import { getProject, getAllSlugs } from '@/lib/getProjects'
import ProjectDetail from '@/components/projects/ProjectDetail'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default async function FullProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ProjectDetail project={project} />
    </div>
  )
}
