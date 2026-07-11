'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SECTIONS } from '@/lib/portfolio-config'
import SidebarIdentity from '@/components/sidebar/SidebarIdentity'
import SidebarHiringZone from '@/components/sidebar/SidebarHiringZone'
import FeaturedProjectLink from '@/components/projects/FeaturedProjectLink'

export default function MobileNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

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
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white px-4 py-4 lg:hidden">
        <div className="flex items-center justify-between">
          <SidebarIdentity compact />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-white px-6 pb-8 pt-20 lg:hidden">
          <div className="mb-8 border-b border-neutral-200 pb-6">
            <SidebarIdentity />
          </div>

          <nav aria-label="Mobile navigation">
            <ul className="space-y-1">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id

                return (
                  <li key={section.href}>
                    <Link
                      href={section.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        block py-3 text-base transition-colors
                        ${isActive ? 'font-medium text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'}
                      `}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {section.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <FeaturedProjectLink onNavigate={() => setIsOpen(false)} />

          <div className="mt-8 border-t border-neutral-200 pt-6">
            <SidebarHiringZone />
          </div>
        </div>
      )}
    </>
  )
}
