'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX } from '@/lib/portfolio-config'
import { PROJECT_DETAILS_DATA } from '@/lib/project-details-data'
import { TECH_SPECS_BY_SLUG } from '@/components/home/EntryLedger'
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
  const [activeScreenIdx, setActiveScreenIdx] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hideOverlayText, setHideOverlayText] = useState(false)

  const ats = PROJECT_DETAILS_DATA[project.slug]
  const spec = TECH_SPECS_BY_SLUG[project.slug]
  const indexMeta = PROJECT_INDEX.find((item) => item.slug === project.slug)
  const otherProjects = PROJECT_INDEX.filter(
    (item) => item.slug !== project.slug && item.kind === 'software'
  ).slice(0, 3)

  const isUiScreenshot =
    project.slug === 'wilcon-month-end-closing' ||
    project.slug === 'wilcon-collection-deposit-report'

  const activeCaption = ats?.captions[activeScreenIdx] || {
    title: `Screen ${activeScreenIdx + 1}`,
    description: '',
  }

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

  const stackText = (spec?.stack || project.tags).join(', ')
  const roleLabel = spec?.roleLabel || project.role
  const summaryLine = spec?.summaryLine || indexMeta?.result || ''
  const overlineLabel = spec?.overline || indexMeta?.groupLabel || ''

  return (
    <article className="min-h-screen max-w-4xl px-6 py-10 sm:py-14">
      <nav aria-label="Case study navigation" className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-rule/60 pb-3">
        <Link
          href="/projects"
          className="ledger-figures inline-flex items-center gap-1.5 text-xs text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          ← Projects
        </Link>
        <Link
          href="/work"
          className="ledger-figures inline-flex items-center gap-1.5 text-xs text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          Work experience →
        </Link>
      </nav>

      {/* 1. UNIFIED HERO STAGE: Screenshot in Back + Progressive Blurred Bottom Overlay */}
      <header className="space-y-6">
        <div className="group relative w-full overflow-hidden rounded-xl bg-[#0b0d13] shadow-lg ring-1 ring-ink/10">
          {images.length > 1 && (
            <div
              className="absolute right-3.5 top-3.5 z-30 flex flex-wrap items-center gap-1 rounded-lg bg-[#0b0d13]/80 p-1 backdrop-blur-md ring-1 ring-white/15"
              role="tablist"
            >
              {images.map((src, idx) => {
                const isActive = idx === activeScreenIdx
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveScreenIdx(idx)}
                    className={`ledger-figures cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                      isActive
                        ? 'bg-white text-[#0b0d13] shadow-2xs'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>
          )}

          <div
            onClick={() => setLightboxIndex(activeScreenIdx)}
            className="relative h-[430px] w-full cursor-pointer overflow-hidden bg-[#0b0d13] px-4 pt-5 sm:h-[500px] sm:px-8 sm:pt-7"
          >
            <div className="h-full w-full overflow-hidden rounded-t-lg bg-white shadow-2xl ring-1 ring-white/15">
              <img
                src={images[activeScreenIdx]}
                alt={activeCaption.title}
                className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.02] ${
                  isUiScreenshot ? 'object-cover object-top' : 'object-cover object-center'
                }`}
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[58%] backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_55%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[72%] bg-gradient-to-t from-[#0b0d13] via-[#0b0d13]/88 to-transparent"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-start justify-end p-5 sm:p-8">
            <span className="ledger-figures text-[11px] font-medium uppercase tracking-[0.14em] text-white/75">
              {overlineLabel}
            </span>

            <h1 className="mt-1 font-serif text-3xl font-medium leading-[1.06] tracking-tight text-white sm:text-4xl md:text-[2.65rem]">
              {project.title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-snug text-white/90 sm:text-[15px]">
              {summaryLine}
            </p>

            <p className="ledger-figures mt-2 text-xs text-white/65">
              {roleLabel} &nbsp;·&nbsp; {stackText}
            </p>

            <div className="pointer-events-auto mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLightboxIndex(activeScreenIdx)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur-md transition-all hover:bg-white hover:text-[#0b0d13]"
              >
                Enlarge screen ({activeScreenIdx + 1}/{images.length})
              </button>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ledger-figures inline-flex items-center gap-1 rounded-lg bg-ledger/85 px-3.5 py-2 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur-md transition-all hover:bg-ledger"
                >
                  {project.slug === 'woh-attendance-system' ? 'Open live kiosk ↗' : 'Visit live link ↗'}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Concise Technical Modules Strip */}
        {spec && (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {spec.modules.map((mod) => (
              <li
                key={mod}
                className="bg-paper-deep/50 px-3.5 py-2.5 text-xs font-medium text-ink"
              >
                {mod}
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* 2. ALL SCREENS GALLERY */}
      {images.length > 1 && (
        <section className="mt-10 border-t border-rule/60 pt-8">
          <h2 className="mb-4 font-serif text-2xl font-medium text-ink">
            All Screens
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {images.map((src, idx) => {
              const cap = ats?.captions[idx]?.title || `Screen ${idx + 1}`
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#0b0d13] p-2 text-left shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden rounded bg-white">
                    <img
                      src={src}
                      alt={cap}
                      className={`h-full w-full ${
                        isUiScreenshot ? 'object-contain' : 'object-cover'
                      }`}
                    />
                  </div>
                  <p className="ledger-figures mt-2 truncate px-1 text-xs font-medium text-white/90">
                    {cap}
                  </p>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* 3. TECHNICAL ARCHITECTURE DIAGRAM */}
      {(project.slug === 'woh-attendance-system' || project.slug === 'wilcon-enterprise-systems') && (
        <section className="mt-10 border-t border-rule/60 pt-8 space-y-8">
          <ArchitectureDiagram slug={project.slug} />
          <EngineeringDecisions slug={project.slug} />
        </section>
      )}

      {/* 4. OTHER SYSTEMS STRIP */}
      <section aria-label="Other projects" className="mt-12 border-t border-rule/60 pt-8">
        <h2 className="mb-4 font-serif text-xl font-medium text-ink">
          Other Systems
        </h2>

        <div className="grid gap-3.5 sm:grid-cols-3">
          {otherProjects.map((item) => {
            const title = PROJECT_TITLES[item.slug] || item.slug
            const otherSpec = TECH_SPECS_BY_SLUG[item.slug]
            return (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="group flex flex-col justify-between bg-paper-deep/45 p-4 transition-colors hover:bg-paper-deep"
              >
                <div>
                  <span className="ledger-figures text-[10px] text-ink-soft">
                    {item.groupLabel}
                  </span>
                  <h3 className="mt-1 text-sm font-medium leading-snug text-ink group-hover:text-ledger transition-colors">
                    {title}
                  </h3>
                  <p className="ledger-figures mt-1.5 text-[11px] text-ink-soft">
                    {(otherSpec?.stack || item.threeTags).slice(0, 3).join(' · ')}
                  </p>
                </div>

                <span className="ledger-figures mt-3 inline-block text-xs font-medium text-ink">
                  Read case study →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between pb-2.5">
              <div>
                <p className="ledger-figures text-[11px] text-ink-soft">
                  {project.title} · {lightboxIndex + 1} of {images.length}
                </p>
                <h3 className="text-base font-medium text-ink">
                  {ats?.captions[lightboxIndex]?.title || `Screen ${lightboxIndex + 1}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="ledger-figures cursor-pointer rounded bg-ink px-3 py-1 text-xs font-medium text-paper hover:bg-ink/85"
                aria-label="Close image preview"
              >
                Close
              </button>
            </div>

            <div className="relative flex items-center justify-center bg-white p-2">
              <img
                src={images[lightboxIndex]}
                alt="Enlarged view"
                className="max-h-[72vh] w-auto object-contain"
              />

              <button
                type="button"
                onClick={() => setHideOverlayText((prev) => !prev)}
                className="ledger-figures absolute right-2.5 top-2.5 cursor-pointer rounded bg-ink/70 px-2.5 py-1 text-[10px] text-paper backdrop-blur-md hover:bg-ink"
              >
                {hideOverlayText ? 'Show label' : 'Hide label'}
              </button>

              {!hideOverlayText && ats?.captions[lightboxIndex]?.title && (
                <div className="absolute inset-x-3 bottom-2.5 mx-auto max-w-xl rounded bg-ink/80 px-3.5 py-2 text-paper backdrop-blur-md">
                  <p className="text-xs font-medium text-paper">
                    {ats.captions[lightboxIndex].title}
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
                    className={`ledger-figures cursor-pointer rounded px-3 py-1 text-xs ${
                      idx === lightboxIndex
                        ? 'bg-ink text-paper'
                        : 'bg-paper-deep text-ink hover:bg-paper-deep/75'
                    }`}
                  >
                    {ats?.captions[idx]?.title || `Screen ${idx + 1}`}
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
