'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

export default function Masthead() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.set(el.querySelectorAll('[data-reveal]'), {
        y: 30,
        opacity: 0,
      })

      tl.to(el.querySelectorAll('[data-reveal]'), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Magnetic hover on CTAs
  useEffect(() => {
    const cleanups: (() => void)[] = []

    ctaRefs.current.forEach((btn) => {
      if (!btn) return

      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        })
      }

      btn.addEventListener('mousemove', handleMouseMove)
      btn.addEventListener('mouseleave', handleMouseLeave)

      cleanups.push(() => {
        btn.removeEventListener('mousemove', handleMouseMove)
        btn.removeEventListener('mouseleave', handleMouseLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <header className="min-h-[50vh] px-6 pt-12 pb-10 flex items-center">
      <div className="max-w-4xl" ref={containerRef}>
        <div className="mb-6 flex items-center gap-2" data-reveal>
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              PORTFOLIO_IDENTITY.isAvailable ? 'bg-emerald-500' : 'bg-neutral-300'
            }`}
            aria-hidden="true"
          />
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            {PORTFOLIO_IDENTITY.availability}
          </p>
        </div>

        <h1
          ref={headlineRef}
          className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl"
          data-reveal
        >
          {PORTFOLIO_IDENTITY.orientation.headline}
        </h1>

        {/* Accent underline */}
        <div className="mt-5 h-px w-16 bg-neutral-900" data-reveal />

        <p
          className="mt-6 max-w-lg text-base leading-relaxed text-neutral-500"
          data-reveal
        >
          {PORTFOLIO_IDENTITY.orientation.subtext}
        </p>

        {/* Stat strip */}
        <div className="mt-8 flex items-center gap-6" data-reveal>
          {PORTFOLIO_IDENTITY.stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-1.5">
              <span className="font-mono text-sm font-semibold text-neutral-900">
                {stat.value}
              </span>
              <span className="text-xs text-neutral-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3" data-reveal>
          <a
            ref={(el) => { ctaRefs.current[0] = el }}
            href="#home"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-300/50"
          >
            Explore projects
          </a>
          <a
            ref={(el) => { ctaRefs.current[1] = el }}
            href={`mailto:${PORTFOLIO_IDENTITY.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-50"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  )
}
