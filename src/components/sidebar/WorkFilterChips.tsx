'use client'

import { usePortfolio } from '@/contexts/PortfolioContext'
import { getWorkDomains } from '@/lib/portfolio-config'

export default function WorkFilterChips() {
  const { projects, selectedDomain, setSelectedDomain } = usePortfolio()
  const domains = getWorkDomains(projects)

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by view">
      <button
        type="button"
        onClick={() => setSelectedDomain(null)}
        aria-pressed={selectedDomain === null}
        className={chipClass(selectedDomain === null)}
      >
        All
        <span className="text-neutral-500 font-mono">{projects.length}</span>
      </button>

      {domains.map((domain) => (
        <button
          key={domain.id}
          type="button"
          onClick={() => setSelectedDomain(domain.id)}
          aria-pressed={selectedDomain === domain.id}
          className={chipClass(selectedDomain === domain.id)}
        >
          {domain.label}
          <span className="text-neutral-500 font-mono">{domain.count}</span>
        </button>
      ))}
    </div>
  )
}

function chipClass(isActive: boolean) {
  return `
    inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1
    text-xs font-medium transition-colors duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2
    ${
      isActive
        ? 'border-neutral-900 bg-neutral-900 text-white'
        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
    }
  `
}
