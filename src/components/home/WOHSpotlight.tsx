'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function WOHSpotlight() {
  const ref = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<'kiosk' | 'dashboard'>('dashboard')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="px-6 py-16 bg-neutral-950 text-white border-y border-neutral-800">
      <div className="max-w-5xl mx-auto">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4" data-reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live in Production · Since March 2025
          </span>
          <span className="text-xs text-neutral-400 font-mono">Word of Hope Caloocan</span>
        </div>

        {/* Main Headline */}
        <h2
          className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-white max-w-3xl"
          data-reveal
        >
          Church Attendance & Member Care System
        </h2>

        {/* Core Subtitle / One-Liner */}
        <p
          className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-300 font-normal leading-relaxed"
          data-reveal
        >
          Built with <strong className="text-white font-semibold">Laravel & Vue</strong> to replace manual paper logs with fast QR check-ins, automated absentee tracking, and pastoral care analytics.
        </p>

        {/* Interactive Showcase Preview */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900" data-reveal>
          {/* Top Bar / Tab Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 px-5 py-3.5 bg-neutral-900/80">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-yellow-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                1. Admin Management Dashboard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('kiosk')}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'kiosk'
                    ? 'bg-yellow-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                2. On-Site Check-in Kiosk
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://attendance.wohcaloocan.org/attendance/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-yellow-400 hover:underline inline-flex items-center gap-1 font-medium"
              >
                Open Live Kiosk &rarr;
              </a>
            </div>
          </div>

          {/* Screenshot Display */}
          <div className="relative aspect-[16/9] w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
            {activeTab === 'dashboard' ? (
              <img
                src="/woh-admin.png"
                alt="Church Attendance Management Dashboard"
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src="/woh-pilot.png"
                alt="Word of Hope QR Attendance Kiosk Pilot Setup"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>

        {/* Scannable Key Headlines (No heavy text) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal>
          <div className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/50">
            <span className="text-yellow-400 font-bold text-lg mb-1 block">01 · Instant Check-In</span>
            <p className="text-xs font-medium text-neutral-200">Zero Paperwork</p>
            <p className="text-xs text-neutral-400 mt-1 leading-normal">
              Members tap/scan their personal QR card. Auto check-in eliminates entrance lines.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/50">
            <span className="text-yellow-400 font-bold text-lg mb-1 block">02 · Absentee Care</span>
            <p className="text-xs font-medium text-neutral-200">Follow-Up Tracking</p>
            <p className="text-xs text-neutral-400 mt-1 leading-normal">
              Auto-flags members missing consecutive services so leaders can reach out & visit.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/50">
            <span className="text-yellow-400 font-bold text-lg mb-1 block">03 · Belonging First</span>
            <p className="text-xs font-medium text-neutral-200">More than Attendance</p>
            <p className="text-xs text-neutral-400 mt-1 leading-normal">
              Designed to make every member feel noticed and cared for, not just counted.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/50">
            <span className="text-yellow-400 font-bold text-lg mb-1 block">04 · Live Analytics</span>
            <p className="text-xs font-medium text-neutral-200">Real-Time Insights</p>
            <p className="text-xs text-neutral-400 mt-1 leading-normal">
              Full breakdown of Sunday Worship, Youth Fellowship, and Midweek Prayer stats.
            </p>
          </div>
        </div>

        {/* Quick Links & Stack Banner */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium mr-1">Stack:</span>
            {['Laravel', 'Vue.js', 'MySQL', 'QR Scanner API', 'Tailwind CSS'].map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[11px] font-mono text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://attendance.wohcaloocan.org/attendance/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold text-neutral-950 transition-colors hover:bg-yellow-300"
            >
              Open Attendance Kiosk &rarr;
            </a>
            <a
              href="https://wohcaloocan.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
            >
              Church Website
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
