import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

export default function SidebarStats() {
  return (
    <div className="flex items-stretch" role="list" aria-label="Experience highlights">
      {PORTFOLIO_IDENTITY.stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`sidebar-stat ${
            index < PORTFOLIO_IDENTITY.stats.length - 1
              ? 'border-r border-neutral-100'
              : ''
          }`}
          role="listitem"
        >
          <span className="sidebar-stat-value">{stat.value}</span>
          <span className="sidebar-stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
