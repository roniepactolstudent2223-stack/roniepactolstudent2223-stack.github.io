'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SECTIONS } from '@/lib/portfolio-config'
import SidebarIdentity from '@/components/sidebar/SidebarIdentity'

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
      <div className="flex h-full flex-col px-6 py-7">
        <SidebarIdentity />

        <nav aria-label="Main" className="mt-7">
          <ul className="space-y-1">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id

              return (
                <li key={section.id}>
                  <Link
                    href={section.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block px-3.5 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-ink font-medium text-paper'
                        : 'text-ink-soft hover:bg-paper-deep/65 hover:text-ink'
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
    </aside>
  )
}
