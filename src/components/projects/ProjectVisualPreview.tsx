'use client'

import { useState, useEffect } from 'react'
import type { Project } from '@/lib/types'

interface ProjectVisualPreviewProps {
  project: Project
}

/**
 * High-visibility screenshot preview with multi-screen switcher and
 * click-to-enlarge lightbox directly from the project list.
 */
export default function ProjectVisualPreview({ project }: ProjectVisualPreviewProps) {
  const images = project.images.length > 0 ? project.images : [project.coverImage]
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const currentSrc = images[selectedIdx] || project.coverImage
  const isUiScreenshot =
    project.slug === 'wilcon-month-end-closing' ||
    project.slug === 'wilcon-collection-deposit-report'

  useEffect(() => {
    if (!lightboxSrc) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null)
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxSrc])

  return (
    <div>
      {/* Main Clickable Visual Frame */}
      <button
        type="button"
        onClick={() => setLightboxSrc(currentSrc)}
        className="group relative block w-full cursor-pointer border border-rule bg-white p-1.5 text-left transition-all hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger"
        aria-label={`Enlarge ${project.title} screenshot ${selectedIdx + 1}`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
          <img
            src={currentSrc}
            alt={`${project.title} screenshot ${selectedIdx + 1}`}
            loading="lazy"
            decoding="async"
            className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${
              isUiScreenshot ? 'object-contain' : 'object-cover'
            }`}
          />
          <span className="ledger-figures absolute bottom-1.5 right-1.5 border border-rule bg-paper/95 px-2 py-0.5 text-[10px] text-ink opacity-90 transition-opacity group-hover:opacity-100">
            Click to zoom ⤢
          </span>
        </div>
      </button>

      {/* Multi-Screenshot Thumbnail Switcher */}
      {images.length > 1 && (
        <div className="mt-2 flex items-center gap-1.5" role="tablist" aria-label={`${project.title} screenshots`}>
          {images.map((src, idx) => {
            const isActive = idx === selectedIdx
            return (
              <button
                key={src}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                aria-label={`Show screen ${idx + 1}`}
                aria-selected={isActive}
                className={`relative h-10 flex-1 cursor-pointer overflow-hidden border bg-white p-0.5 transition-all ${
                  isActive
                    ? 'border-ink ring-1 ring-ink'
                    : 'border-rule opacity-70 hover:opacity-100 hover:border-ink'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full ${isUiScreenshot ? 'object-contain' : 'object-cover'}`}
                />
              </button>
            )
          })}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {lightboxSrc && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxSrc(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden border border-rule bg-paper p-3 shadow-2xl"
          >
            <div className="mb-2 flex items-center justify-between border-b border-rule pb-2">
              <span className="ledger-figures text-xs text-ink">
                {project.title} — Screen {selectedIdx + 1} of {images.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxSrc(null)}
                className="ledger-figures cursor-pointer border border-rule bg-paper px-2.5 py-1 text-xs text-ink hover:border-ink"
              >
                Close ✕
              </button>
            </div>

            <div className="flex items-center justify-center bg-white p-2">
              <img
                src={lightboxSrc}
                alt={`${project.title} enlarged screenshot`}
                className="max-h-[78vh] w-auto object-contain"
              />
            </div>

            {images.length > 1 && (
              <div className="mt-2.5 flex justify-center gap-2">
                {images.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setSelectedIdx(idx)
                      setLightboxSrc(src)
                    }}
                    className={`ledger-figures cursor-pointer border px-3 py-1 text-xs ${
                      idx === selectedIdx
                        ? 'border-ink bg-ink text-paper'
                        : 'border-rule bg-paper text-ink hover:border-ink'
                    }`}
                  >
                    Screen {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
