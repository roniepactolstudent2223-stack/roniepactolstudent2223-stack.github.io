'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import type { ProjectIndexEntry } from '@/lib/portfolio-config'
import { PROJECT_DETAILS_DATA } from '@/lib/project-details-data'
import { TECH_SPECS_BY_SLUG } from '@/components/home/EntryLedger'

interface ProjectVisualPreviewProps {
  project: Project
  meta: ProjectIndexEntry
  isOpenExternal?: boolean
  onCloseExternal?: () => void
  featured?: boolean
}

export default function ProjectVisualPreview({
  project,
  meta,
  isOpenExternal = false,
  onCloseExternal,
}: ProjectVisualPreviewProps) {
  const images = project.images.length > 0 ? project.images : [project.coverImage]
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [hideOverlayText, setHideOverlayText] = useState(false)

  const details = PROJECT_DETAILS_DATA[project.slug]
  const spec = TECH_SPECS_BY_SLUG[project.slug]
  const currentSrc = images[selectedIdx] || project.coverImage
  const currentCaption = details?.captions[selectedIdx] || {
    title: `${project.title} — Screen ${selectedIdx + 1}`,
    description: '',
  }

  const isUiScreenshot =
    project.slug === 'wilcon-month-end-closing' ||
    project.slug === 'wilcon-collection-deposit-report'

  const isModalActive = modalOpen || isOpenExternal

  const closeModal = () => {
    setModalOpen(false)
    onCloseExternal?.()
  }

  useEffect(() => {
    if (!isModalActive) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev + 1) % images.length)
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev - 1 + images.length) % images.length)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isModalActive, images.length])

  const stackText = (spec?.stack || meta.threeTags).join(', ')
  const roleLabel = spec?.roleLabel || project.role
  const summaryLine = spec?.summaryLine || meta.result
  const overlineLabel = spec?.overline || meta.groupLabel

  return (
    <>
      {/* Full-Bleed Visual Showcase Card with Screenshot in Back + Progressive Blurred Bottom Overlay */}
      <div className="group relative w-full overflow-hidden rounded-xl bg-[#0b0d13] shadow-lg ring-1 ring-ink/10">
        {/* Top-Right Screen Switcher Pills */}
        {images.length > 1 && (
          <div
            className="absolute right-3.5 top-3.5 z-30 flex flex-wrap items-center gap-1 rounded-lg bg-[#0b0d13]/80 p-1 backdrop-blur-md ring-1 ring-white/15"
            role="tablist"
            aria-label={`${project.title} screens`}
          >
            {images.map((src, idx) => {
              const isActive = idx === selectedIdx
              const shortCap = details?.captions[idx]?.title || `Screen ${idx + 1}`
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  aria-selected={isActive}
                  title={shortCap}
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

        {/* Background Image Stage (Crisp at top, extends behind the bottom blur) */}
        <div
          onClick={() => setModalOpen(true)}
          className="relative h-[420px] w-full cursor-pointer overflow-hidden bg-[#0b0d13] px-4 pt-5 sm:h-[490px] sm:px-8 sm:pt-7"
        >
          <div className="h-full w-full overflow-hidden rounded-t-lg bg-white shadow-2xl ring-1 ring-white/15">
            <img
              src={currentSrc}
              alt={currentCaption.title}
              loading="lazy"
              decoding="async"
              className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.02] ${
                isUiScreenshot ? 'object-cover object-top' : 'object-cover object-center'
              }`}
            />
          </div>
        </div>

        {/* Progressive Bottom Blur + Dark Gradient Fade Over the Lower Screenshot */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[58%] backdrop-blur-[6px] [mask-image:linear-gradient(to_top,black_55%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[72%] bg-gradient-to-t from-[#0b0d13] via-[#0b0d13]/88 to-transparent"
        />

        {/* Bottom-Left Overlaid Label, Title, 1-Line Summary, Role · Stack, and Action Buttons */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-start justify-end p-5 sm:p-8">
          <span className="ledger-figures text-[11px] font-medium uppercase tracking-[0.14em] text-white/75">
            {overlineLabel}
          </span>

          <h3 className="mt-1 font-serif text-3xl font-medium leading-[1.06] tracking-tight text-white sm:text-4xl md:text-[2.65rem]">
            {project.title}
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-snug text-white/90 sm:text-[15px]">
            {summaryLine}
          </p>

          <p className="ledger-figures mt-2 text-xs text-white/65">
            {roleLabel} &nbsp;·&nbsp; {stackText}
          </p>

          <div className="pointer-events-auto mt-4 flex flex-wrap items-center gap-2.5">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur-md transition-all hover:bg-white hover:text-[#0b0d13]"
            >
              Read case study
            </Link>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="ledger-figures inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-white/8 px-3.5 py-2 text-xs font-medium text-white/85 ring-1 ring-white/12 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
            >
              Inspect screens ({images.length})
            </button>

            {project.url && meta.kind === 'software' && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ledger-figures inline-flex items-center gap-1 rounded-lg bg-ledger/85 px-3.5 py-2 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur-md transition-all hover:bg-ledger"
              >
                Live app ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Visual & Technical Modal (Unblurred Full Screenshot + Specs) */}
      {isModalActive && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-3 sm:p-6 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-paper shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 bg-paper-deep px-5 py-3.5">
              <div className="min-w-0">
                <p className="ledger-figures text-[11px] text-ink-soft">
                  {overlineLabel}
                </p>
                <h2 className="truncate font-serif text-lg font-medium text-ink sm:text-xl">
                  {project.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="ledger-figures shrink-0 cursor-pointer rounded-md bg-ink px-3.5 py-1.5 text-xs font-medium text-paper hover:bg-ledger"
              >
                Close
              </button>
            </div>

            <div className="grid flex-1 gap-6 overflow-y-auto p-5 lg:grid-cols-[1.65fr_1fr] lg:items-start">
              {/* Left: Full Uncropped Screen Viewer */}
              <div>
                <div className="relative overflow-hidden bg-paper-deep/60 p-3">
                  <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-white shadow-xs">
                    <img
                      src={currentSrc}
                      alt={currentCaption.title}
                      className="max-h-[58vh] w-full object-contain"
                    />

                    <button
                      type="button"
                      onClick={() => setHideOverlayText((prev) => !prev)}
                      className="ledger-figures absolute right-2.5 top-2.5 cursor-pointer rounded bg-ink/75 px-2.5 py-1 text-[10px] text-paper backdrop-blur-md hover:bg-ink"
                    >
                      {hideOverlayText ? 'Show label' : 'Hide label'}
                    </button>

                    {!hideOverlayText && (
                      <div className="inset-x-3 bottom-3 absolute rounded bg-ink/82 px-3.5 py-2 text-paper backdrop-blur-md">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-medium text-paper">
                            {currentCaption.title}
                          </p>
                          <span className="ledger-figures shrink-0 text-[10px] text-paper/80">
                            {selectedIdx + 1} / {images.length}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {images.length > 1 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {images.map((src, idx) => {
                      const active = idx === selectedIdx
                      const cap = details?.captions[idx]?.title || `Screen ${idx + 1}`
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setSelectedIdx(idx)}
                          className={`cursor-pointer p-2 text-left transition-all ${
                            active
                              ? 'bg-ink text-paper'
                              : 'bg-paper-deep/60 text-ink hover:bg-paper-deep'
                          }`}
                        >
                          <div className="h-12 w-full overflow-hidden bg-white">
                            <img
                              src={src}
                              alt=""
                              className={`h-full w-full ${
                                isUiScreenshot ? 'object-contain' : 'object-cover'
                              }`}
                            />
                          </div>
                          <p className="ledger-figures mt-1.5 truncate text-[11px] font-medium">
                            {cap}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Right: Technical Spec Sheet */}
              <div className="space-y-4">
                <div className="bg-paper-deep/55 p-4">
                  <p className="font-serif text-lg font-medium text-ink">
                    {spec?.architecture || project.role}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                    {summaryLine}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(spec?.stack || meta.threeTags).map((t) => (
                    <span
                      key={t}
                      className="ledger-figures bg-ink px-2.5 py-1 text-xs font-medium text-paper"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {spec && (
                  <div className="grid grid-cols-1 gap-1.5">
                    {spec.modules.map((mod) => (
                      <div
                        key={mod}
                        className="bg-paper-deep/45 px-3.5 py-2.5 text-xs font-medium text-ink"
                      >
                        {mod}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={closeModal}
                    className="ledger-figures inline-flex items-center gap-1.5 bg-ledger px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink"
                  >
                    Read case study →
                  </Link>

                  {project.url && meta.kind === 'software' && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ledger-figures inline-flex items-center gap-1.5 bg-paper-deep px-3.5 py-2 text-xs font-medium text-ink hover:bg-paper-deep/75"
                    >
                      Live app ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
