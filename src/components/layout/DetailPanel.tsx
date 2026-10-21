'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ContextPanel from '@/components/projects/ContextPanel'
import { PORTFOLIO_IDENTITY, PROJECT_INDEX } from '@/lib/portfolio-config'
import type { Project } from '@/lib/types'

interface DetailPanelProps {
  projects: Project[]
}

function CopyAtsRow() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = [
      `CANDIDATE: ${PORTFOLIO_IDENTITY.name}`,
      `ROLE: ${PORTFOLIO_IDENTITY.role}`,
      `STACK: Laravel, Vue.js, PHP, MySQL, Infor M3 ERP APIs, REST APIs, Git`,
      `EXPERIENCE: Full Stack Junior System Developer at Wilcon Depot, Inc. (6 mos, May–Oct 2026)`,
      `EDUCATION: BS Information Technology — Access Computer College (2025)`,
      `PRODUCTION SYSTEMS:`,
      `• WOH Attendance System (Word of Hope Caloocan, live since Mar 2025)`,
      `• Month-End Closing System (Wilcon Depot Finance)`,
      `• Collection and Deposit Report Modification (Wilcon Depot Treasury)`,
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
      className="group flex w-full items-center justify-between py-2.5 text-left text-sm font-normal text-neutral-800 transition-colors hover:text-neutral-950"
    >
      <span className="group-hover:underline underline-offset-4">
        {copied ? '✓ Copied ATS Summary' : 'Copy ATS Candidate Summary'}
      </span>
      <span className="font-mono text-xs text-neutral-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-neutral-900">
        {copied ? 'Done' : 'Copy →'}
      </span>
    </button>
  )
}

function ProjectsSidebar({ projects }: { projects: Project[] }) {
  const softwareProjects = PROJECT_INDEX.filter((p) => p.kind === 'software')

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto px-8 py-8 space-y-9">
      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Projects Index
        </p>
        <h2 className="mt-1.5 text-base font-semibold text-neutral-900">
          {softwareProjects.length} Production Systems
        </h2>
        <p className="mt-1.5 text-sm font-normal leading-relaxed text-neutral-600">
          Built for Word of Hope Caloocan and Wilcon Depot&apos;s Finance and Treasury departments.
        </p>
      </div>

      {/* Numbered Hairline Jump List — Only the project title is medium weight */}
      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Case Studies
        </p>
        <div className="mt-3 divide-y divide-neutral-200 border-t border-neutral-200">
          {softwareProjects.map((entry, idx) => {
            const proj = projects.find((p) => p.slug === entry.slug)
            if (!proj) return null

            return (
              <Link
                key={entry.slug}
                href={`/projects/${entry.slug}`}
                className="group flex items-baseline justify-between gap-3 py-3.5"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-mono text-xs font-normal text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900 group-hover:underline underline-offset-4">
                      {proj.title}
                    </p>
                    <p className="mt-0.5 text-xs font-normal text-neutral-500">
                      {entry.usedBy}
                    </p>
                    <p className="mt-1 font-mono text-xs font-normal text-neutral-600">
                      {entry.stack}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-neutral-900 shrink-0">
                  →
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Plain-text Stack */}
      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Stack
        </p>
        <p className="mt-2 font-mono text-[13px] font-normal leading-relaxed text-neutral-700 border-t border-neutral-200 pt-3">
          Laravel · Vue.js · PHP · MySQL · Infor M3 APIs · REST APIs · Git
        </p>
      </div>

      {/* Hairline Actions */}
      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        <CopyAtsRow />
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between py-2.5 text-sm font-normal text-neutral-800 transition-colors hover:text-neutral-950"
        >
          <span className="group-hover:underline underline-offset-4">Resume (Live Doc)</span>
          <span className="font-mono text-xs text-neutral-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-neutral-900">
            ↗
          </span>
        </a>
      </div>
    </aside>
  )
}

function WorkSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto px-8 py-8 space-y-9">
      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Career Timeline
        </p>
        <h2 className="mt-1.5 text-base font-semibold text-neutral-900">
          Work &amp; Community
        </h2>
        <p className="mt-1.5 text-sm font-normal leading-relaxed text-neutral-600">
          Enterprise software development at Wilcon Depot, community volunteering, and early work history.
        </p>
      </div>

      {/* Hairline Timeline — Only company name is medium weight (500) */}
      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Roles
        </p>
        <div className="mt-3 divide-y divide-neutral-200 border-t border-neutral-200">
          {[
            {
              company: 'Wilcon Depot, Inc.',
              role: 'Full Stack Junior System Developer',
              period: 'May 2026 – Oct 2026 · 6 mos',
            },
            {
              company: 'WordPress Philippines',
              role: 'Volunteer & Event Photographer',
              period: '2025 Attendee → 2026 Volunteer',
            },
            {
              company: 'Radiant Force HR',
              role: 'HR Assistant (Absorbed from OJT)',
              period: 'Sep 2025 – Jan 2026',
            },
            {
              company: 'Jollibee Foods Corp.',
              role: 'Service Crew · Working Student',
              period: 'Jan 2024 – Jun 2024',
            },
          ].map((item) => (
            <div key={item.company} className="py-3">
              <p className="text-sm font-medium text-neutral-900">{item.company}</p>
              <p className="mt-0.5 text-sm font-normal text-neutral-600">{item.role}</p>
              <p className="mt-1 font-mono text-xs font-normal text-neutral-400">{item.period}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Technologies Used
        </p>
        <p className="mt-2 font-mono text-[13px] font-normal leading-relaxed text-neutral-700 border-t border-neutral-200 pt-3">
          Laravel · Vue.js · PHP · MySQL · Infor M3 APIs · REST APIs · Git
        </p>
      </div>

      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        <CopyAtsRow />
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between py-2.5 text-sm font-normal text-neutral-800 transition-colors hover:text-neutral-950"
        >
          <span className="group-hover:underline underline-offset-4">Resume (Live Doc)</span>
          <span className="font-mono text-xs text-neutral-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-neutral-900">
            ↗
          </span>
        </a>
      </div>
    </aside>
  )
}

function AboutSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto px-8 py-8 space-y-9">
      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Quick Reference
        </p>
        <h2 className="mt-1.5 text-base font-semibold text-neutral-900">
          Ronie Pactol
        </h2>
        <p className="mt-0.5 text-sm font-normal text-neutral-600">Full Stack Junior System Developer</p>
      </div>

      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Facts
        </p>
        <dl className="mt-3 divide-y divide-neutral-200 border-t border-neutral-200 text-sm">
          {[
            { k: 'Experience', v: '6 mos · Wilcon Depot' },
            { k: 'Education', v: 'BSIT · ACC 2025' },
            { k: 'Location', v: 'Balingasa, Quezon City' },
            { k: 'Stack', v: 'Laravel · Vue.js · MySQL', mono: true },
          ].map(({ k, v, mono }) => (
            <div key={k} className="flex items-baseline justify-between py-2.5 gap-3">
              <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400 shrink-0">{k}</dt>
              <dd className={`text-right font-normal text-neutral-800 ${mono ? 'font-mono text-[13px]' : ''}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        <CopyAtsRow />
        <a
          href={PORTFOLIO_IDENTITY.phoneTel}
          className="group flex items-center justify-between py-2.5 text-sm font-normal text-neutral-800 transition-colors hover:text-neutral-950"
        >
          <span className="group-hover:underline underline-offset-4">Call {PORTFOLIO_IDENTITY.phone}</span>
          <span className="font-mono text-xs text-neutral-400">→</span>
        </a>
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between py-2.5 text-sm font-normal text-neutral-800 transition-colors hover:text-neutral-950"
        >
          <span className="group-hover:underline underline-offset-4">Resume (Live Doc)</span>
          <span className="font-mono text-xs text-neutral-400">↗</span>
        </a>
      </div>
    </aside>
  )
}

function CertificatesSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto px-8 py-8 space-y-9">
      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Credentials
        </p>
        <h2 className="mt-1.5 text-base font-semibold text-neutral-900">
          Verified Certifications
        </h2>
        <p className="mt-1.5 text-sm font-normal leading-relaxed text-neutral-600">
          Click any certificate in the main column to open the full document viewer.
        </p>
      </div>

      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Issuing Organizations
        </p>
        <div className="mt-3 divide-y divide-neutral-200 border-t border-neutral-200">
          {[
            { org: 'Cisco Networking Academy', detail: 'Python 1 · JavaScript 1 · English for IT', count: '3' },
            { org: 'TESDA (Philippine TVET)', detail: 'NC2 Computer Systems Servicing', count: 'NC2' },
            { org: 'Scrimba', detail: 'Learn Vue.js Frontend Development', count: 'Vue' },
          ].map((item) => (
            <div key={item.org} className="flex items-baseline justify-between py-3 gap-3">
              <div>
                <p className="text-sm font-medium text-neutral-900">{item.org}</p>
                <p className="mt-0.5 text-xs font-normal text-neutral-500">{item.detail}</p>
              </div>
              <span className="font-mono text-xs font-normal text-neutral-400 shrink-0">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function ContactSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto px-8 py-8 space-y-9">
      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Contact Details
        </p>
        <h2 className="mt-1.5 text-base font-semibold text-neutral-900">
          Direct Lines &amp; Location
        </h2>
        <p className="mt-1.5 text-sm font-normal leading-relaxed text-neutral-600">
          Based in Quezon City. Reachable directly via mobile, Viber, or email.
        </p>
      </div>

      <dl className="divide-y divide-neutral-200 border-t border-neutral-200 text-sm">
        <div className="py-3">
          <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400">Location</dt>
          <dd className="mt-1 font-normal text-neutral-800">{PORTFOLIO_IDENTITY.location}</dd>
        </div>
        <div className="py-3">
          <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400">Direct Line / Viber</dt>
          <dd className="mt-1">
            <a href="tel:+639931263221" className="font-mono text-base font-medium text-neutral-900 hover:underline">
              0993 126 3221
            </a>
            <div className="mt-1.5 flex items-center gap-4 text-xs">
              <a href="tel:+639931263221" className="font-normal text-neutral-700 underline underline-offset-4 hover:text-neutral-950">
                Call now →
              </a>
              <a href="viber://chat?number=%2B639931263221" className="font-normal text-[#7360F2] hover:underline">
                Viber chat ↗
              </a>
            </div>
          </dd>
        </div>
        <div className="py-3">
          <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${PORTFOLIO_IDENTITY.email}`} className="font-normal text-neutral-800 hover:underline">
              {PORTFOLIO_IDENTITY.email}
            </a>
          </dd>
        </div>
      </dl>

      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        <CopyAtsRow />
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between py-2.5 text-sm font-normal text-neutral-800 transition-colors hover:text-neutral-950"
        >
          <span className="group-hover:underline underline-offset-4">Resume (Live Doc)</span>
          <span className="font-mono text-xs text-neutral-400">↗</span>
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
    const otherProjects = projects.filter((p) => p.slug !== project.slug)

    return (
      <aside className="sticky top-0 h-screen overflow-y-auto px-8 py-8 space-y-9">
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-normal text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← All projects
          </Link>
        </div>

        <div>
          <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
            Specification
          </p>
          <h2 className="mt-1.5 text-base font-semibold text-neutral-900">
            {project.title}
          </h2>

          <dl className="mt-4 divide-y divide-neutral-200 border-t border-b border-neutral-200 text-sm">
            <div className="py-2.5">
              <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400">Role</dt>
              <dd className="mt-0.5 font-normal text-neutral-800">{project.role}</dd>
            </div>
            {project.client && (
              <div className="py-2.5">
                <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400">Organization</dt>
                <dd className="mt-0.5 font-normal text-neutral-800">{project.client}</dd>
              </div>
            )}
            {indexEntry && (
              <>
                <div className="py-2.5">
                  <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-500">Problem Solved</dt>
                  <dd className="mt-0.5 font-normal text-neutral-700 leading-relaxed">{indexEntry.problem}</dd>
                </div>
                <div className="py-2.5">
                  <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400">Status</dt>
                  <dd className="mt-0.5 font-mono text-xs font-normal text-neutral-800">{indexEntry.status}</dd>
                </div>
              </>
            )}
            <div className="py-2.5">
              <dt className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-neutral-400">Stack</dt>
              <dd className="mt-1 font-mono text-[13px] font-normal text-neutral-700">
                {project.tags.join(' · ')}
              </dd>
            </div>
          </dl>

          {project.url && (
            <div className="mt-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-neutral-900 py-2 text-sm font-medium text-neutral-900 hover:text-neutral-600"
              >
                <span>Open Live System</span>
                <span className="font-mono text-xs">↗</span>
              </a>
            </div>
          )}
        </div>

        {otherProjects.length > 0 && (
          <div>
            <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
              Other Systems
            </p>
            <div className="mt-3 divide-y divide-neutral-200 border-t border-neutral-200">
              {otherProjects.map((other, idx) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="group flex items-baseline justify-between gap-3 py-3"
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-xs font-normal text-neutral-400 group-hover:text-neutral-900">
                      0{idx + 1}
                    </span>
                    <p className="text-sm font-normal text-neutral-800 group-hover:text-neutral-950 group-hover:underline underline-offset-4 truncate">
                      {other.title}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-neutral-900 shrink-0">
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

  // 2. Projects Index Route
  if (pathname === '/projects') {
    return <ProjectsSidebar projects={projects} />
  }

  // 3. Work Route
  if (pathname === '/work') {
    return <WorkSidebar />
  }

  // 4. About Route
  if (pathname === '/about') {
    return <AboutSidebar />
  }

  // 5. Certificates Route
  if (pathname === '/certificates') {
    return <CertificatesSidebar />
  }

  // 6. Contact Route
  if (pathname === '/contact') {
    return <ContactSidebar />
  }

  // 7. Home Route (default)
  return <ContextPanel projects={projects} />
}
