import Link from 'next/link'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

interface FeaturedProjectLinkProps {
  onNavigate?: () => void
}

export default function FeaturedProjectLink({ onNavigate }: FeaturedProjectLinkProps) {
  const { featuredProject } = PORTFOLIO_IDENTITY

  return (
    <div className="mt-6">
      <p className="mb-2 text-xs text-neutral-500">Start here</p>
      <Link
        href={`/projects/${featuredProject.slug}`}
        onClick={onNavigate}
        className="
          group inline-flex items-center gap-1 text-sm text-neutral-700
          transition-colors duration-200 hover:text-neutral-900
          focus:outline-none focus-visible:underline
        "
      >
        <span className="font-medium">{featuredProject.label}</span>
        <span
          className="text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          →
        </span>
      </Link>
    </div>
  )
}
