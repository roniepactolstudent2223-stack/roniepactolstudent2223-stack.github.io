'use client'

import Link from 'next/link'

const TECH_FLOW = [
  {
    step: '01',
    title: 'Entry & Validation',
    spec: 'Debit = Credit check · Mandatory GL fields',
  },
  {
    step: '02',
    title: 'BU Manager Review',
    spec: 'Role-based access · Approve or return with remarks',
  },
  {
    step: '03',
    title: 'Finance GL Posting',
    spec: 'Posts to General Ledger · Auto next-month reversal',
  },
  {
    step: '04',
    title: 'Live GL Balance Sync',
    spec: 'Unadjusted vs. Posted vs. Final Closing balance',
  },
]

/**
 * Compact visual 4-step technical architecture flow for Month-End Closing.
 * Zero long paragraphs — pure system flow + tech stack.
 */
export default function ApprovalTrail() {
  return (
    <section
      id="approval-trail"
      aria-labelledby="trail-title"
      className="scroll-mt-6 border-t border-rule/60 px-6 py-10 sm:py-12"
    >
      <div className="max-w-4xl">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="ledger-figures text-xs uppercase tracking-[0.08em] text-ledger font-medium">
              System Architecture · Wilcon Depot Finance
            </p>
            <h2
              id="trail-title"
              className="mt-1 font-serif text-2xl font-medium text-ink sm:text-[1.7rem]"
            >
              Month-End Closing Pipeline
            </h2>
          </div>

          <Link
            href="/projects/wilcon-month-end-closing"
            className="ledger-figures text-xs font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            System specs &amp; screens →
          </Link>
        </div>

        {/* 4-Column Compact Visual Flow */}
        <ol className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_FLOW.map((node, idx) => (
            <li
              key={node.step}
              className={`p-3.5 ${
                idx === 2
                  ? 'border-l-2 border-ledger bg-ledger/12'
                  : 'bg-paper-deep/45'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="ledger-figures bg-ledger px-1.5 py-0.5 text-[10px] font-medium text-paper">
                  {node.step}
                </span>
                {idx < 3 ? (
                  <span className="ledger-figures text-xs text-ink-soft">→</span>
                ) : (
                  <span className="ledger-figures text-[10px] font-medium text-ledger">
                    ✓ Synced
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-ink">{node.title}</p>
              <p className="ledger-figures mt-1 text-[11px] leading-snug text-ink-soft">
                {node.spec}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
