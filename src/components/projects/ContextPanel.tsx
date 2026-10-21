'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import type { Project } from '@/lib/types'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

interface ContextPanelProps {
  projects: Project[]
}

export default function ContextPanel({ projects }: ContextPanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-panel-reveal]'),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
      )
    }, panelRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute('data-project-id')
            const project = projects.find((p) => p.slug === projectId)
            if (project && project.slug !== currentProject?.slug) {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentProject(project)
                setIsTransitioning(false)
              }, 150)
            }
          }
        })
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    )

    const articleElements = document.querySelectorAll('article[data-project-id]')
    articleElements.forEach((el) => observer.observe(el))

    return () => {
      articleElements.forEach((el) => observer.unobserve(el))
    }
  }, [projects, currentProject?.slug])

  const handleCopyAts = () => {
    const text = [
      `CANDIDATE: ${PORTFOLIO_IDENTITY.name}`,
      `ROLE: ${PORTFOLIO_IDENTITY.role}`,
      `STACK: Laravel, Vue.js, PHP, MySQL, Infor M3 ERP APIs, REST APIs, Git`,
      `EXPERIENCE: Full Stack Junior System Developer at Wilcon Depot, Inc. (6 mos, May–Oct 2026)`,
      `EDUCATION: BS Information Technology — Access Computer College (2025)`,
      `PRODUCTION SYSTEMS:`,
      `• WOH Attendance System (Word of Hope Caloocan, live since Mar 2025)`,
      `• Month-End Closing System (Wilcon Depot Finance)`,
      `• Collection and Deposit Report Modification (Wilcon Depot Treasury)`,
      `CONTACT: ${PORTFOLIO_IDENTITY.phone} | ${PORTFOLIO_IDENTITY.email} | Quezon City`,
      `REFERENCE: ${PORTFOLIO_IDENTITY.reference.name} (${PORTFOLIO_IDENTITY.reference.role}, ${PORTFOLIO_IDENTITY.reference.company}) — ${PORTFOLIO_IDENTITY.reference.phone}`,
    ].join('\n')

    navigator.clipboard.writeText(text)
    setCopiedSummary(true)
    setTimeout(() => setCopiedSummary(false), 2000)
  }

  return (
    <aside ref={panelRef} className="sticky top-0 h-screen overflow-y-auto px-8 py-8 space-y-9">
      {/* Section 1: Open Editorial Ledger — Light labels (400), regular values (400) */}
      <div data-panel-reveal>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Candidate Ledger
        </p>

        <dl className="mt-3 divide-y divide-neutral-200 border-t border-neutral-200 text-sm">
          {[
            { k: 'Role', v: 'Junior System Developer' },
            { k: 'Stack', v: 'Laravel · Vue.js · PHP · MySQL', mono: true },
            { k: 'ERP', v: 'Infor M3 APIs', mono: true },
            { k: 'Experience', v: 'Wilcon Depot, Inc. (6 mos)' },
            { k: 'Education', v: 'BSIT · ACC 2025' },
            { k: 'Location', v: 'Balingasa, Quezon City' },
          ].map(({ k, v, mono }) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
              <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400 shrink-0">
                {k}
              </dt>
              <dd className={`text-right font-normal text-neutral-800 ${mono ? 'font-mono text-[13px]' : 'text-sm'}`}>
                {v}
              </dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={handleCopyAts}
          className="group mt-2 flex w-full items-center justify-between border-t border-b border-neutral-900 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600"
        >
          <span>{copiedSummary ? '✓ Copied ATS Summary to Clipboard' : 'Copy ATS Candidate Summary'}</span>
          <span className="font-mono text-xs font-normal text-neutral-500 transition-transform duration-150 group-hover:translate-x-0.5">
            {copiedSummary ? 'Done' : 'Copy →'}
          </span>
        </button>
      </div>

      {/* Section 2: Currently Viewing (on scroll) OR Numbered Systems Index */}
      <div data-panel-reveal>
        {currentProject ? (
          <div className={`space-y-3 transition-opacity duration-150 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-baseline justify-between border-b border-neutral-200 pb-2">
              <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
                Currently Viewing
              </p>
              <Link
                href={`/projects/${currentProject.slug}`}
                className="text-xs font-normal text-neutral-700 underline underline-offset-4 hover:text-neutral-950"
              >
                Case study →
              </Link>
            </div>

            <div className="pt-1 space-y-2">
              <h3 className="text-base font-semibold text-neutral-900">
                {currentProject.title}
              </h3>
              {currentProject.client && (
                <p className="font-mono text-xs font-normal text-neutral-500">
                  {currentProject.client}
                </p>
              )}
              <p className="text-sm font-normal leading-relaxed text-neutral-600">
                {currentProject.description}
              </p>
              <p className="pt-1 font-mono text-[13px] font-normal text-neutral-700">
                {currentProject.tags.join(' · ')}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-baseline justify-between border-b border-neutral-200 pb-2">
              <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
                Production Systems
              </p>
              <Link href="/projects" className="text-xs font-normal text-neutral-500 hover:text-neutral-900 hover:underline">
                Index →
              </Link>
            </div>

            <div className="divide-y divide-neutral-200">
              {[
                {
                  num: '01',
                  slug: 'woh-attendance-system',
                  title: 'WOH Attendance System',
                  org: 'Word of Hope Caloocan · Since Mar 2025',
                },
                {
                  num: '02',
                  slug: 'wilcon-month-end-closing',
                  title: 'Month-End Closing System',
                  org: 'Wilcon Depot · Finance Department',
                },
                {
                  num: '03',
                  slug: 'wilcon-collection-deposit-report',
                  title: 'Collection & Deposit Report',
                  org: 'Wilcon Depot · Treasury Department',
                },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  className="group flex items-baseline justify-between gap-3 py-3 transition-colors"
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-xs font-normal text-neutral-400 group-hover:text-neutral-900 transition-colors">
                      {item.num}
                    </span>
                    <div className="min-w-0">
                      {/* Only the project title is medium weight (500); subtitle is regular (400) */}
                      <p className="text-sm font-medium text-neutral-900 group-hover:underline underline-offset-4 truncate">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs font-normal text-neutral-500 truncate">{item.org}</p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-neutral-900 shrink-0">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Direct Contact & Reference — Hairline rows */}
      <div data-panel-reveal>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Contact &amp; Reference
        </p>

        <div className="mt-3 divide-y divide-neutral-200 border-t border-neutral-200 text-sm">
          <div className="flex items-baseline justify-between py-2.5">
            <span className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400">Phone / Viber</span>
            <a href={PORTFOLIO_IDENTITY.phoneTel} className="font-mono text-[13px] font-normal text-neutral-900 hover:underline">
              {PORTFOLIO_IDENTITY.phone}
            </a>
          </div>
          <div className="flex items-baseline justify-between py-2.5">
            <span className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400">Email</span>
            <a href={`mailto:${PORTFOLIO_IDENTITY.email}`} className="text-sm font-normal text-neutral-900 hover:underline">
              {PORTFOLIO_IDENTITY.email}
            </a>
          </div>
          <div className="py-3">
            <span className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400 block">
              Reference
            </span>
            <p className="mt-1 text-sm font-medium text-neutral-900">
              {PORTFOLIO_IDENTITY.reference.name}
            </p>
            <p className="text-xs font-normal text-neutral-600 mt-0.5">
              {PORTFOLIO_IDENTITY.reference.role} ·{' '}
              <a
                href={PORTFOLIO_IDENTITY.reference.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-neutral-900"
              >
                {PORTFOLIO_IDENTITY.reference.company}
              </a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
