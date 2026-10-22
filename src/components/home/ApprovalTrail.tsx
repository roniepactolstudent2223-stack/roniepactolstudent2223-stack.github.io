'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { APPROVAL_FLOW } from '@/lib/portfolio-config'

/**
 * Signature element: the 4-step approval path of the Month-End Closing system.
 * Keeps the workflow diagram focused without repeating the screenshots shown
 * immediately below in the Projects section.
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
          The 4-step path one adjusting entry takes from a Business Unit supervisor to the General Ledger.
        </p>

        {/* Animated 4-Step Approval Pipeline */}
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {APPROVAL_FLOW.map((step, index) => (
            <li
              key={step.key}
              data-step={step.key}
              className="relative border border-rule bg-paper-deep/35 p-4"
            >
              <div className="flex items-center justify-between border-b border-rule pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span
                    data-marker
                    data-done="true"
                    className="ledger-figures flex h-6 w-6 items-center justify-center border border-ledger bg-ledger text-xs text-paper transition-colors duration-300 data-[done=false]:border-ink-soft data-[done=false]:bg-paper data-[done=false]:text-ink-soft"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ledger font-medium">
                    {step.status}
                  </p>
                </div>

                {step.key === 'approve' && (
                  <span data-stamp aria-hidden="true" className="inline-block">
                    <span className="ledger-figures inline-block -rotate-2 border-2 border-double border-ledger bg-ledger/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ledger">
                      Posted to GL
                    </span>
                  </span>
                )}
              </div>

              <p className="mt-3 text-base font-medium text-ink">{step.actor}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.action}</p>

              {step.checks && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
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
            </li>
          ))}
        </ol>

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
    </section>
  )
}
