'use client'

import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import { LinkedInIcon, GitHubIcon, FacebookIcon } from '@/components/ui/Icons'

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Facebook: FacebookIcon,
}

export default function SidebarHiringZone() {
  return (
    <div className="space-y-4">
      <a
        href={PORTFOLIO_IDENTITY.resumeDocUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ledger-figures flex w-full items-center justify-between bg-ink px-3.5 py-2.5 text-xs font-medium text-paper transition-colors hover:bg-ledger"
      >
        <span>Resume (Google Doc)</span>
        <span aria-hidden="true">↗</span>
      </a>

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
