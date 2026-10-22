'use client'

import { useState } from 'react'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import RecruiterModal from '@/components/recruiter/RecruiterModal'
import { LinkedInIcon, GitHubIcon, FacebookIcon } from '@/components/ui/Icons'

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Facebook: FacebookIcon,
}

const CORE_STACK = ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'REST APIs']

export default function SidebarHiringZone() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Core Stack Pills (soft background, no borders) */}
      <div className="bg-paper-deep/55 p-3">
        <p className="ledger-figures text-[10px] uppercase tracking-[0.12em] text-ink-soft">
          Core Stack
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {CORE_STACK.map((item) => (
            <span
              key={item}
              className="ledger-figures bg-paper px-2 py-0.5 text-[11px] font-medium text-ink"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-1.5">
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ledger-figures flex w-full items-center justify-between bg-ink px-3.5 py-2.5 text-xs font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ledger"
        >
          <span>Live Resume (Doc)</span>
          <span aria-hidden="true">↗</span>
        </a>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="ledger-figures flex w-full cursor-pointer items-center justify-between bg-paper-deep/80 px-3.5 py-2 text-left text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
        >
          <span>Candidate Summary</span>
          <span aria-hidden="true" className="text-ledger">→</span>
        </button>
      </div>

      <RecruiterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Social Links with Icons */}
      <div className="flex items-center justify-between pt-1">
        {PORTFOLIO_IDENTITY.externalLinks.map((link) => {
          const Icon = SOCIAL_ICONS[link.label]
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-ink-soft transition-colors hover:text-ink"
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              <span>{link.label}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
