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
  featured = false,
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
      {/* Elevated Studio Canvas Stage */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group relative block w-full cursor-pointer overflow-hidden bg-paper-deep/65 p-2.5 sm:p-3.5 text-left transition-colors hover:bg-paper-deep"
        aria-label={`View screens for ${project.title}`}
      >
        <div
          className={`relative w-full overflow-hidden border border-rule/70 bg-white shadow-sm ${
            featured ? 'aspect-[16/9]' : 'aspect-[16/10]'
          }`}
        >
          <img
            src={currentSrc}
            alt={currentCaption.title}
            loading="lazy"
            decoding="async"
            className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.02] ${
              isUiScreenshot ? 'object-contain p-1 pb-8' : 'object-cover'
            }`}
          />

          {/* Planned Floating Frosted Caption Bar */}
          <div className="inset-x-0 bottom-0 absolute flex items-center justify-between gap-2 bg-ink/82 px-3 py-1.5 text-paper backdrop-blur-md">
            <span className="truncate text-xs font-medium text-paper">
              {currentCaption.title}
            </span>
            <span className="ledger-figures shrink-0 text-[11px] text-paper/85">
              {images.length > 1 ? `${selectedIdx + 1} / ${images.length}` : 'Inspect'}
            </span>
          </div>
        </div>
      </button>

      {/* Interactive Screen Switcher Filmstrip */}
      {images.length > 1 && (
        <div
          className="mt-2 grid grid-cols-3 gap-2"
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
                className={`group/thumb relative flex cursor-pointer items-center gap-2 p-1.5 text-left transition-all ${
                  isActive
                    ? 'bg-ink text-paper shadow-2xs'
                    : 'bg-paper-deep/55 text-ink-soft hover:bg-paper-deep hover:text-ink'
                }`}
              >
                <div className="relative h-9 w-14 shrink-0 overflow-hidden bg-white">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full ${
                      isUiScreenshot ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>
                <span className="ledger-figures truncate text-[11px] font-medium">
                  {cap}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Fullscreen Visual & Technical Modal */}
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
            className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden bg-paper shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 bg-paper-deep px-5 py-3.5">
              <div className="min-w-0">
                <p className="ledger-figures text-[11px] text-ink-soft">
                  {meta.groupLabel} · {meta.usedBy}
                </p>
                <h2 className="truncate font-serif text-lg font-medium text-ink sm:text-xl">
                  {project.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="ledger-figures shrink-0 cursor-pointer bg-ink px-3.5 py-1.5 text-xs font-medium text-paper hover:bg-ledger"
              >
                Close
              </button>
            </div>

            <div className="grid flex-1 gap-6 overflow-y-auto p-5 lg:grid-cols-[1.65fr_1fr] lg:items-start">
              {/* Left: Large Interactive Screen Stage */}
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
                      className="ledger-figures absolute right-2.5 top-2.5 cursor-pointer bg-ink/75 px-2.5 py-1 text-[10px] text-paper backdrop-blur-md hover:bg-ink"
                    >
                      {hideOverlayText ? 'Show label' : 'Hide label'}
                    </button>

                    {!hideOverlayText && (
                      <div className="inset-x-3 bottom-3 absolute bg-ink/82 px-3.5 py-2 text-paper backdrop-blur-md">
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

              {/* Right: Clean Technical Spec Sheet */}
              <div className="space-y-4">
                <div className="bg-paper-deep/55 p-4">
                  <p className="font-serif text-lg font-medium text-ink">
                    {spec?.architecture || project.role}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {meta.usedBy}
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
                    System Architecture &amp; Screens →
                  </Link>

                  {project.url && meta.kind === 'software' && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ledger-figures inline-flex items-center gap-1.5 bg-paper-deep px-3.5 py-2 text-xs font-medium text-ink hover:bg-paper-deep/75"
                    >
                      Live App ↗
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
