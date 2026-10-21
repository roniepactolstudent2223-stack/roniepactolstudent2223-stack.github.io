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

function CopyAtsButton() {
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
      className="flex w-full items-center justify-between rounded-lg border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-100"
    >
      <span>{copied ? '✓ Copied ATS Summary' : 'Copy ATS Candidate Summary'}</span>
      <span className="font-mono text-xs text-neutral-500">{copied ? 'Done' : 'Copy'}</span>
    </button>
  )
}

function ProjectsSidebar({ projects }: { projects: Project[] }) {
  const softwareProjects = PROJECT_INDEX.filter((p) => p.kind === 'software')

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-7 space-y-7">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Projects Index
        </p>
        <h2 className="mt-1.5 text-xl font-bold text-neutral-900">
          Production Systems ({softwareProjects.length})
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          Every project listed on this page was built for real users—a local church and Wilcon Depot&apos;s Finance and Treasury teams.
        </p>
      </div>

      {/* Quick Jump List */}
      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Open Case Study
        </p>
        <div className="space-y-2.5">
          {softwareProjects.map((entry, idx) => {
            const proj = projects.find((p) => p.slug === entry.slug)
            if (!proj) return null

            return (
              <Link
                key={entry.slug}
                href={`/projects/${entry.slug}`}
                className="group block rounded-xl border border-neutral-200 bg-white p-3.5 transition-colors hover:border-neutral-900 hover:bg-neutral-50"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold text-neutral-900 group-hover:underline">
                    0{idx + 1}. {proj.title}
                  </span>
                  <span className="text-xs text-neutral-500 group-hover:text-neutral-900">→</span>
                </div>
                <p className="mt-1 text-xs font-medium text-neutral-600">
                  {entry.usedBy}
                </p>
                <p className="mt-1 font-mono text-xs text-neutral-500">
                  {entry.stack}
                </p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ATS Stack Match */}
      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Verified Production Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Infor M3 ERP APIs', 'REST APIs', 'Git'].map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-xs font-medium text-neutral-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6 space-y-2.5">
        <CopyAtsButton />
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
        >
          Download Resume (PDF) ↗
        </a>
      </div>
    </aside>
  )
}

function WorkSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-7 space-y-7 animate-in fade-in duration-200">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Career Context
        </p>
        <h2 className="mt-1.5 text-xl font-bold text-neutral-900">
          Work & Experience
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          Full-stack development experience building internal enterprise tools at Wilcon Depot and production community systems.
        </p>
      </div>

      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Timeline & Roles
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-neutral-900">Wilcon Depot, Inc.</span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">6 mos</span>
            </div>
            <p className="text-sm text-neutral-800 font-medium mt-1">Full Stack Junior System Developer</p>
            <p className="text-xs text-neutral-500 font-mono mt-1">May 2026 – Oct 2026</p>
          </div>

          <div className="rounded-xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900">WordPress Philippines</span>
              <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-semibold text-blue-800">Volunteer</span>
            </div>
            <p className="text-sm text-neutral-700 mt-1">Volunteer & Event Photographer</p>
            <p className="text-xs text-neutral-500 font-mono mt-1">2025 Attendee → 2026 Volunteer</p>
          </div>

          <div className="rounded-xl border border-neutral-200 p-4">
            <span className="text-sm font-semibold text-neutral-900">Radiant Force HR</span>
            <p className="text-sm text-neutral-700 mt-1">HR Assistant (Absorbed from OJT)</p>
            <p className="text-xs text-neutral-500 font-mono mt-1">Sep 2025 – Jan 2026</p>
          </div>

          <div className="rounded-xl border border-neutral-200 p-4">
            <span className="text-sm font-semibold text-neutral-900">Jollibee Foods Corp.</span>
            <p className="text-sm text-neutral-700 mt-1">Service Crew · Working Student</p>
            <p className="text-xs text-neutral-500 font-mono mt-1">Jan 2024 – Jun 2024</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Production Technologies
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Infor M3 APIs', 'REST APIs', 'Git'].map((tech) => (
            <span key={tech} className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-mono font-medium text-neutral-800">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6 space-y-2.5">
        <CopyAtsButton />
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
        >
          Download Resume (PDF) ↗
        </a>
      </div>
    </aside>
  )
}

function AboutSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-7 space-y-7 animate-in fade-in duration-200">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Quick Reference
        </p>
        <h2 className="mt-1.5 text-xl font-bold text-neutral-900">
          Ronie Pactol
        </h2>
        <p className="mt-1 text-sm font-medium text-neutral-700">Full Stack Junior System Developer</p>
      </div>

      <div className="space-y-2.5 border-t border-neutral-200 pt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">Facts</p>
        <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 overflow-hidden text-sm bg-white">
          {[
            { k: 'Experience', v: '6 mos · Wilcon Depot' },
            { k: 'Education', v: 'BSIT · ACC 2025' },
            { k: 'Location', v: 'Quezon City' },
            { k: 'Status', v: 'Open to Junior roles' },
          ].map(({ k, v }) => (
            <div key={k} className="flex items-center justify-between px-3.5 py-2.5 gap-3">
              <span className="text-xs font-medium text-neutral-500 shrink-0">{k}</span>
              <span className="font-semibold text-neutral-900 text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2.5 border-t border-neutral-200 pt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Git', 'Infor M3'].map((tech) => (
            <span key={tech} className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-xs font-medium text-neutral-800">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6 space-y-2.5">
        <CopyAtsButton />
        <a
          href={PORTFOLIO_IDENTITY.phoneTel}
          className="flex items-center justify-between rounded-lg border border-neutral-300 px-3.5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors"
        >
          <span>{PORTFOLIO_IDENTITY.phone}</span>
          <span className="text-neutral-500 text-xs font-mono">call →</span>
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
        >
          Resume PDF ↗
        </a>
      </div>
    </aside>
  )
}

function CertificatesSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-7 space-y-7 animate-in fade-in duration-200">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Credentials Summary
        </p>
        <h2 className="mt-1.5 text-xl font-bold text-neutral-900">
          Verified Certifications
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          Formal technical credentials across networking, programming languages, and web development.
        </p>
      </div>

      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Issuing Organizations
        </p>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-3.5">
            <div>
              <p className="text-sm font-semibold text-neutral-900">Cisco Networking Academy</p>
              <p className="text-xs text-neutral-600 mt-0.5">Python 1 · JavaScript 1 · English for IT</p>
            </div>
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-mono text-xs font-medium text-neutral-700">3 Certs</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-3.5">
            <div>
              <p className="text-sm font-semibold text-neutral-900">TESDA (Philippine TVET)</p>
              <p className="text-xs text-neutral-600 mt-0.5">NC2 Computer Systems Servicing</p>
            </div>
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-mono text-xs font-medium text-neutral-700">NC2</span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-3.5">
            <div>
              <p className="text-sm font-semibold text-neutral-900">Scrimba</p>
              <p className="text-xs text-neutral-600 mt-0.5">Learn Vue.js Frontend Development</p>
            </div>
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-mono text-xs font-medium text-neutral-700">Vue</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <p className="text-sm font-semibold text-neutral-900">Interactive Certificate Viewer</p>
        <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
          Click any certificate card in the center column to view the full document or verify the credential link.
        </p>
      </div>
    </aside>
  )
}

function ContactSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-7 space-y-7 animate-in fade-in duration-200">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Availability & Location
        </p>
        <h2 className="mt-1.5 text-xl font-bold text-neutral-900">
          Open to Opportunities
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          Ready to contribute as a Full Stack Junior System Developer on Laravel and Vue.js teams.
        </p>
      </div>

      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Direct Contact
        </p>
        <div className="space-y-3 text-sm">
          <div className="rounded-xl border border-neutral-200 p-3.5">
            <span className="text-neutral-500 block text-xs uppercase font-mono">Location</span>
            <span className="font-semibold text-neutral-900 mt-1 block">{PORTFOLIO_IDENTITY.location}</span>
          </div>
          <div className="rounded-xl border border-neutral-200 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 block text-xs uppercase font-mono">Direct Line / Viber</span>
              <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">Available</span>
            </div>
            <a href="tel:+639931263221" className="text-base font-bold text-neutral-900 hover:underline mt-1 block">
              0993 126 3221
            </a>
            <div className="mt-2 flex items-center gap-4 text-xs">
              <a href="tel:+639931263221" className="font-semibold text-neutral-900 underline hover:text-neutral-600">
                Call now →
              </a>
              <a href="viber://chat?number=%2B639931263221" className="font-semibold text-[#7360F2] hover:underline">
                Viber chat ↗
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 p-3.5">
            <span className="text-neutral-500 block text-xs uppercase font-mono">Email</span>
            <a href={`mailto:${PORTFOLIO_IDENTITY.email}`} className="font-semibold text-neutral-900 hover:underline mt-1 block">
              {PORTFOLIO_IDENTITY.email}
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Official Resume & ATS
        </p>
        <div className="flex flex-col gap-2.5">
          <CopyAtsButton />
          <a
            href={PORTFOLIO_IDENTITY.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg bg-neutral-900 p-3.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            <span>Download PDF Resume</span>
            <span aria-hidden="true">↗</span>
          </a>
          {PORTFOLIO_IDENTITY.resumeDocUrl && (
            <a
              href={PORTFOLIO_IDENTITY.resumeDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-neutral-300 p-3.5 text-sm font-semibold text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <span>Live Google Doc</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
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
      <aside className="sticky top-0 h-screen overflow-y-auto p-7 space-y-7 animate-in fade-in duration-200">
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            ← All projects
          </Link>
        </div>

        <div className="space-y-4 border-b border-neutral-200 pb-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
            ATS Project Summary
          </p>
          <h2 className="text-xl font-bold text-neutral-900">
            {project.title}
          </h2>

          <dl className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white text-sm">
            <div className="px-3.5 py-2.5">
              <dt className="text-xs font-medium text-neutral-500">Role</dt>
              <dd className="mt-0.5 font-semibold text-neutral-900">{project.role}</dd>
            </div>
            {project.client && (
              <div className="px-3.5 py-2.5">
                <dt className="text-xs font-medium text-neutral-500">Organization / Users</dt>
                <dd className="mt-0.5 font-semibold text-neutral-900">{project.client}</dd>
              </div>
            )}
            {indexEntry && (
              <>
                <div className="px-3.5 py-2.5">
                  <dt className="text-xs font-medium text-neutral-500">Problem Solved</dt>
                  <dd className="mt-0.5 text-neutral-800 leading-snug">{indexEntry.problem}</dd>
                </div>
                <div className="px-3.5 py-2.5">
                  <dt className="text-xs font-medium text-neutral-500">Status</dt>
                  <dd className="mt-0.5 font-semibold text-emerald-800">{indexEntry.status}</dd>
                </div>
              </>
            )}
          </dl>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-mono font-medium text-neutral-800"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.url && (
            <div className="pt-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                Open Live System ↗
              </a>
            </div>
          )}
        </div>

        {otherProjects.length > 0 && (
          <div className="space-y-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Other Projects ({otherProjects.length})
            </p>
            <div className="space-y-2.5">
              {otherProjects.map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="group block rounded-xl border border-neutral-200 p-3.5 transition-all hover:border-neutral-900 hover:bg-neutral-50"
                >
                  <p className="text-sm font-semibold text-neutral-900 group-hover:underline">
                    {other.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-neutral-600 leading-relaxed">
                    {other.description}
                  </p>
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
