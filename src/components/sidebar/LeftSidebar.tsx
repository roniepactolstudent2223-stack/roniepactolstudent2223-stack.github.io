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
    if (pathname.startsWith('/projects')) return 'projects'
    if (pathname.startsWith('/work')) return 'work'
    if (pathname.startsWith('/certificates')) return 'certificates'
    if (pathname.startsWith('/contact')) return 'contact'
    return 'home'
  }, [pathname])

  return (
    <aside
      className="sticky top-0 flex h-screen flex-col border-r border-rule/60 bg-paper-deep/25"
      aria-label="Portfolio navigation"
    >
      <div className="flex h-full flex-col justify-between px-6 py-7">
        <div className="space-y-6">
          <SidebarIdentity />

          <nav aria-label="Main">
            <ul className="space-y-0.5">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id

                return (
                  <li key={section.id}>
                    <Link
                      href={section.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-paper-deep font-medium text-ink'
                          : 'text-ink-soft hover:bg-paper-deep/50 hover:text-ink'
                      }`}
                    >
                      {section.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="pt-4">
          <SidebarHiringZone />
        </div>
      </div>
    </aside>
  )
}
