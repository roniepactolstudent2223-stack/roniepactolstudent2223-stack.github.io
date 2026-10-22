'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PORTFOLIO_IDENTITY, PROJECT_INDEX } from '@/lib/portfolio-config'
import CompanyLogo from '@/components/work/CompanyLogo'

const PROJECT_TITLES: Record<string, string> = {
  'wilcon-month-end-closing': 'Month-End Closing System',
  'wilcon-collection-deposit-report': 'Collection & Deposit Report Modification',
  'wilcon-enterprise-systems': 'Enterprise Web Apps & ERP Workflows',
  'woh-attendance-system': 'WOH Attendance & Member Care System',
}

export default function WorkPage() {
  const { workExperience } = PORTFOLIO_IDENTITY
  const [zoomPhoto, setZoomPhoto] = useState<{
    src: string
    caption: string
    company: string
    role: string
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
        {/* Page Header */}
        <header className="border-b border-rule/60 pb-8">
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
            Career Ledger · Newest First
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Work &amp; Community Experience
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            From working student in college to HR operations and 6 months building production finance software at Wilcon Depot, Inc.
          </p>

          {/* Soft Career Progression Strip (No boxy outer border) */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <div className="bg-paper-deep/45 p-3">
              <p className="ledger-figures text-[10px] text-ink-soft">2024 · Working Student</p>
              <p className="mt-0.5 text-xs font-medium text-ink">Jollibee Service Crew</p>
            </div>
            <div className="bg-paper-deep/45 p-3">
              <p className="ledger-figures text-[10px] text-ink-soft">2025 · Graduate</p>
              <p className="mt-0.5 text-xs font-medium text-ink">BS Information Technology</p>
            </div>
            <div className="bg-paper-deep/45 p-3">
              <p className="ledger-figures text-[10px] text-ink-soft">2025–2026 · Absorbed OJT</p>
              <p className="mt-0.5 text-xs font-medium text-ink">Radiant Force HR Assistant</p>
            </div>
            <div className="border-l-2 border-ledger bg-ledger/12 p-3">
              <p className="ledger-figures text-[10px] font-medium text-ledger">2026 · Enterprise Dev</p>
              <p className="mt-0.5 text-xs font-medium text-ink">Wilcon Depot Full Stack Dev</p>
            </div>
          </div>
        </header>

        {/* Structured Left-Meta / Right-Content Experience Entries */}
        <div className="divide-y divide-rule/60">
          {workExperience.map((role, index) => {
            const photos = (role as { photos?: readonly string[] }).photos || []
            const captions = (role as { photoCaptions?: readonly string[] }).photoCaptions || []
            const relatedSlugs = (role as { relatedProjects?: readonly string[] }).relatedProjects || []

            return (
              <article
                key={role.company}
                className="py-10 grid gap-6 md:grid-cols-[13.5rem_1fr] md:items-start md:gap-8"
              >
                {/* Left Column: Company Logo, Period, Location & Progression */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 bg-white p-1.5 shadow-2xs">
                      <CompanyLogo company={role.company} logoUrl={role.logoUrl} size={38} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{role.company}</p>
                      <p className="ledger-figures text-[11px] text-ledger font-medium">
                        {role.period}
                      </p>
                    </div>
                  </div>

                  {role.location && (
                    <p className="ledger-figures text-xs text-ink-soft">
                      {role.location}
                    </p>
                  )}

                  {role.progression && (
                    <span className="ledger-figures inline-block bg-ledger/12 px-2.5 py-1 text-[11px] font-medium text-ledger">
                      ✓ {role.progression}
                    </span>
                  )}

                  {role.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {role.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="ledger-figures bg-paper-deep/75 px-2 py-0.5 text-[11px] text-ink"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Role Title, Summary, Workplace Photos, Responsibilities & Case Studies */}
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="ledger-figures text-xs text-ink-soft">0{index + 1}</span>
                    <h2 className="font-serif text-2xl font-medium text-ink sm:text-[1.7rem]">
                      {role.role}
                    </h2>
                  </div>

                  {role.highlight && (
                    <div className="mt-4 border-l-2 border-ledger bg-paper-deep/55 py-2.5 pl-4 pr-3">
                      <p className="text-[15px] leading-relaxed text-ink">
                        {role.highlight}
                      </p>
                    </div>
                  )}

                  {/* Workplace / Event Visuals (Only photos keep a clean white frame) */}
                  {photos.length > 0 && (
                    <div className="mt-5">
                      <div
                        className={`grid gap-3 ${
                          photos.length > 1
                            ? 'grid-cols-1 sm:grid-cols-2'
                            : 'grid-cols-1 sm:max-w-sm'
                        }`}
                      >
                        {photos.map((src, pIdx) => {
                          const cap = captions[pIdx] || `${role.company} — Photo ${pIdx + 1}`
                          return (
                            <button
                              key={src}
                              type="button"
                              onClick={() =>
                                setZoomPhoto({
                                  src,
                                  caption: cap,
                                  company: role.company,
                                  role: role.role,
                                })
                              }
                              className="group relative block cursor-pointer overflow-hidden border border-rule/80 bg-white p-1.5 text-left shadow-xs transition-all hover:border-ink"
                            >
                              <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-deep">
                                <img
                                  src={src}
                                  alt={cap}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-ink/75 px-2.5 py-1.5 text-paper backdrop-blur-md">
                                  <span className="truncate text-xs font-medium text-paper">
                                    {cap}
                                  </span>
                                  <span className="ledger-figures shrink-0 text-[10px] text-paper/85">
                                    ⤢
                                  </span>
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities on Soft Surfaces (No harsh borders) */}
                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {role.evidence.map((item, evIdx) => (
                      <div key={item.label} className="bg-paper-deep/40 p-3.5">
                        <div className="flex items-center gap-2">
                          <span className="ledger-figures text-[11px] font-medium text-ledger">
                            0{evIdx + 1}
                          </span>
                          <h3 className="text-sm font-medium text-ink">{item.label}</h3>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Connected Case Study Links (Soft surface cards, no duplicate thumbnails) */}
                  {relatedSlugs.length > 0 && (
                    <div className="mt-5">
                      <p className="ledger-figures mb-2 text-[11px] uppercase tracking-[0.08em] text-ledger font-medium">
                        Connected Case Studies
                      </p>
                      <div className="grid gap-2.5 sm:grid-cols-3">
                        {relatedSlugs.map((slug) => {
                          const meta = PROJECT_INDEX.find((p) => p.slug === slug)
                          const title = PROJECT_TITLES[slug] || slug
                          return (
                            <Link
                              key={slug}
                              href={`/projects/${slug}`}
                              className="group flex flex-col justify-between bg-paper-deep/55 p-3 transition-colors hover:bg-paper-deep"
                            >
                              <div>
                                <h4 className="text-xs font-medium leading-snug text-ink group-hover:text-ledger transition-colors">
                                  {title}
                                </h4>
                                {meta && (
                                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-soft">
                                    {meta.result}
                                  </p>
                                )}
                              </div>
                              <span className="ledger-figures mt-2 inline-block text-[11px] font-medium text-ink group-hover:translate-x-0.5 transition-transform">
                                View case study →
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
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
            <div className="mb-3 flex items-center justify-between pb-2">
              <div>
                <p className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                  {zoomPhoto.company} · {zoomPhoto.role}
                </p>
                <h3 className="text-sm font-medium text-ink">{zoomPhoto.caption}</h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomPhoto(null)}
                className="ledger-figures cursor-pointer bg-ink px-3 py-1 text-xs text-paper"
              >
                Close ✕
              </button>
            </div>
            <div className="flex items-center justify-center bg-white p-2">
              <img
                src={zoomPhoto.src}
                alt={zoomPhoto.caption}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
