'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { APPROVAL_FLOW } from '@/lib/portfolio-config'

/**
 * Structured Left-to-Right layout for the Month-End Closing workflow:
 * - Left column: Overview, stack, and case study link
 * - Right column: Clean 4-step vertical approval pipeline on a single soft surface
 *   (no noisy nested box borders)
 */
export default function ApprovalTrail() {
  const rootRef = useRef<HTMLElement>(null)

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

  return (
    <section
      ref={rootRef}
      id="approval-trail"
      aria-labelledby="trail-title"
      className="scroll-mt-6 border-t border-rule/60 px-6 py-12 sm:py-16"
    >
      <div className="max-w-4xl grid gap-8 md:grid-cols-[15rem_1fr] md:items-start">
        {/* Left Column: Section Context */}
        <div>
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ledger font-medium">
            Signature Workflow
          </p>
          <h2
            id="trail-title"
            className="mt-2 font-serif text-2xl font-medium leading-tight text-ink sm:text-[1.75rem]"
          >
            Month-End Closing System
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            The 4-step path one adjusting entry takes from a Business Unit supervisor to the General Ledger at Wilcon Depot.
          </p>
          <p className="ledger-figures mt-3 inline-block bg-paper-deep/80 px-2.5 py-1 text-[11px] text-ink">
            Laravel · Vue.js · PHP · MySQL
          </p>
          <div className="mt-5">
            <Link
              href="/projects/wilcon-month-end-closing"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
            >
              Read full case study →
            </Link>
          </div>
        </div>

        {/* Right Column: Clean 4-Step Vertical Approval Pipeline on One Soft Surface */}
        <ol className="bg-paper-deep/40 p-6">
          {APPROVAL_FLOW.map((step, index) => {
            const isLast = index === APPROVAL_FLOW.length - 1

            return (
              <li
                key={step.key}
                data-step={step.key}
                className="relative grid grid-cols-[1.75rem_1fr] gap-x-4 pb-7 last:pb-0"
              >
                <span
                  data-marker
                  data-done="true"
                  className="ledger-figures relative z-10 flex h-7 w-7 items-center justify-center bg-ledger text-xs text-paper transition-colors duration-300 data-[done=false]:bg-paper data-[done=false]:text-ink-soft"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {!isLast && (
                  <span aria-hidden="true" className="absolute bottom-1 left-[13px] top-8 w-px bg-rule/80">
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
                        <span className="ledger-figures inline-block -rotate-2 bg-ledger/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ledger">
                          Posted to GL
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-base font-medium text-ink">{step.actor}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.action}</p>

                  {step.checks && (
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {step.checks.map((check) => (
                        <li
                          key={check}
                          className="ledger-figures inline-flex items-center gap-1.5 bg-paper px-2.5 py-0.5 text-xs text-ink"
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
      </div>
    </section>
  )
}
