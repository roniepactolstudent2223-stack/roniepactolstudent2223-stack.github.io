'use client'

import { useState } from 'react'

export interface EngineeringDecision {
  id: string
  tag: string
  title: string
  challenge: string
  technicalDecision: string
  productionResult: string
  metrics?: { label: string; value: string }[]
}

const WOH_DECISIONS: EngineeringDecision[] = [
  {
    id: 'rest-api-sync',
    tag: 'API Integration & Security',
    title: 'Secure REST API Decoupling vs Direct Database Sharing',
    challenge: 'Word of Hope Caloocan already had active member registrations on wohcaloocan.org. Connecting the on-site attendance kiosk directly to the main website database would have created tight architectural coupling, exposed database credentials, and created single-point-of-failure risks.',
    technicalDecision: 'Architected a dedicated, token-authenticated REST API endpoint on the church website. The Laravel attendance system fetches member data via HTTPS JSON requests and maintains its own optimized local replica with incremental delta syncing.',
    productionResult: 'Total isolation between the public church website and the attendance application. Zero risk of production database lockups during on-site peak hours.',
    metrics: [
      { label: 'Security', value: 'Decoupled DB' },
      { label: 'Sync Format', value: 'HTTPS JSON' },
    ],
  },
  {
    id: 'client-side-qr',
    tag: 'Performance & Latency',
    title: 'Client-Side Browser QR Decoding vs Server Image Upload',
    challenge: 'Over 100 church members arrive within a tight 15-minute window before the Sunday service. Transmitting continuous video frames or high-resolution images to the server for QR decoding would overwhelm on-site Wi-Fi bandwidth and bottleneck the server.',
    technicalDecision: 'Implemented client-side video stream canvas decoding directly in Vue.js using the browser hardware acceleration. Only the verified 16-character alphanumeric token is sent to the Laravel check-in endpoint.',
    productionResult: 'Average check-in latency dropped to under 1.2 seconds per person. Handled peak Sunday morning arrivals with zero queue delay and negligible bandwidth consumption.',
    metrics: [
      { label: 'Scan Latency', value: '< 1.2s' },
      { label: 'Bandwidth', value: 'Minimal (<2KB)' },
    ],
  },
  {
    id: 'deduplication-indexes',
    tag: 'Data Integrity & MySQL',
    title: 'Composite Unique Constraints & Scan Cooldown Rules',
    challenge: 'Attendees or children frequently scan their QR badges multiple times in rapid succession, which previously distorted headcount reports and generated duplicate database rows.',
    technicalDecision: 'Implemented a composite unique database index on (member_id, service_session_id, scan_date) coupled with a 3-hour cooldown threshold in the Laravel AttendanceController. Redundant scans return an immediate friendly acknowledgement while safely ignoring duplicate database insertions.',
    productionResult: '100% accurate attendance metrics and clean audit logs for church pastoral leadership and absentee care outreach.',
    metrics: [
      { label: 'Duplicates', value: '0 False Positives' },
      { label: 'Data Accuracy', value: '100% Reliable' },
    ],
  },
]

const WILCON_DECISIONS: EngineeringDecision[] = [
  {
    id: 'deterministic-logic',
    tag: 'Code Quality & Reliability',
    title: 'Deterministic Hand-Authored Logic vs AI-Assisted Assumptions',
    challenge: 'Corporate accounting calculations, retail tax disbursements, and vendor voucher workflows at Wilcon Depot require mathematical perfection and accountability. Unvetted AI-generated assumptions or subtle floating-point errors could cause severe financial discrepancies.',
    technicalDecision: 'Authored clean, explicit, hand-written PHP and Laravel logic with deterministic precision calculations (BCMath) and explicit MySQL queries. Validated all business logic alongside System Analysts and QA engineers without blind AI reliance.',
    productionResult: 'High audit reliability and clean business logic ready for enterprise scrutiny across corporate retail operations.',
    metrics: [
      { label: 'Logic Safety', value: '100% Hand-Crafted' },
      { label: 'Verification', value: 'SA & QA Tested' },
    ],
  },
  {
    id: 'two-phase-erp',
    tag: 'ERP Integration',
    title: 'Two-Phase Staging & Idempotency for Infor M3 Sync',
    challenge: 'During high-volume retail transactions, direct synchronous writes to the ERP could fail due to temporary network drops, risking orphan local records and ledger mismatches.',
    technicalDecision: 'Implemented an idempotent two-phase workflow: first persisting the financial voucher in local MySQL with an immutable reference hash and "pending" status, then executing the Infor M3 API sync with automated transaction rollback handling.',
    productionResult: 'Zero orphan records and complete audit traceability for accounting officers and retail branch managers.',
    metrics: [
      { label: 'Data Consistency', value: 'ACID Guaranteed' },
      { label: 'Traceability', value: 'Audit Logged' },
    ],
  },
  {
    id: 'rbac-workflows',
    tag: 'Security & Access Control',
    title: 'Granular Role-Based Access Control (RBAC) in Laravel & Vue',
    challenge: 'Branch store encoders, accounting supervisors, and corporate audit executives interact with the same vouchers but require strictly partitioned permission boundaries.',
    technicalDecision: 'Architected granular Laravel policy gates and middleware with conditional Vue.js UI rendering. Sensitive actions like final voucher disbursement are strictly restricted to authorized accounting officers.',
    productionResult: 'Secure, multi-tier approval pipeline complying with Wilcon corporate governance and accounting audit rules.',
    metrics: [
      { label: 'Security Model', value: 'Laravel Gates' },
      { label: 'Compliance', value: 'Corporate Audit' },
    ],
  },
]

const PROJECT_DECISIONS: Record<string, EngineeringDecision[]> = {
  'woh-attendance-system': WOH_DECISIONS,
  'wilcon-enterprise-systems': WILCON_DECISIONS,
}

export default function EngineeringDecisions({ slug }: { slug: string }) {
  const decisions = PROJECT_DECISIONS[slug]
  const [selectedDecisionId, setSelectedDecisionId] = useState<string>(decisions ? decisions[0]?.id : '')

  if (!decisions || decisions.length === 0) return null

  const activeDecision = decisions.find((d) => d.id === selectedDecisionId) || decisions[0]

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
              Technical Problem Solving
            </span>
          </div>
          <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
            Key Engineering Decisions & Trade-offs
          </h3>
          <p className="mt-1 text-xs text-neutral-500">
            How architectural trade-offs, database schemas, and edge cases were tackled in production.
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-mono text-neutral-600">
          Senior Interview Case Studies
        </span>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
        {decisions.map((d, index) => {
          const isSelected = activeDecision.id === d.id
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedDecisionId(d.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              <span className="font-mono opacity-60 mr-1.5">0{index + 1}</span>
              {d.tag}
            </button>
          )
        })}
      </div>

      {/* Active Decision Card */}
      <div className="mt-6 space-y-5">
        <div>
          <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-mono text-[10px] font-medium text-neutral-700">
            {activeDecision.tag}
          </span>
          <h4 className="mt-2 text-base sm:text-lg font-bold text-neutral-900">
            {activeDecision.title}
          </h4>
        </div>

        {/* 3-Step Breakdown: Problem -> Decision -> Result */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 1. Challenge */}
          <div className="rounded-xl border border-red-200/80 bg-red-50/40 p-4">
            <div className="flex items-center gap-1.5 text-red-800 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              The Challenge
            </div>
            <p className="text-xs leading-relaxed text-neutral-700">
              {activeDecision.challenge}
            </p>
          </div>

          {/* 2. Technical Decision */}
          <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-4">
            <div className="flex items-center gap-1.5 text-amber-800 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Architectural Decision
            </div>
            <p className="text-xs leading-relaxed text-neutral-700">
              {activeDecision.technicalDecision}
            </p>
          </div>

          {/* 3. Production Result */}
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-4">
            <div className="flex items-center gap-1.5 text-emerald-800 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Production Result
            </div>
            <p className="text-xs leading-relaxed text-neutral-700">
              {activeDecision.productionResult}
            </p>
            {activeDecision.metrics && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-emerald-200/60 pt-2">
                {activeDecision.metrics.map((m) => (
                  <div key={m.label} className="bg-white/80 rounded px-2 py-1 text-[10px]">
                    <span className="text-neutral-400 font-mono mr-1">{m.label}:</span>
                    <span className="font-semibold text-emerald-800">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
