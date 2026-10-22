'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PORTFOLIO_IDENTITY, PROJECT_INDEX } from '@/lib/portfolio-config'
import { PhoneIcon, ViberIcon, MailIcon } from '@/components/ui/Icons'

interface ContextPanelProps {
  projects: Project[]
}

const SYSTEM_CARDS = [
  {
    num: '01',
    slug: 'wilcon-month-end-closing',
    title: 'Month-End Closing System',
    org: 'Wilcon Depot · Finance',
    logo: '/logos/wilcon.png',
    tag: 'Laravel · Vue.js',
  },
  {
    num: '02',
    slug: 'wilcon-collection-deposit-report',
    title: 'Collection & Deposit Report',
    org: 'Wilcon Depot · Treasury',
    logo: '/logos/wilcon.png',
    tag: 'PHP · MySQL',
  },
  {
    num: '03',
    slug: 'woh-attendance-system',
    title: 'WOH QR Attendance System',
    org: 'Word of Hope · Live Kiosk',
    logo: undefined,
    badge: 'WOH',
    tag: 'Laravel · QR',
  },
  {
    num: '04',
    slug: 'wilcon-enterprise-systems',
    title: 'Enterprise ERP Workflows',
    org: 'Wilcon Depot · Internal',
    logo: '/logos/wilcon.png',
    tag: 'REST APIs · SQL',
  },
]

export default function ContextPanel({ projects }: ContextPanelProps) {
  const [copiedSummary, setCopiedSummary] = useState(false)
  void projects

  const handleCopyAts = () => {
    const text = [
      `CANDIDATE: ${PORTFOLIO_IDENTITY.name}`,
      `ROLE: ${PORTFOLIO_IDENTITY.role}`,
      `STACK: Laravel, Vue.js, PHP, MySQL, REST APIs, Git`,
      `EXPERIENCE: Full Stack Junior System Developer at Wilcon Depot, Inc. (6 mos, May–Oct 2026)`,
      `EDUCATION: BS Information Technology — Access Computer College (2025)`,
      `PRODUCTION SYSTEMS:`,
      `• Month-End Closing System (Wilcon Depot Finance)`,
      `• Collection and Deposit Report Modification (Wilcon Depot Treasury)`,
      `• WOH Attendance System (Word of Hope Caloocan, live since Mar 2025)`,
      `CONTACT: ${PORTFOLIO_IDENTITY.phone} | ${PORTFOLIO_IDENTITY.email} | Quezon City`,
      `REFERENCE: ${PORTFOLIO_IDENTITY.reference.name} (${PORTFOLIO_IDENTITY.reference.role}, ${PORTFOLIO_IDENTITY.reference.company}) — ${PORTFOLIO_IDENTITY.reference.phone}`,
    ].join('\n')

    navigator.clipboard.writeText(text)
    setCopiedSummary(true)
    setTimeout(() => setCopiedSummary(false), 2000)
  }

  const softwareCount = PROJECT_INDEX.filter((p) => p.kind === 'software').length

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/25 px-6 py-7 space-y-6">
      {/* 1. Candidate Overview Surface (Soft surface, no box borders) */}
      <div className="bg-paper-deep/65 p-4">
        <div className="flex items-center justify-between">
          <span className="ledger-figures text-[10px] font-medium uppercase tracking-[0.12em] text-ledger">
            At a Glance
          </span>
          <span className="ledger-figures bg-ledger/15 px-2 py-0.5 text-[10px] font-medium text-ledger">
            Immediate Start
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="bg-paper p-2.5">
            <p className="font-serif text-xl font-medium text-ink">6 Mos</p>
            <p className="ledger-figures mt-0.5 text-[10px] text-ink-soft">
              Wilcon Depot Dev
            </p>
          </div>
          <div className="bg-paper p-2.5">
            <p className="font-serif text-xl font-medium text-ink">0{softwareCount}</p>
            <p className="ledger-figures mt-0.5 text-[10px] text-ink-soft">
              Shipped Systems
            </p>
          </div>
          <div className="bg-paper p-2.5">
            <p className="font-serif text-xl font-medium text-ink">BSIT</p>
            <p className="ledger-figures mt-0.5 text-[10px] text-ink-soft">
              Graduate · 2025
            </p>
          </div>
          <div className="bg-paper p-2.5">
            <p className="font-serif text-xl font-medium text-ledger">0 Days</p>
            <p className="ledger-figures mt-0.5 text-[10px] text-ink-soft">
              Notice Period
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyAts}
          className="ledger-figures mt-3 flex w-full cursor-pointer items-center justify-between bg-ink px-3.5 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
        >
          <span>{copiedSummary ? '✓ Summary Copied' : 'Copy Hiring Summary'}</span>
          <span>{copiedSummary ? 'Done' : 'Copy →'}</span>
        </button>
      </div>

      {/* 2. Visual System Jump List (Logo + Title + Tag, soft surface hover, no borders) */}
      <div>
        <div className="mb-2.5 flex items-baseline justify-between px-1">
          <p className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Production Systems
          </p>
          <Link
            href="/projects"
            className="ledger-figures text-[11px] text-ink-soft hover:text-ink"
          >
            All →
          </Link>
        </div>

        <div className="space-y-2">
          {SYSTEM_CARDS.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className="group flex items-center gap-3 bg-paper-deep/50 p-3 transition-colors hover:bg-paper-deep"
            >
              {item.logo ? (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-white p-1.5">
                  <img
                    src={item.logo}
                    alt={item.org}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="ledger-figures flex h-9 w-9 shrink-0 items-center justify-center bg-ledger/15 text-[11px] font-medium text-ledger">
                  {item.badge}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-ink group-hover:text-ledger transition-colors">
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-ink-soft">
                  {item.org}
                </p>
              </div>

              <span className="ledger-figures shrink-0 text-xs text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-ink">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Direct Contact & Verified Reference (Soft surface block) */}
      <div className="bg-paper-deep/55 p-4 space-y-3">
        <p className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ink-soft">
          Direct Dispatch
        </p>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={PORTFOLIO_IDENTITY.phoneTel}
            className="flex items-center gap-2 bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <PhoneIcon className="h-3.5 w-3.5 text-ledger shrink-0" />
            <span className="truncate">Call Now</span>
          </a>
          <a
            href={PORTFOLIO_IDENTITY.viberUrl}
            className="flex items-center gap-2 bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <ViberIcon className="h-3.5 w-3.5 text-[#7360F2] shrink-0" />
            <span className="truncate">Viber Chat</span>
          </a>
        </div>

        <a
          href={`mailto:${PORTFOLIO_IDENTITY.email}`}
          className="flex items-center gap-2 bg-paper px-3 py-2 text-xs text-ink-soft transition-colors hover:text-ink"
        >
          <MailIcon className="h-3.5 w-3.5 text-ledger shrink-0" />
          <span className="truncate">{PORTFOLIO_IDENTITY.email}</span>
        </a>

        {/* Reference Sub-block */}
        <div className="bg-paper/80 p-3">
          <span className="ledger-figures block text-[9px] uppercase tracking-[0.12em] text-ledger font-medium">
            Character Reference
          </span>
          <p className="mt-1 text-xs font-medium text-ink">
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
      </div>
    </aside>
  )
}
