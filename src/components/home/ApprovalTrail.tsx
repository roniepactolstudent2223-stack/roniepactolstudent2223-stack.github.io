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
    spec: 'Role-based access · Approve or return',
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

export default function ApprovalTrail() {
  return (
    <section
      id="approval-trail"
      aria-labelledby="trail-title"
      className="scroll-mt-6 border-t border-rule/60 px-6 py-10 sm:py-12"
    >
      <div className="max-w-4xl">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="trail-title"
            className="font-serif text-2xl font-medium text-ink sm:text-[1.7rem]"
          >
            Month-End Closing Pipeline
          </h2>

          <Link
            href="/projects/wilcon-month-end-closing"
            className="ledger-figures text-xs font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink"
          >
            View screens →
          </Link>
        </div>

        <ol className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_FLOW.map((node) => (
            <li key={node.step} className="bg-paper-deep/45 p-3.5">
              <span className="ledger-figures text-[11px] font-medium text-ledger">
                {node.step}
              </span>
              <p className="mt-1 text-sm font-medium text-ink">{node.title}</p>
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
