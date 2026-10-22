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

      {/* 1. COMPACT TECHNICAL HEADER */}
      <header className="border-b border-rule/60 pb-8">
        {indexMeta && (
          <p className="ledger-figures text-xs text-ink-soft">
            {indexMeta.groupLabel} · {indexMeta.usedBy}
          </p>
        )}

        <h1 className="mt-1.5 font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
          {project.title}
        </h1>

        {spec && (
          <p className="ledger-figures mt-1 text-xs text-ink-soft">
            {spec.architecture}
          </p>
        )}

        <ul className="mt-4 flex flex-wrap items-center gap-1.5">
          {(spec?.stack || project.tags).map((tag) => (
            <li
              key={tag}
              className="ledger-figures bg-paper-deep/85 px-2.5 py-1 text-xs font-medium text-ink"
            >
              {tag}
            </li>
          ))}
        </ul>

        {spec && (
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {spec.modules.map((mod) => (
              <li
                key={mod}
                className="bg-paper-deep/45 px-3 py-2 text-xs font-medium text-ink"
              >
                {mod}
              </li>
            ))}
          </ul>
        )}

        {project.url && (
          <div className="mt-5">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-figures inline-flex items-center gap-1.5 bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
            >
              {project.slug === 'woh-attendance-system' ? 'Open Live Kiosk ↗' : 'Visit Live Link ↗'}
            </a>
          </div>
        )}
      </header>

      {/* 2. PRIMARY VISUAL GALLERY */}
      {images.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 font-serif text-2xl font-medium text-ink">
            Screens
          </h2>

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
                        isUiScreenshot ? 'object-contain pb-8' : 'object-cover'
                      }`}
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-ink/80 px-3 py-1.5 text-paper backdrop-blur-md">
                      <h3 className="truncate text-xs font-medium text-paper">
                        {caption.title}
                      </h3>
                      <span className="ledger-figures shrink-0 text-[10px] text-paper/80">
                        {index + 1}/{images.length}
                      </span>
                    </div>
                  </div>
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
                  View →
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
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-paper p-4 shadow-2xl"
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
                className="ledger-figures cursor-pointer bg-ink px-3 py-1 text-xs font-medium text-paper hover:bg-ink/85"
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
                className="ledger-figures absolute right-2.5 top-2.5 cursor-pointer bg-ink/70 px-2.5 py-1 text-[10px] text-paper backdrop-blur-md hover:bg-ink"
              >
                {hideOverlayText ? 'Show label' : 'Hide label'}
              </button>

              {!hideOverlayText && ats?.captions[lightboxIndex]?.title && (
                <div className="absolute inset-x-3 bottom-2.5 mx-auto max-w-xl bg-ink/80 px-3.5 py-2 text-paper backdrop-blur-md">
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
                    className={`ledger-figures cursor-pointer px-3 py-1 text-xs ${
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
