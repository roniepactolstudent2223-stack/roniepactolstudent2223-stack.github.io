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

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const images = project.images.length > 0 ? project.images : [project.coverImage]
  const [heroIdx, setHeroIdx] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hideOverlayText, setHideOverlayText] = useState(false)

  const ats = PROJECT_DETAILS_DATA[project.slug]
  const indexMeta = PROJECT_INDEX.find((item) => item.slug === project.slug)
  const otherProjects = PROJECT_INDEX.filter((item) => item.slug !== project.slug).slice(0, 3)

  const isUiScreenshot =
    project.slug === 'wilcon-month-end-closing' ||
    project.slug === 'wilcon-collection-deposit-report'

  const heroSrc = images[heroIdx] || project.coverImage
  const heroCaption = ats?.captions[heroIdx] || {
    title: `${project.title} — Screen ${heroIdx + 1}`,
    description: indexMeta?.result || '',
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

  return (
    <article className="min-h-screen max-w-4xl px-6 py-10 sm:py-14">
      {/* Top Breadcrumb Bar */}
      <nav aria-label="Case study navigation" className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-3">
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

      {/* 1. HERO SPLIT STAGE: Overview Left + Interactive Screen Window Right */}
      <header className="grid gap-8 border-b border-rule pb-10 lg:grid-cols-[1fr_21rem] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {indexMeta && (
              <span className="ledger-figures border border-rule bg-paper-deep px-2 py-0.5 text-[11px] uppercase tracking-[0.06em] text-ink">
                {indexMeta.groupLabel}
              </span>
            )}
            <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-2 py-0.5 text-[11px] font-medium text-ledger">
              ✓ {indexMeta?.status || project.year}
            </span>
          </div>

          <h1 className="mt-3 font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
            {project.title}
          </h1>

          {/* Role & Organization Strip */}
          <p className="mt-2.5 text-sm text-ink-soft">
            <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
              Role:{' '}
            </span>
            <span className="font-medium text-ink">{project.role}</span>
            {indexMeta?.usedBy && (
              <>
                <span className="mx-2 text-rule">|</span>
                <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                  Used by:{' '}
                </span>
                <span className="text-ink">{indexMeta.usedBy}</span>
              </>
            )}
          </p>

          {/* Highlighted 1-line Result Callout */}
          {indexMeta && (
            <div className="mt-4 border-l-2 border-ledger bg-paper-deep/70 py-3 pl-4 pr-3">
              <p className="text-[15px] leading-relaxed text-ink">
                <span className="ledger-figures mr-2 text-xs uppercase tracking-[0.08em] text-ledger font-medium">
                  Result:
                </span>
                <strong className="font-medium text-ink">{indexMeta.result}</strong>
              </p>
            </div>
          )}

          {/* Tools / Tags Strip */}
          {indexMeta && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                Tools:
              </span>
              {indexMeta.tools.split('·').map((tool) => (
                <span
                  key={tool.trim()}
                  className="ledger-figures border border-rule bg-paper-deep/50 px-2.5 py-0.5 text-xs text-ink"
                >
                  {tool.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Live Link CTAs */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setLightboxIndex(heroIdx)}
              className="ledger-figures inline-flex cursor-pointer items-center gap-1.5 border border-ink bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink/85"
            >
              View Full-Screen Gallery ({images.length}) ⤢
            </button>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ledger-figures inline-flex items-center gap-1.5 border border-rule bg-paper px-4 py-2 text-xs font-medium text-ink underline decoration-rule underline-offset-4 hover:border-ink"
              >
                {project.slug === 'woh-attendance-system' ? 'Open Live Kiosk ↗' : 'Visit Live Link ↗'}
              </a>
            )}
            {project.slug === 'woh-attendance-system' && (
              <a
                href="https://wohcaloocan.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="ledger-figures inline-flex items-center gap-1.5 border border-rule bg-paper px-3.5 py-2 text-xs text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink"
              >
                wohcaloocan.org ↗
              </a>
            )}
          </div>
        </div>

        {/* Right: Interactive Hero Screen Stage */}
        <div className="border border-rule bg-white p-2 shadow-xs">
          <div className="mb-1.5 flex items-center justify-between border-b border-rule px-1.5 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rule" />
              <span className="h-2 w-2 rounded-full bg-rule" />
              <span className="h-2 w-2 rounded-full bg-ledger/70" />
              <span className="ledger-figures ml-1 text-[10px] text-ink-soft">
                Screen 0{heroIdx + 1} / 0{images.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(heroIdx)}
              className="ledger-figures cursor-pointer text-[10px] font-medium text-ledger hover:underline"
            >
              Full view ⤢
            </button>
          </div>

          <button
            type="button"
            onClick={() => setLightboxIndex(heroIdx)}
            className="group relative block aspect-[16/10] w-full cursor-pointer overflow-hidden bg-white text-left"
          >
            <img
              src={heroSrc}
              alt={heroCaption.title}
              className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
                isUiScreenshot ? 'object-contain pb-8' : 'object-cover'
              }`}
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-white/15 bg-ink/80 px-2.5 py-1.5 text-paper backdrop-blur-md">
              <span className="truncate text-[11px] font-medium text-paper">
                {heroCaption.title}
              </span>
              <span className="ledger-figures shrink-0 text-[10px] text-paper/85">
                Zoom ⤢
              </span>
            </div>
          </button>

          {images.length > 1 && (
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {images.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setHeroIdx(idx)}
                  className={`cursor-pointer border bg-white p-1 text-left transition-all ${
                    idx === heroIdx
                      ? 'border-ink ring-1 ring-ink'
                      : 'border-rule opacity-75 hover:border-ink hover:opacity-100'
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className={`h-9 w-full ${isUiScreenshot ? 'object-contain' : 'object-cover'}`}
                  />
                  <p className="ledger-figures mt-1 truncate text-[9px] text-ink">
                    0{idx + 1} · {(ats?.captions[idx]?.title || `Screen ${idx + 1}`).split(' ')[0]}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 2. VISUAL 3-COLUMN BREAKDOWN: Problem → What I Built → Result */}
      {indexMeta && (
        <section aria-label="Case study summary" className="mt-8">
          <p className="ledger-figures mb-3 text-xs uppercase tracking-[0.08em] text-ink-soft">
            Case Study Breakdown
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Card 1: Problem */}
            <div className="border border-rule bg-paper-deep/35 p-4">
              <div className="flex items-center justify-between border-b border-rule pb-2">
                <span className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
                  01 · Problem
                </span>
                <span className="ledger-figures text-[10px] text-ink-soft">Before</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                {indexMeta.problem}
              </p>
            </div>

            {/* Card 2: What I Built */}
            <div className="border border-rule bg-paper-deep/35 p-4">
              <div className="flex items-center justify-between border-b border-rule pb-2">
                <span className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink">
                  02 · What I Built
                </span>
                <span className="ledger-figures text-[10px] text-ink-soft">Solution</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                {indexMeta.whatIBuilt}
              </p>
            </div>

            {/* Card 3: Result (Highlighted) */}
            <div className="border-2 border-ledger bg-ledger/10 p-4">
              <div className="flex items-center justify-between border-b border-ledger/30 pb-2">
                <span className="ledger-figures text-xs font-medium uppercase tracking-[0.08em] text-ledger">
                  03 · Result
                </span>
                <span className="ledger-figures text-[10px] font-medium text-ledger">
                  ✓ Outcome
                </span>
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-ink">
                {indexMeta.resultDetail}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. SCREENSHOTS & VISUAL EVIDENCE — Window Chrome + Frosted Caption Bar */}
      {images.length > 0 && (
        <section className="mt-10 border-t border-rule pt-8">
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
                  className={`group relative cursor-pointer overflow-hidden border border-rule bg-white p-2 text-left shadow-xs transition-all hover:border-ink ${
                    images.length === 3 && index === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  {/* Window Top Bar */}
                  <div className="mb-1.5 flex items-center justify-between border-b border-rule px-1.5 pb-1">
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

      {/* 4. HOW IT WORKS — 2-Column Visual Feature Cards */}
      {ats?.bullets && (
        <section className="mt-10 border-t border-rule pt-8">
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
            Key Features &amp; Workflow
          </p>
          <h2 className="mt-1 mb-5 font-serif text-2xl font-medium text-ink">
            How It Works
          </h2>

          <ol className="grid gap-4 sm:grid-cols-2">
            {ats.bullets.map((bullet, idx) => (
              <li
                key={bullet.title}
                className="border border-rule bg-paper-deep/35 p-4"
              >
                <div className="flex items-center gap-2 border-b border-rule/70 pb-2">
                  <span className="ledger-figures flex h-6 w-6 items-center justify-center border border-ledger bg-ledger text-[11px] font-medium text-paper">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-medium text-ink">{bullet.title}</h3>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {bullet.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 5. OPTIONAL TECHNICAL ARCHITECTURE DEEP DIVE */}
      {(project.slug === 'woh-attendance-system' || project.slug === 'wilcon-enterprise-systems') && (
        <details className="mt-10 group border border-rule bg-paper-deep/30">
          <summary className="ledger-figures flex cursor-pointer list-none items-center justify-between p-4 text-xs uppercase tracking-[0.08em] text-ink-soft hover:text-ink [&::-webkit-details-marker]:hidden">
            <span>Technical Architecture &amp; Database Notes</span>
            <span className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="space-y-10 border-t border-rule bg-paper p-6">
            <ArchitectureDiagram slug={project.slug} />
            <EngineeringDecisions slug={project.slug} />
          </div>
        </details>
      )}

      {/* 6. EXPLORE OTHER CASE STUDIES — Visual Card Strip */}
      <section aria-label="Other projects" className="mt-12 border-t-2 border-ink pt-8">
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
            View all 5 projects →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {otherProjects.map((item) => {
            const cover = PROJECT_COVERS[item.slug]
            const title = PROJECT_TITLES[item.slug] || item.slug
            return (
              <div
                key={item.slug}
                className="flex flex-col justify-between border border-rule bg-white p-2.5 shadow-2xs"
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
                      <span className="ledger-figures absolute bottom-1 left-1 bg-ink/75 px-1.5 py-0.5 text-[9px] text-paper backdrop-blur-xs">
                        {item.groupLabel}
                      </span>
                    </div>
                  )}
                  <h3 className="mt-2.5 text-sm font-medium leading-snug text-ink">
                    {title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft">
                    {item.result}
                  </p>
                </div>

                <div className="mt-3 border-t border-rule/60 pt-2">
                  <Link
                    href={`/projects/${item.slug}`}
                    className="ledger-figures inline-flex items-center gap-1 text-xs font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                  >
                    View case study →
                  </Link>
                </div>
              </div>
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
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto border border-rule bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between border-b border-rule pb-2.5">
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
                className="ledger-figures cursor-pointer border border-ink bg-ink px-3 py-1 text-xs font-medium text-paper hover:bg-ink/85"
                aria-label="Close image preview"
              >
                Close ✕
              </button>
            </div>

            <div className="relative flex items-center justify-center border border-rule bg-white p-2">
              <img
                src={images[lightboxIndex]}
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

            {images.length > 1 && (
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {images.map((src, idx) => (
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
