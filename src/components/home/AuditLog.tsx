'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CAREER_LOG, PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

const ORG_LOGOS: Record<string, string> = {
  'Wilcon Depot, Inc.': '/logos/wilcon.png',
  'WordPress Philippines': '/logos/wordpress.png',
  'Jollibee Foods Corp.': '/logos/jollibee.png',
}

const ORG_BADGES: Record<string, string> = {
  'Radiant Force Human Resources': 'RF',
  'Access Computer College': 'BSIT',
  'Word of Hope Caloocan': 'WOH',
}

interface RoleVisualConfig {
  photos: { src: string; caption: string }[]
  evidence?: readonly { readonly label: string; readonly detail: string }[]
  caseStudies?: { slug: string; label: string }[]
  badge?: string
}

const ROLE_VISUALS: Record<string, RoleVisualConfig> = {
  'Wilcon Depot, Inc.': {
    badge: '6 Months · Enterprise Software',
    photos: [
      {
        src: '/wilcon-workstation.webp',
        caption: 'Developer Workstation at Wilcon Depot · Dual-Monitor Laravel & Vue.js Setup',
      },
      {
        src: '/wilcon-building.webp',
        caption: 'Wilcon Depot Corporate Headquarters · Quezon City',
      },
    ],
    evidence: PORTFOLIO_IDENTITY.workExperience[0]?.evidence,
    caseStudies: [
      { slug: 'wilcon-month-end-closing', label: 'Month-End Closing Case Study' },
      { slug: 'wilcon-collection-deposit-report', label: 'Treasury Report Case Study' },
      { slug: 'wilcon-enterprise-systems', label: 'ERP & Voucher Workflows' },
    ],
  },
  'WordPress Philippines': {
    badge: '2025 Attendee → 2026 Volunteer',
    photos: [
      {
        src: '/wp-community-1.webp',
        caption: 'Software Freedom Day 2026 Manila · Volunteer Photographer',
      },
      {
        src: '/wp-community-2.webp',
        caption: 'WordPress Manila Meetup (July 2026) · Common Ground Don Antonio',
      },
    ],
    evidence: PORTFOLIO_IDENTITY.workExperience[1]?.evidence,
    caseStudies: [
      { slug: 'wordpress-ph-community', label: 'Community & Volunteering Case Study' },
    ],
  },
  'Radiant Force Human Resources': {
    badge: 'OJT → Absorbed as HR Assistant',
    photos: [
      {
        src: '/certificates/OJT coc .webp',
        caption: 'OJT Certificate of Completion · Absorbed into HR Assistant Role',
      },
    ],
    evidence: PORTFOLIO_IDENTITY.workExperience[2]?.evidence,
  },
  'Word of Hope Caloocan': {
    badge: 'Live Every Sunday Since Mar 2025',
    photos: [
      {
        src: '/woh-pilot.webp',
        caption: 'WOH QR Attendance Kiosk Deployed at the Church Entrance',
      },
      {
        src: '/woh-admin.webp',
        caption: 'Admin Dashboard & Absentee Care Follow-Up System',
      },
    ],
    caseStudies: [
      { slug: 'woh-attendance-system', label: 'WOH Attendance Case Study' },
    ],
  },
}

/**
 * Experience and education section with workplace/event photos, frosted-blur
 * caption bars, expandable role responsibilities, and case study links.
 */
export default function AuditLog() {
  const [modalPhoto, setModalPhoto] = useState<{
    src: string
    caption: string
    role: string
    where: string
  } | null>(null)

  useEffect(() => {
    if (!modalPhoto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalPhoto(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modalPhoto])

  return (
    <section aria-labelledby="experience-title" className="border-t border-rule px-6 py-12 sm:py-16">
      <div className="max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
              Audit log · newest first
            </p>
            <h2
              id="experience-title"
              className="mt-2 font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl"
            >
              Experience and education
            </h2>
          </div>

          <Link
            href="/work"
            className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            Full work experience page →
          </Link>
        </div>

        <ol className="mt-8">
          {CAREER_LOG.map((entry, idx) => {
            const logo = ORG_LOGOS[entry.where]
            const badge = ORG_BADGES[entry.where]
            const visual = ROLE_VISUALS[entry.where]
            const isFeatured = idx === 0

            return (
              <li
                key={`${entry.when}-${entry.what}`}
                className={`border-t border-rule py-6 ${
                  isFeatured ? 'border-l-2 border-l-ledger bg-paper-deep/45 pl-4 pr-3' : ''
                }`}
              >
                <div className="grid gap-x-6 gap-y-3 sm:grid-cols-[11.5rem_1fr]">
                  {/* Left: Date & Progression Badge */}
                  <div className="sm:pt-0.5">
                    <span className="ledger-figures block text-xs text-ink-soft">
                      {entry.when}
                    </span>
                    {visual?.badge && (
                      <span className="ledger-figures mt-1.5 inline-block border border-ledger/35 bg-ledger/10 px-2 py-0.5 text-[10px] font-medium text-ledger">
                        {visual.badge}
                      </span>
                    )}
                  </div>

                  {/* Right: Role Info, Visual Photos, Responsibilities, and Case Study Links */}
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-medium leading-snug text-ink">
                          {entry.what}
                        </p>
                        <p className="mt-0.5 text-[15px] leading-relaxed text-ink-soft">
                          <span className="font-medium text-ink">{entry.where}</span>
                          {entry.note ? ` · ${entry.note}` : ''}
                        </p>
                      </div>

                      {logo ? (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-rule bg-white p-1.5 shadow-2xs">
                          <img
                            src={logo}
                            alt={entry.where}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : badge ? (
                        <div className="ledger-figures flex h-10 w-10 shrink-0 items-center justify-center border border-rule bg-paper-deep text-xs font-medium text-ink">
                          {badge}
                        </div>
                      ) : null}
                    </div>

                    {/* Visual Workplace / Event Photos with Small Blurred-Back Bar */}
                    {visual?.photos && visual.photos.length > 0 && (
                      <div
                        className={`mt-4 grid gap-3 ${
                          visual.photos.length > 1
                            ? 'grid-cols-1 sm:grid-cols-2'
                            : 'grid-cols-1 max-w-xs'
                        }`}
                      >
                        {visual.photos.map((photo) => (
                          <button
                            key={photo.src}
                            type="button"
                            onClick={() =>
                              setModalPhoto({
                                src: photo.src,
                                caption: photo.caption,
                                role: entry.what,
                                where: entry.where,
                              })
                            }
                            className="group relative block cursor-pointer overflow-hidden border border-rule bg-white p-1 text-left shadow-2xs transition-all hover:border-ink"
                          >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-deep">
                              <img
                                src={photo.src}
                                alt={photo.caption}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-white/15 bg-ink/75 px-2.5 py-1.5 text-paper backdrop-blur-md">
                                <span className="truncate text-[11px] font-medium text-paper/95">
                                  {photo.caption}
                                </span>
                                <span className="ledger-figures shrink-0 text-[10px] text-paper/85">
                                  Zoom ⤢
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Expandable Role Responsibilities */}
                    {visual?.evidence && visual.evidence.length > 0 && (
                      <details className="group mt-3">
                        <summary className="inline-flex min-h-[32px] cursor-pointer list-none items-center gap-2 text-sm text-ink-soft hover:text-ink [&::-webkit-details-marker]:hidden">
                          <span className="underline decoration-rule underline-offset-4 group-hover:decoration-ink">
                            Role responsibilities &amp; highlights
                          </span>
                          <span className="ledger-figures text-xs transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <dl className="mt-3 space-y-2.5 border-t border-rule pt-3 text-sm">
                          {visual.evidence.map((ev) => (
                            <div
                              key={ev.label}
                              className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
                            >
                              <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ledger font-medium sm:pt-0.5">
                                {ev.label}
                              </dt>
                              <dd className="leading-relaxed text-ink">{ev.detail}</dd>
                            </div>
                          ))}
                        </dl>
                      </details>
                    )}

                    {/* Connected Case Studies */}
                    {visual?.caseStudies && visual.caseStudies.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                        {visual.caseStudies.map((cs) => (
                          <Link
                            key={cs.slug}
                            href={`/projects/${cs.slug}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
                          >
                            {cs.label}
                            <span aria-hidden="true">→</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>

        <div className="rule-single" aria-hidden="true" />
      </div>

      {/* Workplace / Event Photo Zoom Modal */}
      {modalPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-4xl overflow-hidden border border-rule bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between border-b border-rule pb-2.5">
              <div>
                <p className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                  {modalPhoto.where} · {modalPhoto.role}
                </p>
                <p className="text-sm font-medium text-ink">{modalPhoto.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setModalPhoto(null)}
                className="ledger-figures cursor-pointer border border-ink bg-ink px-3 py-1 text-xs text-paper"
              >
                Close ✕
              </button>
            </div>
            <div className="flex items-center justify-center border border-rule bg-white p-2">
              <img
                src={modalPhoto.src}
                alt={modalPhoto.caption}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
