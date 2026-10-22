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
        <p className="text-sm font-medium text-ink">{PORTFOLIO_IDENTITY.name}</p>
        <p className="text-xs text-ink-soft">{PORTFOLIO_IDENTITY.role}</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-none bg-paper-deep/65 p-3.5">
        <div className="flex items-center gap-3.5">
          {/* Clickable Portrait Thumbnail */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden bg-white shadow-xs focus:outline-none"
            title="Click to enlarge portrait"
          >
            <img
              src="/Profile.webp"
              alt={PORTFOLIO_IDENTITY.name}
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover object-[center_35%] transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-ledger ring-2 ring-paper"
              title="Available immediately"
            />
          </button>

          <div className="min-w-0">
            <h2 className="font-serif text-lg font-medium leading-tight text-ink">
              {PORTFOLIO_IDENTITY.name}
            </h2>
            <p className="mt-0.5 text-xs leading-snug text-ink-soft">
              Junior Full Stack Developer
            </p>
            <p className="ledger-figures mt-1 inline-flex items-center gap-1.5 text-[10px] font-medium text-ledger">
              <span>● 0-Day Notice</span>
              <span className="text-ink-soft">· QC</span>
            </p>
          </div>
        </div>

        {/* Organization Logos Strip inside Identity */}
        <div className="mt-3 flex items-center justify-between bg-paper/80 px-2.5 py-1.5">
          <div className="flex items-center gap-2.5">
            <img
              src="/logos/wilcon.png"
              alt="Wilcon Depot"
              className="h-3.5 w-auto object-contain"
            />
            <img
              src="/logos/wordpress.png"
              alt="WordPress PH"
              className="h-3.5 w-auto object-contain"
            />
            <img
              src="/logos/jollibee.png"
              alt="Jollibee"
              className="h-3.5 w-auto object-contain"
            />
          </div>
          <span className="ledger-figures text-[9px] uppercase tracking-[0.08em] text-ink-soft">
            6 Mos Enterprise
          </span>
        </div>
      </div>

      {/* Lightbox Modal for Full Profile Photo */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden bg-paper p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between pb-2">
              <div>
                <h3 className="font-serif text-lg font-medium text-ink">
                  {PORTFOLIO_IDENTITY.name}
                </h3>
                <p className="text-xs text-ink-soft">{PORTFOLIO_IDENTITY.role}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ledger-figures cursor-pointer bg-ink px-3 py-1 text-xs text-paper"
              >
                Close ✕
              </button>
            </div>

            <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
              <img
                src="/Profile.webp"
                alt={PORTFOLIO_IDENTITY.name}
                decoding="async"
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-ink/75 px-3.5 py-2 text-paper backdrop-blur-md">
                <p className="text-xs font-medium text-paper">
                  BS Information Technology (2025) · Quezon City, PH
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
