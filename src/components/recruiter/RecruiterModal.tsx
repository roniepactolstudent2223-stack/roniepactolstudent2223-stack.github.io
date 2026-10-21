'use client'

import { useState, useEffect } from 'react'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

interface RecruiterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  const [copied, setCopied] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const copySummary = () => {
    const summaryText = `Candidate: Ronie Pactol
Target Role: Junior Full Stack Developer / Software Engineer
Primary Stack: Laravel, Vue.js, PHP, MySQL, REST APIs
Recent Work: 
- Wilcon Depot (6 months): Enterprise ERP integrations, Omnibus internal systems, Treasury Collection & Deposit reporting with check drill-downs, month-end closing workflows.
- Live Production System: Solo developer of WOH Attendance Kiosk (active in daily use since March 2025).
Notice Period: Immediate (0 days)
Work Setup: Metro Manila (On-site or Hybrid)
Location: Balingasa, Quezon City
Pre-employment Papers: SSS, PhilHealth, Pag-IBIG ready
Reference: John Carlo Pattugan (IT Operations Administrator, LevelUp - https://levelup.support/) | +63 905 1779 250
Phone / Viber: 0993 126 3221
Email: roniepactol@gmail.com
Live Resume (Google Doc): ${PORTFOLIO_IDENTITY.resumeDocUrl}
Portfolio: https://roniepactolstudent2223-stack.github.io/`

    navigator.clipboard.writeText(summaryText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruiter-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-xl border border-neutral-200 bg-white p-7 sm:p-9 shadow-xl animate-in zoom-in-95 duration-150 text-neutral-900"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 text-neutral-400 transition-colors hover:text-neutral-900"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Header */}
        <header className="border-b border-neutral-200 pb-5 pr-8">
          <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
            Candidate Summary
          </p>
          <h2 id="recruiter-modal-title" className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
            Ronie Pactol
          </h2>
          <p className="mt-1 text-sm font-normal text-neutral-600">
            Junior Full Stack Developer · Laravel & Vue.js · Available Immediately (0 days notice)
          </p>
        </header>

        {/* Editorial Two-Column Information Table (No boxed containers) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {/* Availability & Requirements */}
          <div>
            <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400 pb-2 border-b border-neutral-200">
              Availability & Hiring Details
            </p>
            <dl className="divide-y divide-neutral-100 text-sm">
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-neutral-500 font-normal text-xs shrink-0">Start Date</dt>
                <dd className="text-neutral-900 font-normal text-right">Immediate (0 days notice)</dd>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-neutral-500 font-normal text-xs shrink-0">Work Arrangement</dt>
                <dd className="text-neutral-900 font-normal text-right">On-site (Metro Manila) / Hybrid</dd>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-neutral-500 font-normal text-xs shrink-0">Current Location</dt>
                <dd className="text-neutral-900 font-normal text-right">Balingasa, Quezon City</dd>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-neutral-500 font-normal text-xs shrink-0">Govt Pre-employment</dt>
                <dd className="text-neutral-900 font-normal text-right">SSS, PhilHealth, Pag-IBIG ready</dd>
              </div>
            </dl>
          </div>

          {/* Technical Qualifications */}
          <div>
            <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400 pb-2 border-b border-neutral-200">
              Experience & Stack
            </p>
            <dl className="divide-y divide-neutral-100 text-sm">
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-neutral-500 font-normal text-xs shrink-0">Core Technologies</dt>
                <dd className="font-mono text-[13px] text-neutral-900 font-normal text-right">Laravel · Vue.js · MySQL</dd>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-neutral-500 font-normal text-xs shrink-0">Enterprise Work</dt>
                <dd className="text-neutral-900 font-normal text-right">Wilcon Depot (6 mos)</dd>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-neutral-500 font-normal text-xs shrink-0">Production System</dt>
                <dd className="text-neutral-900 font-normal text-right">WOH Attendance Kiosk</dd>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-neutral-500 font-normal text-xs shrink-0">Degree</dt>
                <dd className="text-neutral-900 font-normal text-right">BS Information Tech (2025)</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Copy for Hiring Team / Manager */}
        <div className="mt-7 pt-4 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-neutral-900">Send candidate details to hiring manager</p>
              <p className="text-xs font-normal text-neutral-500 mt-0.5">
                Copies clean summary text ready to paste into Slack, Teams, or Email.
              </p>
            </div>
            <button
              type="button"
              onClick={copySummary}
              className={`shrink-0 inline-flex items-center justify-center px-4 py-2 text-xs font-normal transition-all rounded ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              {copied ? '✓ Copied to clipboard' : 'Copy candidate text'}
            </button>
          </div>
        </div>

        {/* Direct Actions: Plain Hairline List */}
        <div className="mt-6 border-t border-b border-neutral-200 divide-y divide-neutral-200 text-sm">
          <a
            href={PORTFOLIO_IDENTITY.resumeDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-2.5 font-normal text-neutral-800 transition-colors hover:text-neutral-950"
          >
            <span className="group-hover:underline underline-offset-4">Open Resume (Live Google Doc)</span>
            <span aria-hidden="true" className="font-mono text-xs text-neutral-400 group-hover:text-neutral-900">↗</span>
          </a>

          <a
            href={`mailto:${PORTFOLIO_IDENTITY.email}`}
            className="group flex items-center justify-between py-2.5 font-normal text-neutral-800 transition-colors hover:text-neutral-950"
          >
            <span className="group-hover:underline underline-offset-4">Email Ronie ({PORTFOLIO_IDENTITY.email})</span>
            <span aria-hidden="true" className="font-mono text-xs text-neutral-400 group-hover:text-neutral-900">→</span>
          </a>

          <a
            href={PORTFOLIO_IDENTITY.phoneTel}
            className="group flex items-center justify-between py-2.5 font-normal text-neutral-800 transition-colors hover:text-neutral-950"
          >
            <span className="group-hover:underline underline-offset-4">Call / Viber ({PORTFOLIO_IDENTITY.phone})</span>
            <span aria-hidden="true" className="font-mono text-xs text-neutral-400 group-hover:text-neutral-900">→</span>
          </a>
        </div>

        {/* Professional Reference */}
        <div className="mt-5 pt-1">
          <p className="font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-neutral-400">
            Professional Reference
          </p>
          <div className="mt-1.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
            <span className="font-normal text-neutral-800">
              {PORTFOLIO_IDENTITY.reference.name} · {PORTFOLIO_IDENTITY.reference.role},{' '}
              <a
                href={PORTFOLIO_IDENTITY.reference.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 text-neutral-900 hover:text-neutral-950 font-normal inline-flex items-center gap-0.5"
              >
                {PORTFOLIO_IDENTITY.reference.company}
                <span aria-hidden="true" className="text-[10px] text-neutral-400">↗</span>
              </a>
            </span>
            <a
              href={`tel:${PORTFOLIO_IDENTITY.reference.phone.replace(/[^0-9+]/g, '')}`}
              className="font-mono text-neutral-600 hover:text-neutral-900 hover:underline"
            >
              {PORTFOLIO_IDENTITY.reference.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
