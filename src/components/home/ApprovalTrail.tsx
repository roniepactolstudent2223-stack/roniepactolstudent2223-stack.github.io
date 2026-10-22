'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { APPROVAL_FLOW } from '@/lib/portfolio-config'

/**
 * Signature element: the approval path of the Month-End Closing system.
 *
 * Motion has one job here: show the order things happen in. Each step turns
 * from pending to done, the validation checks tick, and the entry is stamped
 * Posted. Nothing moves for decoration.
 *
 * The server-rendered HTML is the *finished* state, so crawlers, screen readers
 * and anyone with reduced-motion enabled get all the text with no animation.
 * The pending state is only applied in the browser, right before it plays.
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
      { threshold: 0.3 }
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
      className="scroll-mt-6 border-t border-rule px-6 py-12 sm:py-16"
    >
      <div className="max-w-3xl">
        <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">Signature project</p>
        <h2 id="trail-title" className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl">
          Month-End Closing System
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          The path one adjusting entry takes from a supervisor to the ledger. Each step is a role in the
          system I built for Wilcon Depot.
        </p>

        <ol className="mt-10">
          {APPROVAL_FLOW.map((step, index) => {
            const isLast = index === APPROVAL_FLOW.length - 1

            return (
              <li
                key={step.key}
                data-step={step.key}
                className="relative grid grid-cols-[1.75rem_1fr] gap-x-4 pb-8 last:pb-0"
              >
                <span
                  data-marker
                  data-done="true"
                  className="ledger-figures relative z-10 flex h-7 w-7 items-center justify-center border border-ledger bg-ledger text-xs text-paper transition-colors duration-300 data-[done=false]:border-ink-soft data-[done=false]:bg-paper data-[done=false]:text-ink-soft"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {!isLast && (
                  <span aria-hidden="true" className="absolute bottom-1 left-[13px] top-9 w-px bg-rule">
                    <span data-rail className="block h-full w-px bg-ledger" />
                  </span>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ledger">{step.status}</p>
                    {step.key === 'approve' && (
                      <span data-stamp aria-hidden="true" className="inline-block">
                        <span className="ledger-figures inline-block -rotate-3 border-2 border-double border-ledger px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-ledger">
                          Posted
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-base font-medium text-ink">{step.actor}</p>
                  <p className="mt-1 max-w-prose text-[15px] leading-relaxed text-ink-soft">{step.action}</p>

                  {step.checks && (
                    <ul className="mt-3 space-y-1.5">
                      {step.checks.map((check) => (
                        <li key={check} className="flex items-baseline gap-2 text-[15px] text-ink">
                          <span data-tick aria-hidden="true" className="text-ledger">
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

        <div className="rule-single mt-10 pt-3">
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">Audit log.</span> Every submission, approval and rejection is
            recorded with who did it and when.
          </p>
        </div>

        <p className="mt-8">
          <Link
            href="/projects/wilcon-month-end-closing"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger"
          >
            Read the case study
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  )
}
