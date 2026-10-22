'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import type { ProjectIndexEntry } from '@/lib/portfolio-config'
import { PROJECT_DETAILS_DATA } from '@/lib/project-details-data'

interface ProjectVisualPreviewProps {
  project: Project
  meta: ProjectIndexEntry
  /** Optional trigger callback if parent also wants to open the modal */
  isOpenExternal?: boolean
  onCloseExternal?: () => void
}

/**
 * Planned visual image card + Complete Picture & Details Modal:
 * - Image stays clear and visible with a small frosted/blurred glass caption bar
 *   overlaid neatly along the bottom edge and a screen counter pill at top-left.
 * - Clicking the image (or "Open picture & details") opens a complete modal
 *   containing the interactive multi-screen gallery AND the full HR project breakdown.
 */
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
  const currentSrc = images[selectedIdx] || project.coverImage
  const currentCaption = details?.captions[selectedIdx] || {
    title: `${project.title} — Screen ${selectedIdx + 1}`,
    description: meta.result,
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

  return (
    <div>
      {/* Planned Visual Frame with Small Blurred-Back Overlay Bar */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group relative block w-full cursor-pointer overflow-hidden border border-rule bg-white p-1.5 text-left shadow-xs transition-all hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger"
        aria-label={`Open picture and complete details for ${project.title}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
          <img
            src={currentSrc}
            alt={currentCaption.title}
            loading="lazy"
            decoding="async"
            className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
              isUiScreenshot ? 'object-contain pb-7' : 'object-cover'
            }`}
          />

          {/* Top-Left Small Blurred Pill: Screen Count */}
          <span className="ledger-figures absolute left-2 top-2 border border-white/20 bg-ink/70 px-2 py-0.5 text-[10px] font-medium text-paper backdrop-blur-md">
            Screen {selectedIdx + 1} / {images.length}
          </span>

          {/* Bottom Small Blurred-Back Bar: Keeps image visible while framing title & action */}
          <div className=" inset-x-0 bottom-0 absolute flex items-center justify-between gap-2 border-t border-white/15 bg-ink/75 px-2.5 py-1.5 text-paper backdrop-blur-md transition-colors group-hover:bg-ink/85">
            <span className="truncate text-[11px] font-medium text-paper/95">
              {currentCaption.title}
            </span>
            <span className="ledger-figures shrink-0 border border-paper/30 bg-paper/10 px-1.5 py-0.5 text-[10px] text-paper">
              Picture &amp; details ⤢
            </span>
          </div>
        </div>
      </button>

      {/* Multi-Screenshot Thumbnail Strip Below Card */}
      {images.length > 1 && (
        <div
          className="mt-2 grid grid-cols-3 gap-1.5"
          role="tablist"
          aria-label={`${project.title} screenshots`}
        >
          {images.map((src, idx) => {
            const isActive = idx === selectedIdx
            const cap = details?.captions[idx]?.title || `Screen ${idx + 1}`
            return (
              <button
                key={src}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                aria-label={`Preview ${cap}`}
                aria-selected={isActive}
                className={`group/thumb relative cursor-pointer overflow-hidden border bg-white p-0.5 text-left transition-all ${
                  isActive
                    ? 'border-ink ring-1 ring-ink'
                    : 'border-rule opacity-75 hover:border-ink hover:opacity-100'
                }`}
              >
                <div className="relative h-10 w-full overflow-hidden bg-white">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full ${
                      isUiScreenshot ? 'object-contain' : 'object-cover'
                    }`}
                  />
                  <span className="ledger-figures absolute bottom-0.5 left-0.5 bg-ink/75 px-1 text-[9px] text-paper backdrop-blur-xs">
                    0{idx + 1}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* COMPLETE PICTURE & DETAILS MODAL */}
      {isModalActive && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${project.slug}`}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-3 backdrop-blur-xs sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-rule bg-paper text-ink shadow-2xl"
          >
            {/* Modal Sticky Header */}
            <header className="flex items-center justify-between gap-4 border-b border-rule bg-paper px-5 py-3.5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                  <span className="ledger-figures text-[11px] uppercase tracking-[0.06em] text-ink-soft">
                    {meta.groupLabel}
                  </span>
                  <span className="ledger-figures text-[11px] text-ink-soft">·</span>
                  <span className="ledger-figures text-[11px] text-ledger font-medium">
                    {meta.status}
                  </span>
                </div>
                <h2
                  id={`modal-title-${project.slug}`}
                  className="truncate font-serif text-xl font-medium text-ink sm:text-2xl"
                >
                  {project.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="ledger-figures shrink-0 cursor-pointer border border-ink bg-ink px-3 py-1.5 text-xs font-medium text-paper transition-colors hover:bg-ink/85"
                aria-label="Close project details modal"
              >
                Close ✕
              </button>
            </header>

            {/* Modal Scrollable Content: Complete Picture Gallery + Complete HR Details */}
            <div className="overflow-y-auto p-5 sm:p-6">
              {/* 1. Large Interactive Picture Frame with Toggleable Blurred-Back Caption */}
              <div className="border border-rule bg-white p-2 sm:p-3">
                <div className="relative flex min-h-[240px] max-h-[54vh] w-full items-center justify-center overflow-hidden bg-white sm:min-h-[360px]">
                  <img
                    src={currentSrc}
                    alt={currentCaption.title}
                    className="max-h-[52vh] w-auto max-w-full object-contain"
                  />

                  {/* Top-Right Toggle to Hide/Show Overlay Text so image is 100% unobstructed */}
                  <button
                    type="button"
                    onClick={() => setHideOverlayText((prev) => !prev)}
                    className="ledger-figures absolute right-2.5 top-2.5 cursor-pointer border border-white/25 bg-ink/70 px-2.5 py-1 text-[10px] text-paper backdrop-blur-md transition-colors hover:bg-ink"
                  >
                    {hideOverlayText ? 'Show caption' : 'Hide caption'}
                  </button>

                  {/* Previous / Next Screen Buttons */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIdx((prev) => (prev - 1 + images.length) % images.length)
                        }
                        aria-label="Previous screenshot"
                        className="ledger-figures absolute left-2.5 top-1/2 -translate-y-1/2 cursor-pointer border border-white/25 bg-ink/70 px-2.5 py-1.5 text-xs text-paper backdrop-blur-md transition-colors hover:bg-ink"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedIdx((prev) => (prev + 1) % images.length)}
                        aria-label="Next screenshot"
                        className="ledger-figures absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer border border-white/25 bg-ink/70 px-2.5 py-1.5 text-xs text-paper backdrop-blur-md transition-colors hover:bg-ink"
                      >
                        →
                      </button>
                    </>
                  )}

                  {/* Small Blurred-Back Caption Pill Overlaid at Bottom of Image */}
                  {!hideOverlayText && (
                    <div className="absolute inset-x-3 bottom-2.5 mx-auto max-w-2xl border border-white/20 bg-ink/75 px-3.5 py-2 text-paper backdrop-blur-md">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-xs font-medium text-paper">
                          {currentCaption.title}
                        </p>
                        <span className="ledger-figures shrink-0 text-[10px] text-paper/80">
                          {selectedIdx + 1} / {images.length}
                        </span>
                      </div>
                      {currentCaption.description && (
                        <p className="mt-0.5 text-[11px] leading-snug text-paper/85">
                          {currentCaption.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Screen Switcher Bar Below Large Image */}
                {images.length > 1 && (
                  <div className="mt-3 grid grid-cols-1 gap-2 border-t border-rule pt-3 sm:grid-cols-3">
                    {images.map((src, idx) => {
                      const cap = details?.captions[idx] || {
                        title: `Screen ${idx + 1}`,
                        description: '',
                      }
                      const active = idx === selectedIdx
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setSelectedIdx(idx)}
                          className={`flex cursor-pointer items-center gap-2.5 border p-1.5 text-left transition-all ${
                            active
                              ? 'border-ink bg-paper-deep/80 ring-1 ring-ink'
                              : 'border-rule bg-paper/50 hover:border-ink'
                          }`}
                        >
                          <img
                            src={src}
                            alt=""
                            className="h-10 w-14 shrink-0 border border-rule bg-white object-contain"
                          />
                          <div className="min-w-0">
                            <p className="ledger-figures text-[10px] text-ink-soft">
                              Screen 0{idx + 1}
                            </p>
                            <p className="truncate text-xs font-medium text-ink">
                              {cap.title}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* 2. Complete Project Details Below the Picture */}
              <div className="mt-6 space-y-6">
                {/* Highlighted Result Callout */}
                <div className="border-l-2 border-ledger bg-paper-deep/70 py-3 pl-4 pr-3">
                  <p className="text-base leading-relaxed text-ink">
                    <span className="ledger-figures mr-2 text-xs uppercase tracking-[0.08em] text-ledger font-medium">
                      Result:
                    </span>
                    <strong className="font-medium text-ink">{meta.result}</strong>
                  </p>
                </div>

                {/* Role, Used By & 3 Tag Words */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
                  <div className="text-sm text-ink-soft">
                    <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                      Role:{' '}
                    </span>
                    <span className="text-ink">{project.role}</span>
                    <span className="mx-2 text-rule">|</span>
                    <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                      Used by:{' '}
                    </span>
                    <span className="text-ink">{meta.usedBy}</span>
                  </div>

                  <ul className="flex flex-wrap items-center gap-1.5">
                    {meta.threeTags.map((tag) => (
                      <li
                        key={tag}
                        className="ledger-figures border border-rule bg-paper-deep/60 px-2.5 py-0.5 text-xs text-ink"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4 HR Labels: Problem · What I built · Result · Tools */}
                <dl className="space-y-3 text-[15px]">
                  <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                    <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-1">
                      Problem
                    </dt>
                    <dd className="leading-relaxed text-ink">{meta.problem}</dd>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                    <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-1">
                      What I built
                    </dt>
                    <dd className="leading-relaxed text-ink">{meta.whatIBuilt}</dd>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                    <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ledger font-medium sm:pt-1">
                      Result
                    </dt>
                    <dd className="font-medium leading-relaxed text-ink">{meta.resultDetail}</dd>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                    <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-1">
                      Tools
                    </dt>
                    <dd className="ledger-figures text-xs text-ink sm:pt-1">{meta.tools}</dd>
                  </div>
                </dl>

                {/* Complete Feature Breakdown ("How It Works") */}
                {details?.bullets && details.bullets.length > 0 && (
                  <div className="border-t border-rule pt-5">
                    <h3 className="ledger-figures mb-3.5 text-xs uppercase tracking-[0.08em] text-ink-soft">
                      How It Works — Key Details
                    </h3>
                    <ol className="space-y-3">
                      {details.bullets.map((b, i) => (
                        <li
                          key={b.title}
                          className="grid gap-1 border-t border-rule/50 pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[2rem_1fr]"
                        >
                          <span className="ledger-figures text-xs text-ink-soft">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-sm leading-relaxed text-ink">
                            <strong className="font-medium text-ink">{b.title}: </strong>
                            <span className="text-ink-soft">{b.description}</span>
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Modal Footer Links */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={closeModal}
                      className="inline-flex items-center gap-1.5 border border-ink bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink/85"
                    >
                      Open standalone case study page →
                    </Link>
                    {project.url && meta.kind === 'software' && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-rule bg-paper px-4 py-2 text-xs text-ink underline decoration-rule underline-offset-4 hover:border-ink"
                      >
                        Open live site ↗
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="ledger-figures cursor-pointer text-xs text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink"
                  >
                    Close modal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
