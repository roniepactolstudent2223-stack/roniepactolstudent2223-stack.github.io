'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

const STACK = [
  { group: 'Backend', items: ['Laravel', 'PHP', 'Eloquent ORM', 'REST APIs'] },
  { group: 'Frontend', items: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'HTML5 / CSS3'] },
  { group: 'Database', items: ['MySQL', 'Relational Schema', 'CRUD Queries', 'Data Indexing'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Infor M3 APIs', 'Composer'] },
]

const FACTS = [
  { label: 'Role', value: 'Full Stack Junior System Developer' },
  { label: 'Experience', value: '6 months at Wilcon Depot, Inc.' },
  { label: 'Education', value: 'BSIT — Access Computer College, 2025' },
  { label: 'Based in', value: 'Balingasa, Quezon City' },
  { label: 'Core Stack', value: 'Laravel · Vue.js · PHP · MySQL' },
]

const BUILT = [
  {
    name: 'WOH Attendance System',
    detail: 'QR check-in + pastoral care system. Laravel + Vue.js. In use every Sunday since Mar 2025.',
    href: '/projects/woh-attendance-system',
  },
  {
    name: 'Wilcon Month-End Closing System',
    detail: 'Centralized monthly accounting close for Wilcon Finance: Infor M3 COA sync, validation, 2-step approval, and live GL balances.',
    href: '/projects/wilcon-month-end-closing',
  },
  {
    name: 'Wilcon Collection & Deposit Report',
    detail: 'Treasury report modification in WBI Reports & Omnibus: check drill-down, cash/check filters, PDF/Excel export, and Branch column.',
    href: '/projects/wilcon-collection-deposit-report',
  },
  {
    name: 'WordPress PH Community',
    detail: 'Volunteer photographer documenting local developer meetups and workshops since 2025.',
    href: '/projects/wordpress-ph-community',
  },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-reveal]'),
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="px-6 py-10">
      <div className="max-w-3xl space-y-16">

        {/* Identity block */}
        <header data-reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-neutral-500">
            About
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Ronie Pactol
          </h1>
          <p className="mt-2 text-lg text-neutral-600">
            Full Stack Junior System Developer · Laravel, Vue.js, MySQL
          </p>
        </header>

        {/* Facts grid */}
        <section data-reveal>
          <p className="mb-4 font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
            Profile
          </p>
          <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
            {FACTS.map((fact) => (
              <div key={fact.label} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs font-normal text-neutral-500 sm:pt-0.5">
                  {fact.label}
                </dt>
                <dd className="text-sm font-normal text-neutral-900">
                  {fact.value}
                </dd>
              </div>
            ))}
            <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs font-normal text-neutral-500 sm:pt-0.5">Contact</dt>
              <dd className="text-sm font-normal text-neutral-900">
                <a href={PORTFOLIO_IDENTITY.phoneTel} className="hover:underline">{PORTFOLIO_IDENTITY.phone}</a>
                {' · '}
                <a href={`mailto:${PORTFOLIO_IDENTITY.email}`} className="hover:underline">{PORTFOLIO_IDENTITY.email}</a>
              </dd>
            </div>
          </dl>
        </section>

        {/* Stack */}
        <section data-reveal>
          <p className="mb-4 font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
            Stack
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-neutral-200 pt-5">
            {STACK.map((col) => (
              <div key={col.group}>
                <p className="mb-2.5 font-mono text-xs font-medium text-neutral-900">
                  {col.group}
                </p>
                <ul className="space-y-1.5">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm font-normal text-neutral-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* What I've built */}
        <section data-reveal>
          <p className="mb-4 font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
            What I&apos;ve built
          </p>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {BUILT.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-start justify-between gap-6 py-4 transition-all duration-200"
              >
                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <p className="text-base font-medium text-neutral-900 group-hover:underline underline-offset-4">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm font-normal leading-relaxed text-neutral-600">
                    {item.detail}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-neutral-900"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Simple footer CTA */}
        <section data-reveal className="border-t border-neutral-200 pt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Resume &amp; Direct Contact
              </p>
              <p className="mt-0.5 text-xs text-neutral-600">
                Balingasa, Quezon City · {PORTFOLIO_IDENTITY.phone}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={PORTFOLIO_IDENTITY.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-800 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-50"
              >
                Resume PDF ↗
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                Contact details →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
