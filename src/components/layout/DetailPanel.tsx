'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ContextPanel from '@/components/projects/ContextPanel'
import { PORTFOLIO_IDENTITY, PROJECT_INDEX } from '@/lib/portfolio-config'
import { PhoneIcon, ViberIcon } from '@/components/ui/Icons'
import type { Project } from '@/lib/types'

interface DetailPanelProps {
  projects: Project[]
}

function CopySummaryButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
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
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ledger-figures flex w-full cursor-pointer items-center justify-between bg-ink px-3.5 py-2.5 text-xs font-medium text-paper transition-colors hover:bg-ledger"
    >
      <span>{copied ? '✓ Copied Candidate Summary' : 'Copy Candidate Summary'}</span>
      <span>{copied ? 'Done' : 'Copy →'}</span>
    </button>
  )
}

function ProjectsSidebar({ projects }: { projects: Project[] }) {
  const softwareProjects = PROJECT_INDEX.filter((p) => p.kind === 'software')

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/25 px-6 py-7 space-y-6">
      <div className="bg-paper-deep/65 p-4">
        <p className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ledger font-medium">
          Systems Index
        </p>
        <h2 className="mt-1 font-serif text-xl font-medium text-ink">
          {softwareProjects.length} Production Systems
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          Built for Wilcon Depot&apos;s Finance and Treasury teams and Word of Hope Caloocan.
        </p>
      </div>

      {/* Visual System Jump Cards */}
      <div className="space-y-2">
        {softwareProjects.map((entry, idx) => {
          const proj = projects.find((p) => p.slug === entry.slug)
          if (!proj) return null
          const isWilcon = entry.group === 'work'

          return (
            <Link
              key={entry.slug}
              href={`/projects/${entry.slug}`}
              className="group flex items-start gap-3 bg-paper-deep/50 p-3.5 transition-colors hover:bg-paper-deep"
            >
              {isWilcon ? (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-white p-1">
                  <img
                    src="/logos/wilcon.png"
                    alt="Wilcon Depot"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="ledger-figures flex h-8 w-8 shrink-0 items-center justify-center bg-ledger/15 text-[10px] font-medium text-ledger">
                  0{idx + 1}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-ink group-hover:text-ledger transition-colors">
                  {proj.title}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-soft">{entry.usedBy}</p>
                <p className="ledger-figures mt-1 text-[10px] text-ledger">{entry.stack}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="space-y-2">
        <CopySummaryButton />
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ledger-figures flex items-center justify-between bg-paper-deep/70 px-3.5 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
        >
          <span>Open Live Resume (Doc)</span>
          <span>↗</span>
        </a>
      </div>
    </aside>
  )
}

function WorkSidebar() {
  const roles = [
    {
      company: 'Wilcon Depot, Inc.',
      role: 'Full Stack Junior System Developer',
      period: 'May – Oct 2026 · 6 mos',
      logo: '/logos/wilcon.png',
    },
    {
      company: 'WordPress Philippines',
      role: 'Volunteer & Event Photographer',
      period: '2025 Attendee → 2026 Volunteer',
      logo: '/logos/wordpress.png',
    },
    {
      company: 'Radiant Force HR',
      role: 'HR Assistant (Absorbed from OJT)',
      period: 'Sep 2025 – Jan 2026',
      badge: 'RF',
    },
    {
      company: 'Jollibee Foods Corp.',
      role: 'Service Crew · Working Student',
      period: 'Jan – Jun 2024',
      logo: '/logos/jollibee.png',
    },
  ]

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/25 px-6 py-7 space-y-6">
      <div className="bg-paper-deep/65 p-4">
        <p className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ledger font-medium">
          Career Timeline
        </p>
        <h2 className="mt-1 font-serif text-xl font-medium text-ink">
          Work &amp; Community
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          Enterprise software development at Wilcon Depot, open-source community volunteering, and early work history.
        </p>
      </div>

      <div className="space-y-2">
        {roles.map((item) => (
          <div key={item.company} className="flex items-start gap-3 bg-paper-deep/50 p-3">
            {item.logo ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-white p-1">
                <img src={item.logo} alt={item.company} className="h-full w-full object-contain" />
              </div>
            ) : (
              <div className="ledger-figures flex h-8 w-8 shrink-0 items-center justify-center bg-paper text-[10px] font-medium text-ink">
                {item.badge}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink">{item.company}</p>
              <p className="text-[11px] text-ink-soft">{item.role}</p>
              <p className="ledger-figures mt-0.5 text-[10px] text-ledger">{item.period}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <CopySummaryButton />
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ledger-figures flex items-center justify-between bg-paper-deep/70 px-3.5 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
        >
          <span>Open Live Resume (Doc)</span>
          <span>↗</span>
        </a>
      </div>
    </aside>
  )
}

function AboutSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/25 px-6 py-7 space-y-6">
      <div className="bg-paper-deep/65 p-4">
        <p className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ledger font-medium">
          Quick Reference
        </p>
        <h2 className="mt-1 font-serif text-xl font-medium text-ink">
          {PORTFOLIO_IDENTITY.name}
        </h2>
        <p className="mt-0.5 text-xs text-ink-soft">
          Full Stack Junior System Developer
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-paper p-2.5">
            <p className="ledger-figures text-[10px] text-ink-soft">Experience</p>
            <p className="mt-0.5 text-xs font-medium text-ink">6 Mos · Wilcon</p>
          </div>
          <div className="bg-paper p-2.5">
            <p className="ledger-figures text-[10px] text-ink-soft">Education</p>
            <p className="mt-0.5 text-xs font-medium text-ink">BSIT · 2025</p>
          </div>
          <div className="bg-paper p-2.5">
            <p className="ledger-figures text-[10px] text-ink-soft">Location</p>
            <p className="mt-0.5 text-xs font-medium text-ink">Quezon City</p>
          </div>
          <div className="bg-paper p-2.5">
            <p className="ledger-figures text-[10px] text-ink-soft">Notice</p>
            <p className="mt-0.5 text-xs font-medium text-ledger">0 Days</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <CopySummaryButton />
        <a
          href={PORTFOLIO_IDENTITY.phoneTel}
          className="ledger-figures flex items-center justify-between bg-paper-deep/70 px-3.5 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
        >
          <span>Call {PORTFOLIO_IDENTITY.phone}</span>
          <span>→</span>
        </a>
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ledger-figures flex items-center justify-between bg-paper-deep/70 px-3.5 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
        >
          <span>Open Live Resume (Doc)</span>
          <span>↗</span>
        </a>
      </div>
    </aside>
  )
}

function CertificatesSidebar() {
  const issuers = [
    { org: 'Cisco Networking Academy', detail: 'Python 1 · JavaScript 1 · English for IT', badge: '03' },
    { org: 'TESDA (Philippine TVET)', detail: 'NC II Computer Systems Servicing', badge: 'NC2' },
    { org: 'Scrimba', detail: 'Learn Vue.js Frontend Development', badge: 'Vue' },
    { org: 'Radiant Force HR', detail: 'OJT Certificate of Completion', badge: 'OJT' },
  ]

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/25 px-6 py-7 space-y-6">
      <div className="bg-paper-deep/65 p-4">
        <p className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ledger font-medium">
          Credentials
        </p>
        <h2 className="mt-1 font-serif text-xl font-medium text-ink">
          6 Verified Certificates
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          Click any certificate in the main column to inspect the full document and verification links.
        </p>
      </div>

      <div className="space-y-2">
        {issuers.map((item) => (
          <div key={item.org} className="flex items-center justify-between gap-3 bg-paper-deep/50 p-3">
            <div>
              <p className="text-xs font-medium text-ink">{item.org}</p>
              <p className="mt-0.5 text-[11px] text-ink-soft">{item.detail}</p>
            </div>
            <span className="ledger-figures shrink-0 bg-paper px-2 py-0.5 text-[10px] font-medium text-ledger">
              {item.badge}
            </span>
          </div>
        ))}
      </div>
    </aside>
  )
}

function ContactSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/25 px-6 py-7 space-y-6">
      <div className="bg-paper-deep/65 p-4">
        <p className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ledger font-medium">
          Direct Lines
        </p>
        <h2 className="mt-1 font-serif text-xl font-medium text-ink">
          Quezon City, PH
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          Available immediately for full-time roles. Reachable via phone, Viber, or email.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={PORTFOLIO_IDENTITY.phoneTel}
            className="flex items-center gap-2 bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <PhoneIcon className="h-3.5 w-3.5 text-ledger" />
            <span>Call Now</span>
          </a>
          <a
            href={PORTFOLIO_IDENTITY.viberUrl}
            className="flex items-center gap-2 bg-paper px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            <ViberIcon className="h-3.5 w-3.5 text-[#7360F2]" />
            <span>Viber</span>
          </a>
        </div>
      </div>

      <div className="space-y-2">
        <CopySummaryButton />
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ledger-figures flex items-center justify-between bg-paper-deep/70 px-3.5 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
        >
          <span>Open Live Resume (Doc)</span>
          <span>↗</span>
        </a>
      </div>
    </aside>
  )
}

export default function DetailPanel({ projects }: DetailPanelProps) {
  const pathname = usePathname()

  // 1. Project Detail Route
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  const project = projectMatch
    ? projects.find((p) => p.slug === projectMatch[1])
    : undefined

  if (project) {
    const indexEntry = PROJECT_INDEX.find((e) => e.slug === project.slug)
    const otherProjects = projects.filter(
      (p) => p.slug !== project.slug && p.slug !== 'wordpress-ph-community'
    )

    return (
      <aside className="sticky top-0 h-screen overflow-y-auto bg-paper-deep/25 px-6 py-7 space-y-6">
        <div className="bg-paper-deep/65 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ledger font-medium">
              System Spec
            </span>
            {indexEntry && (
              <span className="ledger-figures bg-ledger/15 px-2 py-0.5 text-[10px] font-medium text-ledger">
                {indexEntry.status}
              </span>
            )}
          </div>

          <h2 className="font-serif text-lg font-medium text-ink">
            {project.title}
          </h2>

          <div className="space-y-2 bg-paper p-3 text-xs">
            <div>
              <span className="ledger-figures block text-[10px] uppercase text-ink-soft">Role</span>
              <span className="font-medium text-ink">{project.role}</span>
            </div>
            {indexEntry?.usedBy && (
              <div>
                <span className="ledger-figures block text-[10px] uppercase text-ink-soft">Used By</span>
                <span className="text-ink">{indexEntry.usedBy}</span>
              </div>
            )}
            <div>
              <span className="ledger-figures block text-[10px] uppercase text-ink-soft">Stack</span>
              <span className="ledger-figures text-[11px] text-ledger">
                {project.tags.join(' · ')}
              </span>
            </div>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ledger-figures flex items-center justify-between bg-ink px-3.5 py-2 text-xs font-medium text-paper transition-colors hover:bg-ledger"
            >
              <span>Open Live System</span>
              <span>↗</span>
            </a>
          )}
        </div>

        {otherProjects.length > 0 && (
          <div>
            <p className="ledger-figures mb-2 px-1 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              Other Systems
            </p>
            <div className="space-y-1.5">
              {otherProjects.map((other, idx) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="group flex items-center justify-between gap-2 bg-paper-deep/50 px-3 py-2.5 text-xs transition-colors hover:bg-paper-deep"
                >
                  <span className="truncate font-medium text-ink group-hover:text-ledger">
                    0{idx + 1} · {other.title}
                  </span>
                  <span className="text-ink-soft group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    )
  }

  if (pathname === '/projects') return <ProjectsSidebar projects={projects} />
  if (pathname === '/work') return <WorkSidebar />
  if (pathname === '/about') return <AboutSidebar />
  if (pathname === '/certificates') return <CertificatesSidebar />
  if (pathname === '/contact') return <ContactSidebar />

  return <ContextPanel projects={projects} />
}
