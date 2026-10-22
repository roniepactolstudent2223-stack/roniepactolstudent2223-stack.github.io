'use client'

import Link from 'next/link'
import { PORTFOLIO_IDENTITY, SKILL_GROUPS, PROJECT_INDEX } from '@/lib/portfolio-config'

const PRIMARY_SKILLS = new Set([
  'Laravel',
  'PHP',
  'Vue.js',
  'MySQL',
  'REST APIs',
  'Tailwind CSS',
  'Git',
])

const PROJECT_TITLES: Record<string, string> = {
  'wilcon-month-end-closing': 'Month-End Closing System',
  'wilcon-collection-deposit-report': 'Collection & Deposit Report Modification',
  'woh-attendance-system': 'WOH Attendance & Member Care System',
  'wilcon-enterprise-systems': 'Enterprise Web Apps & ERP Workflows',
}

export default function AboutPage() {
  const softwareProjects = PROJECT_INDEX.filter((item) => item.kind === 'software')

  const facts = [
    { label: 'Role', value: 'Full Stack Junior System Developer' },
    { label: 'Core Stack', value: 'Laravel · Vue.js · PHP · MySQL · REST APIs' },
    { label: 'Experience', value: 'Wilcon Depot, Inc. (6 mos) · Word of Hope Caloocan' },
    { label: 'Education', value: 'BS Information Technology · Access Computer College (2021–2025)' },
    { label: 'Location', value: 'Quezon City, Metro Manila' },
  ]

  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="max-w-4xl space-y-12">
        {/* 1. Clean Hero */}
        <header className="border-b border-rule/60 pb-10">
          <h1 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            {PORTFOLIO_IDENTITY.name}
          </h1>
          <p className="ledger-figures mt-2 text-sm text-ink-soft">
            Full Stack Junior System Developer · Laravel · Vue.js · PHP · MySQL
          </p>

          <div className="mt-6 border-l-2 border-ledger bg-paper-deep/55 py-3.5 pl-4 pr-4">
            <p className="text-[15px] leading-relaxed text-ink">
              I build web systems that replace manual spreadsheets and paper sign-ins with validated workflows. At <strong className="font-medium text-ink">Wilcon Depot, Inc.</strong>, I built the Finance team&apos;s Month-End Closing system and upgraded the Treasury Department&apos;s daily Collection and Deposit Report. I also built and maintain the live QR attendance system for <strong className="font-medium text-ink">Word of Hope Caloocan</strong> and volunteer as an event photographer for <strong className="font-medium text-ink">WordPress Philippines</strong>.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={PORTFOLIO_IDENTITY.resumeDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-figures inline-flex items-center gap-1.5 bg-ink px-4 py-2.5 text-xs font-medium text-paper transition-colors hover:bg-ledger"
            >
              Resume (Google Doc) ↗
            </a>
            <Link
              href="/contact"
              className="ledger-figures inline-flex items-center gap-1.5 bg-paper-deep/80 px-4 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
            >
              Contact →
            </Link>
          </div>
        </header>

        {/* 2. Background Facts */}
        <section aria-labelledby="profile-facts-heading" className="grid gap-8 md:grid-cols-[14rem_1fr] md:items-start">
          <div>
            <h2
              id="profile-facts-heading"
              className="font-serif text-2xl font-medium text-ink"
            >
              Background
            </h2>
          </div>

          <dl className="divide-y divide-rule/50 bg-paper-deep/35 px-5 py-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-1 py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4"
              >
                <dt className="ledger-figures text-xs text-ink-soft sm:pt-0.5">
                  {fact.label}
                </dt>
                <dd className="text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
            {PORTFOLIO_IDENTITY.reference && (
              <div className="grid gap-1 py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                <dt className="ledger-figures text-xs text-ink-soft sm:pt-0.5">
                  Reference
                </dt>
                <dd className="text-sm text-ink">
                  <strong className="font-medium text-ink">
                    {PORTFOLIO_IDENTITY.reference.name}
                  </strong>{' '}
                  · {PORTFOLIO_IDENTITY.reference.role}, {PORTFOLIO_IDENTITY.reference.company} (
                  <a
                    href={`tel:${PORTFOLIO_IDENTITY.reference.phone.replace(/[^0-9+]/g, '')}`}
                    className="underline decoration-rule underline-offset-4 hover:decoration-ink"
                  >
                    {PORTFOLIO_IDENTITY.reference.phone}
                  </a>
                  )
                </dd>
              </div>
            )}
          </dl>
        </section>

        {/* 3. Skills & Tools */}
        <section aria-labelledby="about-stack-heading" className="border-t border-rule/60 pt-10 grid gap-8 md:grid-cols-[14rem_1fr] md:items-start">
          <div>
            <h2
              id="about-stack-heading"
              className="font-serif text-2xl font-medium text-ink"
            >
              Skills &amp; Tools
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {SKILL_GROUPS.map((col) => (
              <div key={col.group} className="bg-paper-deep/40 p-4">
                <p className="ledger-figures text-xs font-medium text-ink">
                  {col.group}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {col.items.map((item) => {
                    const isPrimary = PRIMARY_SKILLS.has(item)
                    return (
                      <span
                        key={item}
                        className={`ledger-figures px-2.5 py-1 text-xs ${
                          isPrimary
                            ? 'bg-paper font-medium text-ink'
                            : 'bg-paper/60 text-ink-soft'
                        }`}
                      >
                        {item}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Systems Built */}
        <section aria-labelledby="about-built-heading" className="border-t border-rule/60 pt-10 grid gap-8 md:grid-cols-[14rem_1fr] md:items-start">
          <div>
            <h2
              id="about-built-heading"
              className="font-serif text-2xl font-medium text-ink"
            >
              Systems Built
            </h2>
            <div className="mt-3">
              <Link
                href="/projects"
                className="ledger-figures text-xs text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
              >
                All projects →
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {softwareProjects.map((item) => {
              const title = PROJECT_TITLES[item.slug] || item.slug
              return (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  className="group flex flex-col justify-between bg-paper-deep/45 p-4 transition-colors hover:bg-paper-deep/80"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="ledger-figures text-[11px] font-medium text-ledger">
                        {item.groupLabel}
                      </span>
                      <span className="ledger-figures text-xs text-ink-soft">
                        →
                      </span>
                    </div>

                    <h3 className="mt-1.5 text-base font-medium text-ink group-hover:text-ledger transition-colors">
                      {title}
                    </h3>
                  </div>

                  <p className="ledger-figures mt-3 text-[11px] text-ink-soft">
                    {item.threeTags.join(' · ')}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
