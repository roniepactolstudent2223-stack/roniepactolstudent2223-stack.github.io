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
    <div className="space-y-3.5">
      {/* Recruiter Summary Trigger — clean, understated, planned */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-800 transition-colors hover:border-neutral-400 hover:bg-neutral-100"
      >
        <span>Recruiter Overview</span>
        <span className="font-mono text-[10px] text-neutral-400">snapshot →</span>
      </button>

      <RecruiterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Contact CTA — understated text link, not a heavy button */}
      <div className="flex items-center justify-between">
        <Link
          href="/contact"
          className="
            inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900
            transition-colors duration-200 hover:text-neutral-600
            focus:outline-none focus-visible:underline
          "
        >
          Get in touch
          <span aria-hidden="true" className="text-neutral-300">→</span>
        </Link>
        <a
          href={PORTFOLIO_IDENTITY.phoneTel}
          className="text-[11px] font-mono text-neutral-400 hover:text-neutral-900 transition-colors"
          title="Call or message via Viber"
        >
          0993 126 3221
        </a>
      </div>

      {/* Social links — labeled, easy to tap */}
      <div className="flex flex-col gap-1">
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
                <IconComponent className="h-4 w-4" />
              ) : (
                <span className="text-xs">{link.label.charAt(0)}</span>
              )}
              <span>{link.label}</span>
              <span aria-hidden="true" className="ml-auto text-neutral-300 text-xs">↗</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
