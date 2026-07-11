'use client'

import { useEffect, useState } from 'react'
import type { Project } from '@/lib/types'

interface ContextPanelProps {
  projects: Project[]
}

export default function ContextPanel({ projects }: ContextPanelProps) {
  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute('data-project-id')
            const project = projects.find((p) => p.slug === projectId)
            if (project && project.slug !== currentProject?.slug) {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentProject(project)
                setIsTransitioning(false)
              }, 150)
            }
          }
        })
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    )

    const articleElements = document.querySelectorAll('article[data-project-id]')
    articleElements.forEach((el) => observer.observe(el))

    return () => {
      articleElements.forEach((el) => observer.unobserve(el))
    }
  }, [projects, currentProject?.slug])

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto border-l border-neutral-200 p-8">
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-4">
          Context
        </h3>
        {currentProject ? (
          <div className={`space-y-6 transition-opacity duration-150 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Currently viewing
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {currentProject.title}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-900">
                Role
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {currentProject.role}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-neutral-900">
                Tools & technologies
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-neutral-100 px-2 py-1 text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {currentProject.client && (
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Client
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {currentProject.client}
                </p>
              </div>
            )}

            {currentProject.url && (
              <div>
                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 underline hover:text-neutral-900"
                >
                  View live project &rarr;
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-neutral-600">
              Scroll through the main column to see contextual information about each project appear here.
            </p>
            <div>
              <p className="text-sm font-medium text-neutral-900 mb-2">
                About this format
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                This portfolio uses an editorial layout inspired by newspaper design. Projects are presented as articles with datelines, bylines, and generous white space.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200 pt-8">
        <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-4">
          Quick stats
        </h3>
        <div className="space-y-2 text-sm text-neutral-600">
          <p>Design-led approach</p>
          <p>Systems thinking</p>
          <p>Full-stack capability</p>
        </div>
      </div>
    </aside>
  )
}
