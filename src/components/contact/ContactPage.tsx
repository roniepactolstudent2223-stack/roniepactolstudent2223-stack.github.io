'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import { LinkedInIcon, GitHubIcon, PhoneIcon, ViberIcon } from '@/components/ui/Icons'
import ContactForm from '@/components/contact/ContactForm'

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
}

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mppwevqd'

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('09931263221')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const externalLinks = PORTFOLIO_IDENTITY.externalLinks ?? []

  return (
    <div ref={containerRef} className="px-6 py-10">
      <div className="max-w-4xl">

        <header data-reveal>
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            Contact
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl">
            Let&apos;s connect
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-500">
            Whether you&apos;re hiring for a junior full-stack developer role, collaborating on a project, or discussing web systems — feel free to reach out.
          </p>
          <div className="mt-6 h-px w-16 bg-neutral-900" />
        </header>

        {/* Direct Call & Viber Card */}
        <section className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-6 sm:p-7" data-reveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-neutral-500 font-semibold">
                  Phone & Viber · Available for Calls
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                0993 126 3221
              </h2>
              <p className="text-xs text-neutral-500">
                Direct mobile line (+63 993 126 3221). Call anytime or message on Viber / SMS.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={PORTFOLIO_IDENTITY.phoneTel}
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-neutral-800 transition-colors"
              >
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>

              <a
                href={PORTFOLIO_IDENTITY.viberUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 transition-colors"
              >
                <ViberIcon className="h-4 w-4 text-[#7360F2]" />
                Viber
              </a>

              <button
                type="button"
                onClick={handleCopyNumber}
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                title="Copy phone number"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-12" data-reveal>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-neutral-900">Send a direct message</h3>
            <p className="text-xs text-neutral-500">Fill out the form below or send an email directly.</p>
          </div>
          <ContactForm formspreeId={FORMSPREE_ID} />
        </section>

        <p className="mt-6 text-sm text-neutral-500" data-reveal>
          Prefer email?{' '}
          <a
            href={`mailto:${PORTFOLIO_IDENTITY.email}`}
            className="font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 transition-colors hover:decoration-neutral-900"
          >
            {PORTFOLIO_IDENTITY.email}
          </a>
        </p>

        {PORTFOLIO_IDENTITY.resumeUrl && (
          <section className="mt-16" data-reveal>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
              Resume
            </p>
            <a
              href={PORTFOLIO_IDENTITY.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 transition-colors hover:decoration-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              View resume
              <span aria-hidden="true" className="text-xs">↗</span>
            </a>
          </section>
        )}

        {externalLinks.length > 0 && (
          <section className="mt-16" data-reveal>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
              Also find me on
            </p>
            <div className="flex gap-3">
              {externalLinks.map((link) => {
                const IconComponent = SOCIAL_ICONS[link.label]
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-600 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white hover:shadow-lg hover:shadow-neutral-300/50"
                  >
                    {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
                    {link.label}
                  </a>
                )
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
