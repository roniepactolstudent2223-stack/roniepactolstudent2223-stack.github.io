'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { WorkDomain } from '@/lib/portfolio-config'

interface DiscoveryPathsProps {
  domains: WorkDomain[]
  onSelectDomain: (domainId: string | null) => void
  activeDomain: string | null
}

const DOMAIN_DESCRIPTIONS: Record<string, string> = {
  'production': 'Enterprise software, internal tools, and church attendance system',
  'community': 'WordPress Philippines volunteering, photography, and open-source',
  'full-stack': 'Laravel, Vue.js, MySQL, REST APIs, and full-stack web engineering',
}

export default function DiscoveryPaths({ domains, onSelectDomain, activeDomain }: DiscoveryPathsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const items = el.querySelectorAll('[data-discovery-item]')

    const ctx = gsap.context(() => {
      gsap.from(items, {
        x: -10,
        opacity: 0,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.out',
        delay: 0.05,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const visibleDomains = domains.filter((d) => d.count > 0)

  if (visibleDomains.length === 0) return null

  return (
    <div ref={containerRef}>
      <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
        Filter by focus area
      </p>
      <div className="flex flex-col gap-0">
        {visibleDomains.map((domain) => {
          const isActive = activeDomain === domain.id
          return (
            <button
              key={domain.id}
              onClick={() => onSelectDomain(isActive ? null : domain.id)}
              data-discovery-item
              className="group flex items-baseline justify-between border-b border-neutral-200 py-4 text-left transition-colors hover:border-neutral-400"
            >
              <div className="flex items-baseline gap-3">
                <span className={`text-base font-medium transition-colors ${
                  isActive ? 'text-neutral-900' : 'text-neutral-900 group-hover:text-neutral-500'
                }`}>
                  {domain.label}
                </span>
                <span className="text-xs text-neutral-500">
                  {DOMAIN_DESCRIPTIONS[domain.id] || ''}
                </span>
              </div>
              <span className={`ml-4 text-sm transition-transform duration-300 group-hover:translate-x-1 ${
                isActive ? 'text-neutral-900 font-bold' : 'text-neutral-300 group-hover:text-neutral-500'
              }`}>
                {isActive ? '✕' : '→'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
