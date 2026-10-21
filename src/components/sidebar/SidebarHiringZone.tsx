'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import { LinkedInIcon, GitHubIcon } from '@/components/ui/Icons'
import RecruiterModal from '@/components/recruiter/RecruiterModal'

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
}

export default function SidebarHiringZone() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Core Stack — ATS visible on every page */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Core Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Infor M3'].map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-xs font-medium text-neutral-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions for Recruiters */}
      <div className="space-y-2">
        <a
          href={PORTFOLIO_IDENTITY.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-between rounded-lg bg-neutral-900 px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          <span>Download Resume (PDF)</span>
          <span aria-hidden="true" className="text-xs">↗</span>
        </a>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-between rounded-lg border border-neutral-300 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-50"
        >
          <span>Recruiter Snapshot</span>
          <span className="font-mono text-xs text-neutral-500">ATS copy →</span>
        </button>
      </div>

      <RecruiterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Social links — labeled, easy to tap */}
      <div className="flex flex-col gap-0.5 pt-1 border-t border-neutral-100">
        {PORTFOLIO_IDENTITY.externalLinks.map((link) => {
          const IconComponent = SOCIAL_ICONS[link.label]

          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-social-link"
              aria-label={link.label}
            >
              {IconComponent ? (
                <IconComponent className="h-4 w-4 text-neutral-700" />
              ) : (
                <span className="text-xs font-semibold w-4 text-center">{link.label.charAt(0)}</span>
              )}
              <span>{link.label}</span>
              <span aria-hidden="true" className="ml-auto text-neutral-400 text-xs">↗</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
