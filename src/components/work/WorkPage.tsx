'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import CompanyLogo from '@/components/work/CompanyLogo'

function calculateDuration(period: string): string {
  const parts = period.split('–').map((s) => s.trim())
  const startStr = parts[0]
  const endStr = parts[1] || 'Present'

  const parseYear = (s: string) => {
    const match = s.match(/(\d{4})/)
    return match ? parseInt(match[1], 10) : null
  }

  const startYear = parseYear(startStr)
  const endYear = endStr === 'Present' ? new Date().getFullYear() : parseYear(endStr)

  if (!startYear || !endYear) return ''

  const totalMonths = (endYear - startYear) * 12
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years === 0) return `${months}mo`
  if (months === 0) return `${years}yr`
  return `${years}yr ${months}mo`
}

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])

  // Entrance animations — staggered card entrance
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const headerEls = el.querySelectorAll('[data-reveal]')
      const cards = el.querySelectorAll('[data-work-card]')

      gsap.from(headerEls, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      })

      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.4,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Interior stagger per card
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLElement[]
    const cleanups: (() => void)[] = []

    cards.forEach((card) => {
      const metric = card.querySelector('[data-metric]')
      const highlight = card.querySelector('[data-highlight]')
      const evidenceItems = card.querySelectorAll('[data-evidence]')
      const progression = card.querySelector('[data-progression]')
      const insight = card.querySelector('[data-insight]')
      const techTags = card.querySelectorAll('[data-tech]')
      const projectLink = card.querySelector('[data-project-link]')

      const animateEls = [
        ...(metric ? [metric] : []),
        ...(highlight ? [highlight] : []),
        ...evidenceItems,
        ...(progression ? [progression] : []),
        ...(insight ? [insight] : []),
        ...techTags,
        ...(projectLink ? [projectLink] : []),
      ]

      gsap.set(animateEls, { y: 15, opacity: 0 })

      const tl = gsap.timeline({ delay: 0.7 })

      if (metric) {
        tl.to(metric, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
      }

      if (highlight) {
        tl.to(highlight, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      }

      tl.to(evidenceItems, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
      }, '-=0.2')

      if (progression) {
        tl.to(progression, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      }

      if (insight) {
        tl.to(insight, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      }

      tl.to(techTags, {
        y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out',
      }, '-=0.2')

      if (projectLink) {
        tl.to(projectLink, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      }

      cleanups.push(() => tl.kill())
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  // Hover lift per card
  useEffect(() => {
    const cleanups: (() => void)[] = []

    cardsRef.current.filter(Boolean).forEach((card) => {
      if (!card) return
      const logo = card.querySelector('[data-logo]')

      const handleEnter = () => {
        gsap.to(card, {
          y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
          duration: 0.35, ease: 'power2.out',
        })
        if (logo) gsap.to(logo, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
      }

      const handleLeave = () => {
        gsap.to(card, {
          y: 0, boxShadow: '0 0px 0px rgba(0,0,0,0)',
          duration: 0.4, ease: 'power2.out',
        })
        if (logo) gsap.to(logo, { scale: 1, duration: 0.3, ease: 'power2.out' })
      }

      card.addEventListener('mouseenter', handleEnter)
      card.addEventListener('mouseleave', handleLeave)

      cleanups.push(() => {
        card.removeEventListener('mouseenter', handleEnter)
        card.removeEventListener('mouseleave', handleLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  const { workExperience } = PORTFOLIO_IDENTITY

  return (
    <div ref={containerRef} className="px-6 py-10">
      <div className="max-w-4xl">

        {/* Hero */}
        <header data-reveal>
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            Experience
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl">
            Where I&apos;ve worked
          </h1>
          <div className="mt-6 h-px w-16 bg-neutral-900" />
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-neutral-500">
            Each role shaped how I think about software — from the problems I solve to the systems I build.
          </p>
        </header>

        {/* Role cards */}
        <div className="mt-16 space-y-6">
          {workExperience.map((role, index) => {
            const duration = calculateDuration(role.period)

            return (
              <article
                key={role.company}
                data-work-card
                ref={(el) => { cardsRef.current[index] = el }}
                className="group rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8"
              >
                {/* Header — logo + role + period + duration */}
                <div className="flex items-start gap-4">
                  <div data-logo className="shrink-0">
                    <CompanyLogo company={role.company} logoUrl={role.logoUrl} size={44} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-neutral-900">
                          {role.role}
                        </h2>
                        <p className="text-sm text-neutral-600">
                          {role.company}
                          {role.location && (
                            <span className="ml-2 text-neutral-500">· {role.location}</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {duration && (
                          <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] font-medium text-neutral-500">
                            {duration}
                          </span>
                        )}
                        <p className="font-mono text-xs text-neutral-500">
                          {role.period}
                        </p>
                      </div>
                    </div>
                    {/* Company description */}
                    {role.companyDescription && (
                      <p className="mt-1 text-xs text-neutral-500">
                        {role.companyDescription}
                      </p>
                    )}
                  </div>
                </div>

                {/* Key Metric — THE standout element */}
                {role.metric && (
                  <div data-metric className="mt-6 flex items-baseline gap-3">
                    <span className="font-mono text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                      {role.metric.value}
                    </span>
                    <span className="text-sm text-neutral-500">
                      {role.metric.label}
                    </span>
                  </div>
                )}

                {/* Team size — scope */}
                {role.teamSize && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                      Scope
                    </span>
                    <span className="text-xs text-neutral-600">
                      {role.teamSize}
                    </span>
                  </div>
                )}

                {/* Highlight */}
                {role.highlight && (
                  <div data-highlight className="mt-5 border-l-2 border-neutral-900 pl-4">
                    <p className="text-base font-medium leading-snug text-neutral-900">
                      {role.highlight}
                    </p>
                  </div>
                )}

                {/* Evidence items */}
                <div className="mt-5 space-y-3">
                  {role.evidence.map((item) => (
                    <div key={item.label} data-evidence className="flex gap-4">
                      <span className="shrink-0 w-24 font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-900 pt-0.5">
                        {item.label}
                      </span>
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Role progression */}
                {role.progression && (
                  <div data-progression className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-emerald-700">
                      {role.progression}
                    </span>
                  </div>
                )}

                {/* Key insight */}
                <div data-insight className="mt-5 border-l-2 border-neutral-200 pl-4">
                  <p className="text-sm italic text-neutral-500">
                    {role.insight}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {role.technologies.map((tech) => (
                    <span
                      key={tech}
                      data-tech
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-medium text-neutral-600 transition-colors duration-200 group-hover:border-neutral-300 group-hover:bg-neutral-900 group-hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Linked project */}
                {role.project && (
                  <div data-project-link className="mt-5">
                    <Link
                      href={`/projects/${role.project}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 transition-colors hover:text-neutral-500"
                    >
                      View case study
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
                    </Link>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        {/* Resume download */}
        <section className="mt-20" data-reveal>
          <div className="h-px w-full bg-neutral-200" />
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
                Full details
              </p>
              <h2 className="font-serif text-2xl font-bold text-neutral-900">
                Want the full picture?
              </h2>
            </div>
            <a
              href={PORTFOLIO_IDENTITY.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-300/50"
            >
              Download resume
              <span aria-hidden="true" className="text-xs">&nearr;</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
