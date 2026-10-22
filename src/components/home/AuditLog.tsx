'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface TechExperienceEntry {
  when: string
  role: string
  where: string
  logo?: string
  badge?: string
  coeUrl?: string
  coePdfUrl?: string
  stack?: string[]
  deliverables?: string[]
  photos?: { src: string; caption: string }[]
  caseStudies?: { slug: string; label: string }[]
}

const TECH_EXPERIENCE: TechExperienceEntry[] = [
  {
    when: 'May 28 – Oct 22, 2026',
    role: 'Full Stack Junior System Developer',
    where: 'Wilcon Depot, Inc.',
    logo: '/logos/wilcon.png',
    coeUrl: 'https://drive.google.com/file/d/1rMC9GD5x8NFLZ40nG5kf7Afc083rLxwG/view?usp=sharing',
    coePdfUrl: '/certificates/Wilcon_Depot_COE.pdf',
    stack: ['Laravel', 'Vue.js', 'PHP', 'JavaScript', 'MySQL', 'REST APIs', 'Git'],
    deliverables: [
      'Month-End Closing Web App (GL & Approvals)',
      'Treasury Collection & Deposit Report Upgrade',
      'ERP Account & Vendor Data Sync',
      'SQL Query & Financial Report Optimization',
    ],
    caseStudies: [
      { slug: 'wilcon-month-end-closing', label: 'Month-End Closing' },
      { slug: 'wilcon-collection-deposit-report', label: 'Treasury Report' },
      { slug: 'wilcon-enterprise-systems', label: 'ERP Workflows' },
    ],
  },
  {
    when: '2025 – Present',
    role: 'Solo Full Stack Developer',
    where: 'Word of Hope Caloocan',
    badge: 'WOH',
    stack: ['Laravel 12', 'PHP', 'MySQL', 'Tailwind CSS', 'QR Scanner API'],
    deliverables: [
      'Real-Time QR Check-In Kiosk',
      'Admin Attendance & Analytics Dashboard',
      '1–4 Week Absentee Care Queue',
      'Printable Member QR ID Generator',
    ],
    caseStudies: [
      { slug: 'woh-attendance-system', label: 'WOH Attendance System' },
    ],
  },
  {
    when: '2025 – 2026',
    role: 'Volunteer & Event Photographer',
    where: 'WordPress Philippines',
    logo: '/logos/wordpress.png',
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
    when: '2021 – 2025',
    role: 'BS Information Technology',
    where: 'Access Computer College',
    badge: 'BSIT',
    deliverables: [
      'Full-Stack Web Systems Capstone',
      'TESDA NC II Computer Systems Servicing',
    ],
  },
]

export default function AuditLog() {
  const [modalPhoto, setModalPhoto] = useState<{
    src: string
    caption: string
    role: string
    where: string
    externalUrl?: string
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
    <section aria-labelledby="experience-title" className="border-t border-rule/60 px-6 py-12 sm:py-14">
      <div className="max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="experience-title"
            className="font-serif text-[1.75rem] font-medium leading-tight text-ink sm:text-3xl"
          >
            Experience &amp; Education
          </h2>

          <Link
            href="/work"
            className="ledger-figures text-xs text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            Full work log →
          </Link>
        </div>

        <ol className="mt-6 divide-y divide-rule/50">
          {TECH_EXPERIENCE.map((entry) => (
            <li key={`${entry.when}-${entry.where}`} className="py-6">
              <div className="grid gap-x-6 gap-y-3 sm:grid-cols-[11rem_1fr]">
                {/* Left: Date & Organization */}
                <div className="flex items-start justify-between sm:block">
                  <span className="ledger-figures block text-xs text-ink-soft">
                    {entry.when}
                  </span>

                  <div className="mt-2 flex items-center gap-2">
                    {entry.logo ? (
                      <div className="flex h-8 w-8 items-center justify-center bg-white p-1 shadow-2xs">
                        <img
                          src={entry.logo}
                          alt={entry.where}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : entry.badge ? (
                      <div className="ledger-figures flex h-8 w-8 items-center justify-center bg-paper-deep text-[11px] font-medium text-ink">
                        {entry.badge}
                      </div>
                    ) : null}
                    <span className="text-xs font-medium text-ink">{entry.where}</span>
                  </div>
                </div>

                {/* Right: Role, Stack Pills, Deliverables & Unique Photos */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-xl font-medium leading-snug text-ink">
                      {entry.role}
                    </h3>

                    {entry.coePdfUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setModalPhoto({
                            src: entry.coePdfUrl!,
                            caption: 'Certificate of Employment · Wilcon Depot, Inc.',
                            role: entry.role,
                            where: entry.where,
                            externalUrl: entry.coeUrl,
                          })
                        }
                        className="ledger-figures cursor-pointer bg-ledger/12 px-2.5 py-1 text-xs font-medium text-ledger transition-colors hover:bg-ledger hover:text-paper"
                      >
                        Certificate of Employment (COE) ↗
                      </button>
                    )}
                  </div>

                  {entry.stack && entry.stack.length > 0 && (
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {entry.stack.map((tech) => (
                        <li
                          key={tech}
                          className="ledger-figures bg-paper-deep/85 px-2.5 py-0.5 text-xs font-medium text-ink"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.deliverables && entry.deliverables.length > 0 && (
                    <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {entry.deliverables.map((item) => (
                        <li
                          key={item}
                          className="truncate bg-paper-deep/40 px-2.5 py-1.5 text-xs text-ink"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.photos && entry.photos.length > 0 && (
                    <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {entry.photos.map((photo) => (
                        <button
                          key={photo.src}
                          type="button"
                          onClick={() =>
                            setModalPhoto({
                              src: photo.src,
                              caption: photo.caption,
                              role: entry.role,
                              where: entry.where,
                            })
                          }
                          className="group relative block cursor-pointer overflow-hidden border border-rule/80 bg-white p-1 text-left shadow-2xs transition-all hover:border-ink"
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-deep">
                            <img
                              src={photo.src}
                              alt={photo.caption}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-ink/80 px-2.5 py-1.5 text-paper backdrop-blur-md">
                              <span className="block truncate text-[11px] font-medium text-paper">
                                {photo.caption}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {entry.caseStudies && entry.caseStudies.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      {entry.caseStudies.map((cs) => (
                        <Link
                          key={cs.slug}
                          href={`/projects/${cs.slug}`}
                          className="ledger-figures inline-flex items-center gap-1 text-xs font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                        >
                          {cs.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {modalPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-4xl overflow-hidden bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 pb-2">
              <div>
                <p className="ledger-figures text-xs text-ink-soft">
                  {modalPhoto.where} · {modalPhoto.role}
                </p>
                <p className="text-sm font-medium text-ink">{modalPhoto.caption}</p>
              </div>
              <div className="flex items-center gap-2">
                {modalPhoto.externalUrl && (
                  <a
                    href={modalPhoto.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ledger-figures bg-ledger px-3 py-1 text-xs font-medium text-paper hover:bg-ink"
                  >
                    Open in Google Drive ↗
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setModalPhoto(null)}
                  className="ledger-figures cursor-pointer bg-ink px-3 py-1 text-xs text-paper"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center bg-white p-2">
              {modalPhoto.src.endsWith('.pdf') ? (
                <iframe
                  src={modalPhoto.src}
                  className="h-[72vh] w-full border-0"
                  title={modalPhoto.caption}
                />
              ) : (
                <img
                  src={modalPhoto.src}
                  alt={modalPhoto.caption}
                  className="max-h-[75vh] w-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
