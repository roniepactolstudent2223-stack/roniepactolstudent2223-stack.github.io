'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import type { Project } from '@/lib/types'

interface FeaturedProjectProps {
  project: Project
  imageUrl: string
}

export default function FeaturedProject({ project, imageUrl }: FeaturedProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Hover lift
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -4,
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 0px 0px rgba(0,0,0,0)',
        duration: 0.5,
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

  return (
    <div ref={containerRef}>
      <Link href={`/projects/${project.slug}`} className="group block">
        <div ref={cardRef} className="overflow-hidden rounded-2xl bg-neutral-100">
          <div className="grid sm:grid-cols-2">
            {/* Cover Image — larger, more cinematic */}
            <div className="aspect-[4/3] overflow-hidden bg-neutral-200 sm:aspect-[3/2]">
              <img
                src={imageUrl}
                alt={`${project.title} cover`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-medium text-white">
                  Featured
                </span>
                <span className="text-xs text-neutral-500">{project.year}</span>
              </div>

              <h2 className="text-2xl font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-500">
                {project.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {project.description}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs text-neutral-500">{project.role}</span>
                {project.client && (
                  <>
                    <span className="text-neutral-200" aria-hidden="true">·</span>
                    <span className="text-xs text-neutral-500">{project.client}</span>
                  </>
                )}
              </div>

              {project.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 transition-colors group-hover:text-neutral-500">
                  View project
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
