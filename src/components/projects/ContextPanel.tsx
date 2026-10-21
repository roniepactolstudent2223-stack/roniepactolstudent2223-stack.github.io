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
        { y: 18, opacity: 0 },
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
    <aside ref={panelRef} className="sticky top-0 h-screen overflow-y-auto p-7 space-y-7">
      {/* Technical Profile — Factual details only */}
      <div data-panel-reveal>
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Candidate Details
        </p>

        <dl className="mt-3 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white text-sm">
          {[
            { k: 'Role', v: 'Junior System Developer' },
            { k: 'Primary Stack', v: 'Laravel · Vue.js · PHP · MySQL' },
            { k: 'ERP Integration', v: 'Infor M3 APIs' },
            { k: 'Experience', v: 'Wilcon Depot, Inc. (6 mos)' },
            { k: 'Education', v: 'BSIT · Access Computer College (2025)' },
            { k: 'Location', v: 'Balingasa, Quezon City' },
          ].map(({ k, v }) => (
            <div key={k} className="flex items-baseline justify-between gap-4 px-3.5 py-2.5">
              <dt className="text-xs font-medium text-neutral-500 shrink-0">{k}</dt>
              <dd className="text-sm font-semibold text-neutral-900 text-right">{v}</dd>
            </div>
          ))}
        </dl>

        {/* One-Click Copy ATS Summary */}
        <button
          type="button"
          onClick={handleCopyAts}
          className="mt-3 flex w-full items-center justify-between rounded-lg border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-sm font-semibold text-neutral-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-100 hover:shadow-sm"
        >
          <span>{copiedSummary ? '✓ Copied Summary to Clipboard' : 'Copy ATS Candidate Summary'}</span>
          <span className="font-mono text-xs text-neutral-500">{copiedSummary ? 'Done' : 'Copy'}</span>
        </button>
      </div>

      {/* Currently Viewing Project (when scrolling) OR Production Systems Jump List */}
      <div data-panel-reveal className="border-t border-neutral-200 pt-6">
        {currentProject ? (
          <div className={`space-y-4 transition-opacity duration-150 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Currently Viewing
              </p>
              <Link
                href={`/projects/${currentProject.slug}`}
                className="text-xs font-semibold text-neutral-900 underline underline-offset-4"
              >
                Open case study →
              </Link>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 space-y-3">
              <h3 className="text-base font-bold text-neutral-900">
                {currentProject.title}
              </h3>
              {currentProject.client && (
                <p className="text-sm font-medium text-neutral-700">
                  {currentProject.client}
                </p>
              )}
              <p className="text-sm leading-relaxed text-neutral-600">
                {currentProject.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 font-mono text-xs font-medium text-neutral-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
                Production Systems
              </p>
              <Link href="/projects" className="text-xs font-semibold text-neutral-900 hover:underline">
                View all →
              </Link>
            </div>

            <div className="space-y-2">
              {[
                {
                  slug: 'woh-attendance-system',
                  title: 'WOH Attendance System',
                  org: 'Word of Hope Caloocan · Since Mar 2025',
                },
                {
                  slug: 'wilcon-month-end-closing',
                  title: 'Month-End Closing System',
                  org: 'Wilcon Depot · Finance Department',
                },
                {
                  slug: 'wilcon-collection-deposit-report',
                  title: 'Collection & Deposit Report',
                  org: 'Wilcon Depot · Treasury Department',
                },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  className="group block rounded-xl border border-neutral-200 bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-50 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-neutral-900 group-hover:underline">
                      {item.title}
                    </span>
                    <span className="text-xs text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-neutral-900">→</span>
                  </div>
                  <p className="mt-0.5 text-xs text-neutral-600">{item.org}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Direct Recruiter Contact & Reference */}
      <div data-panel-reveal className="border-t border-neutral-200 pt-6 space-y-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Direct Contact &amp; Reference
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-3.5 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Phone / Viber</span>
            <a href={PORTFOLIO_IDENTITY.phoneTel} className="font-semibold text-neutral-900 hover:underline">
              {PORTFOLIO_IDENTITY.phone}
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Email</span>
            <a href={`mailto:${PORTFOLIO_IDENTITY.email}`} className="font-semibold text-neutral-900 hover:underline">
              {PORTFOLIO_IDENTITY.email}
            </a>
          </div>
          <div className="border-t border-neutral-100 pt-2 mt-2">
            <p className="text-xs font-medium text-neutral-500">Professional Reference</p>
            <p className="text-sm font-semibold text-neutral-900 mt-0.5">
              {PORTFOLIO_IDENTITY.reference.name}
            </p>
            <p className="text-xs text-neutral-600">
              {PORTFOLIO_IDENTITY.reference.role} ·{' '}
              <a
                href={PORTFOLIO_IDENTITY.reference.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-900"
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
