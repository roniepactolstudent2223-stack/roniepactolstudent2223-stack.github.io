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
  { label: 'Status', value: 'Open to Junior Developer roles' },
]

const BUILT = [
  {
    name: 'WOH Attendance System',
    detail: 'QR check-in + pastoral care system. Laravel + Vue.js. Live in production since Mar 2025.',
    href: '/projects/woh-attendance-system',
  },
  {
    name: 'Wilcon Internal Tools',
    detail: 'Enterprise web apps for a leading PH retailer. PHP, Laravel, Vue.js, Infor M3 ERP integration.',
    href: '/projects/wilcon-enterprise-systems',
  },
  {
    name: 'WordPress PH Community',
    detail: 'Volunteer photographer documenting local WordCamps and developer meetups since 2025.',
    href: '/projects/wordpress-ph-community',
  },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.05,
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="px-6 py-10">
      <div className="max-w-3xl space-y-16">

        {/* Identity block */}
        <header data-reveal>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
            About
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Ronie Pactol
          </h1>
          <p className="mt-2 text-lg text-neutral-500">
            Full Stack Junior System Developer · Laravel, Vue.js, MySQL
          </p>
        </header>

        {/* Facts grid */}
        <section data-reveal>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
            Profile
          </p>
          <dl className="grid grid-cols-1 gap-px bg-neutral-200 border border-neutral-200 rounded-xl overflow-hidden sm:grid-cols-2">
            {FACTS.map((fact) => (
              <div key={fact.label} className="bg-white px-5 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-neutral-900">
                  {fact.value}
                </dd>
              </div>
            ))}
            <div className="bg-white px-5 py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">Contact</dt>
              <dd className="mt-1 text-sm font-semibold text-neutral-900">
                <a href={PORTFOLIO_IDENTITY.phoneTel} className="hover:underline">{PORTFOLIO_IDENTITY.phone}</a>
                {' · '}
                <a href={`mailto:${PORTFOLIO_IDENTITY.email}`} className="hover:underline">{PORTFOLIO_IDENTITY.email}</a>
              </dd>
            </div>
          </dl>
        </section>

        {/* Stack */}
        <section data-reveal>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
            Stack
          </p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {STACK.map((col) => (
              <div key={col.group}>
                <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-400">
                  {col.group}
                </p>
                <ul className="space-y-1.5">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm font-medium text-neutral-900">
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
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
            What I&apos;ve built
          </p>
          <div className="space-y-px border border-neutral-200 rounded-xl overflow-hidden">
            {BUILT.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-start justify-between gap-6 bg-white px-5 py-5 transition-colors hover:bg-neutral-50"
              >
                <div>
                  <p className="text-sm font-semibold text-neutral-900 group-hover:underline">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                    {item.detail}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-neutral-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-neutral-900"
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
                Open to full-time Junior Developer roles
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                Available now · Balingasa, Quezon City
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={PORTFOLIO_IDENTITY.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                Resume ↗
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
