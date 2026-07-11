'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import { MailIcon, LinkedInIcon, GitHubIcon } from '@/components/ui/Icons'

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const emailBtnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15,
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  // Magnetic hover on email CTA
  useEffect(() => {
    const btn = emailBtnRef.current
    if (!btn) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' })
    }

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
    }

    btn.addEventListener('mousemove', handleMouseMove)
    btn.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove)
      btn.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <footer ref={footerRef} className="bg-neutral-100 px-6 py-10">
      <div className="max-w-4xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div data-reveal>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
              Get in touch
            </p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
              Let&apos;s build something
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              Always open to discussing design systems, product engineering, or new opportunities.
            </p>

            <div className="mt-6">
              <a
                ref={emailBtnRef}
                href={`mailto:${PORTFOLIO_IDENTITY.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-300/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                <MailIcon className="h-4 w-4" />
                {PORTFOLIO_IDENTITY.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6" data-reveal>
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
                Connect
              </p>
              <div className="flex items-center gap-2">
                {PORTFOLIO_IDENTITY.externalLinks.map((link) => {
                  const IconComponent = SOCIAL_ICONS[link.label]
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-neutral-600 transition-all duration-300 hover:bg-neutral-900 hover:text-white hover:shadow-lg hover:shadow-neutral-300/50"
                    >
                      {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
                      {link.label}
                    </a>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
                Location
              </p>
              <p className="text-xs text-neutral-500">
                {PORTFOLIO_IDENTITY.location}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6" data-reveal>
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} {PORTFOLIO_IDENTITY.name}
            </p>
            <p className="text-xs text-neutral-500">
              Designed &amp; built with care
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
