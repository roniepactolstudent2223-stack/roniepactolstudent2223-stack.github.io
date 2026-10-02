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
            <p className="text-xs text-neutral-500 leading-relaxed">
              Scroll through the projects in the center column to see live details and tech stack breakdown.
            </p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-2">
                About Ronie
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Junior System Developer at Wilcon Depot, Inc. specializing in Laravel and Vue.js. Access Computer College IT graduate (2025).
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-2">
                Community & Volunteering
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Active member and volunteer photographer for WordPress Philippines meetups (2025 attendee &rarr; 2026 volunteer).
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <h3 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
          Key Highlights
        </h3>
        <div className="space-y-2 text-xs text-neutral-600">
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            101+ members on WOH system
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live production since March 2025
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            WordPress PH Event Volunteer
          </p>
        </div>
      </div>
    </aside>
  )
}
