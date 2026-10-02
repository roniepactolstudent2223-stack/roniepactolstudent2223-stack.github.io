'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import ArchitectureDiagram from '@/components/projects/ArchitectureDiagram'
import EngineeringDecisions from '@/components/projects/EngineeringDecisions'

interface ProjectDetailProps {
  project: Project
}

interface AtsBullet {
  title: string
  description: string
}

interface AtsMetric {
  value: string
  label: string
}

interface ImageCaption {
  title: string
  description: string
}

interface ProjectAtsData {
  summary: string
  stackSummary: string
  bullets: AtsBullet[]
  metrics: AtsMetric[]
  captions: ImageCaption[]
}

const ATS_DATA: Record<string, ProjectAtsData> = {
  'woh-attendance-system': {
    summary:
      'Production QR church attendance and member care management system built with Laravel and Vue.js for Word of Hope Caloocan. Connects directly to the main church website via REST API to sync member records, speed up lobby check-ins, and automate pastoral care for absentees.',
    stackSummary: 'Laravel (PHP), Vue.js, MySQL, REST API, Tailwind CSS',
    bullets: [
      {
        title: 'REST API Synchronization',
        description:
          'Architected a secure token-authenticated REST API with the church website (wohcaloocan.org) to query and verify member registrations in real-time, eliminating manual duplicate data entry.',
      },
      {
        title: 'High-Speed Kiosk Check-In',
        description:
          'Built client-side video camera QR decoding directly in Vue.js, reducing check-in latency to under 1.2 seconds per person and eliminating Sunday entrance queues.',
      },
      {
        title: 'Data Integrity & Deduplication',
        description:
          'Designed normalized MySQL schema with composite unique indexes on (member_id, service_session_id, scan_date), guaranteeing 100% duplicate-free headcounts during rapid scans.',
      },
      {
        title: 'Automated Pastoral Care',
        description:
          'Programmed automated query logic to identify members missing 2+ consecutive services, generating targeted follow-up lists for ministry leaders to conduct pastoral care visits.',
      },
      {
        title: 'Role-Based Access Control (RBAC)',
        description:
          'Implemented distinct authorization tiers for System Administrators, Ushers, and Pastors to protect member records and prevent unauthorized data modifications.',
      },
    ],
    metrics: [
      { value: '< 1.2s', label: 'Scan Latency' },
      { value: '0', label: 'Duplicate Scans' },
      { value: 'Mar 2025', label: 'Live in Production' },
      { value: '100%', label: 'Decoupled REST API' },
    ],
    captions: [
      {
        title: 'Main Church Website (wohcaloocan.org)',
        description: 'Primary source of truth for member registrations, integrated via secure REST API.',
      },
      {
        title: 'Admin Management Dashboard',
        description: 'Live attendance analytics, service breakdowns, and automated pastoral absentee care.',
      },
      {
        title: 'On-Site Check-in Kiosk',
        description: 'Touch kiosk deployed at the church entrance using Vue.js camera QR decoding for instant check-in.',
      },
    ],
  },
  'wilcon-enterprise-systems': {
    summary:
      '6 months of internal enterprise software development as a Full Stack Junior System Developer at Wilcon Depot, Inc. Developing and maintaining internal web applications using Laravel, Vue.js, and MySQL, integrating with Infor M3 ERP APIs, and handling retail financial voucher processing workflows.',
    stackSummary: 'Laravel, Vue.js, PHP, MySQL, Infor M3 ERP APIs, Git',
    bullets: [
      {
        title: 'Enterprise ERP Data Integration',
        description:
          'Maintained and developed internal enterprise web applications interfacing with Infor M3 corporate ERP APIs for branch ledger accounts, vendor IDs, and retail catalog synchronization.',
      },
      {
        title: 'Financial Voucher Processing',
        description:
          'Authored and maintained backend business logic for internal financial voucher workflows with high-precision decimal calculations (BCMath) and immutable audit trails.',
      },
      {
        title: 'System Analyst & QA Collaboration',
        description:
          'Collaborated daily with System Analysts and Quality Assurance (QA) engineers to test, debug, and ship production enterprise feature releases and bug fixes.',
      },
      {
        title: 'Deterministic Hand-Authored Code',
        description:
          'Authored manual SQL queries and clean business logic to handle complex retail edge cases with high precision, maintaining stability across daily enterprise operations.',
      },
    ],
    metrics: [
      { value: '6 mos', label: 'Enterprise Experience' },
      { value: 'Infor M3', label: 'ERP APIs' },
      { value: '100%', label: 'Hand-Crafted Logic' },
      { value: 'ACID', label: 'Transaction Safety' },
    ],
    captions: [
      {
        title: 'Developer Workstation Setup',
        description: 'Dual-monitor development setup for backend Laravel services and internal tools at Wilcon Depot.',
      },
      {
        title: 'Wilcon Depot Corporate Headquarters',
        description: 'Corporate office in Quezon City, supporting nationwide retail branch operations.',
      },
    ],
  },
  'wordpress-ph-community': {
    summary:
      'Active community involvement and volunteering with WordPress Philippines. Started as an attendee in 2025 eager to learn from web engineers, and stepped up in 2026 to serve as an official volunteer photographer documenting tech meetups and supporting the local developer community.',
    stackSummary: 'WordPress, PHP, Community Operations, Event Photography',
    bullets: [
      {
        title: 'Community Progression',
        description:
          'Advanced from an attendee in 2025 to an active volunteer photographer in 2026, documenting tech meetups and developer workshops across Metro Manila.',
      },
      {
        title: 'Technical Networking & Learning',
        description:
          'Actively engaged with local software engineers and open-source advocates, discussing CMS architecture, modern PHP development, and web best practices.',
      },
      {
        title: 'On-Site Event Operations',
        description:
          'Assisted community organizers with event setup, attendee reception, and professional media coverage for local developer gatherings.',
      },
    ],
    metrics: [
      { value: '2025–Pres', label: 'Community Active' },
      { value: 'Volunteer', label: 'Event Photographer' },
      { value: 'Meetups', label: 'Tech Gatherings' },
      { value: 'Open Source', label: 'Community Support' },
    ],
    captions: [
      {
        title: 'WordPress Philippines Meetup',
        description: 'Tech gathering and community discussions with local web developers and open-source contributors.',
      },
      {
        title: 'Co-Working & Collaboration Session',
        description: 'Community work session and technical discussions in Metro Manila.',
      },
    ],
  },
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const ats = ATS_DATA[project.slug]

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null)
    }
    if (lightboxImage) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxImage])

  return (
    <article className="min-h-screen p-6 sm:p-10 max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Back to all systems
        </Link>
      </div>

      {/* Header */}
      <header className="border-b border-neutral-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-neutral-900 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {project.category}
          </span>
          <span className="text-xs font-mono text-neutral-400">
            {project.year}
          </span>
          {project.slug === 'woh-attendance-system' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live in Production · Since March 2025
            </span>
          )}
          {project.slug === 'wordpress-ph-community' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-200">
              2025 Attendee → 2026 Volunteer
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          {project.title}
        </h1>

        {/* ATS Metadata Bar */}
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-600">
          <div>
            <span className="font-mono text-[10px] uppercase text-neutral-400">Role: </span>
            <span className="font-semibold text-neutral-900">{project.role}</span>
          </div>
          {project.client && (
            <div>
              <span className="font-mono text-[10px] uppercase text-neutral-400">Client / Org: </span>
              <span className="font-semibold text-neutral-900">{project.client}</span>
            </div>
          )}
          {ats?.stackSummary && (
            <div>
              <span className="font-mono text-[10px] uppercase text-neutral-400">Core Stack: </span>
              <span className="font-semibold text-neutral-900">{ats.stackSummary}</span>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-600">
          {ats?.summary || project.description}
        </p>

        {/* Live Link CTAs */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
            >
              {project.slug === 'woh-attendance-system' ? 'Open Live Kiosk ↗' : 'Visit Live Link ↗'}
            </a>
          )}
          {project.slug === 'woh-attendance-system' && (
            <a
              href="https://wohcaloocan.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
            >
              Church Website (wohcaloocan.org) ↗
            </a>
          )}
        </div>
      </header>

      {/* Visual Evidence Showcase — ALL AT ONCE (No clunky tab switcher) */}
      {project.images.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-baseline justify-between border-b border-neutral-200 pb-2">
            <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Production Screenshots &amp; Visual Evidence
            </h2>
            <span className="font-mono text-[10px] text-neutral-400">
              Click photo to enlarge
            </span>
          </div>

          <div
            className={`grid gap-5 ${
              project.images.length === 3
                ? 'grid-cols-1 md:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {project.images.map((src, index) => {
              const caption = ats?.captions[index] || {
                title: `Screenshot ${index + 1}`,
                description: '',
              }

              return (
                <div
                  key={index}
                  onClick={() => setLightboxImage(src)}
                  className="group cursor-pointer rounded-xl border border-neutral-200 bg-white p-2.5 transition-all hover:border-neutral-400 hover:shadow-md"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-lg bg-neutral-100 flex items-center justify-center">
                    <img
                      src={src}
                      alt={caption.title}
                      decoding="async"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2.5 px-1 pb-1">
                    <h3 className="text-xs font-semibold text-neutral-900">
                      {caption.title}
                    </h3>
                    {caption.description && (
                      <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                        {caption.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ATS Key Contributions & Measurable Results (STAR Format) */}
      {ats?.bullets && (
        <section className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 sm:p-7">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-5">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
              Key Contributions &amp; Measurable Results (ATS Summary)
            </h2>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5">
              Production Verified
            </span>
          </div>

          <ul className="space-y-4 text-xs sm:text-sm">
            {ats.bullets.map((bullet) => (
              <li key={bullet.title} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-900 shrink-0" />
                <div className="leading-relaxed text-neutral-700">
                  <strong className="font-semibold text-neutral-900">{bullet.title}: </strong>
                  {bullet.description}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ATS Key Metrics Strip */}
      {ats?.metrics && (
        <section className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ats.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-neutral-200 bg-white p-4 text-center sm:text-left shadow-xs"
            >
              <p className="font-mono text-xl sm:text-2xl font-bold text-neutral-900">
                {m.value}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mt-1">
                {m.label}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Technologies & Tools Pills */}
      {project.tags.length > 0 && (
        <section className="mt-8 border-t border-neutral-200 pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 font-mono text-[10px]">
            Technologies &amp; Environment
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-1 font-mono text-xs text-neutral-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Optional Collapsible Technical Architecture Deep-Dive (Kept out of the way for recruiters) */}
      {(project.slug === 'woh-attendance-system' || project.slug === 'wilcon-enterprise-systems') && (
        <details className="mt-10 group rounded-xl border border-neutral-200 bg-white overflow-hidden transition-all">
          <summary className="cursor-pointer select-none p-4 font-mono text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span>Technical Deep Dive (Architecture Flow &amp; Decisions)</span>
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-500 font-normal">
                Click to expand
              </span>
            </span>
            <span className="text-neutral-400 font-normal text-xs group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="p-6 border-t border-neutral-100 space-y-10 bg-neutral-50/40">
            <ArchitectureDiagram slug={project.slug} />
            <EngineeringDecisions slug={project.slug} />
          </div>
        </details>
      )}

      {/* Lightbox Modal for Enlargeable Screenshots */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-neutral-950 shadow-2xl border border-neutral-800"
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-neutral-900/80 p-2 text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close image preview"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex items-center justify-center p-3">
              <img
                src={lightboxImage}
                alt="Enlarged screenshot"
                className="max-h-[85vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
