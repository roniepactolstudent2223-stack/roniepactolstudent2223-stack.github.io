'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ContextPanel from '@/components/projects/ContextPanel'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import type { Project } from '@/lib/types'

interface DetailPanelProps {
  projects: Project[]
}

function WorkSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-8 space-y-8 animate-in fade-in duration-200">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          Career Context
        </p>
        <h2 className="mt-1 text-lg font-bold text-neutral-900">
          Work & Experience
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600">
          Full-stack development experience building enterprise internal tools and high-uptime production systems.
        </p>
      </div>

      <div className="space-y-4 border-t border-neutral-200 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          Timeline & Roles
        </p>
        <div className="space-y-3">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">Wilcon Depot, Inc.</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">6 mos</span>
            </div>
            <p className="text-[11px] text-neutral-700 font-medium mt-1">Full Stack Junior System Developer</p>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">May 2026 – Oct 2026</p>
          </div>

          <div className="rounded-xl border border-neutral-200 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-900">WordPress Philippines</span>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-700">Volunteer</span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-1">Volunteer & Event Photographer</p>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">2025 Attendee → 2026 Volunteer</p>
          </div>

          <div className="rounded-xl border border-neutral-200 p-3.5">
            <span className="text-xs font-semibold text-neutral-900">Radiant Force HR</span>
            <p className="text-[11px] text-neutral-600 mt-1">HR Assistant (Absorbed from OJT)</p>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Sep 2025 – Jan 2026</p>
          </div>

          <div className="rounded-xl border border-neutral-200 p-3.5">
            <span className="text-xs font-semibold text-neutral-900">Jollibee Foods Corp.</span>
            <p className="text-[11px] text-neutral-600 mt-1">Service Crew · Working Student</p>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Jan 2024 – Jun 2024</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          Production Technologies
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Infor M3 APIs', 'REST APIs', 'Git'].map((tech) => (
            <span key={tech} className="rounded-md bg-neutral-100 px-2.5 py-1 text-[11px] font-mono text-neutral-700">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
        >
          Download Resume (PDF) →
        </a>
      </div>
    </aside>
  )
}

function AboutSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-8 space-y-8 animate-in fade-in duration-200">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400 font-mono">
          Quick Reference
        </p>
        <h2 className="mt-1.5 text-base font-bold text-neutral-900">
          Ronie Pactol
        </h2>
        <p className="mt-0.5 text-xs text-neutral-500">Full Stack Junior System Developer</p>
      </div>

      <div className="space-y-2 border-t border-neutral-200 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400 font-mono">Facts</p>
        <div className="space-y-px rounded-xl border border-neutral-200 overflow-hidden text-xs">
          {[
            { k: 'Experience', v: '6 mos · Wilcon Depot' },
            { k: 'Education', v: 'BSIT · ACC 2025' },
            { k: 'Location', v: 'Quezon City' },
            { k: 'Status', v: 'Open to Junior roles' },
          ].map(({ k, v }) => (
            <div key={k} className="flex items-center justify-between bg-white px-3 py-2.5 gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wide text-neutral-400 shrink-0">{k}</span>
              <span className="font-medium text-neutral-900 text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-t border-neutral-200 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400 font-mono">Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Git', 'Infor M3'].map((tech) => (
            <span key={tech} className="rounded bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-700">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6 space-y-2">
        <a
          href={PORTFOLIO_IDENTITY.phoneTel}
          className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
        >
          <span>{PORTFOLIO_IDENTITY.phone}</span>
          <span className="text-neutral-400 text-[10px]">call</span>
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
        >
          Resume PDF ↗
        </a>
      </div>
    </aside>
  )
}

function CertificatesSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-8 space-y-8 animate-in fade-in duration-200">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          Credentials Summary
        </p>
        <h2 className="mt-1 text-lg font-bold text-neutral-900">
          Verified Certifications
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600">
          6 formal technical credentials across networking, programming languages, and web engineering.
        </p>
      </div>

      <div className="space-y-4 border-t border-neutral-200 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          Issuing Organizations
        </p>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
            <div>
              <p className="text-xs font-semibold text-neutral-900">Cisco Networking Academy</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Python 1 · JavaScript 1 · English for IT</p>
            </div>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-600">3 Certs</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
            <div>
              <p className="text-xs font-semibold text-neutral-900">TESDA (Philippine TVET)</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">NC2 Computer Systems Servicing</p>
            </div>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-600">NC2</span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
            <div>
              <p className="text-xs font-semibold text-neutral-900">Scrimba</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Learn Vue.js Frontend Engineering</p>
            </div>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-600">Vue</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 border-t border-neutral-200">
        <p className="text-xs font-semibold text-neutral-900">Interactive Preview</p>
        <p className="mt-1 text-[11px] text-neutral-500 leading-relaxed">
          Click any certificate card in the main column to open the interactive high-resolution viewer.
        </p>
      </div>
    </aside>
  )
}

function ContactSidebar() {
  return (
    <aside className="sticky top-0 h-screen overflow-y-auto p-8 space-y-8 animate-in fade-in duration-200">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          Availability & Location
        </p>
        <h2 className="mt-1 text-lg font-bold text-neutral-900">
          Open to Opportunities
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-600">
          Ready to contribute as a Full Stack Junior System Developer on production Laravel, Vue, or web teams.
        </p>
      </div>

      <div className="space-y-4 border-t border-neutral-200 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          Quick Details
        </p>
        <div className="space-y-3 text-xs">
          <div className="rounded-lg border border-neutral-200 p-3">
            <span className="text-neutral-400 block text-[10px] uppercase font-mono">Location</span>
            <span className="font-semibold text-neutral-800 mt-0.5 block">{PORTFOLIO_IDENTITY.location}</span>
          </div>
          <div className="rounded-lg border border-neutral-200 p-3">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400 block text-[10px] uppercase font-mono">Direct Line / Viber</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">Available</span>
            </div>
            <a href="tel:+639931263221" className="font-semibold text-neutral-900 hover:underline mt-1 block">
              0993 126 3221
            </a>
            <div className="mt-2 flex items-center gap-3 text-[11px]">
              <a href="tel:+639931263221" className="font-semibold text-neutral-900 underline hover:text-neutral-600">
                Call now →
              </a>
              <a href="viber://chat?number=%2B639931263221" className="font-semibold text-[#7360F2] hover:underline">
                Viber chat ↗
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 p-3">
            <span className="text-neutral-400 block text-[10px] uppercase font-mono">Email</span>
            <a href={`mailto:${PORTFOLIO_IDENTITY.email}`} className="font-semibold text-neutral-900 hover:underline mt-0.5 block">
              {PORTFOLIO_IDENTITY.email}
            </a>
          </div>
          <div className="rounded-lg border border-neutral-200 p-3">
            <span className="text-neutral-400 block text-[10px] uppercase font-mono">Response Time</span>
            <span className="font-semibold text-neutral-800 mt-0.5 block">Usually within 24 hours</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          External Profiles
        </p>
        <div className="flex flex-col gap-2">
          {PORTFOLIO_IDENTITY.externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 text-xs font-semibold text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
            >
              <span>{link.label}</span>
              <span className="text-neutral-400">→</span>
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-3 border-t border-neutral-200 pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
          Official Resume
        </p>
        <div className="flex flex-col gap-2">
          <a
            href={PORTFOLIO_IDENTITY.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg bg-neutral-900 p-3 text-xs font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            <span>Download PDF Resume</span>
            <span aria-hidden="true">↗</span>
          </a>
          {PORTFOLIO_IDENTITY.resumeDocUrl && (
            <a
              href={PORTFOLIO_IDENTITY.resumeDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 text-xs font-semibold text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
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
    const otherProjects = projects.filter((p) => p.slug !== project.slug)

    return (
      <aside className="sticky top-0 h-screen overflow-y-auto p-8 space-y-8 animate-in fade-in duration-200">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← Back to all projects
          </Link>
        </div>

        <div className="space-y-6 border-b border-neutral-200 pb-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
            Project Overview
          </p>
          <h2 className="text-xl font-bold text-neutral-900">
            {project.title}
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-neutral-400">Role: </span>
              <span className="font-medium text-neutral-800">{project.role}</span>
            </div>
            {project.client && (
              <div>
                <span className="text-neutral-400">Client / Org: </span>
                <span className="font-medium text-neutral-800">{project.client}</span>
              </div>
            )}
            <div>
              <span className="text-neutral-400">Year: </span>
              <span className="font-medium text-neutral-800">{project.year}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-mono text-neutral-600"
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
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                Open Live System →
              </a>
            </div>
          )}
        </div>

        {otherProjects.length > 0 && (
          <div className="space-y-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
              Other Work & Community
            </p>
            <div className="space-y-3">
              {otherProjects.map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="group block rounded-xl border border-neutral-200 p-4 transition-all hover:border-neutral-400 hover:bg-neutral-50"
                >
                  <p className="text-xs font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {other.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] text-neutral-500">
                    {other.description}
                  </p>
                  <span className="mt-2 inline-flex items-center text-[10px] font-medium text-neutral-400 group-hover:text-neutral-800">
                    View project →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    )
  }

  // 2. Work Route
  if (pathname === '/work') {
    return <WorkSidebar />
  }

  // 3. About Route
  if (pathname === '/about') {
    return <AboutSidebar />
  }

  // 4. Certificates Route
  if (pathname === '/certificates') {
    return <CertificatesSidebar />
  }

  // 5. Contact Route
  if (pathname === '/contact') {
    return <ContactSidebar />
  }

  // 6. Home Route (default)
  return <ContextPanel projects={projects} />
}
