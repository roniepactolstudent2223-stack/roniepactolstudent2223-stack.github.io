'use client'

import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import { PhoneIcon, ViberIcon, MailIcon } from '@/components/ui/Icons'

interface ContextPanelProps {
  projects: Project[]
}

const SYSTEM_CARDS = [
  {
    slug: 'wilcon-month-end-closing',
    title: 'Month-End Closing System',
    org: 'Wilcon Depot · Finance',
    logo: '/logos/wilcon.png',
  },
  {
    slug: 'wilcon-collection-deposit-report',
    title: 'Collection & Deposit Report',
    org: 'Wilcon Depot · Treasury',
    logo: '/logos/wilcon.png',
  },
  {
    slug: 'woh-attendance-system',
    title: 'WOH QR Attendance System',
    org: 'Word of Hope Caloocan',
    badge: 'WOH',
  },
  {
    slug: 'wilcon-enterprise-systems',
    title: 'Enterprise ERP Workflows',
    org: 'Wilcon Depot · Internal',
    logo: '/logos/wilcon.png',
  },
]

export default function ContextPanel({ projects }: ContextPanelProps) {
  void projects

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/20 px-6 py-7 space-y-6">
      {/* Quick Jump to Systems */}
      <div>
        <div className="mb-2.5 flex items-baseline justify-between px-1">
          <h2 className="text-xs font-medium text-ink">Systems Built</h2>
          <Link
            href="/projects"
            className="ledger-figures text-[11px] text-ink-soft hover:text-ink"
          >
            View all →
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
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-white p-1.5">
                  <img
                    src={item.logo}
                    alt={item.org}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="ledger-figures flex h-8 w-8 shrink-0 items-center justify-center bg-paper text-[10px] font-medium text-ink">
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
            </Link>
          ))}
        </div>
      </div>

      {/* Direct Contact & Reference */}
      <div className="bg-paper-deep/50 p-4 space-y-2.5">
        <h2 className="text-xs font-medium text-ink">Direct Contact</h2>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={PORTFOLIO_IDENTITY.phoneTel}
            className="flex items-center gap-2 bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <PhoneIcon className="h-3.5 w-3.5 text-ledger shrink-0" />
            <span className="truncate">{PORTFOLIO_IDENTITY.phone}</span>
          </a>
          <a
            href={PORTFOLIO_IDENTITY.viberUrl}
            className="flex items-center gap-2 bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <ViberIcon className="h-3.5 w-3.5 text-[#7360F2] shrink-0" />
            <span className="truncate">Viber</span>
          </a>
        </div>

        <a
          href={`mailto:${PORTFOLIO_IDENTITY.email}`}
          className="flex items-center gap-2 bg-paper px-3 py-2 text-xs text-ink-soft transition-colors hover:text-ink"
        >
          <MailIcon className="h-3.5 w-3.5 text-ledger shrink-0" />
          <span className="truncate">{PORTFOLIO_IDENTITY.email}</span>
        </a>

        <div className="bg-paper/80 p-3 pt-2.5">
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
      </div>
    </aside>
  )
}
