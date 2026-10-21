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
        y: 20,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.05,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Subtle border / shadow transition on hover
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -3,
        boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
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

  return (
    <div ref={containerRef}>
      <div ref={cardRef} className="overflow-hidden rounded-2xl bg-white border border-neutral-200">
        <div className="grid sm:grid-cols-2">
          {/* Cover Image — clickable on image itself */}
          <Link
            href={`/projects/${project.slug}`}
            className="group block aspect-[4/3] overflow-hidden bg-neutral-100 sm:aspect-[3/2]"
          >
            <img
              src={imageUrl}
              alt={`${project.title} cover`}
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </Link>

          {/* Content — not a giant link, text is readable and selectable */}
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-medium text-white">
                Featured
              </span>
              <span className="text-xs text-neutral-500 font-mono">{project.year}</span>
            </div>

            <h2 className="text-2xl font-semibold leading-snug text-neutral-900">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:underline underline-offset-4"
              >
                {project.title}
              </Link>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {project.description}
            </p>

            <div className="mt-5 flex items-center gap-3 text-xs text-neutral-500 font-normal">
              <span>{project.role}</span>
              {project.client && (
                <>
                  <span className="text-neutral-300" aria-hidden="true">·</span>
                  <span>{project.client}</span>
                </>
              )}
            </div>

            {project.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] text-neutral-600 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                <span className="underline decoration-neutral-300 underline-offset-4 group-hover:decoration-neutral-900">
                  View case study
                </span>
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
