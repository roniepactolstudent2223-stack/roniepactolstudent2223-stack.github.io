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
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* ─── SPLIT HERO HEADER ─── */}
      <header className="border-b border-rule pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
          <span>DIRECT_DISPATCH // HIRING &amp; COLLABORATION</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-ledger">
            <span className="h-1.5 w-1.5 rounded-full bg-ledger" />
            Notice period: 0 days · Quezon City, PH
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left: Headline + Callout + Hiring Team Copy */}
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ledger font-semibold">
              Contact &amp; Availability
            </p>
            <h1 className="mt-2 font-serif text-3xl font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl">
              Let&apos;s connect for your next{' '}
              <span className="italic text-ledger">system developer</span> role.
            </h1>

            <div className="mt-5 border-l-2 border-ledger bg-paper-deep/60 px-4 py-3">
              <span className="block font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-ledger">
                Immediate Onboarding Ready
              </span>
              <p className="mt-1 text-sm sm:text-base font-medium leading-snug text-ink">
                Available for immediate full-time start (0-day notice) in Quezon City or Metro Manila — with complete SSS, PhilHealth, and Pag-IBIG statutory readiness.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={PORTFOLIO_IDENTITY.resumeDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.08em] text-paper transition-colors hover:bg-ledger hover:border-ledger"
              >
                <span>Open Live Resume (Google Doc)</span>
                <span aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                onClick={copyCandidateSummary}
                className={`inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.08em] transition-colors ${
                  summaryCopied
                    ? 'border-ledger bg-ledger text-paper'
                    : 'border-rule bg-white text-ink hover:border-ink'
                }`}
              >
                <span>
                  {summaryCopied
                    ? '✓ Candidate Summary Copied'
                    : 'Copy Summary for Hiring Team'}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Framed Candidate Dispatch Card with Blurred-Back Overlay */}
          <div className="lg:col-span-4">
            <div className="overflow-hidden border border-rule bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-rule bg-paper-deep px-3 py-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rule" />
                  <span className="h-2 w-2 rounded-full bg-rule" />
                  <span className="h-2 w-2 rounded-full bg-ledger/60" />
                  <span className="ml-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink-soft">
                    Candidate Card
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ledger font-semibold">
                  ● Direct Line
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Profile.webp"
                  alt="Ronie Pactol"
                  className="h-full w-full object-cover object-top"
                />
                {/* Small planned blurred-back caption overlay */}
                <div className=" inset-x-0 bottom-0 absolute border-t border-white/15 bg-ink/80 px-3.5 py-2 text-paper backdrop-blur-md">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-paper">
                        {PORTFOLIO_IDENTITY.name}
                      </p>
                      <p className="truncate font-mono text-[10px] text-paper/80">
                        Junior System Developer · QC, PH
                      </p>
                    </div>
                    <span className="shrink-0 border border-white/25 bg-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-paper">
                      0-Day Notice
                    </span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-rule bg-white px-3.5 py-2 font-mono text-[11px]">
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-ink-muted">MOBILE / VIBER</span>
                  <a href={PORTFOLIO_IDENTITY.phoneTel} className="font-semibold text-ink hover:text-ledger">
                    0993 126 3221
                  </a>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-ink-muted">EMAIL</span>
                  <a href={`mailto:${PORTFOLIO_IDENTITY.email}`} className="font-semibold text-ink hover:text-ledger truncate max-w-[180px]">
                    {PORTFOLIO_IDENTITY.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── 3 VISUAL DIRECT CONTACT CARDS ─── */}
      <section className="border-b border-rule py-10 sm:py-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ledger">
              01 / Direct Channels
            </span>
            <h2 className="font-serif text-2xl font-normal text-ink sm:text-3xl">
              Fastest ways to reach me
            </h2>
          </div>
          <span className="font-mono text-xs text-ink-muted">
            Phone · Viber · Email
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Card 1: Mobile & SMS */}
          <div className="flex flex-col justify-between border border-rule bg-white p-5 shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-rule pb-2.5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ledger">
                  01 · Mobile &amp; SMS
                </span>
                <PhoneIcon className="h-4 w-4 text-ledger" />
              </div>
              <p className="mt-4 font-serif text-2xl font-medium tracking-tight text-ink">
                0993 126 3221
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Direct mobile line (+63 993 126 3221). Available for phone screening, HR calls, or SMS anytime.
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 pt-3 border-t border-rule/60">
              <a
                href={PORTFOLIO_IDENTITY.phoneTel}
                className="inline-flex flex-1 items-center justify-center gap-1.5 border border-ink bg-ink px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-paper transition-colors hover:bg-ledger hover:border-ledger"
              >
                <PhoneIcon className="h-3.5 w-3.5" />
                Call Now
              </a>
              <button
                type="button"
                onClick={handleCopyNumber}
                className="inline-flex items-center justify-center border border-rule bg-paper/60 px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink"
              >
                {copiedPhone ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Card 2: Viber Direct */}
          <div className="flex flex-col justify-between border border-rule bg-white p-5 shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-rule pb-2.5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ledger">
                  02 · Viber Direct
                </span>
                <ViberIcon className="h-4 w-4 text-[#7360F2]" />
              </div>
              <p className="mt-4 font-serif text-2xl font-medium tracking-tight text-ink">
                +63 993 126 3221
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Preferred by many local HR teams for quick interview coordination and document follow-ups.
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 pt-3 border-t border-rule/60">
              <a
                href={PORTFOLIO_IDENTITY.viberUrl}
                className="inline-flex w-full items-center justify-center gap-2 border border-ink bg-white px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <ViberIcon className="h-3.5 w-3.5 text-[#7360F2]" />
                Open Viber Chat ↗
              </a>
            </div>
          </div>

          {/* Card 3: Direct Email */}
          <div className="flex flex-col justify-between border border-rule bg-white p-5 shadow-xs">
            <div>
              <div className="flex items-center justify-between border-b border-rule pb-2.5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ledger">
                  03 · Direct Email
                </span>
                <MailIcon className="h-4 w-4 text-ledger" />
              </div>
              <p className="mt-4 font-serif text-xl font-medium tracking-tight text-ink break-all">
                {PORTFOLIO_IDENTITY.email}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                For formal interview invitations, technical assessments, and job descriptions.
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 pt-3 border-t border-rule/60">
              <a
                href={`mailto:${PORTFOLIO_IDENTITY.email}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 border border-ink bg-ink px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-paper transition-colors hover:bg-ledger hover:border-ledger"
              >
                <MailIcon className="h-3.5 w-3.5" />
                Email Me
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center border border-rule bg-paper/60 px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink"
              >
                {copiedEmail ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FORM + REFERENCE & READINESS LEDGER ─── */}
      <section className="py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left 7 Cols: Message Form */}
          <div className="lg:col-span-7">
            <div className="mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-ledger">
                02 / Message Form
              </span>
              <h2 className="mt-1 font-serif text-2xl font-normal text-ink">
                Send a message right from this page
              </h2>
            </div>
            <ContactForm formspreeId={FORMSPREE_ID} />
          </div>

          {/* Right 5 Cols: Reference + Readiness + Socials */}
          <div className="lg:col-span-5 space-y-5">
            {/* Professional Reference Card */}
            {PORTFOLIO_IDENTITY.reference && (
              <div className="border border-rule bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-rule pb-2.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ledger">
                    Verified Character Reference
                  </span>
                  <span className="border border-ledger/30 bg-ledger-Faint px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-ledger">
                    ● Direct Contact
                  </span>
                </div>

                <div className="mt-3.5">
                  <h3 className="font-serif text-xl font-medium text-ink">
                    {PORTFOLIO_IDENTITY.reference.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-ink-soft">
                    {PORTFOLIO_IDENTITY.reference.role}
                  </p>
                  <a
                    href={PORTFOLIO_IDENTITY.reference.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-ledger hover:underline"
                  >
                    <span>{PORTFOLIO_IDENTITY.reference.company}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-rule pt-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                    Reference Mobile
                  </span>
                  <a
                    href={`tel:${PORTFOLIO_IDENTITY.reference.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-ink hover:text-ledger"
                  >
                    <PhoneIcon className="h-3.5 w-3.5 text-ledger" />
                    {PORTFOLIO_IDENTITY.reference.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Pre-Employment & Logistics Readiness Card */}
            <div className="border border-rule bg-paper-deep/50 p-5">
              <div className="border-b border-rule pb-2.5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ledger">
                  Pre-Employment &amp; Logistics Ledger
                </span>
              </div>

              <dl className="mt-3 divide-y divide-rule/70 font-mono text-xs">
                <div className="flex items-center justify-between py-2">
                  <dt className="text-ink-muted">NOTICE PERIOD</dt>
                  <dd className="font-semibold text-ledger">Immediate (0 Days)</dd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <dt className="text-ink-muted">STATUTORY IDS</dt>
                  <dd className="font-semibold text-ink">SSS · PhilHealth · Pag-IBIG</dd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <dt className="text-ink-muted">RESIDENCE</dt>
                  <dd className="font-semibold text-ink">Balingasa, Quezon City</dd>
                </div>
                <div className="flex items-center justify-between py-2">
                  <dt className="text-ink-muted">WORK SETUP</dt>
                  <dd className="font-semibold text-ink">On-site · Hybrid · Remote</dd>
                </div>
              </dl>
            </div>

            {/* External Profiles Card */}
            {externalLinks.length > 0 && (
              <div className="border border-rule bg-white p-5 shadow-xs">
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Developer &amp; Social Profiles
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
                        className="inline-flex items-center gap-2 border border-rule bg-paper/50 px-3.5 py-2 font-mono text-xs font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
                        <span>{link.label}</span>
                        <span aria-hidden="true" className="text-[10px] opacity-70">↗</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
