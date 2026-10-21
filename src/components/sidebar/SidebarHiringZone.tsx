'use client'

import { useState } from 'react'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'
import RecruiterModal from '@/components/recruiter/RecruiterModal'

export default function SidebarHiringZone() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* Plain-text Stack — regular weight label, regular weight value */}
      <div>
        <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
          Stack
        </p>
        <p className="mt-1 font-mono text-[13px] font-normal leading-relaxed text-neutral-700">
          Laravel · Vue.js · PHP · MySQL · Infor M3
        </p>
      </div>

      {/* Hairline-separated direct actions — regular weight, underline on hover */}
      <div className="divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
        <a
          href={PORTFOLIO_IDENTITY.resumeDocUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between py-2.5 font-normal text-neutral-800 transition-colors hover:text-neutral-950"
        >
          <span className="group-hover:underline underline-offset-4">Resume (Live Doc)</span>
          <span aria-hidden="true" className="font-mono text-xs text-neutral-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-neutral-900">
            ↗
          </span>
        </a>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="group flex w-full items-center justify-between py-2.5 text-left font-normal text-neutral-800 transition-colors hover:text-neutral-950"
        >
          <span className="group-hover:underline underline-offset-4">Recruiter Snapshot</span>
          <span className="font-mono text-xs text-neutral-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-neutral-900">
            →
          </span>
        </button>
      </div>

      <RecruiterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Clean inline external links */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {PORTFOLIO_IDENTITY.externalLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-social-link"
          >
            <span>{link.label}</span>
            <span aria-hidden="true" className="text-neutral-400 text-xs">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}
