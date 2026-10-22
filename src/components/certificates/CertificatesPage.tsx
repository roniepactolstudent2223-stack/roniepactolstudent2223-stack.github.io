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
        <header className="border-b border-rule/60 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              Certificates
            </h1>

            <div
              role="group"
              aria-label="Filter certificates"
              className="flex flex-wrap gap-1.5"
            >
              {FILTERS.map((f) => {
                const active = activeFilter === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilter(f.id)}
                    aria-pressed={active}
                    className={`ledger-figures min-h-[34px] cursor-pointer px-3 py-1 text-xs transition-colors ${
                      active
                        ? 'bg-ink font-medium text-paper'
                        : 'bg-paper-deep/65 text-ink-soft hover:bg-paper-deep hover:text-ink'
                    }`}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          </div>
        </header>

        {/* Visual 2-Column Document Gallery Grid */}
        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {filtered.map((cert) => (
            <li
              key={cert.title}
              className="bg-paper-deep/35 p-4 flex flex-col justify-between transition-colors hover:bg-paper-deep/65"
            >
              <div>
                {/* Framed Certificate Preview with Blurred-Back Overlay */}
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="group relative block w-full cursor-pointer overflow-hidden border border-rule/80 bg-white p-1.5 text-left shadow-xs transition-all hover:border-ink"
                >
                  <div className="relative overflow-hidden bg-paper-deep/40">
                    {cert.imageUrl.endsWith('.pdf') ? (
                      <iframe
                        src={`${cert.imageUrl}#toolbar=0`}
                        className="pointer-events-none h-[210px] w-full border-0"
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

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-ink/82 px-3 py-1.5 text-paper backdrop-blur-md">
                      <span className="truncate text-xs font-medium text-paper">
                        {cert.issuer}
                      </span>
                      <span className="ledger-figures shrink-0 text-[10px] text-paper/85">
                        View
                      </span>
                    </div>
                  </div>
                </button>

                {/* Concise Title & Skill Pill */}
                <div className="mt-3.5 flex items-center justify-between gap-2">
                  <span className="ledger-figures bg-ink px-2 py-0.5 text-[10px] font-medium text-paper">
                    {cert.skill}
                  </span>
                  <span className="ledger-figures text-xs text-ink-soft">
                    {cert.date}
                  </span>
                </div>

                <h2
                  onClick={() => setSelectedCert(cert)}
                  className="mt-2 cursor-pointer font-serif text-lg font-medium leading-snug text-ink hover:text-ledger transition-colors"
                >
                  {cert.title}
                </h2>
              </div>

              <div className="mt-4 pt-3 border-t border-rule/40 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="ledger-figures cursor-pointer text-xs font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                >
                  Inspect Document →
                </button>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ledger-figures text-xs font-medium text-ledger underline decoration-ledger/40 underline-offset-4 hover:decoration-ledger"
                  >
                    Verify ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Credential & Verification Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-3 sm:p-6 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden bg-paper shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 bg-paper-deep px-5 py-3.5">
              <div className="min-w-0">
                <p className="ledger-figures text-[11px] text-ledger font-medium">
                  {selectedCert.issuer} · {selectedCert.skill}
                </p>
                <h2 className="truncate font-serif text-lg font-medium text-ink sm:text-xl">
                  {selectedCert.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="ledger-figures shrink-0 cursor-pointer bg-ink px-3 py-1.5 text-xs font-medium text-paper hover:bg-ink/85"
              >
                Close
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid flex-1 gap-6 overflow-y-auto p-5 lg:grid-cols-[1.45fr_1fr] lg:items-start">
              <div className="bg-white p-2">
                {selectedCert.imageUrl.endsWith('.pdf') ? (
                  <iframe
                    src={selectedCert.imageUrl}
                    className="h-[58vh] w-full border-0"
                    title={`${selectedCert.title} full certificate`}
                  />
                ) : (
                  <div className="flex items-center justify-center bg-white">
                    <img
                      src={selectedCert.imageUrl}
                      alt={`${selectedCert.title} full certificate`}
                      className="max-h-[62vh] w-auto object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-ledger bg-paper-deep/65 py-3 pl-3.5 pr-3">
                  <p className="text-sm leading-relaxed text-ink">
                    {selectedCert.applied}
                  </p>
                </div>

                <dl className="space-y-3 bg-paper-deep/40 p-4 text-sm">
                  <div>
                    <dt className="ledger-figures text-xs text-ink-soft">
                      Issued By
                    </dt>
                    <dd className="mt-0.5 font-medium text-ink">
                      {selectedCert.issuer}
                    </dd>
                  </div>
                  <div>
                    <dt className="ledger-figures text-xs text-ink-soft">
                      Year
                    </dt>
                    <dd className="ledger-figures mt-0.5 text-xs text-ink">
                      {selectedCert.date}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={selectedCert.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ledger-figures inline-flex items-center justify-center gap-1.5 bg-ink px-4 py-2.5 text-xs font-medium text-paper transition-colors hover:bg-ledger"
                  >
                    Open File ↗
                  </a>

                  {selectedCert.verifyUrl && (
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ledger-figures inline-flex items-center justify-center gap-1.5 bg-paper-deep px-4 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-paper-deep/75"
                    >
                      Verify Online ↗
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
