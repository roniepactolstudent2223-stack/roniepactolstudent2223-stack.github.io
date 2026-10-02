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
Role: Junior System Developer (Full Stack)
Core Stack: Laravel, Vue.js, MySQL, PHP, Infor M3 APIs
Experience: 6 months at Wilcon Depot (Enterprise ERP & Voucher workflows) + Solo developer of live WOH Attendance System
Reference: John Carlo Pattugan (IT Operations Administrator, LevelUp - https://levelup.support/) | +63 905 1779 250
Availability: Immediate (0-day notice) | Location: Balingasa, Quezon City | SSS & PhilHealth ready
Contact: 0993 126 3221 (Viber) | roniepactol@gmail.com
Portfolio: https://roniepactolstudent2223-stack.github.io/
Resume PDF: https://roniepactolstudent2223-stack.github.io/resume.pdf`

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Header */}
        <header className="border-b border-neutral-100 pb-5 pr-8">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            Hiring & Candidate Summary
          </p>
          <h2 id="recruiter-modal-title" className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
            Ronie Pactol
          </h2>
          <p className="mt-0.5 text-xs text-neutral-500">
            Junior System Developer · Immediate Availability · Quezon City, Metro Manila
          </p>
        </header>

        {/* Structured Grid: 2 Columns */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Column 1: Logistics & Status */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
              Employment Logistics
            </p>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Notice Period</span>
                <span className="font-semibold text-neutral-900">Available Immediately (0 days)</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Work Setup</span>
                <span className="font-semibold text-neutral-900">On-site (Metro Manila) or Hybrid</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Location</span>
                <span className="font-semibold text-neutral-900">Balingasa, Quezon City, 1115</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Government Requirements</span>
                <span className="font-semibold text-neutral-900">SSS, PhilHealth, Pag-IBIG ready</span>
              </div>
            </div>
          </div>

          {/* Column 2: Engineering Fit */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
              Technical Experience
            </p>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Primary Stack</span>
                <span className="font-semibold text-neutral-900">Laravel, Vue.js, MySQL, PHP</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Enterprise Experience</span>
                <span className="font-semibold text-neutral-900">6 mos at Wilcon Depot (ERP APIs, Vouchers)</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Live Production System</span>
                <span className="font-semibold text-neutral-900">WOH Attendance Kiosk (Live since Mar 2025)</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">Education</span>
                <span className="font-semibold text-neutral-900">BSIT — Access Computer College (2025)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Forward to Hiring Manager Action */}
        <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-neutral-900">Forward Candidate to Hiring Manager</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Copies a pre-formatted candidate blurb ready to paste into Slack, Teams, or Email.
              </p>
            </div>
            <button
              type="button"
              onClick={copySummary}
              className={`shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              {copied ? '✓ Copied to clipboard' : 'Copy summary for team'}
            </button>
          </div>
        </div>

        {/* Direct Contacts & Resume Links */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href={PORTFOLIO_IDENTITY.phoneTel}
            className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 text-xs font-semibold text-neutral-800 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            <span>Call / Viber: {PORTFOLIO_IDENTITY.phone}</span>
            <span className="font-mono text-[10px] text-neutral-400">Direct →</span>
          </a>

          <a
            href={`mailto:${PORTFOLIO_IDENTITY.email}`}
            className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 text-xs font-semibold text-neutral-800 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            <span>Email: {PORTFOLIO_IDENTITY.email}</span>
            <span className="font-mono text-[10px] text-neutral-400">Send →</span>
          </a>

          <a
            href={PORTFOLIO_IDENTITY.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg bg-neutral-900 p-3 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            <span>Download Resume (PDF)</span>
            <span aria-hidden="true">↗</span>
          </a>

          {PORTFOLIO_IDENTITY.resumeDocUrl && (
            <a
              href={PORTFOLIO_IDENTITY.resumeDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-3 text-xs font-semibold text-neutral-800 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
            >
              <span>Live Google Doc</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        {/* Professional Reference */}
        <div className="mt-5 border-t border-neutral-100 pt-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
            Professional Reference
          </p>
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
            <span className="font-medium text-neutral-900">
              {PORTFOLIO_IDENTITY.reference.name} · {PORTFOLIO_IDENTITY.reference.role},{' '}
              <a
                href={PORTFOLIO_IDENTITY.reference.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-neutral-800 hover:text-neutral-950 font-semibold inline-flex items-center gap-0.5"
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
