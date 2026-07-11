import type { Project } from '@/lib/types'

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="h-full overflow-y-auto p-8">
      <header>
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          {project.category} &middot; {project.year}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-sm text-neutral-500">Role: {project.role}</p>
        {project.client && (
          <p className="text-sm text-neutral-500">Client: {project.client}</p>
        )}
      </header>

      <div className="mt-8 space-y-8">
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          {project.description}
        </p>

        {project.images.map((src, i) => (
          <figure key={i}>
            <div className="overflow-hidden rounded bg-neutral-100 dark:bg-neutral-900">
              <img src={src} alt={`${project.title} image ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          </figure>
        ))}

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.url && (
          <div className="border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-500"
            >
              View Live
            </a>
          </div>
        )}
      </div>
    </article>
  )
}
