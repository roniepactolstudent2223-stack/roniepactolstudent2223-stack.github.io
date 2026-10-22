'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import CompanyLogo from '@/components/work/CompanyLogo'

interface VisualWorkEntry {
  company: string
  role: string
  period: string
  location: string
  logoUrl?: string
  coeUrl?: string
  coePdfUrl?: string
  stack?: string[]
  modules?: string[]
  photos: { src: string; caption: string }[]
  caseStudies?: { slug: string; title: string; tag: string }[]
}

const VISUAL_WORK_ENTRIES: VisualWorkEntry[] = [
  {
    company: 'Wilcon Depot, Inc.',
    role: 'Full Stack Junior System Developer',
    period: 'May 28, 2026 – Oct 22, 2026',
    location: 'Quezon City · Head Office',
    logoUrl: '/logos/wilcon.png',
    coeUrl: 'https://drive.google.com/file/d/1rMC9GD5x8NFLZ40nG5kf7Afc083rLxwG/view?usp=sharing',
    coePdfUrl: '/certificates/Wilcon_Depot_COE.pdf',
    stack: ['Laravel', 'Vue.js', 'PHP', 'JavaScript', 'MySQL', 'REST APIs', 'Git'],
    modules: [
      'Month-End Closing Web App (GL & Approvals)',
      'Collection & Deposit Report Modification',
      'ERP Account & Vendor Master Sync',
      'Multi-Step Voucher Approval Routing',
    ],
    photos: [
      {
        src: '/wilcon-workstation.webp',
        caption: 'Developer Workstation · Wilcon Depot',
      },
      {
        src: '/wilcon-building.webp',
        caption: 'Wilcon Depot Headquarters · Quezon City',
      },
    ],
    caseStudies: [
      {
        slug: 'wilcon-month-end-closing',
        title: 'Month-End Closing System',
        tag: 'Laravel · Vue.js · GL Sync',
      },
      {
        slug: 'wilcon-collection-deposit-report',
        title: 'Collection & Deposit Report',
        tag: 'PHP · MySQL · PDF/Excel',
      },
      {
        slug: 'wilcon-enterprise-systems',
        title: 'Enterprise ERP Workflows',
        tag: 'REST APIs · ERP Sync',
      },
    ],
  },
  {
    company: 'Word of Hope Caloocan',
    role: 'Solo Full Stack Developer',
    period: 'Mar 2025 – Present · Production',
    location: 'Caloocan City · Live System',
    logoUrl: undefined,
    stack: ['Laravel 12', 'PHP', 'MySQL', 'Tailwind CSS', 'QR Scanner API'],
    modules: [
      'Camera & Handheld QR Scanner Kiosk',
      'Real-Time Sunday Service Dashboard',
      '1–4 Week Absentee Follow-Up Tracker',
      'Printable Member QR ID Generator',
    ],
    photos: [
      {
        src: '/woh-pilot.webp',
        caption: 'Live QR Check-In Kiosk · Word of Hope',
      },
      {
        src: '/woh-admin.webp',
        caption: 'Attendance & Absentee Care Dashboard',
      },
    ],
    caseStudies: [
      {
        slug: 'woh-attendance-system',
        title: 'WOH QR Attendance System',
        tag: 'Laravel 12 · MySQL · QR API',
      },
    ],
  },
  {
    company: 'WordPress Philippines',
    role: 'Volunteer & Event Photographer',
    period: '2025 – 2026 · Community',
    location: 'Metro Manila',
    logoUrl: '/logos/wordpress.png',
    photos: [
      {
        src: '/wp-community-1.webp',
        caption: 'Software Freedom Day 2026 Manila',
      },
      {
        src: '/wp-community-2.webp',
        caption: 'WordPress Manila Meetup · July 2026',
      },
    ],
  },
  {
    company: 'Radiant Force Human Resources',
    role: 'HR Assistant & IT Support (OJT)',
    period: 'Sep 2025 – Jan 2026 · 5 mos',
    location: 'Quezon City · On-site',
    logoUrl: undefined,
    modules: [
      'Employee 201 File & Database Records',
      'Internal Office IT & Hardware Support',
    ],
    photos: [
      {
        src: '/certificates/OJT coc .webp',
        caption: 'OJT Certificate of Completion · Radiant Force HR',
      },
    ],
  },
]

export default function WorkPage() {
  const [zoomPhoto, setZoomPhoto] = useState<{
    src: string
    caption: string
    company: string
    role: string
    externalUrl?: string
  } | null>(null)

  useEffect(() => {
    if (!zoomPhoto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomPhoto(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoomPhoto])

  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="max-w-4xl">
        {/* Clean Header */}
        <header className="border-b border-rule/60 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              Work Experience
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={PORTFOLIO_IDENTITY.coeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ledger-figures inline-flex items-center gap-1.5 bg-ledger px-3.5 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink"
              >
                Wilcon Depot COE ↗
              </a>
              <a
                href={PORTFOLIO_IDENTITY.resumeDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ledger-figures inline-flex items-center gap-1.5 bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
              >
                Resume (Google Doc) ↗
              </a>
            </div>
          </div>
        </header>

        {/* Visual Role Cards */}
        <div className="mt-8 space-y-9">
          {VISUAL_WORK_ENTRIES.map((role) => (
            <article
              key={role.company}
              className="bg-paper-deep/30 p-5 sm:p-6 space-y-5"
            >
              {/* Top Role & Company Header */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-rule/50 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="shrink-0 bg-white p-1.5 shadow-2xs">
                    <CompanyLogo company={role.company} logoUrl={role.logoUrl} size={42} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-medium leading-tight text-ink">
                      {role.role}
                    </h2>
                    <p className="mt-0.5 text-xs font-medium text-ink-soft">
                      {role.company} · {role.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                  <span className="ledger-figures bg-paper px-3 py-1 text-xs font-medium text-ledger shadow-2xs">
                    {role.period}
                  </span>

                  {role.coePdfUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setZoomPhoto({
                          src: role.coePdfUrl!,
                          caption: 'Certificate of Employment · Wilcon Depot, Inc.',
                          company: role.company,
                          role: role.role,
                          externalUrl: role.coeUrl,
                        })
                      }
                      className="ledger-figures cursor-pointer bg-ink px-3 py-1 text-xs font-medium text-paper transition-colors hover:bg-ledger"
                    >
                      View COE
                    </button>
                  )}
                </div>
              </div>

              {/* Large Workplace / Event Visual Gallery */}
              {role.photos.length > 0 && (
                <div
                  className={`grid gap-3.5 ${
                    role.photos.length > 1
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-1 sm:max-w-md'
                  }`}
                >
                  {role.photos.map((photo) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() =>
                        setZoomPhoto({
                          src: photo.src,
                          caption: photo.caption,
                          company: role.company,
                          role: role.role,
                        })
                      }
                      className="group relative block cursor-pointer overflow-hidden border border-rule/80 bg-white p-1.5 text-left shadow-xs transition-all hover:border-ink"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-deep">
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-ink/82 px-3 py-1.5 text-paper backdrop-blur-md">
                          <span className="truncate text-xs font-medium text-paper">
                            {photo.caption}
                          </span>
                          <span className="ledger-figures shrink-0 text-[10px] text-paper/85">
                            View
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Tech Stack + Deliverables */}
              {(role.stack || role.modules) && (
                <div className="space-y-3 pt-1">
                  {role.stack && role.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {role.stack.map((tech) => (
                        <span
                          key={tech}
                          className="ledger-figures bg-ink px-2.5 py-1 text-xs font-medium text-paper"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {role.modules && role.modules.length > 0 && (
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {role.modules.map((mod) => (
                        <li
                          key={mod}
                          className="bg-paper/85 px-3 py-2 text-xs font-medium text-ink shadow-2xs"
                        >
                          {mod}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Connected System Case Studies */}
              {role.caseStudies && role.caseStudies.length > 0 && (
                <div className="pt-2 border-t border-rule/40 grid gap-2.5 sm:grid-cols-3">
                  {role.caseStudies.map((cs) => (
                    <Link
                      key={cs.slug}
                      href={`/projects/${cs.slug}`}
                      className="group flex items-center justify-between gap-2 bg-paper px-3.5 py-2.5 shadow-2xs transition-colors hover:bg-ink hover:text-paper"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-ink group-hover:text-paper">
                          {cs.title}
                        </p>
                        <p className="ledger-figures truncate text-[10px] text-ink-soft group-hover:text-paper/75">
                          {cs.tag}
                        </p>
                      </div>
                      <span className="ledger-figures shrink-0 text-xs font-medium text-ledger group-hover:text-paper">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Photo & PDF COE Lightbox Modal */}
      {zoomPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-4xl overflow-hidden bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 pb-2">
              <div>
                <p className="ledger-figures text-xs text-ink-soft">
                  {zoomPhoto.company} · {zoomPhoto.role}
                </p>
                <h3 className="text-sm font-medium text-ink">{zoomPhoto.caption}</h3>
              </div>

              <div className="flex items-center gap-2">
                {zoomPhoto.externalUrl && (
                  <a
                    href={zoomPhoto.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ledger-figures bg-ledger px-3 py-1 text-xs font-medium text-paper hover:bg-ink"
                  >
                    Open in Google Drive ↗
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setZoomPhoto(null)}
                  className="ledger-figures cursor-pointer bg-ink px-3 py-1 text-xs text-paper"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white p-2">
              {zoomPhoto.src.endsWith('.pdf') ? (
                <iframe
                  src={zoomPhoto.src}
                  className="h-[72vh] w-full border-0"
                  title={zoomPhoto.caption}
                />
              ) : (
                <img
                  src={zoomPhoto.src}
                  alt={zoomPhoto.caption}
                  className="max-h-[75vh] w-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
