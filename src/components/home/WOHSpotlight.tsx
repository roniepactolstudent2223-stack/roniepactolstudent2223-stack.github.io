'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WOHSpotlight() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="px-6 py-14 bg-neutral-950 text-white">
      <div className="max-w-5xl">

        {/* Label */}
        <p
          className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500 mb-4"
          data-reveal
        >
          Personal Project · In Production Since March 2025
        </p>

        {/* Headline */}
        <h2
          className="font-serif text-3xl sm:text-4xl font-bold leading-snug text-white max-w-2xl"
          data-reveal
        >
          I built an attendance system for my church — and it's been running since March.
        </h2>

        <div className="mt-5 h-px w-12 bg-yellow-400" data-reveal />

        {/* Sub-copy */}
        <p
          className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-400"
          data-reveal
        >
          Word of Hope Caloocan is a Christian family church in Caloocan. Before this system,
          attendance was recorded by hand — names written on paper every Sunday.
          I wanted to change that, not for a grade or a job, but because it mattered.
        </p>

        {/* Pilot photo */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-neutral-800" data-reveal>
          <img
            src="/woh-pilot.png"
            alt="WOH Attendance System pilot setup at Word of Hope Caloocan"
            className="w-full object-cover"
          />
        </div>

        {/* 3-column highlights */}
        <div className="mt-10 grid sm:grid-cols-3 gap-6" data-reveal>
          <div className="border border-neutral-800 rounded-xl p-5">
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-2">Scan to Check In</p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Members scan their QR card at the entrance. The system logs their attendance instantly — no pen, no paper, no queue.
            </p>
          </div>
          <div className="border border-neutral-800 rounded-xl p-5">
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-2">Track Absentees</p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Leaders can see who hasn't attended in weeks and reach out personally — helping members feel seen, not just counted.
            </p>
          </div>
          <div className="border border-neutral-800 rounded-xl p-5">
            <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-2">Analytics Dashboard</p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Attendance trends, member growth, and event summaries — all visible to church leaders without any manual reporting.
            </p>
          </div>
        </div>

        {/* Stack + CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-6" data-reveal>
          <div className="flex flex-wrap gap-2">
            {['Laravel', 'Vue.js', 'MySQL', 'QR Scanning'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-700 px-3 py-1 text-[11px] text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href="https://wohcaloocan.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-yellow-300 transition-colors"
          >
            Visit site →
          </a>
        </div>

        {/* Personal note */}
        <blockquote
          className="mt-12 border-l-2 border-yellow-400 pl-5 text-sm text-neutral-400 italic max-w-xl"
          data-reveal
        >
          "This is not a school project. It's currently being used every Sunday. I'm proud of it
          because it contributes to something bigger than code — it helps a community feel like family."
          <span className="block mt-2 not-italic text-neutral-500 text-xs">— Ronie Pactol</span>
        </blockquote>

      </div>
    </section>
  )
}
