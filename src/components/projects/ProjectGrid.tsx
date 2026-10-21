'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import type { Project } from '@/lib/types'

interface ProjectGridProps {
  projects: Project[]
}

const PLACEHOLDER_IMAGES: Record<string, string> = {
  'woh-attendance-system': '/woh-pilot.webp',
  'wordpress-ph-community': '/wp-community-1.webp',
  'wilcon-enterprise-systems': '/wilcon-enterprise.svg',
  'wilcon-collection-deposit-report': '/wilcon-cdr-branch.png',
  'wilcon-month-end-closing': '/wilcon-closing-gl-balance.png',
}

const CATEGORY_COLORS: Record<string, string> = {
  product: 'bg-blue-50 text-blue-600',
  web: 'bg-purple-50 text-purple-600',
  branding: 'bg-amber-50 text-amber-600',
  editorial: 'bg-emerald-50 text-emerald-600',
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('[data-project-card]')

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 20,
        opacity: 0,
        duration: 0.35,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.05,
      })
    }, gridRef)

    return () => ctx.revert()
  }, [projects])

  // Subtle hover lift on card
  const setupHover = useCallback((card: HTMLElement | null) => {
    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -3,
        boxShadow: '0 12px 36px rgba(0,0,0,0.05)',
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 0px 0px rgba(0,0,0,0)',
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-neutral-500">No projects match the selected filter.</p>
      </div>
    )
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {projects.map((project, index) => {
        const imageUrl = PLACEHOLDER_IMAGES[project.slug] || `https://picsum.photos/seed/${project.slug}/600/400`
        const categoryColor = CATEGORY_COLORS[project.category] || 'bg-neutral-100 text-neutral-600'
        const isFirst = index === 0

        return (
          <div
            key={project.slug}
            className={`block ${isFirst ? 'sm:col-span-2' : ''}`}
            data-project-card
            ref={(el) => {
              if (el) setupHover(el)
            }}
          >
            <article data-project-id={project.slug} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              {/* Cover Image — clickable image */}
              <Link
                href={`/projects/${project.slug}`}
                className={`group block overflow-hidden bg-neutral-100 ${
                  isFirst ? 'aspect-[21/9]' : 'aspect-[3/2]'
                }`}
              >
                <img
                  src={imageUrl}
                  alt={`${project.title} cover`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </Link>

              {/* Content — readable text with explicit links */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className={`font-semibold text-neutral-900 ${
                    isFirst ? 'text-lg' : 'text-base'
                  }`}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:underline underline-offset-4"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${categoryColor}`}>
                    {project.category}
                  </span>
                </div>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                  {project.description}
                </p>

                <div className="mt-3 flex items-center gap-3 font-mono text-xs text-neutral-400">
                  <span>{project.year}</span>
                  <span className="text-neutral-200" aria-hidden="true">·</span>
                  <span className="text-neutral-500 font-sans">{project.role}</span>
                </div>

                {project.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-600 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] text-neutral-400 font-mono self-center">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
                  >
                    <span className="underline decoration-neutral-300 underline-offset-4 group-hover:decoration-neutral-900">
                      View case study
                    </span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )
      })}
    </div>
  )
}
