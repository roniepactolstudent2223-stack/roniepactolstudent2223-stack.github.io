'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SECTIONS } from '@/lib/portfolio-config'
import SidebarIdentity from '@/components/sidebar/SidebarIdentity'
import SidebarHiringZone from '@/components/sidebar/SidebarHiringZone'

const NAV_BADGES: Record<string, string> = {
  projects: '04',
  work: '04',
  certificates: '06',
}

export default function LeftSidebar() {
  const pathname = usePathname()

  const activeSection = useMemo(() => {
    if (pathname.startsWith('/about')) return 'about'
    if (pathname.startsWith('/projects')) return 'projects'
    if (pathname.startsWith('/work')) return 'work'
    if (pathname.startsWith('/certificates')) return 'certificates'
    if (pathname.startsWith('/contact')) return 'contact'
    return 'home'
  }, [pathname])

  return (
    <aside
      className="sticky top-0 flex h-screen flex-col border-r border-rule/60 bg-paper-deep/30"
      aria-label="Portfolio navigation"
    >
      <div className="flex h-full flex-col justify-between px-6 py-7">
        {/* Top: Visual Identity + Navigation */}
        <div className="space-y-7">
          <SidebarIdentity />

          <nav aria-label="Page sections">
            <p className="ledger-figures mb-2 px-2.5 text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              Navigation
            </p>
            <ul className="space-y-1">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id
                const badge = NAV_BADGES[section.id]

                return (
                  <li key={section.id}>
                    <Link
                      href={section.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'border-l-2 border-ledger bg-paper-deep font-medium text-ink'
                          : 'text-ink-soft hover:bg-paper-deep/60 hover:text-ink'
                      }`}
                    >
                      <span>{section.label}</span>
                      {badge ? (
                        <span
                          className={`ledger-figures text-[11px] ${
                            isActive ? 'text-ledger font-medium' : 'text-ink-soft/70 group-hover:text-ink'
                          }`}
                        >
                          {badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom: Core Stack Pills & Quick Actions */}
        <div className="pt-4">
          <SidebarHiringZone />
        </div>
      </div>
    </aside>
  )
}
