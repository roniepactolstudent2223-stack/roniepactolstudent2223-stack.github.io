'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { APPROVAL_FLOW } from '@/lib/portfolio-config'

const CLOSING_SCREENS = [
  {
    src: '/wilcon-closing-status.png',
    tag: 'Screen 01 · Closing Progress',
    title: 'Department Status Summary',
    caption: 'Tracks entries waiting for BU Head review, Finance posting, and completed postings.',
  },
  {
    src: '/wilcon-closing-master-file.png',
    tag: 'Screen 02 · Master File & Rules',
    title: 'Account Access & Mandatory Fields',
    caption: 'Assigns department access groups and required fields per General Ledger account.',
  },
  {
    src: '/wilcon-closing-gl-balance.png',
    tag: 'Screen 03 · GL Reconciliation',
    title: 'Side-by-Side GL Balance Display',
    caption: 'Compares locked unadjusted balances, posted adjustments, and projected closing balances.',
  },
]

/**
 * Signature element: the approval path of the Month-End Closing system,
 * paired with an interactive visual showcase of the actual system screens.
 */
export default function ApprovalTrail() {
  const rootRef = useRef<HTMLElement>(null)
  const [activeScreen, setActiveScreen] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'))
    const markers = Array.from(root.querySelectorAll<HTMLElement>('[data-marker]'))
    const stamp = root.querySelector<HTMLElement>('[data-stamp]')

    markers.forEach((marker) => marker.setAttribute('data-done', 'false'))

    let timeline: gsap.core.Timeline | undefined

    const ctx = gsap.context(() => {
      const rails = root.querySelectorAll('[data-rail]')
      const ticks = root.querySelectorAll('[data-tick]')

      gsap.set(rails, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(ticks, { opacity: 0, scale: 0.5 })
      if (stamp) gsap.set(stamp, { opacity: 0, scale: 1.6 })

      timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })

      steps.forEach((step, index) => {
        const marker = step.querySelector<HTMLElement>('[data-marker]')
        const rail = step.querySelector('[data-rail]')
        const stepTicks = step.querySelectorAll('[data-tick]')

        timeline!.call(() => marker?.setAttribute('data-done', 'true'), undefined, index === 0 ? 0.15 : '>')

        if (stepTicks.length > 0) {
          timeline!.to(stepTicks, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.3 }, '>+0.1')
        }

        if (step.dataset.step === 'approve' && stamp) {
          timeline!.to(stamp, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2.2)' }, '>+0.05')
        }

        if (rail) {
          timeline!.to(rail, { scaleY: 1, duration: 0.4 }, '>+0.1')
        }
      })
    }, root)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeline?.play()
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(root)

    return () => {
      observer.disconnect()
      ctx.revert()
      markers.forEach((marker) => marker.setAttribute('data-done', 'true'))
    }
  }, [])

  const screen = CLOSING_SCREENS[activeScreen] || CLOSING_SCREENS[0]

  return (
    <section
      ref={rootRef}
      id="approval-trail"
      aria-labelledby="trail-title"
      className="scroll-mt-6 border-t border-rule px-6 py-12 sm:py-16"
    >
      <div className="max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ledger font-medium">
            Signature Enterprise Workflow · Wilcon Depot
          </p>
          <span className="ledger-figures border border-rule bg-paper-deep px-2.5 py-0.5 text-xs text-ink">
            Laravel · Vue.js · PHP · MySQL
          </span>
        </div>

        <h2
          id="trail-title"
          className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl"
        >
          Month-End Closing System — How It Works
        </h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-soft">
          The path one adjusting entry takes from a Business Unit supervisor to the General Ledger, alongside the screens I built for Wilcon Depot&apos;s Finance team.
        </p>

        {/* Two-Column Visual + Workflow Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          {/* Left: Animated 4-Step Approval Pipeline */}
          <ol className="border border-rule bg-paper-deep/35 p-5">
            {APPROVAL_FLOW.map((step, index) => {
              const isLast = index === APPROVAL_FLOW.length - 1

              return (
                <li
                  key={step.key}
                  data-step={step.key}
                  onClick={() => setActiveScreen(Math.min(index, CLOSING_SCREENS.length - 1))}
                  className="relative grid cursor-pointer grid-cols-[1.75rem_1fr] gap-x-4 pb-7 last:pb-0"
                >
                  <span
                    data-marker
                    data-done="true"
                    className="ledger-figures relative z-10 flex h-7 w-7 items-center justify-center border border-ledger bg-ledger text-xs text-paper transition-colors duration-300 data-[done=false]:border-ink-soft data-[done=false]:bg-paper data-[done=false]:text-ink-soft"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {!isLast && (
                    <span aria-hidden="true" className="absolute bottom-1 left-[13px] top-8 w-px bg-rule">
                      <span data-rail className="block h-full w-px bg-ledger" />
                    </span>
                  )}

                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ledger font-medium">
                        {step.status}
                      </p>
                      {step.key === 'approve' && (
                        <span data-stamp aria-hidden="true" className="inline-block">
                          <span className="ledger-figures inline-block -rotate-2 border-2 border-double border-ledger bg-ledger/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ledger">
                            Posted to GL
                          </span>
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-base font-medium text-ink">{step.actor}</p>
                    <p className="mt-1 max-w-prose text-sm leading-relaxed text-ink-soft">{step.action}</p>

                    {step.checks && (
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {step.checks.map((check) => (
                          <li
                            key={check}
                            className="ledger-figures inline-flex items-center gap-1.5 border border-ledger/35 bg-paper px-2 py-0.5 text-xs text-ink"
                          >
                            <span data-tick aria-hidden="true" className="text-ledger font-medium">
                              ✓
                            </span>
                            {check}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Right: Visual Screen Stage with Blurred-Back Overlay & Switcher */}
          <div className="border border-rule bg-white p-2 shadow-xs">
            {/* Window Header Bar */}
            <div className="mb-1.5 flex items-center justify-between border-b border-rule px-1.5 pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rule" />
                <span className="h-2 w-2 rounded-full bg-rule" />
                <span className="h-2 w-2 rounded-full bg-ledger/70" />
                <span className="ledger-figures ml-1 text-[10px] text-ink-soft">
                  {screen.tag}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="ledger-figures cursor-pointer text-[10px] text-ink underline decoration-rule underline-offset-2 hover:decoration-ink"
              >
                Enlarge ⤢
              </button>
            </div>

            {/* Main Screenshot Canvas + Frosted Bottom Bar */}
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="group relative block aspect-[16/11] w-full cursor-pointer overflow-hidden bg-white text-left"
            >
              <img
                src={screen.src}
                alt={screen.title}
                className="h-full w-full object-contain pb-9 transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-ink/80 px-3 py-2 text-paper backdrop-blur-md">
                <p className="text-xs font-medium text-paper">{screen.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-paper/80">{screen.caption}</p>
              </div>
            </button>

            {/* 3 Screen Thumbnails */}
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {CLOSING_SCREENS.map((item, idx) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveScreen(idx)}
                  className={`cursor-pointer border bg-white p-1 text-left transition-all ${
                    idx === activeScreen
                      ? 'border-ink ring-1 ring-ink'
                      : 'border-rule opacity-75 hover:border-ink hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.src}
                    alt=""
                    className="h-9 w-full object-contain"
                  />
                  <p className="ledger-figures mt-1 truncate text-[9px] text-ink">
                    0{idx + 1} · {item.title.split(' ')[0]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-4">
          <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">Audit log built in:</span> Every submission, manager review, rejection, and GL posting is recorded with user and timestamp.
          </p>
          <Link
            href="/projects/wilcon-month-end-closing"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
          >
            Read full case study →
          </Link>
        </div>
      </div>

      {/* Full-Screen Zoom Modal */}
      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto border border-rule bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between border-b border-rule pb-2">
              <div>
                <p className="ledger-figures text-xs text-ink-soft">{screen.tag}</p>
                <h3 className="text-base font-medium text-ink">{screen.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                className="ledger-figures cursor-pointer border border-ink bg-ink px-3 py-1 text-xs text-paper"
              >
                Close ✕
              </button>
            </div>
            <div className="flex items-center justify-center border border-rule bg-white p-2">
              <img
                src={screen.src}
                alt={screen.title}
                className="max-h-[72vh] w-auto object-contain"
              />
            </div>
            <p className="mt-2.5 text-xs text-ink-soft">{screen.caption}</p>
          </div>
        </div>
      )}
    </section>
  )
}
