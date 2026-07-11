import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

interface SidebarIdentityProps {
  compact?: boolean
}

export default function SidebarIdentity({ compact = false }: SidebarIdentityProps) {
  if (compact) {
    return (
      <div>
        <p className="text-sm font-medium text-neutral-900">{PORTFOLIO_IDENTITY.name}</p>
        <p className="text-xs text-neutral-500">
          {PORTFOLIO_IDENTITY.role}
        </p>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <img
        src="/Profile.jpg"
        alt={PORTFOLIO_IDENTITY.name}
        className="h-20 w-20 shrink-0 rounded-lg object-cover object-top"
      />
      <div className="min-w-0">
        <h1 className="text-sm font-medium text-neutral-900 truncate">
          {PORTFOLIO_IDENTITY.name}
        </h1>
        <p className="mt-0.5 text-xs text-neutral-500">
          {PORTFOLIO_IDENTITY.role}
        </p>
      </div>
    </div>
  )
}
