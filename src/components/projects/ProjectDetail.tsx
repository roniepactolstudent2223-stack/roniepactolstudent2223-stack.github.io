'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { PROJECT_INDEX } from '@/lib/portfolio-config'
import ArchitectureDiagram from '@/components/projects/ArchitectureDiagram'
import EngineeringDecisions from '@/components/projects/EngineeringDecisions'

interface ProjectDetailProps {
  project: Project
}

interface AtsBullet {
  title: string
  description: string
}

interface ImageCaption {
  title: string
  description: string
}

interface ProjectAtsData {
  summary: string
  stackSummary: string
  bullets: AtsBullet[]
  captions: ImageCaption[]
}

const ATS_DATA: Record<string, ProjectAtsData> = {
  'woh-attendance-system': {
    summary:
      'QR church attendance and member care system built end to end with Laravel and Vue.js for Word of Hope Caloocan. Connects to the main church website via REST API to sync member records, speed up lobby check-ins, and flag members who miss two Sundays in a row.',
    stackSummary: 'Laravel (PHP), Vue.js, MySQL, REST API, Tailwind CSS',
    bullets: [
      {
        title: 'Website REST API Sync',
        description:
          'Built a token-authenticated REST API connected to wohcaloocan.org so member registrations sync automatically without re-typing names.',
      },
      {
        title: 'Camera QR Check-In Kiosk',
        description:
          'Built browser camera QR scanning in Vue.js so ushers can check members in at the entrance in about a second.',
      },
      {
        title: 'Zero Duplicate Scans',
        description:
          'Added database constraints on member, service session, and date so rapid scans never create duplicate attendance records.',
      },
      {
        title: 'Automatic Absentee Follow-Up List',
        description:
          'Wrote queries that list members who missed two consecutive Sundays so pastors know who to check on.',
      },
      {
        title: 'Separate Roles for Ushers, Pastors, and Admin',
        description:
          'Restricted each screen by role so ushers only scan attendance while pastors and admins manage member care records.',
      },
    ],
    captions: [
      {
        title: 'Main Church Website (wohcaloocan.org)',
        description: 'Source of member registrations synced via REST API.',
      },
      {
        title: 'Admin Dashboard',
        description: 'Sunday attendance counts and automatic absentee follow-up list.',
      },
      {
        title: 'Lobby Check-In Kiosk',
        description: 'Camera QR check-in screen used at the church entrance every Sunday.',
      },
    ],
  },
  'wilcon-enterprise-systems': {
    summary:
      'Six months of internal web application development as a Full Stack Junior System Developer at Wilcon Depot, Inc. Maintained internal finance web tools using Laravel, Vue.js, and MySQL, synced account and vendor data from the company ERP, and worked with System Analysts and QA on releases.',
    stackSummary: 'Laravel, Vue.js, PHP, MySQL, REST APIs, Git',
    bullets: [
      {
        title: 'Company ERP Data Sync',
        description:
          'Connected internal web apps to company ERP APIs to pull branch ledger accounts, vendor records, and item data.',
      },
      {
        title: 'Financial Voucher Processing',
        description:
          'Wrote and maintained backend PHP and SQL logic for internal financial voucher workflows with exact decimal math and activity logs.',
      },
      {
        title: 'System Analyst & QA Collaboration',
        description:
          'Worked daily with System Analysts and QA testers to reproduce issues, verify fixes, and ship internal feature updates.',
      },
    ],
    captions: [
      {
        title: 'Developer Workstation at Wilcon Depot',
        description: 'Dual-monitor setup used to build and test internal Laravel and Vue.js finance tools.',
      },
      {
        title: 'Wilcon Depot Corporate Office',
        description: 'Headquarters in Quezon City supporting nationwide store operations.',
      },
    ],
  },
  'wilcon-collection-deposit-report': {
    summary:
      'Reporting upgrade built for Wilcon Depot\'s Treasury Department. Turned static daily check totals into clickable check breakdowns, separated cash and check filters for unreconciled accounts, aligned accounting dates automatically, added a nationwide branch column, and built one-click PDF and Excel exports.',
    stackSummary: 'Laravel, Vue.js, PHP, MySQL',
    bullets: [
      {
        title: 'Clickable Check Breakdown',
        description:
          'Turned static check totals into clickable links that open a pop-up showing the customer name, bank, check number, date, and remittance details.',
      },
      {
        title: 'Separate Cash and Check Filters',
        description:
          'Fixed overlap in unreconciled accounts by separating cash records from check records during reconciliation.',
      },
      {
        title: 'Automatic Accounting Date Alignment',
        description:
          'Matched transaction dates with accounting periods so valid check records appear in the right report columns automatically.',
      },
      {
        title: 'Nationwide Branch Column & Default View',
        description:
          'Added a Branch column and set the report to show all nationwide stores by default when no single branch is chosen.',
      },
      {
        title: 'One-Click PDF and Excel Export',
        description:
          'Added download buttons so Treasury staff can export the filtered report to PDF or Excel for offline audits.',
      },
    ],
    captions: [
      {
        title: 'Collection & Deposit Report Table',
        description: 'Daily sales, cash, and check summaries with PDF and Excel export buttons.',
      },
      {
        title: 'Nationwide Branch Column & Filter',
        description: 'Added Branch column that displays all nationwide branches by default.',
      },
      {
        title: 'Clickable Check Breakdown Modal',
        description: 'Pop-up showing customer name, issuing bank, check number, date, and amount.',
      },
    ],
  },
  'wilcon-month-end-closing': {
    summary:
      'Monthly closing web system built for Wilcon Depot\'s Financial Reporting Department. Replaced manual spreadsheets and chat threads with a central workflow where departments submit journal entries, the system checks that Debit equals Credit, managers approve in two steps, and next-month reversals run automatically.',
    stackSummary: 'Laravel, Vue.js, PHP, MySQL',
    bullets: [
      {
        title: 'Direct Department Entry Instead of Spreadsheets',
        description:
          'Shifted entry submission and file uploads directly to each Business Unit supervisor so Finance no longer had to combine dozens of spreadsheet files by hand.',
      },
      {
        title: 'Automatic Balance & Duplicate Checks',
        description:
          'Blocked entries from being submitted if Debit does not equal Credit, if required fields are blank, or if a duplicate entry already exists.',
      },
      {
        title: 'Two-Step Manager Approval Chain',
        description:
          'Routed every submission from the Business Unit Supervisor to the Business Unit Manager for review, and then to the Financial Reporting Manager for final approval and batch posting.',
      },
      {
        title: 'Automatic Next-Month Reversing Entries',
        description:
          'Scheduled automatic reversing entries (swapping Debit and Credit) for the first day of the next month so accruals do not have to be re-typed.',
      },
      {
        title: 'Live General Ledger Balance Comparison',
        description:
          'Built a side-by-side table showing unadjusted balances, approved adjustments, and projected closing balances with a baseline lock during close.',
      },
    ],
    captions: [
      {
        title: 'Closing Progress & Status Summary',
        description: 'Tracks entries waiting for BU Head approval, Finance posting, and completed postings.',
      },
      {
        title: 'Chart of Accounts Master File & Access Rules',
        description: 'Configures department access groups and mandatory fields per GL account.',
      },
      {
        title: 'General Ledger Balance Display',
        description: 'Side-by-side comparison of unadjusted, posted adjustment, and projected closing balances.',
      },
    ],
  },
  'wordpress-ph-community': {
    summary:
      'Community involvement and volunteering with WordPress Philippines and the local open-source community. Started as a meetup attendee in 2025 and stepped up in 2026 as a volunteer photographer covering Software Freedom Day 2026 Manila and the July 2026 WordPress Manila Meetup.',
    stackSummary: 'Community Operations, Event Photography, Open Source',
    bullets: [
      {
        title: 'Software Freedom Day 2026 Manila',
        description:
          'Volunteered as event photographer celebrating "The Future Is Open" with developers, designers, students, and open-source advocates, supported by Huawei Cloud Developer Group PH and the Digital Freedom Foundation.',
      },
      {
        title: 'WordPress Manila Meetup (July 2026)',
        description:
          'Documented talks, Q&A sessions, and community networking at Common Ground Work Philippines Don Antonio ahead of WordCamp Philippines 2026.',
      },
      {
        title: '2025 Attendee → 2026 Volunteer',
        description:
          'Grew from attending local meetups in 2025 into helping the organizing team run and document events in 2026.',
      },
    ],
    captions: [
      {
        title: 'Software Freedom Day 2026 Manila',
        description: 'Open-source community gathering in Metro Manila.',
      },
      {
        title: 'WordPress Manila Meetup (Common Ground Don Antonio)',
        description: 'Monthly meetup of WordPress and web developers in Quezon City.',
      },
    ],
  },
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const ats = ATS_DATA[project.slug]
  const indexMeta = PROJECT_INDEX.find((item) => item.slug === project.slug)
  const isUiScreenshot =
    project.slug === 'wilcon-month-end-closing' ||
    project.slug === 'wilcon-collection-deposit-report'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
    }
    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  return (
    <article className="min-h-screen max-w-4xl px-6 py-10 sm:py-14">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/projects"
          className="ledger-figures inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.08em] text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          ← Back to projects
        </Link>
      </div>

      {/* Header */}
      <header className="border-b border-rule pb-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {indexMeta && (
            <span className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft">
              {indexMeta.groupLabel}
            </span>
          )}
          <span className="ledger-figures text-xs text-ink-soft">·</span>
          <span className="ledger-figures text-xs text-ledger">
            {indexMeta?.status || project.year}
          </span>
        </div>

        <h1 className="mt-2 font-serif text-3xl font-medium leading-tight text-ink sm:text-4xl">
          {project.title}
        </h1>

        {/* Highlighted 1-line Result right under title */}
        {indexMeta && (
          <div className="mt-4 border-l-2 border-ledger bg-paper-deep/60 py-2.5 pl-3.5 pr-3">
            <p className="text-base leading-relaxed text-ink">
              <span className="ledger-figures mr-2 text-xs uppercase tracking-[0.08em] text-ledger font-medium">
                Result:
              </span>
              <strong className="font-medium text-ink">{indexMeta.result}</strong>
            </p>
          </div>
        )}

        {/* Quick 4-Row Summary: Problem · What I built · Result · Tools */}
        {indexMeta && (
          <dl className="mt-6 space-y-3 border-t border-rule pt-4 text-[15px]">
            <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-1">
                Problem
              </dt>
              <dd className="leading-relaxed text-ink">{indexMeta.problem}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-1">
                What I built
              </dt>
              <dd className="leading-relaxed text-ink">{indexMeta.whatIBuilt}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ledger font-medium sm:pt-1">
                Result
              </dt>
              <dd className="font-medium leading-relaxed text-ink">{indexMeta.resultDetail}</dd>
            </div>
            <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <dt className="ledger-figures text-xs uppercase tracking-[0.06em] text-ink-soft sm:pt-1">
                Tools
              </dt>
              <dd className="ledger-figures text-xs text-ink sm:pt-1">{indexMeta.tools}</dd>
            </div>
          </dl>
        )}

        {/* Live Link CTAs */}
        {project.url && (
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-ink bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink/90"
            >
              {project.slug === 'woh-attendance-system' ? 'Open Live Kiosk ↗' : 'Visit Link ↗'}
            </a>
            {project.slug === 'woh-attendance-system' && (
              <a
                href="https://wohcaloocan.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-rule bg-paper px-4 py-2 text-xs text-ink underline decoration-rule underline-offset-4 hover:border-ink"
              >
                Church Website (wohcaloocan.org) ↗
              </a>
            )}
          </div>
        )}
      </header>

      {/* Screenshots & Visual Evidence — Large, Clear, Clickable */}
      {project.images.length > 0 && (
        <section className="mt-8">
          <div className="mb-4 flex items-baseline justify-between border-b border-rule pb-2">
            <h2 className="ledger-figures text-xs uppercase tracking-[0.08em] text-ink-soft">
              Screenshots &amp; Visuals ({project.images.length})
            </h2>
            <span className="ledger-figures text-xs text-ink-soft">
              Click any image to zoom ⤢
            </span>
          </div>

          <div
            className={`grid gap-5 ${
              project.images.length === 1
                ? 'grid-cols-1'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {project.images.map((src, index) => {
              const caption = ats?.captions[index] || {
                title: `Screen ${index + 1}`,
                description: '',
              }

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`group cursor-pointer border border-rule bg-white p-2.5 text-left transition-all hover:border-ink ${
                    project.images.length === 3 && index === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div
                    className={`${
                      project.images.length === 3 && index === 0
                        ? 'aspect-[16/8]'
                        : 'aspect-[16/10]'
                    } w-full overflow-hidden bg-white`}
                  >
                    <img
                      src={src}
                      alt={caption.title}
                      decoding="async"
                      loading="lazy"
                      className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.02] ${
                        isUiScreenshot ? 'object-contain' : 'object-cover'
                      }`}
                    />
                  </div>
                  <div className="mt-2.5 border-t border-rule/60 pt-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-medium text-ink">{caption.title}</h3>
                      <span className="ledger-figures text-[11px] text-ink-soft group-hover:text-ink">
                        Zoom ⤢
                      </span>
                    </div>
                    {caption.description && (
                      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                        {caption.description}
                      </p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* How It Works — Plain-English Breakdown */}
      {ats?.bullets && (
        <section className="mt-10 border-t border-rule pt-8">
          <h2 className="ledger-figures mb-5 text-xs uppercase tracking-[0.08em] text-ink-soft">
            How It Works
          </h2>

          <ol className="space-y-4">
            {ats.bullets.map((bullet, idx) => (
              <li
                key={bullet.title}
                className="grid gap-1 border-t border-rule/60 pt-3.5 first:border-t-0 first:pt-0 sm:grid-cols-[2rem_1fr]"
              >
                <span className="ledger-figures text-xs text-ink-soft">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="text-[15px] leading-relaxed text-ink">
                  <strong className="font-medium text-ink">{bullet.title}: </strong>
                  <span className="text-ink-soft">{bullet.description}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Optional Technical Deep Dive */}
      {(project.slug === 'woh-attendance-system' || project.slug === 'wilcon-enterprise-systems') && (
        <details className="mt-10 group border border-rule bg-paper-deep/30">
          <summary className="ledger-figures flex cursor-pointer list-none items-center justify-between p-4 text-xs uppercase tracking-[0.08em] text-ink-soft hover:text-ink [&::-webkit-details-marker]:hidden">
            <span>Technical Architecture &amp; Database Notes</span>
            <span className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="space-y-10 border-t border-rule p-6 bg-paper">
            <ArchitectureDiagram slug={project.slug} />
            <EngineeringDecisions slug={project.slug} />
          </div>
        </details>
      )}

      {/* Lightbox Modal for Enlargeable Screenshots */}
      {lightboxIndex !== null && project.images[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden border border-rule bg-paper p-3 shadow-2xl"
          >
            <div className="mb-2 flex items-center justify-between border-b border-rule pb-2">
              <span className="ledger-figures text-xs text-ink">
                {ats?.captions[lightboxIndex]?.title ||
                  `${project.title} — Screen ${lightboxIndex + 1}`}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="ledger-figures cursor-pointer border border-rule bg-paper px-2.5 py-1 text-xs text-ink hover:border-ink"
                aria-label="Close image preview"
              >
                Close ✕
              </button>
            </div>
            <div className="flex items-center justify-center bg-white p-2">
              <img
                src={project.images[lightboxIndex]}
                alt="Enlarged view"
                className="max-h-[78vh] w-auto object-contain"
              />
            </div>
            {project.images.length > 1 && (
              <div className="mt-2.5 flex justify-center gap-2">
                {project.images.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`ledger-figures cursor-pointer border px-3 py-1 text-xs ${
                      idx === lightboxIndex
                        ? 'border-ink bg-ink text-paper'
                        : 'border-rule bg-paper text-ink hover:border-ink'
                    }`}
                  >
                    Screen {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
