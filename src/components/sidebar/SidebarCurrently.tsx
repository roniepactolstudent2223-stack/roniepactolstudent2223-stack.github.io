import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

export default function SidebarCurrently() {
  if (!PORTFOLIO_IDENTITY.currently) return null

  return (
    <div className="sidebar-currently">
      <div className="sidebar-currently-header">
        <span className="sidebar-currently-dot" aria-hidden="true" />
        <span className="sidebar-currently-label">Currently</span>
      </div>
      <p className="sidebar-currently-text">{PORTFOLIO_IDENTITY.currently}</p>
    </div>
  )
}
