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

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hideOverlayText, setHideOverlayText] = useState(false)

  const ats = PROJECT_DETAILS_DATA[project.slug]
  const indexMeta = PROJECT_INDEX.find((item) => item.slug === project.slug)
  const isUiScreenshot =
    project.slug === 'wilcon-month-end-closing' ||
    project.slug === 'wilcon-collection-deposit-report'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (lightboxIndex !== null && project.images.length > 1) {
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % project.images.length : 0
          )
        }
        if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + project.images.length) % project.images.length
              : 0
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
  }, [lightboxIndex, project.images.length])

  return (
    <article className="min-h-screen max-w-4xl px-6 py-10 sm:py-14">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/projects"
          className="ledger-figures inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.08em] text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          ← Back to projects
        </Link>
      </div>

      {/* Header */}
      <header className="border-b border-rule pb-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {indexMeta && (
            <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
              {indexMeta.groupLabel}
            </span>
          )}
          <span className="ledger-figures text-xs text-ink-soft">·</span>
          <span className="ledger-figures text-xs text-ledger">
            {indexMeta?.status || project.year}
          </span>
        </div>

        <h1 className="mt-2 font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
          {project.title}
        </h1>

        {/* Highlighted 1-line Result right under title */}
        {indexMeta && (
          <div className="mt-4 border-l-2 border-ledger bg-paper-deep/60 py-2.5 pl-3.5 pr-3">
            <p className="text-base leading-relaxed text-ink">
              <span className="ledger-figures mr-2 text-xs uppercase tracking-[0.08em] text-ledger font-medium">
                Result:
              </span>
              <strong className="font-medium text-ink">{indexMeta.result}</strong>
            </p>
          </div>
        )}

        {/* Quick 4-Row Summary: Problem · What I built · Result · Tools */}
        {indexMeta && (
          <dl className="mt-6 space-y-3 border-t border-rule pt-4 text-[15px]">
            <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-1">
                Problem
              </dt>
              <dd className="leading-relaxed text-ink">{indexMeta.problem}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-1">
                What I built
              </dt>
              <dd className="leading-relaxed text-ink">{indexMeta.whatIBuilt}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ledger font-medium sm:pt-1">
                Result
              </dt>
              <dd className="font-medium leading-relaxed text-ink">{indexMeta.resultDetail}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-1">
                Tools
              </dt>
              <dd className="ledger-figures text-xs text-ink sm:pt-1">{indexMeta.tools}</dd>
            </div>
          </dl>
        )}

        {/* Live Link CTAs */}
        {project.url && (
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-ink bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink/90"
            >
              {project.slug === 'woh-attendance-system' ? 'Open Live Kiosk ↗' : 'Visit Link ↗'}
            </a>
            {project.slug === 'woh-attendance-system' && (
              <a
                href="https://wohcaloocan.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-rule bg-paper px-4 py-2 text-xs text-ink underline decoration-rule underline-offset-4 hover:border-ink"
              >
                Church Website (wohcaloocan.org) ↗
              </a>
            )}
          </div>
        )}
      </header>

      {/* Screenshots & Visual Evidence — Large, Clear, Planned Frosted Overlay Bar */}
      {project.images.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-baseline justify-between border-b border-rule pb-2">
            <h2 className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
              Screenshots &amp; Visuals ({project.images.length})
            </h2>
            <span className="ledger-figures text-xs text-ink-soft">
              Click any image to view full screen ⤢
            </span>
          </div>

          <div
            className={`grid gap-5 ${
              project.images.length === 1
                ? 'grid-cols-1'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {project.images.map((src, index) => {
              const caption = ats?.captions[index] || {
                title: `Screen ${index + 1}`,
                description: '',
              }

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative cursor-pointer overflow-hidden border border-rule bg-white p-2 text-left transition-all hover:border-ink ${
                    project.images.length === 3 && index === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div
                    className={`relative ${
                      project.images.length === 3 && index === 0
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

                    {/* Top-Left Screen Pill */}
                    <span className="ledger-figures absolute left-2 top-2 border border-white/20 bg-ink/70 px-2 py-0.5 text-[10px] font-medium text-paper backdrop-blur-md">
                      0{index + 1} / 0{project.images.length}
                    </span>

                    {/* Planned Bottom Blurred-Back Overlay Bar */}
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-white/15 bg-ink/75 px-3 py-2 text-paper backdrop-blur-md transition-colors group-hover:bg-ink/85">
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
                      <span className="ledger-figures shrink-0 border border-paper/30 bg-paper/10 px-2 py-0.5 text-[10px] text-paper">
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

      {/* How It Works — Plain-English Breakdown */}
      {ats?.bullets && (
        <section className="mt-10 border-t border-rule pt-8">
          <h2 className="ledger-figures mb-5 text-xs uppercase tracking-[0.08em] text-ink-soft">
            How It Works
          </h2>

          <ol className="space-y-4">
            {ats.bullets.map((bullet, idx) => (
              <li
                key={bullet.title}
                className="grid gap-1 border-t border-rule/60 pt-3.5 first:border-t-0 first:pt-0 sm:grid-cols-[2rem_1fr]"
              >
                <span className="ledger-figures text-xs text-ink-soft">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="text-[15px] leading-relaxed text-ink">
                  <strong className="font-medium text-ink">{bullet.title}: </strong>
                  <span className="text-ink-soft">{bullet.description}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Optional Technical Deep Dive */}
      {(project.slug === 'woh-attendance-system' || project.slug === 'wilcon-enterprise-systems') && (
        <details className="mt-10 group border border-rule bg-paper-deep/30">
          <summary className="ledger-figures flex cursor-pointer list-none items-center justify-between p-4 text-xs uppercase tracking-[0.08em] text-ink-soft hover:text-ink [&::-webkit-details-marker]:hidden">
            <span>Technical Architecture &amp; Database Notes</span>
            <span className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="space-y-10 border-t border-rule p-6 bg-paper">
            <ArchitectureDiagram slug={project.slug} />
            <EngineeringDecisions slug={project.slug} />
          </div>
        </details>
      )}

      {/* Full-Screen Modal for Enlargeable Screenshots + Details */}
      {lightboxIndex !== null && project.images[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto border border-rule bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between border-b border-rule pb-2.5">
              <div>
                <p className="ledger-figures text-[11px] uppercase tracking-[0.06em] text-ink-soft">
                  {project.title} · Screen {lightboxIndex + 1} of {project.images.length}
                </p>
                <h3 className="text-base font-medium text-ink">
                  {ats?.captions[lightboxIndex]?.title || `Screen ${lightboxIndex + 1}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="ledger-figures cursor-pointer border border-ink bg-ink px-3 py-1 text-xs font-medium text-paper hover:bg-ink/85"
                aria-label="Close image preview"
              >
                Close ✕
              </button>
            </div>

            <div className="relative flex items-center justify-center border border-rule bg-white p-2">
              <img
                src={project.images[lightboxIndex]}
                alt="Enlarged view"
                className="max-h-[70vh] w-auto object-contain"
              />

              <button
                type="button"
                onClick={() => setHideOverlayText((prev) => !prev)}
                className="ledger-figures absolute right-2.5 top-2.5 cursor-pointer border border-white/25 bg-ink/70 px-2.5 py-1 text-[10px] text-paper backdrop-blur-md hover:bg-ink"
              >
                {hideOverlayText ? 'Show caption' : 'Hide caption'}
              </button>

              {!hideOverlayText && ats?.captions[lightboxIndex]?.description && (
                <div className="absolute inset-x-3 bottom-2.5 mx-auto max-w-2xl border border-white/20 bg-ink/75 px-3.5 py-2 text-paper backdrop-blur-md">
                  <p className="text-xs leading-snug text-paper/90">
                    {ats.captions[lightboxIndex].description}
                  </p>
                </div>
              )}
            </div>

            {project.images.length > 1 && (
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {project.images.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`ledger-figures cursor-pointer border px-3 py-1 text-xs ${
                      idx === lightboxIndex
                        ? 'border-ink bg-ink text-paper'
                        : 'border-rule bg-paper text-ink hover:border-ink'
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
