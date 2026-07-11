'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import { LinkedInIcon, GitHubIcon } from '@/components/ui/Icons'
import ContactForm from '@/components/contact/ContactForm'

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
}

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-reveal]'), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const externalLinks = PORTFOLIO_IDENTITY.externalLinks ?? []

  return (
    <div ref={containerRef} className="px-6 py-10">
      <div className="max-w-4xl">

        <header data-reveal>
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            Contact
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900 sm:text-6xl">
            Let&apos;s work together
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-500">
            Whether you&apos;re hiring, collaborating, or just want to talk about design systems — I&apos;m interested.
          </p>
          <div className="mt-6 h-px w-16 bg-neutral-900" />
        </header>

        <section className="mt-14" data-reveal>
          <ContactForm formspreeId={FORMSPREE_ID} />
        </section>

        <p className="mt-6 text-sm text-neutral-500" data-reveal>
          Prefer email?{' '}
          <a
            href={`mailto:${PORTFOLIO_IDENTITY.email}`}
            className="font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 transition-colors hover:decoration-neutral-900"
          >
            {PORTFOLIO_IDENTITY.email}
          </a>
        </p>

        {PORTFOLIO_IDENTITY.resumeUrl && (
          <section className="mt-16" data-reveal>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
              Resume
            </p>
            <a
              href={PORTFOLIO_IDENTITY.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 transition-colors hover:decoration-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              View resume
              <span aria-hidden="true" className="text-xs">&nearr;</span>
            </a>
          </section>
        )}

        {externalLinks.length > 0 && (
          <section className="mt-16" data-reveal>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-500">
              Also find me on
            </p>
            <div className="flex gap-3">
              {externalLinks.map((link) => {
                const IconComponent = SOCIAL_ICONS[link.label]
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-600 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white hover:shadow-lg hover:shadow-neutral-300/50"
                  >
                    {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
                    {link.label}
                  </a>
                )
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
