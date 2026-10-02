'use client'

import { useState, useEffect } from 'react'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

interface SidebarIdentityProps {
  compact?: boolean
}

export default function SidebarIdentity({ compact = false }: SidebarIdentityProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isModalOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  if (compact) {
    return (
      <div>
        <p className="text-sm font-medium text-neutral-900">{PORTFOLIO_IDENTITY.name}</p>
        <p className="text-xs text-neutral-500">
          {PORTFOLIO_IDENTITY.role}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Clickable Profile Avatar */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-neutral-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          title="Click to view full photo"
        >
          <img
            src="/Profile.jpg"
            alt={PORTFOLIO_IDENTITY.name}
            className="h-full w-full object-cover object-[center_42%] transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        <div className="min-w-0">
          <h1 className="text-sm font-semibold text-neutral-900 truncate">
            {PORTFOLIO_IDENTITY.name}
          </h1>
          <p className="mt-0.5 text-xs text-neutral-500 leading-snug">
            {PORTFOLIO_IDENTITY.role}
          </p>
        </div>
      </div>

      {/* Lightbox Modal for Full Profile Photo */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm sm:max-w-md w-full overflow-hidden rounded-2xl bg-white shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-neutral-900/70 p-2 text-white transition-colors hover:bg-neutral-900"
              aria-label="Close photo view"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Complete Image */}
            <div className="relative aspect-[2/3] w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
              <img
                src="/Profile.jpg"
                alt={PORTFOLIO_IDENTITY.name}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Details Footer */}
            <div className="p-4 bg-white border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">{PORTFOLIO_IDENTITY.name}</h3>
                  <p className="text-xs text-neutral-500">{PORTFOLIO_IDENTITY.role}</p>
                </div>
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-mono text-neutral-600">
                  {PORTFOLIO_IDENTITY.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
