'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

const CATEGORY_COLORS: Record<string, string> = {
  cloud: 'bg-blue-50 text-blue-600',
  development: 'bg-violet-50 text-violet-600',
  design: 'bg-amber-50 text-amber-600',
}

export default function CertificatesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])
  type CertData = typeof PORTFOLIO_IDENTITY.certificates[number]
  const [selectedCert, setSelectedCert] = useState<CertData | null>(null)

  // Entrance animations
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      })

      gsap.from(el.querySelectorAll('[data-cert-card]'), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Hover lift per card
  const setupHover = useCallback((card: HTMLElement | null) => {
    if (!card) return

    const handleEnter = () => {
      gsap.to(card, {
        y: -4,
        boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const handleLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: '0 0px 0px rgba(0,0,0,0)',
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mouseenter', handleEnter)
    card.addEventListener('mouseleave', handleLeave)

    return () => {
      card.removeEventListener('mouseenter', handleEnter)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  // Close modal on Escape
  useEffect(() => {
    if (!selectedCert) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedCert])

  const { certificates } = PORTFOLIO_IDENTITY

  return (
    <div ref={containerRef} className="px-6 py-10">
      <div className="max-w-4xl">

        {/* Hero */}
        <header data-reveal>
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            Credentials
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl">
            Certificates
          </h1>
          <div className="mt-6 h-px w-16 bg-neutral-900" />
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-neutral-500">
            Continuous learning — every certificate represents skills I&apos;ve applied in production.
          </p>
        </header>

        {/* Certificate grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {certificates.map((cert, index) => {
            const categoryColor = CATEGORY_COLORS[cert.category] || 'bg-neutral-100 text-neutral-600'

            return (
              <article
                key={cert.title}
                data-cert-card
                ref={(el) => {
                  cardsRef.current[index] = el
                  setupHover(el)
                }}
                onClick={() => setSelectedCert(cert)}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white"
              >
                {/* Certificate image */}
                <div className="bg-neutral-100">
                  {cert.imageUrl.endsWith('.pdf') ? (
                    <iframe
                      src={`${cert.imageUrl}#toolbar=0`}
                      className="pointer-events-none h-[200px] w-full border-0 sm:h-[280px]"
                      title={`${cert.title} certificate`}
                    />
                  ) : (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={cert.imageUrl}
                        alt={`${cert.title} certificate`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-neutral-900 leading-snug">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-500">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${categoryColor}`}>
                      {cert.skill}
                    </span>
                  </div>

                  {/* How it was applied */}
                  <p className="mt-3 text-xs leading-relaxed text-neutral-500">
                    {cert.applied}
                  </p>

                  {/* Verify link */}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-neutral-500 transition-colors hover:text-neutral-900"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify credential
                      <span aria-hidden="true" className="text-xs">&nearr;</span>
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>

      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative flex w-full max-w-5xl animate-[fadeIn_0.2s_ease-out] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row sm:max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-neutral-600 backdrop-blur-sm transition-colors hover:bg-black/20 hover:text-neutral-900"
              aria-label="Close"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Certificate viewer — left side */}
            <div className="shrink-0 bg-neutral-50 sm:w-[60%]">
              {selectedCert.imageUrl.endsWith('.pdf') ? (
                <iframe
                  src={`${selectedCert.imageUrl}#toolbar=0`}
                  className="h-[50vh] w-full border-0 sm:h-full sm:min-h-[400px]"
                  title={selectedCert.title}
                />
              ) : (
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="w-full object-contain sm:max-h-[80vh]"
                />
              )}
            </div>

            {/* Details — right side */}
            <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:w-[40%] sm:p-8">
              <span className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-medium ${CATEGORY_COLORS[selectedCert.category] || 'bg-neutral-100 text-neutral-600'}`}>
                {selectedCert.skill}
              </span>

              <h2 className="font-serif text-xl font-semibold leading-snug text-neutral-900">
                {selectedCert.title}
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                {selectedCert.issuer} · {selectedCert.date}
              </p>

              <div className="mt-8">
                <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
                  How I applied this
                </p>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {selectedCert.applied}
                </p>
              </div>

              {'badgeUrl' in selectedCert && selectedCert.badgeUrl && (
                <div className="mt-6">
                  <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
                    Badge
                  </p>
                  <a
                    href={selectedCert.badgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 transition-colors hover:decoration-neutral-900"
                  >
                    View badge
                    <span aria-hidden="true" className="text-xs">&nearr;</span>
                  </a>
                </div>
              )}

              {selectedCert.verifyUrl && (
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 transition-colors hover:decoration-neutral-900"
                >
                  Verify credential
                  <span aria-hidden="true" className="text-xs">&nearr;</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
