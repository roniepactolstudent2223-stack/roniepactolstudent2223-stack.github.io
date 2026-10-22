'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PORTFOLIO_IDENTITY, PROJECT_INDEX } from '@/lib/portfolio-config'
import CompanyLogo from '@/components/work/CompanyLogo'

const PROJECT_COVERS: Record<string, string> = {
  'wilcon-month-end-closing': '/wilcon-closing-status.png',
  'wilcon-collection-deposit-report': '/wilcon-cdr-branch.png',
  'wilcon-enterprise-systems': '/wilcon-workstation.webp',
  'woh-attendance-system': '/woh-pilot.webp',
  'wordpress-ph-community': '/wp-community-1.webp',
}

const PROJECT_TITLES: Record<string, string> = {
  'wilcon-month-end-closing': 'Month-End Closing System',
  'wilcon-collection-deposit-report': 'Collection & Deposit Report Modification',
  'wilcon-enterprise-systems': 'Enterprise Web Apps & ERP Workflows',
  'woh-attendance-system': 'WOH Attendance & Member Care System',
  'wordpress-ph-community': 'WordPress Philippines Community & Volunteering',
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
        <header className="pb-6">
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
            Career Ledger · Newest First
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Work &amp; Community Experience
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            From working student in college to HR operations and 6 months building production finance software at Wilcon Depot, Inc. Click any workplace photo to zoom in or open the connected case studies below each role.
          </p>

          {/* Visual Career Progression Strip */}
          <div className="mt-6 grid grid-cols-2 gap-2 border border-rule bg-paper-deep/50 p-3 sm:grid-cols-4">
            <div className="border-l-2 border-rule pl-2.5">
              <p className="ledger-figures text-[10px] text-ink-soft">2024 · Working Student</p>
              <p className="text-xs font-medium text-ink">Jollibee Service Crew</p>
            </div>
            <div className="border-l-2 border-rule pl-2.5">
              <p className="ledger-figures text-[10px] text-ink-soft">2025 · Graduate</p>
              <p className="text-xs font-medium text-ink">BS Information Technology</p>
            </div>
            <div className="border-l-2 border-rule pl-2.5">
              <p className="ledger-figures text-[10px] text-ink-soft">2025–2026 · Absorbed OJT</p>
              <p className="text-xs font-medium text-ink">Radiant Force HR Assistant</p>
            </div>
            <div className="border-l-2 border-ledger bg-ledger/10 py-0.5 pl-2.5">
              <p className="ledger-figures text-[10px] font-medium text-ledger">2026 · Enterprise Dev</p>
              <p className="text-xs font-medium text-ink">Wilcon Depot Full Stack Dev</p>
            </div>
          </div>
        </header>

        {/* Experience Role Entries */}
        <div className="mt-4 space-y-10">
          {workExperience.map((role, index) => {
            const photos = (role as { photos?: readonly string[] }).photos || []
            const captions = (role as { photoCaptions?: readonly string[] }).photoCaptions || []
            const relatedSlugs = (role as { relatedProjects?: readonly string[] }).relatedProjects || []
            const isPrimary = index === 0

            return (
              <article
                key={role.company}
                className={`border-t border-rule pt-8 ${
                  isPrimary ? 'border-t-2 border-t-ink' : ''
                }`}
              >
                {/* Role Header */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 border border-rule bg-white p-1.5 shadow-2xs">
                    <CompanyLogo company={role.company} logoUrl={role.logoUrl} size={42} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="ledger-figures text-xs text-ink-soft">
                          0{index + 1}
                        </span>
                        <span className="ledger-figures text-xs text-ink-soft">·</span>
                        <span className="ledger-figures text-xs text-ledger font-medium">
                          {role.period}
                        </span>
                      </div>

                      {role.progression && (
                        <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-2.5 py-0.5 text-[11px] font-medium text-ledger">
                          ✓ {role.progression}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-1 font-serif text-2xl font-medium text-ink sm:text-[1.7rem]">
                      {role.role}
                    </h2>

                    <p className="mt-0.5 text-sm text-ink-soft">
                      <span className="font-medium text-ink">{role.company}</span>
                      {role.location && <span> · {role.location}</span>}
                    </p>
                    {role.companyDescription && (
                      <p className="mt-1 text-xs text-ink-soft">{role.companyDescription}</p>
                    )}
                  </div>
                </div>

                {/* Highlighted Role Summary */}
                {role.highlight && (
                  <div className="mt-5 border-l-2 border-ledger bg-paper-deep/65 py-2.5 pl-4 pr-3">
                    <p className="text-[15px] leading-relaxed text-ink">
                      <span className="ledger-figures mr-2 text-[11px] uppercase tracking-[0.08em] text-ledger font-medium">
                        Summary:
                      </span>
                      <strong className="font-medium text-ink">{role.highlight}</strong>
                    </p>
                  </div>
                )}

                {/* Visual Workplace / Event Photos with Small Blurred-Back Overlay Bar */}
                {photos.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
                        Workplace &amp; Event Visuals
                      </span>
                      <span className="ledger-figures text-[11px] text-ink-soft">
                        Click photo to enlarge ⤢
                      </span>
                    </div>

                    <div
                      className={`grid gap-4 ${
                        photos.length > 1
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : 'grid-cols-1 sm:max-w-md'
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
                            className="group relative block cursor-pointer overflow-hidden border border-rule bg-white p-1.5 text-left shadow-xs transition-all hover:border-ink"
                          >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-deep">
                              <img
                                src={src}
                                alt={cap}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                              <span className="ledger-figures absolute left-2 top-2 border border-white/20 bg-ink/70 px-2 py-0.5 text-[10px] text-paper backdrop-blur-md">
                                Photo 0{pIdx + 1}
                              </span>
                              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-white/15 bg-ink/75 px-3 py-1.5 text-paper backdrop-blur-md transition-colors group-hover:bg-ink/85">
                                <span className="truncate text-xs font-medium text-paper">
                                  {cap}
                                </span>
                                <span className="ledger-figures shrink-0 border border-paper/30 bg-paper/10 px-1.5 py-0.5 text-[10px] text-paper">
                                  Zoom ⤢
                                </span>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Key Responsibilities & Evidence Cards (2-Column Visual Grid) */}
                <div className="mt-6">
                  <h3 className="ledger-figures mb-3 text-xs uppercase tracking-[0.08em] text-ink-soft">
                    What I Did &amp; Delivered
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {role.evidence.map((item, evIdx) => (
                      <div
                        key={item.label}
                        className="border border-rule bg-paper-deep/35 p-3.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="ledger-figures text-[11px] text-ledger font-medium">
                            0{evIdx + 1}
                          </span>
                          <h4 className="text-sm font-medium text-ink">{item.label}</h4>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Strip */}
                {role.technologies.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="ledger-figures mr-1 text-xs uppercase tracking-[0.06em] text-ink-soft">
                      Tools:
                    </span>
                    {role.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="ledger-figures border border-rule bg-paper-deep/50 px-2.5 py-0.5 text-xs text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Connected Visual Case Study Cards */}
                {relatedSlugs.length > 0 && (
                  <div className="mt-6 border-t border-rule pt-4">
                    <p className="ledger-figures mb-3 text-xs uppercase tracking-[0.08em] text-ledger font-medium">
                      Connected Case Studies ({relatedSlugs.length})
                    </p>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {relatedSlugs.map((slug) => {
                        const meta = PROJECT_INDEX.find((p) => p.slug === slug)
                        const cover = PROJECT_COVERS[slug]
                        const title = PROJECT_TITLES[slug] || slug
                        return (
                          <div
                            key={slug}
                            className="flex flex-col justify-between border border-rule bg-white p-2 shadow-2xs"
                          >
                            <div>
                              {cover && (
                                <div className="relative aspect-[16/9] w-full overflow-hidden border border-rule/60 bg-white">
                                  <img
                                    src={cover}
                                    alt={title}
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              )}
                              <h4 className="mt-2 text-xs font-medium leading-snug text-ink">
                                {title}
                              </h4>
                              {meta && (
                                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-ink-soft">
                                  {meta.result}
                                </p>
                              )}
                            </div>

                            <div className="mt-2.5 border-t border-rule/60 pt-2">
                              <Link
                                href={`/projects/${slug}`}
                                className="ledger-figures inline-flex items-center gap-1 text-[11px] font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                              >
                                View case study →
                              </Link>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        {/* Bottom Live Resume Section */}
        <section className="mt-14 border-t-2 border-ink pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
                Always Up-To-Date Document
              </p>
              <h2 className="mt-1 font-serif text-2xl font-medium text-ink">
                Need the printable resume?
              </h2>
            </div>
            <a
              href={PORTFOLIO_IDENTITY.resumeDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-figures inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 text-xs font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink/85"
            >
              Open Live Google Doc Resume ↗
            </a>
          </div>
        </section>
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
            className="max-h-[92vh] w-full max-w-4xl overflow-hidden border border-rule bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between border-b border-rule pb-2.5">
              <div>
                <p className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                  {zoomPhoto.company} · {zoomPhoto.role}
                </p>
                <h3 className="text-sm font-medium text-ink">{zoomPhoto.caption}</h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomPhoto(null)}
                className="ledger-figures cursor-pointer border border-ink bg-ink px-3 py-1 text-xs text-paper"
              >
                Close ✕
              </button>
            </div>
            <div className="flex items-center justify-center border border-rule bg-white p-2">
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
