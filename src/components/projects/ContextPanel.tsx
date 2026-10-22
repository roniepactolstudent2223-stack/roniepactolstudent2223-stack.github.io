'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import {
  LinkedInIcon,
  GitHubIcon,
  FacebookIcon,
  PhoneIcon,
  ViberIcon,
  MailIcon,
} from '@/components/ui/Icons'

interface ContextPanelProps {
  projects: Project[]
  currentProject?: Project
}

const ENTERPRISE_SYSTEMS = [
  {
    slug: 'wilcon-month-end-closing',
    title: 'Month-End Closing System',
    dept: 'Finance & Accounting',
    logo: '/logos/wilcon.png',
  },
  {
    slug: 'wilcon-collection-deposit-report',
    title: 'Collection & Deposit Report',
    dept: 'Treasury Dept',
    logo: '/logos/wilcon.png',
  },
  {
    slug: 'wilcon-enterprise-systems',
    title: 'Enterprise ERP Workflows',
    dept: 'Internal Systems',
    logo: '/logos/wilcon.png',
  },
]

const SOLO_SYSTEMS = [
  {
    slug: 'woh-attendance-system',
    title: 'WOH QR Attendance System',
    dept: 'Word of Hope · Live Kiosk',
    badge: 'WOH',
  },
]

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Facebook: FacebookIcon,
}

export default function ContextPanel({ projects, currentProject }: ContextPanelProps) {
  void projects
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyPhone = () => {
    navigator.clipboard.writeText('09931263221')
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 1800)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_IDENTITY.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 1800)
  }

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/25 px-6 py-7 space-y-5">
      {/* 1. Prominent Visual Resume + Profiles + Direct Contact Hub */}
      <div className="bg-paper-deep/65 p-4 space-y-3.5">
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-ink p-4 text-paper shadow-xs transition-colors hover:bg-ledger"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-serif text-base font-medium leading-snug text-paper">
                Resume / CV
              </p>
              <p className="ledger-figures mt-0.5 text-[11px] text-paper/75">
                Open or download in Google Docs
              </p>
            </div>
            <span className="ledger-figures flex h-8 w-8 shrink-0 items-center justify-center bg-paper/15 text-xs text-paper transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </div>
        </a>

        {/* LinkedIn, GitHub & Social Tiles */}
        <div className="grid grid-cols-3 gap-2">
          {PORTFOLIO_IDENTITY.externalLinks.map((link) => {
            const Icon = SOCIAL_ICONS[link.label]
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 bg-paper py-3 px-2 text-xs font-medium text-ink shadow-2xs transition-colors hover:bg-ink hover:text-paper"
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span className="ledger-figures text-[11px]">{link.label}</span>
              </a>
            )
          })}
        </div>

        {/* Direct Phone, Viber & Email */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between gap-2 bg-paper px-3 py-2.5 shadow-2xs">
            <a
              href={PORTFOLIO_IDENTITY.phoneTel}
              className="flex min-w-0 items-center gap-2 text-xs font-medium text-ink hover:text-ledger"
            >
              <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-ledger" />
              <span className="ledger-figures truncate">{PORTFOLIO_IDENTITY.phone}</span>
            </a>

            <div className="flex shrink-0 items-center gap-1.5">
              <a
                href={PORTFOLIO_IDENTITY.viberUrl}
                className="ledger-figures inline-flex items-center gap-1 bg-paper-deep/75 px-2 py-0.5 text-[10px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <ViberIcon className="h-3 w-3 text-[#7360F2]" />
                <span>Viber</span>
              </a>
              <button
                type="button"
                onClick={copyPhone}
                className="ledger-figures cursor-pointer bg-paper-deep/75 px-2 py-0.5 text-[10px] font-medium text-ink hover:bg-ink hover:text-paper"
              >
                {copiedPhone ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 bg-paper px-3 py-2.5 shadow-2xs">
            <a
              href={`mailto:${PORTFOLIO_IDENTITY.email}`}
              className="flex min-w-0 items-center gap-2 text-xs text-ink hover:text-ledger"
            >
              <MailIcon className="h-3.5 w-3.5 shrink-0 text-ledger" />
              <span className="ledger-figures truncate text-[11px]">{PORTFOLIO_IDENTITY.email}</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="ledger-figures shrink-0 cursor-pointer bg-paper-deep/75 px-2 py-0.5 text-[10px] font-medium text-ink hover:bg-ink hover:text-paper"
            >
              {copiedEmail ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Categorized Systems Switcher */}
      <div className="space-y-4">
        {/* Enterprise Systems (Wilcon Depot) */}
        <div>
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="ledger-figures text-[11px] font-medium text-ink">
              Wilcon Depot · Enterprise
            </span>
          </div>

          <div className="space-y-1.5">
            {ENTERPRISE_SYSTEMS.map((item) => {
              const isCurrent = currentProject?.slug === item.slug
              return (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  className={`group flex items-center gap-3 p-2.5 transition-colors ${
                    isCurrent
                      ? 'bg-ink text-paper'
                      : 'bg-paper-deep/50 hover:bg-paper-deep'
                  }`}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-white p-1">
                    <img
                      src={item.logo}
                      alt="Wilcon Depot"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-xs font-medium transition-colors ${
                        isCurrent
                          ? 'text-paper'
                          : 'text-ink group-hover:text-ledger'
                      }`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`truncate text-[10px] ${
                        isCurrent ? 'text-paper/75' : 'text-ink-soft'
                      }`}
                    >
                      {item.dept}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Independent Production System */}
        <div>
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="ledger-figures text-[11px] font-medium text-ink">
              Solo Live System
            </span>
          </div>

          <div className="space-y-1.5">
            {SOLO_SYSTEMS.map((item) => {
              const isCurrent = currentProject?.slug === item.slug
              return (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  className={`group flex items-center gap-3 p-2.5 transition-colors ${
                    isCurrent
                      ? 'bg-ink text-paper'
                      : 'bg-paper-deep/50 hover:bg-paper-deep'
                  }`}
                >
                  <div className="ledger-figures flex h-7 w-7 shrink-0 items-center justify-center bg-paper text-[10px] font-medium text-ink">
                    {item.badge}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-xs font-medium transition-colors ${
                        isCurrent
                          ? 'text-paper'
                          : 'text-ink group-hover:text-ledger'
                      }`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`truncate text-[10px] ${
                        isCurrent ? 'text-paper/75' : 'text-ink-soft'
                      }`}
                    >
                      {item.dept}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3. Compact Reference Card */}
      {PORTFOLIO_IDENTITY.reference && (
        <div className="bg-paper-deep/45 p-3.5">
          <p className="text-[11px] text-ink-soft">Reference</p>
          <p className="mt-0.5 text-xs font-medium text-ink">
            {PORTFOLIO_IDENTITY.reference.name}
          </p>
          <p className="text-[11px] text-ink-soft">
            {PORTFOLIO_IDENTITY.reference.role} ·{' '}
            <a
              href={PORTFOLIO_IDENTITY.reference.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-rule underline-offset-2 hover:text-ink"
            >
              {PORTFOLIO_IDENTITY.reference.company}
            </a>
          </p>
          <a
            href={`tel:${PORTFOLIO_IDENTITY.reference.phone.replace(/[^0-9+]/g, '')}`}
            className="ledger-figures mt-1 inline-block text-[11px] font-medium text-ink hover:text-ledger"
          >
            {PORTFOLIO_IDENTITY.reference.phone}
          </a>
        </div>
      )}
    </aside>
  )
}
