'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SECTIONS } from '@/lib/portfolio-config'
import SidebarIdentity from '@/components/sidebar/SidebarIdentity'
import SidebarHiringZone from '@/components/sidebar/SidebarHiringZone'

export default function LeftSidebar() {
  const pathname = usePathname()

  const activeSection = useMemo(() => {
    if (pathname.startsWith('/about')) return 'about'
    if (pathname.startsWith('/work')) return 'work'
    if (pathname.startsWith('/certificates')) return 'certificates'
    if (pathname.startsWith('/contact')) return 'contact'
    return 'home'
  }, [pathname])

  return (
    <aside
      className="sidebar-accent sticky top-0 flex h-screen flex-col border-r border-neutral-200 bg-white"
      aria-label="Portfolio navigation"
    >
      <div className="flex h-full flex-col">
        {/* Zone 1 — Identity */}
        <div className="px-6 pt-8 pb-4">
          <SidebarIdentity />
        </div>

        <hr className="sidebar-divider mx-6" />

        {/* Zone 2 — Navigation */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <nav aria-label="Page sections">
            <ul className="space-y-0.5">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id

                return (
                  <li key={section.id}>
                    <Link
                      href={section.href}
                      className="sidebar-nav-link"
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {section.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* Zone 3 — Status bar */}
        <div className="border-t border-neutral-100 px-6 py-5">
          <SidebarHiringZone />
        </div>
      </div>
    </aside>
  )
}
