'use client'

import { useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { SECTIONS } from '@/lib/portfolio-config'
import SidebarIdentity from '@/components/sidebar/SidebarIdentity'
import SidebarHiringZone from '@/components/sidebar/SidebarHiringZone'

export default function LeftSidebar() {
  const pathname = usePathname()

  const activeSection = useMemo(() => {
    if (pathname === '/about') return 'about'
    if (pathname === '/work') return 'work'
    if (pathname === '/certificates') return 'certificates'
    if (pathname === '/contact') return 'contact'
    return 'home'
  }, [pathname])

  // IntersectionObserver for homepage sections
  useEffect(() => {
    if (pathname !== '/') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (sectionId) {
              // Update URL hash without navigation
              history.replaceState(null, '', `#${sectionId}`)
            }
          }
        })
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
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
                    <a
                      href={section.href}
                      className="sidebar-nav-link"
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {section.label}
                    </a>
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
