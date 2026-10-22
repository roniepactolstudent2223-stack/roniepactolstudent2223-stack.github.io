'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX } from '@/lib/portfolio-config'
import { PROJECT_DETAILS_DATA } from '@/lib/project-details-data'
import ArchitectureDiagram from '@/components/projects/ArchitectureDiagram'
import EngineeringDecisions from '@/components/projects/EngineeringDecisions'

interface ProjectDetailProps {
  project: Project
}

const PROJECT_TITLES: Record<string, string> = {
  'wilcon-month-end-closing': 'Month-End Closing System',
  'wilcon-collection-deposit-report': 'Collection & Deposit Report Modification',
  'wilcon-enterprise-systems': 'Enterprise Web Apps & ERP Workflows',
  'woh-attendance-system': 'WOH Attendance & Member Care System',
  'wordpress-ph-community': 'WordPress Philippines Community & Volunteering',
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const images = project.images.length > 0 ? project.images : [project.coverImage]
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hideOverlayText, setHideOverlayText] = useState(false)

  const ats = PROJECT_DETAILS_DATA[project.slug]
  const indexMeta = PROJECT_INDEX.find((item) => item.slug === project.slug)
  const otherProjects = PROJECT_INDEX.filter(
    (item) => item.slug !== project.slug && item.kind === 'software'
  ).slice(0, 3)

  const isUiScreenshot =
    project.slug === 'wilcon-month-end-closing' ||
    project.slug === 'wilcon-collection-deposit-report'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (lightboxIndex !== null && images.length > 1) {
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0))
        }
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + images.length) % images.length : 0
          )
        }
      }
    }
    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, images.length])

  return (
    <article className="min-h-screen max-w-4xl px-6 py-10 sm:py-14">
      {/* Top Breadcrumb Bar */}
      <nav aria-label="Case study navigation" className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-rule/60 pb-3">
        <Link
          href="/projects"
          className="ledger-figures inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.08em] text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          ← All projects
        </Link>
        <Link
          href="/work"
          className="ledger-figures inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.08em] text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          Work experience →
        </Link>
      </nav>

      {/* 1. CLEAN HEADER (Right DetailPanel already shows System Spec on desktop) */}
      <header className="border-b border-rule/60 pb-8">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {indexMeta && (
            <span className="ledger-figures bg-paper-deep/80 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.06em] text-ink">
              {indexMeta.groupLabel}
            </span>
          )}
          <span className="ledger-figures bg-ledger/12 px-2.5 py-0.5 text-[11px] font-medium text-ledger">
            ✓ {indexMeta?.status || project.year}
          </span>
        </div>

        <h1 className="mt-3 font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
          {project.title}
        </h1>

        {indexMeta && (
          <div className="mt-5 border-l-2 border-ledger bg-paper-deep/55 py-3 pl-4 pr-3">
            <p className="text-[15px] leading-relaxed text-ink">
              <span className="ledger-figures mr-2 text-xs uppercase tracking-[0.08em] text-ledger font-medium">
                Result:
              </span>
              <strong className="font-medium text-ink">{indexMeta.result}</strong>
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="ledger-figures inline-flex cursor-pointer items-center gap-1.5 bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
          >
            Open Full-Screen Gallery ({images.length}) ⤢
          </button>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-figures inline-flex items-center gap-1.5 bg-paper-deep/80 px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
            >
              {project.slug === 'woh-attendance-system' ? 'Open Live Kiosk ↗' : 'Visit Live Link ↗'}
            </a>
          )}
          {project.slug === 'woh-attendance-system' && (
            <a
              href="https://wohcaloocan.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-figures inline-flex items-center gap-1.5 px-3 py-2 text-xs text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink"
            >
              wohcaloocan.org ↗
            </a>
          )}
        </div>
      </header>

      {/* 2. SOFT SURFACE 3-COLUMN BREAKDOWN: Problem → What I Built → Result */}
      {indexMeta && (
        <section aria-label="Case study summary" className="mt-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-paper-deep/40 p-4">
              <span className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
                01 · Problem
              </span>
              <p className="mt-2.5 text-sm leading-relaxed text-ink">
                {indexMeta.problem}
              </p>
            </div>

            <div className="bg-paper-deep/40 p-4">
              <span className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink">
                02 · What I Built
              </span>
              <p className="mt-2.5 text-sm leading-relaxed text-ink">
                {indexMeta.whatIBuilt}
              </p>
            </div>

            <div className="border-l-2 border-ledger bg-ledger/12 p-4">
              <span className="ledger-figures text-xs font-medium uppercase tracking-[0.08em] text-ledger">
                03 · Result
              </span>
              <p className="mt-2.5 text-sm font-medium leading-relaxed text-ink">
                {indexMeta.resultDetail}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. SCREENSHOTS & VISUAL EVIDENCE — Single Unified Gallery */}
      {images.length > 0 && (
        <section className="mt-10 border-t border-rule/60 pt-8">
          <div className="mb-4 flex items-baseline justify-between">
            <div>
              <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
                Visual Walkthrough
              </p>
              <h2 className="mt-1 font-serif text-2xl font-medium text-ink">
                Screenshots &amp; System Views ({images.length})
              </h2>
            </div>
            <span className="ledger-figures text-xs text-ink-soft">
              Click any screen to zoom ⤢
            </span>
          </div>

          <div
            className={`grid gap-5 ${
              images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {images.map((src, index) => {
              const caption = ats?.captions[index] || {
                title: `Screen ${index + 1}`,
                description: '',
              }

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative cursor-pointer overflow-hidden border border-rule/80 bg-white p-2 text-left shadow-xs transition-all hover:border-ink ${
                    images.length === 3 && index === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-between px-1.5 pb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rule" />
                      <span className="h-2 w-2 rounded-full bg-rule" />
                      <span className="h-2 w-2 rounded-full bg-ledger/70" />
                      <span className="ledger-figures ml-1 text-[10px] text-ink-soft">
                        0{index + 1} · {caption.title}
                      </span>
                    </div>
                    <span className="ledger-figures text-[10px] text-ledger font-medium group-hover:underline">
                      Enlarge ⤢
                    </span>
                  </div>

                  <div
                    className={`relative ${
                      images.length === 3 && index === 0
                        ? 'aspect-[16/8]'
                        : 'aspect-[16/10]'
                    } w-full overflow-hidden bg-white`}
                  >
                    <img
                      src={src}
                      alt={caption.title}
                      decoding="async"
                      loading="lazy"
                      className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${
                        isUiScreenshot ? 'object-contain pb-9' : 'object-cover'
                      }`}
                    />

                    {/* Planned Bottom Blurred-Back Overlay Bar */}
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-ink/75 px-3 py-2 text-paper backdrop-blur-md transition-colors group-hover:bg-ink/85">
                      <div className="min-w-0">
                        <h3 className="truncate text-xs font-medium text-paper">
                          {caption.title}
                        </h3>
                        {caption.description && (
                          <p className="truncate text-[11px] text-paper/80">
                            {caption.description}
                          </p>
                        )}
                      </div>
                      <span className="ledger-figures shrink-0 bg-paper/15 px-2 py-0.5 text-[10px] text-paper">
                        Full view ⤢
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* 4. HOW IT WORKS — Structured Left/Right Section with Soft Surface Cards */}
      {ats?.bullets && (
        <section className="mt-10 border-t border-rule/60 pt-8 grid gap-8 md:grid-cols-[13.5rem_1fr] md:items-start">
          <div>
            <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
              Key Features
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-ink">
              How It Works
            </h2>
          </div>

          <ol className="grid gap-3.5 sm:grid-cols-2">
            {ats.bullets.map((bullet, idx) => (
              <li
                key={bullet.title}
                className="bg-paper-deep/40 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="ledger-figures flex h-5 w-5 items-center justify-center bg-ledger text-[10px] font-medium text-paper">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-medium text-ink">{bullet.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {bullet.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 5. OPTIONAL TECHNICAL ARCHITECTURE DEEP DIVE */}
      {(project.slug === 'woh-attendance-system' || project.slug === 'wilcon-enterprise-systems') && (
        <details className="mt-10 group bg-paper-deep/40">
          <summary className="ledger-figures flex cursor-pointer list-none items-center justify-between p-4 text-xs uppercase tracking-[0.08em] text-ink-soft hover:text-ink [&::-webkit-details-marker]:hidden">
            <span>Technical Architecture &amp; Database Notes</span>
            <span className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="space-y-10 bg-paper p-6">
            <ArchitectureDiagram slug={project.slug} />
            <EngineeringDecisions slug={project.slug} />
          </div>
        </details>
      )}

      {/* 6. EXPLORE OTHER CASE STUDIES — Soft Surface Cards */}
      <section aria-label="Other projects" className="mt-12 border-t border-rule/60 pt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
              Keep Exploring
            </p>
            <h2 className="mt-1 font-serif text-xl font-medium text-ink">
              Other Case Studies
            </h2>
          </div>
          <Link
            href="/projects"
            className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            View all projects →
          </Link>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-3">
          {otherProjects.map((item, idx) => {
            const title = PROJECT_TITLES[item.slug] || item.slug
            return (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="group flex flex-col justify-between bg-paper-deep/45 p-4 transition-colors hover:bg-paper-deep"
              >
                <div>
                  <span className="ledger-figures text-[10px] font-medium text-ledger">
                    0{idx + 1} · {item.groupLabel}
                  </span>
                  <h3 className="mt-2 text-sm font-medium leading-snug text-ink group-hover:text-ledger transition-colors">
                    {title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-soft">
                    {item.result}
                  </p>
                </div>

                <span className="ledger-figures mt-3 inline-block text-xs font-medium text-ink">
                  View case study →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Full-Screen Modal for Enlargeable Screenshots + Details */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between pb-2.5">
              <div>
                <p className="ledger-figures text-[11px] uppercase tracking-[0.06em] text-ink-soft">
                  {project.title} · Screen {lightboxIndex + 1} of {images.length}
                </p>
                <h3 className="text-base font-medium text-ink">
                  {ats?.captions[lightboxIndex]?.title || `Screen ${lightboxIndex + 1}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="ledger-figures cursor-pointer bg-ink px-3 py-1 text-xs font-medium text-paper hover:bg-ink/85"
                aria-label="Close image preview"
              >
                Close ✕
              </button>
            </div>

            <div className="relative flex items-center justify-center bg-white p-2">
              <img
                src={images[lightboxIndex]}
                alt="Enlarged view"
                className="max-h-[70vh] w-auto object-contain"
              />

              <button
                type="button"
                onClick={() => setHideOverlayText((prev) => !prev)}
                className="ledger-figures absolute right-2.5 top-2.5 cursor-pointer bg-ink/70 px-2.5 py-1 text-[10px] text-paper backdrop-blur-md hover:bg-ink"
              >
                {hideOverlayText ? 'Show caption' : 'Hide caption'}
              </button>

              {!hideOverlayText && ats?.captions[lightboxIndex]?.description && (
                <div className="absolute inset-x-3 bottom-2.5 mx-auto max-w-2xl bg-ink/75 px-3.5 py-2 text-paper backdrop-blur-md">
                  <p className="text-xs leading-snug text-paper/90">
                    {ats.captions[lightboxIndex].description}
                  </p>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {images.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`ledger-figures cursor-pointer px-3 py-1 text-xs ${
                      idx === lightboxIndex
                        ? 'bg-ink text-paper'
                        : 'bg-paper-deep text-ink hover:bg-paper-deep/75'
                    }`}
                  >
                    0{idx + 1} · {ats?.captions[idx]?.title || `Screen ${idx + 1}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
