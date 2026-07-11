'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'


const PROJECT_IMAGES: Record<string, string> = {
  'design-system-redesign': 'https://picsum.photos/seed/designsystem/800/600',
  'mobile-banking-app': 'https://picsum.photos/seed/banking/800/600',
  'editorial-portfolio': 'https://picsum.photos/seed/editorial/800/600',
}

const STAT_STRIP = [
  { value: '2025', label: 'graduated IT' },
  { value: '3', label: 'work experiences' },
  { value: '1', label: 'current role' },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // Entrance animations
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Hover lift on focus area cards
  useEffect(() => {
    const container = cardsRef.current
    if (!container) return

    const cards = container.querySelectorAll('[data-card]')

    cards.forEach((card) => {
      const handleEnter = () => {
        gsap.to(card, {
          y: -4,
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
      const handleLeave = () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 0.4,
          ease: 'power2.out',
        })
      }
      card.addEventListener('mouseenter', handleEnter)
      card.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true))
      })
    }
  }, [])

  const { about } = PORTFOLIO_IDENTITY
  return (
    <div ref={containerRef} className="px-6 py-10">
      <div className="max-w-4xl">

        {/* Section 1: Opening Statement — editorial, large type, stat evidence */}
        <header data-reveal>
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            About
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl">
            {about.statement.headline}
          </h1>
          <div className="mt-6 h-px w-16 bg-neutral-900" />
          <div className="mt-7 max-w-lg space-y-6 text-lg leading-relaxed text-neutral-500">
            {about.statement.body.split('\n\n').map((segment, i) => {
              if (segment.startsWith('PullQuote::')) {
                const quoteText = segment.replace('PullQuote::', '')
                return (
                  <blockquote
                    key={i}
                    className="my-10 border-l-2 border-neutral-900 pl-6 font-serif text-2xl font-semibold leading-snug tracking-tight text-neutral-900 sm:text-3xl"
                  >
                    {quoteText}
                  </blockquote>
                )
              }
              return <p key={i}>{segment}</p>
            })}
          </div>

          {/* Stat strip — evidence, not claims */}
          <div className="mt-10 flex gap-10 border-t border-neutral-200 pt-8">
            {STAT_STRIP.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-2xl font-semibold text-neutral-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* Section 2: What I Do — dense, image cards with hover lift */}
        <section className="mt-24" data-reveal>
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            What I do
          </p>
          <div ref={cardsRef} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {about.focusAreas.map((area) => (
              <Link
                key={area.title}
                data-card
                href={`/projects/${area.project}`}
                className="group block overflow-hidden rounded-xl bg-neutral-50 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={PROJECT_IMAGES[area.project] || `https://picsum.photos/seed/${area.project}/800/600`}
                    alt={area.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {area.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-neutral-900 transition-colors group-hover:text-neutral-500">
                    View project
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: How I Work — spacious, vertical line connecting principles */}
        <section className="mt-24" data-reveal>
          <p className="mb-10 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            How I work
          </p>
          <div className="relative space-y-10 pl-6">
            {/* Vertical connecting line */}
            <div className="absolute left-0 top-1 h-full w-px bg-neutral-200" />
            {about.principles.map((principle, index) => (
              <div key={principle.title} className="relative">
                {/* Dot on the line */}
                <div className="absolute -left-6 top-2 h-1.5 w-1.5 rounded-full bg-neutral-900" />
                <span className="font-mono text-[10px] text-neutral-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1 text-lg font-medium text-neutral-900">
                  {principle.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: What I'm Looking For — full-width accent section */}
        <section className="mt-24 rounded-xl bg-neutral-900 p-8 sm:p-10" data-reveal>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            {about.lookingFor.headline}
          </p>
          <p className="max-w-lg text-base leading-relaxed text-neutral-300">
            {about.lookingFor.body}
          </p>
          {PORTFOLIO_IDENTITY.resumeUrl && (
            <a
              href={PORTFOLIO_IDENTITY.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-white"
            >
              View resume
              <span aria-hidden="true" className="text-xs">&nearr;</span>
            </a>
          )}
        </section>

        {/* Section 5: Contact — editorial close, link to /contact */}
        <section className="mt-24" data-reveal>
          <div className="h-px w-full bg-neutral-200" />
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
                Get in touch
              </p>
              <h2 className="font-serif text-2xl font-bold text-neutral-900">
                Let&apos;s work together
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-300/50"
            >
              Contact me
              <span aria-hidden="true" className="text-xs">&rarr;</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
