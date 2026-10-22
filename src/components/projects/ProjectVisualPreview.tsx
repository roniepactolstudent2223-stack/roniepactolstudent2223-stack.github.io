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
}

/**
 * Visual Screen Preview + Technical Inspection Modal:
 * - Main preview shows the real screenshot with a small frosted-blur title bar.
 * - Clicking opens a visual-first modal (large screen stage on the left,
 *   concise Tech Stack + Modules Built on the right — no long paragraphs).
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

  return (
    <div>
      {/* Visual Window Frame with Small Blurred-Back Overlay Bar */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group relative block w-full cursor-pointer overflow-hidden border border-rule/80 bg-white p-1.5 text-left shadow-xs transition-all hover:border-ink"
        aria-label={`Inspect screens and technical specs for ${project.title}`}
      >
        <div className="mb-1 flex items-center justify-between px-1.5 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rule" />
            <span className="h-2 w-2 rounded-full bg-rule" />
            <span className="h-2 w-2 rounded-full bg-ledger/70" />
            <span className="ledger-figures ml-1 text-[10px] text-ink-soft">
              Screen 0{selectedIdx + 1} / 0{images.length}
            </span>
          </div>
          <span className="ledger-figures text-[10px] font-medium text-ledger group-hover:underline">
            Inspect ⤢
          </span>
        </div>

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

          {/* Small Blurred-Back Bar along bottom edge */}
          <div className="inset-x-0 bottom-0 absolute flex items-center justify-between gap-2 bg-ink/80 px-2.5 py-1.5 text-paper backdrop-blur-md">
            <span className="truncate text-[11px] font-medium text-paper">
              {currentCaption.title}
            </span>
            <span className="ledger-figures shrink-0 text-[10px] text-paper/85">
              ⤢
            </span>
          </div>
        </div>
      </button>

      {/* Multi-Screenshot Thumbnail Strip Below Card */}
      {images.length > 1 && (
        <div
          className="mt-1.5 grid grid-cols-3 gap-1.5"
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
                className={`relative cursor-pointer overflow-hidden bg-white p-0.5 text-left transition-all ${
                  isActive
                    ? 'ring-1 ring-ink opacity-100'
                    : 'opacity-70 hover:opacity-100'
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

      {/* Visual-First Screen & Tech Spec Modal */}
      {isModalActive && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} screen inspector`}
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-3 sm:p-6 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden bg-paper shadow-2xl"
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between gap-4 bg-paper-deep px-5 py-3.5">
              <div className="min-w-0">
                <p className="ledger-figures text-[11px] uppercase tracking-[0.08em] text-ledger font-medium">
                  {meta.groupLabel} · {meta.status}
                </p>
                <h2 className="truncate font-serif text-lg font-medium text-ink sm:text-xl">
                  {project.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="ledger-figures shrink-0 cursor-pointer bg-ink px-3 py-1.5 text-xs font-medium text-paper hover:bg-ink/85"
              >
                Close ✕
              </button>
            </div>

            {/* Modal Body: Left Large Screen Stage + Right Compact Tech Specs */}
            <div className="grid flex-1 gap-6 overflow-y-auto p-5 lg:grid-cols-[1.5fr_1fr] lg:items-start">
              {/* Left: Interactive Screen Viewer */}
              <div>
                <div className="relative overflow-hidden bg-white p-2">
                  <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-white">
                    <img
                      src={currentSrc}
                      alt={currentCaption.title}
                      className="max-h-[55vh] w-full object-contain"
                    />

                    <button
                      type="button"
                      onClick={() => setHideOverlayText((prev) => !prev)}
                      className="ledger-figures absolute right-2 top-2 cursor-pointer bg-ink/75 px-2.5 py-1 text-[10px] text-paper backdrop-blur-md hover:bg-ink"
                    >
                      {hideOverlayText ? 'Show label' : 'Hide label'}
                    </button>

                    {!hideOverlayText && (
                      <div className="inset-x-2.5 bottom-2.5 absolute bg-ink/80 px-3.5 py-2 text-paper backdrop-blur-md">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-medium text-paper">
                            {currentCaption.title}
                          </p>
                          <span className="ledger-figures shrink-0 text-[10px] text-paper/80">
                            0{selectedIdx + 1} / 0{images.length}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Prev / Next + Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIdx((prev) => (prev - 1 + images.length) % images.length)
                        }
                        className="ledger-figures cursor-pointer bg-paper-deep px-3 py-1 text-xs text-ink hover:bg-ink hover:text-paper"
                      >
                        ← Prev Screen
                      </button>
                      <span className="ledger-figures text-xs text-ink-soft">
                        Screen {selectedIdx + 1} of {images.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedIdx((prev) => (prev + 1) % images.length)}
                        className="ledger-figures cursor-pointer bg-paper-deep px-3 py-1 text-xs text-ink hover:bg-ink hover:text-paper"
                      >
                        Next Screen →
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {images.map((src, idx) => {
                        const active = idx === selectedIdx
                        const cap = details?.captions[idx]?.title || `Screen ${idx + 1}`
                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setSelectedIdx(idx)}
                            className={`cursor-pointer bg-white p-1.5 text-left transition-all ${
                              active ? 'ring-1 ring-ink' : 'opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={src}
                              alt=""
                              className={`h-11 w-full ${
                                isUiScreenshot ? 'object-contain' : 'object-cover'
                              }`}
                            />
                            <p className="ledger-figures mt-1 truncate text-[10px] text-ink">
                              0{idx + 1} · {cap}
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Concise Technical Specs Only (No long paragraphs) */}
              <div className="space-y-4">
                <div className="bg-paper-deep/55 p-4">
                  <p className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ledger font-medium">
                    Architecture
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">
                    {spec?.architecture || project.role}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {meta.usedBy}
                  </p>
                </div>

                <div>
                  <p className="ledger-figures mb-2 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(spec?.stack || meta.threeTags).map((t) => (
                      <span
                        key={t}
                        className="ledger-figures bg-paper-deep/80 px-2.5 py-1 text-xs font-medium text-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {spec && (
                  <div>
                    <p className="ledger-figures mb-2 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                      Modules Built
                    </p>
                    <ul className="space-y-1.5">
                      {spec.modules.map((mod) => (
                        <li
                          key={mod}
                          className="flex items-center gap-2 bg-paper-deep/40 px-3 py-2 text-xs text-ink"
                        >
                          <span className="text-ledger font-medium">✓</span>
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    onClick={closeModal}
                    className="ledger-figures inline-flex items-center gap-1.5 bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
                  >
                    Full Technical Spec →
                  </Link>

                  {project.url && meta.kind === 'software' && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ledger-figures inline-flex items-center gap-1.5 bg-paper-deep px-3.5 py-2 text-xs font-medium text-ink hover:bg-paper-deep/75"
                    >
                      Open Live App ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
