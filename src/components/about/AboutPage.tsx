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
    { label: 'Target Role', value: 'Junior Full Stack Developer / Web Developer' },
    { label: 'Core Stack', value: 'Laravel · Vue.js · PHP · MySQL · REST APIs' },
    { label: 'Recent Role', value: 'Full Stack Junior System Developer · Wilcon Depot, Inc. (6 mos)' },
    { label: 'Education', value: 'BS Information Technology · Access Computer College (2021–2025)' },
    { label: 'Availability', value: 'Immediate · 0-day notice period' },
    { label: 'Location', value: 'Balingasa, Quezon City, Philippines' },
    { label: 'Statutory Ready', value: 'SSS · PhilHealth · Pag-IBIG ready' },
  ]

  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="max-w-4xl space-y-12">
        {/* 1. Split Hero: Bio + Academic & Organization Ledger Card (No duplicate portrait on desktop) */}
        <header className="grid gap-8 border-b border-rule pb-10 lg:grid-cols-[1fr_17rem] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
                Candidate Dossier
              </span>
              <span className="ledger-figures text-xs text-ink-soft">·</span>
              <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-2 py-0.5 text-[11px] font-medium text-ledger">
                ✓ Notice period: 0 days
              </span>
            </div>

            <h1 className="mt-2 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              {PORTFOLIO_IDENTITY.name}
            </h1>
            <p className="ledger-figures mt-2 text-sm text-ink-soft">
              Full Stack Junior System Developer · Laravel · Vue.js · PHP · MySQL
            </p>

            <div className="mt-5 border-l-2 border-ledger bg-paper-deep/65 py-3 pl-4 pr-3.5">
              <p className="text-[15px] leading-relaxed text-ink">
                I build web systems that replace manual spreadsheets and paper sign-ins with validated workflows. Over 6 months at <strong className="font-medium text-ink">Wilcon Depot, Inc.</strong>, I built the Finance team&apos;s Month-End Closing system and upgraded the Treasury Department&apos;s daily Collection and Deposit Report. Outside of work, I built and maintain the live QR attendance system for <strong className="font-medium text-ink">Word of Hope Caloocan</strong> and volunteer as an event photographer for <strong className="font-medium text-ink">WordPress Philippines</strong>.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={PORTFOLIO_IDENTITY.resumeDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ledger-figures inline-flex items-center gap-1.5 border border-ink bg-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink/85"
              >
                Open Live Resume ↗
              </a>
              <Link
                href="/contact"
                className="ledger-figures inline-flex items-center gap-1.5 border border-rule bg-paper px-4 py-2 text-xs font-medium uppercase tracking-[0.06em] text-ink transition-colors hover:border-ink"
              >
                Contact Details →
              </Link>
              <a
                href={PORTFOLIO_IDENTITY.phoneTel}
                className="ledger-figures inline-flex items-center gap-1.5 px-2 py-2 text-xs text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink"
              >
                Call {PORTFOLIO_IDENTITY.phone}
              </a>
            </div>
          </div>

          {/* Right: Academic & Organization Verification Card */}
          <div className="border border-rule bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-rule pb-2.5">
              <span className="ledger-figures text-[10px] font-medium uppercase tracking-[0.12em] text-ledger">
                Verified Background
              </span>
              <span className="ledger-figures text-[10px] text-ink-soft">
                2021–2026
              </span>
            </div>

            <dl className="mt-3 divide-y divide-rule/70 text-xs">
              <div className="py-2">
                <dt className="ledger-figures text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  Degree
                </dt>
                <dd className="mt-0.5 font-medium text-ink">
                  BS Information Technology (2025)
                </dd>
              </div>
              <div className="py-2">
                <dt className="ledger-figures text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  Enterprise Dev
                </dt>
                <dd className="mt-0.5 font-medium text-ink">
                  Wilcon Depot, Inc. (6 Mos)
                </dd>
              </div>
              <div className="py-2">
                <dt className="ledger-figures text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  National Certificate
                </dt>
                <dd className="mt-0.5 font-medium text-ink">
                  TESDA NC II · Computer Systems
                </dd>
              </div>
              <div className="py-2">
                <dt className="ledger-figures text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  Community Role
                </dt>
                <dd className="mt-0.5 font-medium text-ink">
                  WordPress PH Volunteer (2025–2026)
                </dd>
              </div>
            </dl>

            <div className="mt-3 flex items-center justify-between border-t border-rule pt-3">
              <div className="flex items-center gap-2.5">
                <img src="/logos/wilcon.png" alt="Wilcon Depot" className="h-4 w-auto object-contain" />
                <img src="/logos/wordpress.png" alt="WordPress PH" className="h-4 w-auto object-contain" />
                <img src="/logos/jollibee.png" alt="Jollibee" className="h-4 w-auto object-contain" />
              </div>
              <span className="ledger-figures text-[10px] text-ink-soft">Verified</span>
            </div>
          </div>
        </header>

        {/* 2. Candidate Profile Ledger Table */}
        <section aria-labelledby="profile-facts-heading">
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
            Quick Candidate Reference
          </p>
          <h2
            id="profile-facts-heading"
            className="mt-1 font-serif text-2xl font-medium text-ink"
          >
            Profile &amp; Logistics
          </h2>

          <dl className="mt-5 border-t border-rule">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-0.5">
                  {fact.label}
                </dt>
                <dd className="text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
            {PORTFOLIO_IDENTITY.reference && (
              <div className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-0.5">
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

        {/* 3. Technical Stack & Tools */}
        <section aria-labelledby="about-stack-heading" className="border-t border-rule pt-8">
          <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
            Technical Index
          </p>
          <h2
            id="about-stack-heading"
            className="mt-1 font-serif text-2xl font-medium text-ink"
          >
            Skills &amp; Tools
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {SKILL_GROUPS.map((col) => (
              <div key={col.group} className="border border-rule bg-paper-deep/35 p-4">
                <p className="ledger-figures border-b border-rule pb-2 text-xs font-medium uppercase tracking-[0.08em] text-ink">
                  {col.group}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {col.items.map((item) => {
                    const isPrimary = PRIMARY_SKILLS.has(item)
                    return (
                      <li
                        key={item}
                        className={`ledger-figures flex items-center gap-1.5 text-xs ${
                          isPrimary ? 'font-medium text-ink' : 'text-ink-soft'
                        }`}
                      >
                        <span
                          className={isPrimary ? 'text-ledger' : 'text-rule'}
                          aria-hidden="true"
                        >
                          ●
                        </span>
                        {item}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Software Systems Summary (Clean Ledger Cards — No duplicate photos from /projects or /work) */}
        <section aria-labelledby="about-built-heading" className="border-t border-rule pt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
                Production Portfolio
              </p>
              <h2
                id="about-built-heading"
                className="mt-1 font-serif text-2xl font-medium text-ink"
              >
                Software Systems I&apos;ve Built ({softwareProjects.length})
              </h2>
            </div>
            <Link
              href="/projects"
              className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
            >
              View with screenshots →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {softwareProjects.map((item, idx) => {
              const title = PROJECT_TITLES[item.slug] || item.slug
              return (
                <div
                  key={item.slug}
                  className="flex flex-col justify-between border border-rule bg-white p-4 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-rule pb-2">
                      <span className="ledger-figures text-[11px] font-medium text-ledger">
                        0{idx + 1} · {item.groupLabel}
                      </span>
                      <span className="ledger-figures text-[10px] text-ink-soft">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-medium text-ink">{title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                      {item.result}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-rule/60 pt-2.5">
                    <span className="ledger-figures text-[11px] text-ink-soft">
                      {item.threeTags.join(' · ')}
                    </span>
                    <Link
                      href={`/projects/${item.slug}`}
                      className="ledger-figures inline-flex items-center gap-1 text-xs font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
                    >
                      View case study →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
