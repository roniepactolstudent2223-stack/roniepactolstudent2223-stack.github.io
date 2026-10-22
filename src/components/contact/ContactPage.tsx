'use client'

import { useState } from 'react'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import { LinkedInIcon, GitHubIcon, PhoneIcon, ViberIcon, FacebookIcon, MailIcon } from '@/components/ui/Icons'
import ContactForm from '@/components/contact/ContactForm'

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Facebook: FacebookIcon,
}

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mppwevqd'

export default function ContactPage() {
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [summaryCopied, setSummaryCopied] = useState(false)

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('09931263221')
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_IDENTITY.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const copyCandidateSummary = () => {
    const summaryText = `Candidate: Ronie Pactol
Role: Junior System Developer (Full Stack)
Core Stack: Laravel, Vue.js, MySQL, PHP, REST APIs
Experience: 6 months at Wilcon Depot (Enterprise Financial & Accounting Systems) + Solo developer of live WOH Attendance System
Reference: John Carlo Pattugan (IT Operations Administrator, LevelUp - https://levelup.support/) | +63 905 1779 250
Availability: Immediate (0-day notice) | Location: Balingasa, Quezon City | SSS, PhilHealth & Pag-IBIG ready
Contact: 0993 126 3221 (Viber) | roniepactol@gmail.com
Portfolio: https://roniepactol.me/
Resume (Live Google Doc): ${PORTFOLIO_IDENTITY.resumeDocUrl}`

    navigator.clipboard.writeText(summaryText)
    setSummaryCopied(true)
    setTimeout(() => setSummaryCopied(false), 2500)
  }

  const externalLinks = PORTFOLIO_IDENTITY.externalLinks ?? []

  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="max-w-4xl space-y-12">
        {/* 1. CLEAN HERO HEADER (No excess borders) */}
        <header className="border-b border-rule/60 pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
              Contact &amp; Availability
            </span>
            <span className="ledger-figures text-xs text-ink-soft">·</span>
            <span className="ledger-figures bg-ledger/12 px-2.5 py-0.5 text-[11px] font-medium text-ledger">
              ✓ Notice period: 0 days · Quezon City, PH
            </span>
          </div>

          <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Let&apos;s connect
          </h1>

          <div className="mt-5 border-l-2 border-ledger bg-paper-deep/55 px-4 py-3.5">
            <p className="text-[15px] leading-relaxed text-ink">
              Available for immediate full-time start (0-day notice) in Quezon City or Metro Manila — with complete SSS, PhilHealth, and Pag-IBIG statutory readiness.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={PORTFOLIO_IDENTITY.resumeDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-figures inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-xs font-medium uppercase tracking-[0.08em] text-paper transition-colors hover:bg-ledger"
            >
              <span>Open Live Resume (Google Doc)</span>
              <span aria-hidden="true">↗</span>
            </a>

            <button
              type="button"
              onClick={copyCandidateSummary}
              className={`ledger-figures inline-flex cursor-pointer items-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.08em] transition-colors ${
                summaryCopied
                  ? 'bg-ledger text-paper'
                  : 'bg-paper-deep/80 text-ink hover:bg-paper-deep'
              }`}
            >
              <span>
                {summaryCopied
                  ? '✓ Candidate Summary Copied'
                  : 'Copy Summary for Hiring Team'}
              </span>
            </button>
          </div>
        </header>

        {/* 2. SOFT SURFACE DIRECT CHANNELS (No heavy card borders) */}
        <section>
          <p className="ledger-figures mb-3 text-xs uppercase tracking-[0.08em] text-ink-soft">
            Direct Channels
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Mobile & SMS */}
            <div className="flex flex-col justify-between bg-paper-deep/45 p-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="ledger-figures text-[10px] font-medium uppercase tracking-[0.12em] text-ledger">
                    01 · Mobile &amp; SMS
                  </span>
                  <PhoneIcon className="h-4 w-4 text-ledger" />
                </div>
                <p className="mt-3 font-serif text-2xl font-medium text-ink">
                  0993 126 3221
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  Direct mobile line (+63 993 126 3221) for phone screening or SMS.
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={PORTFOLIO_IDENTITY.phoneTel}
                  className="ledger-figures inline-flex flex-1 items-center justify-center gap-1.5 bg-ink px-3 py-2 text-[11px] font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ledger"
                >
                  Call Now
                </a>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="ledger-figures inline-flex cursor-pointer items-center justify-center bg-paper px-3 py-2 text-[11px] font-medium uppercase tracking-[0.06em] text-ink transition-colors hover:bg-paper/80"
                >
                  {copiedPhone ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Viber Direct */}
            <div className="flex flex-col justify-between bg-paper-deep/45 p-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="ledger-figures text-[10px] font-medium uppercase tracking-[0.12em] text-ledger">
                    02 · Viber Direct
                  </span>
                  <ViberIcon className="h-4 w-4 text-[#7360F2]" />
                </div>
                <p className="mt-3 font-serif text-2xl font-medium text-ink">
                  +63 993 126 3221
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  For fast interview coordination and HR follow-ups on Viber.
                </p>
              </div>

              <div className="mt-4">
                <a
                  href={PORTFOLIO_IDENTITY.viberUrl}
                  className="ledger-figures inline-flex w-full items-center justify-center gap-2 bg-paper px-3 py-2 text-[11px] font-medium uppercase tracking-[0.06em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <ViberIcon className="h-3.5 w-3.5 text-[#7360F2]" />
                  Open Viber Chat ↗
                </a>
              </div>
            </div>

            {/* Direct Email */}
            <div className="flex flex-col justify-between bg-paper-deep/45 p-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="ledger-figures text-[10px] font-medium uppercase tracking-[0.12em] text-ledger">
                    03 · Direct Email
                  </span>
                  <MailIcon className="h-4 w-4 text-ledger" />
                </div>
                <p className="mt-3 font-serif text-xl font-medium text-ink break-all">
                  {PORTFOLIO_IDENTITY.email}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  For formal interview invitations and technical assessments.
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={`mailto:${PORTFOLIO_IDENTITY.email}`}
                  className="ledger-figures inline-flex flex-1 items-center justify-center gap-1.5 bg-ink px-3 py-2 text-[11px] font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ledger"
                >
                  Email Me
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ledger-figures inline-flex cursor-pointer items-center justify-center bg-paper px-3 py-2 text-[11px] font-medium uppercase tracking-[0.06em] text-ink transition-colors hover:bg-paper/80"
                >
                  {copiedEmail ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. STRUCTURED LEFT/RIGHT MESSAGE FORM & REFERENCE */}
        <section className="border-t border-rule/60 pt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left 7 Cols: Message Form */}
          <div className="lg:col-span-7">
            <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
              Direct Message
            </p>
            <h2 className="mt-1 mb-4 font-serif text-2xl font-medium text-ink">
              Send a message
            </h2>
            <ContactForm formspreeId={FORMSPREE_ID} />
          </div>

          {/* Right 5 Cols: Soft Reference & Readiness Surfaces */}
          <div className="lg:col-span-5 space-y-4">
            {PORTFOLIO_IDENTITY.reference && (
              <div className="bg-paper-deep/45 p-5">
                <span className="ledger-figures text-[10px] font-medium uppercase tracking-[0.12em] text-ledger">
                  Character Reference
                </span>

                <h3 className="mt-2 font-serif text-xl font-medium text-ink">
                  {PORTFOLIO_IDENTITY.reference.name}
                </h3>
                <p className="mt-0.5 text-xs text-ink-soft">
                  {PORTFOLIO_IDENTITY.reference.role}
                </p>
                <a
                  href={PORTFOLIO_IDENTITY.reference.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ledger-figures mt-1 inline-flex items-center gap-1 text-xs font-medium text-ledger hover:underline"
                >
                  <span>{PORTFOLIO_IDENTITY.reference.company}</span>
                  <span aria-hidden="true">↗</span>
                </a>

                <div className="mt-3 pt-3 border-t border-rule/50 flex items-center justify-between">
                  <span className="ledger-figures text-[10px] uppercase text-ink-soft">
                    Mobile
                  </span>
                  <a
                    href={`tel:${PORTFOLIO_IDENTITY.reference.phone.replace(/[^0-9+]/g, '')}`}
                    className="ledger-figures inline-flex items-center gap-1.5 text-xs font-medium text-ink hover:text-ledger"
                  >
                    <PhoneIcon className="h-3.5 w-3.5 text-ledger" />
                    {PORTFOLIO_IDENTITY.reference.phone}
                  </a>
                </div>
              </div>
            )}

            {externalLinks.length > 0 && (
              <div className="bg-paper-deep/45 p-5">
                <span className="ledger-figures block text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  Profiles
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {externalLinks.map((link) => {
                    const IconComponent = SOCIAL_ICONS[link.label]
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ledger-figures inline-flex items-center gap-2 bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                      >
                        {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
                        <span>{link.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
