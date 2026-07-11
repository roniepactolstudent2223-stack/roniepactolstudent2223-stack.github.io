import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import { LinkedInIcon, GitHubIcon } from '@/components/ui/Icons'

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
}

export default function SidebarHiringZone() {
  return (
    <div className="space-y-4">
      {/* Contact CTA — understated text link, not a heavy button */}
      <a
        href={`mailto:${PORTFOLIO_IDENTITY.email}`}
        className="
          inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900
          transition-colors duration-200 hover:text-neutral-600
          focus:outline-none focus-visible:underline
        "
      >
        Get in touch
        <span aria-hidden="true" className="text-neutral-300">→</span>
      </a>

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
              <span aria-hidden="true" className="ml-auto text-neutral-300 text-xs">&nearr;</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
