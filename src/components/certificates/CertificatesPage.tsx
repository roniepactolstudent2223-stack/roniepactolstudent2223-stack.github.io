'use client'

import { useState, useEffect } from 'react'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

type CertData = (typeof PORTFOLIO_IDENTITY.certificates)[number]

type FilterId = 'all' | 'web' | 'national' | 'ojt'

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web & Programming' },
  { id: 'national', label: 'TESDA & DICT' },
  { id: 'ojt', label: 'Work / OJT' },
]

function matchesFilter(cert: CertData, filter: FilterId): boolean {
  if (filter === 'all') return true
  if (filter === 'web') {
    return ['JavaScript', 'Vue.js', 'Python'].includes(cert.skill)
  }
  if (filter === 'national') {
    return ['Networking', 'English Communication'].includes(cert.skill)
  }
  if (filter === 'ojt') {
    return cert.skill === 'Work Experience'
  }
  return true
}

export default function CertificatesPage() {
  const { certificates } = PORTFOLIO_IDENTITY
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [selectedCert, setSelectedCert] = useState<CertData | null>(null)

  const filtered = certificates.filter((c) => matchesFilter(c, activeFilter))
  const countFor = (id: FilterId) =>
    certificates.filter((c) => matchesFilter(c, id)).length

  useEffect(() => {
    if (!selectedCert) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedCert])

  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="max-w-4xl">
        {/* Header + Filter Chips */}
        <header className="border-b border-rule pb-6">
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
            Verified Credentials &amp; Certifications
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Certificates
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Technical certifications from Cisco Networking Academy, DICT-ITU, Scrimba, TESDA (NC2 Computer Systems Servicing), and my OJT completion certificate. Click any certificate to inspect the full document and verification links.
          </p>

          <div
            role="group"
            aria-label="Filter certificates"
            className="mt-6 flex flex-wrap gap-1.5"
          >
            {FILTERS.map((f) => {
              const active = activeFilter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  aria-pressed={active}
                  className={`ledger-figures min-h-[36px] cursor-pointer border px-3 py-1 text-xs transition-colors ${
                    active
                      ? 'border-ink bg-ink font-medium text-paper'
                      : 'border-rule bg-paper text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  {f.label} ({countFor(f.id)})
                </button>
              )
            })}
          </div>
        </header>

        {/* Certificate Visual Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filtered.map((cert, index) => (
            <article
              key={cert.title}
              onClick={() => setSelectedCert(cert)}
              className="group flex cursor-pointer flex-col justify-between border border-rule bg-white p-2.5 shadow-xs transition-all hover:border-ink"
            >
              <div>
                {/* Window Chrome Bar */}
                <div className="mb-1.5 flex items-center justify-between border-b border-rule px-1.5 pb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rule" />
                    <span className="h-2 w-2 rounded-full bg-rule" />
                    <span className="h-2 w-2 rounded-full bg-ledger/70" />
                    <span className="ledger-figures ml-1 text-[10px] text-ink-soft">
                      Credential 0{index + 1} · {cert.date}
                    </span>
                  </div>
                  <span className="ledger-figures text-[10px] font-medium text-ledger group-hover:underline">
                    Inspect ⤢
                  </span>
                </div>

                {/* Certificate Document / Image Preview + Small Blurred-Back Overlay Bar */}
                <div className="relative overflow-hidden border border-rule/60 bg-paper-deep/40">
                  {cert.imageUrl.endsWith('.pdf') ? (
                    <iframe
                      src={`${cert.imageUrl}#toolbar=0`}
                      className="pointer-events-none h-[210px] w-full border-0 sm:h-[240px]"
                      title={`${cert.title} certificate`}
                    />
                  ) : (
                    <div className="aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={cert.imageUrl}
                        alt={`${cert.title} certificate`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}

                  {/* Planned Bottom Blurred-Back Overlay Bar */}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-white/15 bg-ink/80 px-3 py-1.5 text-paper backdrop-blur-md">
                    <span className="truncate text-[11px] font-medium text-paper">
                      {cert.issuer}
                    </span>
                    <span className="ledger-figures shrink-0 border border-paper/30 bg-paper/10 px-1.5 py-0.5 text-[10px] text-paper">
                      View &amp; Verify ⤢
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="mt-3 px-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-medium leading-snug text-ink">
                      {cert.title}
                    </h2>
                    <span className="ledger-figures shrink-0 border border-ledger/40 bg-ledger/10 px-2 py-0.5 text-[10px] font-medium text-ledger">
                      {cert.skill}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    {cert.applied}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-rule/60 px-1 pt-2.5">
                <span className="ledger-figures text-[11px] font-medium text-ink underline decoration-rule underline-offset-4 group-hover:decoration-ink">
                  Open full document →
                </span>

                <div className="flex items-center gap-3">
                  {'badgeUrl' in cert && cert.badgeUrl && (
                    <a
                      href={cert.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="ledger-figures text-[11px] text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink"
                    >
                      Badge ↗
                    </a>
                  )}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="ledger-figures text-[11px] font-medium text-ledger underline decoration-ledger/40 underline-offset-4 hover:decoration-ledger"
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Complete Certificate & Verification Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-rule bg-paper shadow-2xl"
          >
            {/* Modal Header */}
            <header className="flex items-center justify-between gap-4 border-b border-rule bg-paper px-5 py-3.5">
              <div className="min-w-0">
                <p className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                  {selectedCert.issuer} · {selectedCert.date}
                </p>
                <h2 className="truncate font-serif text-xl font-medium text-ink sm:text-2xl">
                  {selectedCert.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="ledger-figures shrink-0 cursor-pointer border border-ink bg-ink px-3 py-1.5 text-xs font-medium text-paper hover:bg-ink/85"
              >
                Close ✕
              </button>
            </header>

            {/* Modal Content */}
            <div className="grid flex-1 overflow-y-auto p-5 sm:grid-cols-[1.45fr_1fr] sm:gap-6">
              {/* Left: Document Viewer */}
              <div className="border border-rule bg-white p-2">
                {selectedCert.imageUrl.endsWith('.pdf') ? (
                  <iframe
                    src={`${selectedCert.imageUrl}#toolbar=0`}
                    className="h-[52vh] w-full border-0 sm:h-[64vh]"
                    title={selectedCert.title}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-white">
                    <img
                      src={selectedCert.imageUrl}
                      alt={selectedCert.title}
                      className="max-h-[64vh] w-auto object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Right: Complete Credential Details */}
              <div className="mt-5 flex flex-col justify-between sm:mt-0">
                <div className="space-y-4">
                  <div>
                    <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-2.5 py-0.5 text-xs font-medium text-ledger">
                      Skill: {selectedCert.skill}
                    </span>
                  </div>

                  <dl className="space-y-3 border-t border-rule pt-4 text-sm">
                    <div>
                      <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                        Issued By
                      </dt>
                      <dd className="mt-0.5 font-medium text-ink">{selectedCert.issuer}</dd>
                    </div>
                    <div>
                      <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
                        Year Completed
                      </dt>
                      <dd className="ledger-figures mt-0.5 text-ink">{selectedCert.date}</dd>
                    </div>
                    <div>
                      <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ledger font-medium">
                        What It Covers
                      </dt>
                      <dd className="mt-1 leading-relaxed text-ink">{selectedCert.applied}</dd>
                    </div>
                  </dl>
                </div>

                {/* Action Links */}
                <div className="mt-6 space-y-2.5 border-t border-rule pt-4">
                  <a
                    href={selectedCert.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ledger-figures flex w-full items-center justify-center gap-1.5 border border-ink bg-ink px-4 py-2.5 text-xs font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink/85"
                  >
                    Open Full Certificate File ↗
                  </a>

                  {selectedCert.verifyUrl && (
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ledger-figures flex w-full items-center justify-center gap-1.5 border border-ledger bg-ledger/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.06em] text-ledger transition-colors hover:bg-ledger/20"
                    >
                      Verify Credential Online ↗
                    </a>
                  )}

                  {'badgeUrl' in selectedCert && selectedCert.badgeUrl && (
                    <a
                      href={selectedCert.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ledger-figures flex w-full items-center justify-center gap-1.5 border border-rule bg-paper px-4 py-2 text-xs text-ink underline decoration-rule underline-offset-4 hover:border-ink"
                    >
                      View Official Badge ↗
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
