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

  const externalLinks = PORTFOLIO_IDENTITY.externalLinks ?? []

  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="max-w-4xl space-y-12">
        {/* 1. CLEAN HEADER */}
        <header className="border-b border-rule/60 pb-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
                Contact
              </h1>
              <p className="mt-2 text-sm text-ink-soft">
                Quezon City, Metro Manila · Open to Full-Stack &amp; Web Developer roles
              </p>
            </div>

            <a
              href={PORTFOLIO_IDENTITY.resumeDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-figures inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-xs font-medium text-paper transition-colors hover:bg-ledger"
            >
              <span>Resume (Google Doc)</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        {/* 2. DIRECT CONTACT CHANNELS */}
        <section>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Mobile & SMS */}
            <div className="flex flex-col justify-between bg-paper-deep/45 p-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="ledger-figures text-xs font-medium text-ledger">
                    Phone / SMS
                  </span>
                  <PhoneIcon className="h-4 w-4 text-ledger" />
                </div>
                <p className="mt-3 font-serif text-2xl font-medium text-ink">
                  0993 126 3221
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={PORTFOLIO_IDENTITY.phoneTel}
                  className="ledger-figures inline-flex flex-1 items-center justify-center gap-1.5 bg-ink px-3 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
                >
                  Call
                </a>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="ledger-figures inline-flex cursor-pointer items-center justify-center bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-paper/80"
                >
                  {copiedPhone ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Viber Direct */}
            <div className="flex flex-col justify-between bg-paper-deep/45 p-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="ledger-figures text-xs font-medium text-ledger">
                    Viber
                  </span>
                  <ViberIcon className="h-4 w-4 text-[#7360F2]" />
                </div>
                <p className="mt-3 font-serif text-2xl font-medium text-ink">
                  +63 993 126 3221
                </p>
              </div>

              <div className="mt-4">
                <a
                  href={PORTFOLIO_IDENTITY.viberUrl}
                  className="ledger-figures inline-flex w-full items-center justify-center gap-2 bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <ViberIcon className="h-3.5 w-3.5 text-[#7360F2]" />
                  Open Viber ↗
                </a>
              </div>
            </div>

            {/* Direct Email */}
            <div className="flex flex-col justify-between bg-paper-deep/45 p-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="ledger-figures text-xs font-medium text-ledger">
                    Email
                  </span>
                  <MailIcon className="h-4 w-4 text-ledger" />
                </div>
                <p className="mt-3 font-serif text-xl font-medium text-ink break-all">
                  {PORTFOLIO_IDENTITY.email}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <a
                  href={`mailto:${PORTFOLIO_IDENTITY.email}`}
                  className="ledger-figures inline-flex flex-1 items-center justify-center gap-1.5 bg-ink px-3 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
                >
                  Email
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="ledger-figures inline-flex cursor-pointer items-center justify-center bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-paper/80"
                >
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. STRUCTURED LEFT/RIGHT MESSAGE FORM & REFERENCE */}
        <section className="border-t border-rule/60 pt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left 7 Cols: Message Form */}
          <div className="lg:col-span-7">
            <h2 className="mb-4 font-serif text-2xl font-medium text-ink">
              Send a message
            </h2>
            <ContactForm formspreeId={FORMSPREE_ID} />
          </div>

          {/* Right 5 Cols: Reference & Profiles */}
          <div className="lg:col-span-5 space-y-4">
            {PORTFOLIO_IDENTITY.reference && (
              <div className="bg-paper-deep/45 p-5">
                <span className="ledger-figures text-xs font-medium text-ledger">
                  Reference
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
                  <span className="ledger-figures text-xs text-ink-soft">
                    Phone
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
                <span className="ledger-figures block text-xs text-ink-soft">
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
