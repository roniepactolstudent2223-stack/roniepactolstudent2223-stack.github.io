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

      tl.fromTo(
        el.querySelector('[data-eyebrow]'),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
        .fromTo(
          el.querySelectorAll('[data-word]'),
          { y: 40, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.65, stagger: 0.06 },
          '-=0.25'
        )
        .fromTo(
          el.querySelector('[data-line]'),
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.6, ease: 'expo.out' },
          '-=0.3'
        )
        .fromTo(
          el.querySelector('[data-subtext]'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.35'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const words = PORTFOLIO_IDENTITY.orientation.headline.split(' ')

  return (
    <header className="min-h-[46vh] px-6 pt-12 pb-10 flex items-center">
      <div className="max-w-4xl" ref={containerRef}>
        <p
          data-eyebrow
          className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500"
        >
          Wilcon Depot, Inc. · Laravel &amp; Vue.js · BSIT 2025
        </p>

        <h1
          ref={headlineRef}
          className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl flex flex-wrap gap-x-3 gap-y-1"
        >
          {words.map((word, idx) => (
            <span key={idx} data-word className="inline-block">
              {word}
            </span>
          ))}
        </h1>

        {/* Accent underline */}
        <div data-line className="mt-6 h-0.5 w-20 bg-neutral-900" />

        <p
          data-subtext
          className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-600"
        >
          {PORTFOLIO_IDENTITY.orientation.subtext}
        </p>
      </div>
    </header>
  )
}
