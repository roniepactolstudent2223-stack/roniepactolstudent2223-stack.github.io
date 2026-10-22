import React from 'react'

interface ProjectMockScreenProps {
  slug: string
  variant?: 'thumb' | 'detail'
  screenIndex?: number
}

/**
 * Custom-drawn simplified mock UI screens showing each project's workflow
 * using generic placeholder data (no company data or real numbers).
 */
export default function ProjectMockScreen({
  slug,
  variant = 'thumb',
  screenIndex = 0,
}: ProjectMockScreenProps) {
  const isDetail = variant === 'detail'

  if (slug === 'wilcon-month-end-closing') {
    if (isDetail && screenIndex === 1) {
      return (
        <div
          className="flex h-full w-full flex-col justify-between border border-rule bg-paper p-3.5 text-ink select-none"
          aria-label="Mock screen of journal entry validation and auto-reversal"
        >
          <div className="flex items-center justify-between border-b border-rule pb-2">
            <span className="ledger-figures text-[10px] uppercase tracking-wider text-ink-soft">
              Journal Entry Validation
            </span>
            <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-1.5 py-0.5 text-[10px] font-medium text-ledger">
              ✓ Net = 0.00
            </span>
          </div>
          <div className="my-2 space-y-1.5 text-[11px]">
            <div className="grid grid-cols-[1fr_3.5rem_3.5rem] items-center border-b border-rule/60 pb-1 text-[10px] text-ink-soft ledger-figures">
              <span>Account Line</span>
              <span className="text-right">Debit</span>
              <span className="text-right">Credit</span>
            </div>
            <div className="grid grid-cols-[1fr_3.5rem_3.5rem] items-center ledger-figures">
              <span className="truncate text-ink">Accrued Expense</span>
              <span className="text-right">10,000</span>
              <span className="text-right text-ink-soft">—</span>
            </div>
            <div className="grid grid-cols-[1fr_3.5rem_3.5rem] items-center ledger-figures">
              <span className="truncate text-ink">Payable Clearing</span>
              <span className="text-right text-ink-soft">—</span>
              <span className="text-right">10,000</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-rule pt-2 text-[10px] ledger-figures">
            <span className="text-ink-soft">Auto-Reverse: Day 1 Next Mo.</span>
            <span className="font-medium text-ledger">✓ Scheduled</span>
          </div>
        </div>
      )
    }

    if (isDetail && screenIndex === 2) {
      return (
        <div
          className="flex h-full w-full flex-col justify-between border border-rule bg-paper p-3.5 text-ink select-none"
          aria-label="Mock screen of General Ledger balance comparison"
        >
          <div className="flex items-center justify-between border-b border-rule pb-2">
            <span className="ledger-figures text-[10px] uppercase tracking-wider text-ink-soft">
              GL Balance Comparison
            </span>
            <span className="ledger-figures border border-rule bg-paper-deep px-1.5 py-0.5 text-[10px] text-ink">
              Unadjusted: Locked
            </span>
          </div>
          <div className="my-2 space-y-1.5 ledger-figures text-[10px]">
            <div className="flex items-center justify-between border-b border-rule/60 pb-1">
              <span className="text-ink-soft">Unadjusted Balance</span>
              <span className="text-ink">Locked Baseline</span>
            </div>
            <div className="flex items-center justify-between border-b border-rule/60 pb-1">
              <span className="text-ink-soft">+ Approved Adjustments</span>
              <span className="text-ledger">+ Posted Batch</span>
            </div>
            <div className="flex items-center justify-between pt-0.5 font-medium">
              <span className="text-ink">Projected Closing GL</span>
              <span className="text-ledger">✓ Reconciled</span>
            </div>
          </div>
          <div className="border-t border-rule pt-2 text-[10px] ledger-figures text-ink-soft">
            One-click batch post to General Ledger
          </div>
        </div>
      )
    }

    // Default / thumb / screen 0: Approval flow & validation mock UI
    return (
      <div
        className="flex h-full w-full flex-col justify-between border border-rule bg-paper p-3.5 text-ink select-none"
        aria-label="Mock screen of Month-End Closing workflow"
      >
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <span className="ledger-figures text-[10px] uppercase tracking-wider text-ink-soft">
            Month-End Close
          </span>
          <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-1.5 py-0.5 text-[10px] font-medium text-ledger">
            ✓ Debit = Credit
          </span>
        </div>

        <div className="my-2.5 space-y-1.5">
          <div className="flex items-center justify-between border border-rule bg-paper-deep/60 px-2 py-1 text-[11px]">
            <span className="ledger-figures text-[10px] text-ink-soft">1. BU Supervisor</span>
            <span className="ledger-figures text-[10px] font-medium text-ledger">✓ Submitted</span>
          </div>
          <div className="flex items-center justify-between border border-rule bg-paper-deep/60 px-2 py-1 text-[11px]">
            <span className="ledger-figures text-[10px] text-ink-soft">2. BU Manager</span>
            <span className="ledger-figures text-[10px] font-medium text-ledger">✓ Reviewed</span>
          </div>
          <div className="flex items-center justify-between border border-ledger/50 bg-ledger/10 px-2 py-1 text-[11px]">
            <span className="ledger-figures text-[10px] font-medium text-ink">3. Finance Mgr</span>
            <span className="ledger-figures text-[10px] font-medium text-ledger">✓ Posted to GL</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-rule pt-1.5 text-[10px] ledger-figures text-ink-soft">
          <span>Auto-Reverse: Next Mo.</span>
          <span className="text-ink">0 Duplicates</span>
        </div>
      </div>
    )
  }

  if (slug === 'wilcon-collection-deposit-report') {
    if (isDetail && screenIndex === 1) {
      return (
        <div
          className="flex h-full w-full flex-col justify-between border border-rule bg-paper p-3.5 text-ink select-none"
          aria-label="Mock screen of nationwide branch filter and column"
        >
          <div className="flex items-center justify-between border-b border-rule pb-2">
            <span className="ledger-figures text-[10px] uppercase tracking-wider text-ink-soft">
              Branch Filter
            </span>
            <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-1.5 py-0.5 text-[10px] font-medium text-ledger">
              All Branches (Default)
            </span>
          </div>
          <div className="my-2 space-y-1 ledger-figures text-[10px]">
            <div className="grid grid-cols-3 border-b border-rule/60 pb-1 text-ink-soft">
              <span>Branch</span>
              <span>Type</span>
              <span className="text-right">Status</span>
            </div>
            <div className="grid grid-cols-3 py-0.5">
              <span>Branch A</span>
              <span>Check</span>
              <span className="text-right text-ledger">✓ Aligned</span>
            </div>
            <div className="grid grid-cols-3 py-0.5">
              <span>Branch B</span>
              <span>Cash</span>
              <span className="text-right text-ledger">✓ Aligned</span>
            </div>
          </div>
          <div className="border-t border-rule pt-2 text-[10px] ledger-figures text-ink-soft">
            Separated Cash vs. Check reconciliation views
          </div>
        </div>
      )
    }

    if (isDetail && screenIndex === 2) {
      return (
        <div
          className="flex h-full w-full flex-col justify-between border border-rule bg-paper p-3.5 text-ink select-none"
          aria-label="Mock screen of check drill-down export modal"
        >
          <div className="flex items-center justify-between border-b border-rule pb-2">
            <span className="ledger-figures text-[10px] uppercase tracking-wider text-ink-soft">
              Check Breakdown Modal
            </span>
            <span className="ledger-figures border border-rule bg-paper-deep px-1.5 py-0.5 text-[10px] text-ink">
              PDF · XLSX
            </span>
          </div>
          <div className="my-2 space-y-1 ledger-figures text-[10px]">
            <div className="flex justify-between border-b border-rule/60 pb-1">
              <span className="text-ink-soft">Bank / Check #</span>
              <span className="text-ink"> Sample Bank · #0041</span>
            </div>
            <div className="flex justify-between border-b border-rule/60 pb-1">
              <span className="text-ink-soft">Accounting Date</span>
              <span className="text-ledger">✓ Period Matched</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-ink-soft">Remittance</span>
              <span className="font-medium text-ink">Verified</span>
            </div>
          </div>
          <div className="border-t border-rule pt-2 text-[10px] ledger-figures text-ledger">
            ✓ One-click offline audit export
          </div>
        </div>
      )
    }

    return (
      <div
        className="flex h-full w-full flex-col justify-between border border-rule bg-paper p-3.5 text-ink select-none"
        aria-label="Mock screen of Treasury Collection and Deposit Report"
      >
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <span className="ledger-figures text-[10px] uppercase tracking-wider text-ink-soft">
            Treasury Report
          </span>
          <span className="ledger-figures border border-rule bg-paper-deep px-1.5 py-0.5 text-[10px] text-ink">
            All Branches
          </span>
        </div>

        <div className="my-2 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] ledger-figures text-ink-soft">
            <span>Filter: [Cash] [✓ Check]</span>
            <span>[PDF] [XLSX]</span>
          </div>
          <div className="border border-ledger/50 bg-ledger/10 p-2">
            <div className="flex items-center justify-between text-[10px] ledger-figures">
              <span className="font-medium text-ink">Click Check Total ↗</span>
              <span className="font-medium text-ledger">Drill-Down</span>
            </div>
            <p className="mt-1 text-[10px] leading-tight text-ink-soft">
              Opens bank, check #, date &amp; breakdown
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-rule pt-1.5 text-[10px] ledger-figures text-ink-soft">
          <span>Dates Aligned</span>
          <span className="text-ledger">✓ Verified</span>
        </div>
      </div>
    )
  }

  if (slug === 'woh-attendance-system') {
    return (
      <div
        className="flex h-full w-full flex-col justify-between border border-rule bg-paper p-3.5 text-ink select-none"
        aria-label="Mock screen of QR Attendance Kiosk and Care List"
      >
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <span className="ledger-figures text-[10px] uppercase tracking-wider text-ink-soft">
            QR Check-In Kiosk
          </span>
          <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-1.5 py-0.5 text-[10px] font-medium text-ledger">
            Live · Sundays
          </span>
        </div>

        <div className="my-2 grid grid-cols-[3.25rem_1fr] items-center gap-2.5">
          <div className="flex aspect-square flex-col items-center justify-center border border-dashed border-ink/50 bg-paper-deep text-[9px] ledger-figures text-ink">
            <span>[ QR ]</span>
            <span className="text-ledger">✓ Scan</span>
          </div>
          <div className="space-y-1 text-[10px] ledger-figures">
            <div className="border border-rule bg-paper-deep/60 px-2 py-1 text-ink">
              ✓ Member Checked In
            </div>
            <div className="border border-rule bg-paper-deep/60 px-2 py-1 text-ink-soft">
              Missed 2+ wks → Care List
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-rule pt-1.5 text-[10px] ledger-figures text-ink-soft">
          <span>Website API Sync</span>
          <span className="text-ink">0 Duplicates</span>
        </div>
      </div>
    )
  }

  if (slug === 'wilcon-enterprise-systems') {
    return (
      <div
        className="flex h-full w-full flex-col justify-between border border-rule bg-paper p-3.5 text-ink select-none"
        aria-label="Mock screen of ERP Data Sync and Voucher Processing"
      >
        <div className="flex items-center justify-between border-b border-rule pb-2">
          <span className="ledger-figures text-[10px] uppercase tracking-wider text-ink-soft">
            Internal Finance Apps
          </span>
          <span className="ledger-figures border border-rule bg-paper-deep px-1.5 py-0.5 text-[10px] text-ink">
            6 Months
          </span>
        </div>

        <div className="my-2 space-y-1.5 ledger-figures text-[10px]">
          <div className="flex items-center justify-between border border-rule bg-paper-deep/60 px-2 py-1">
            <span className="text-ink-soft">ERP Data Source</span>
            <span className="text-ink">→ API Sync</span>
          </div>
          <div className="flex items-center justify-between border border-ledger/50 bg-ledger/10 px-2 py-1">
            <span className="font-medium text-ink">Voucher Logic</span>
            <span className="font-medium text-ledger">✓ Validated</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-rule pt-1.5 text-[10px] ledger-figures text-ink-soft">
          <span>Laravel · Vue · SQL</span>
          <span className="text-ink">With SA &amp; QA</span>
        </div>
      </div>
    )
  }

  // wordpress-ph-community
  return (
    <div
      className="flex h-full w-full flex-col justify-between border border-rule bg-paper p-3.5 text-ink select-none"
      aria-label="Summary card of WordPress Philippines volunteering"
    >
      <div className="flex items-center justify-between border-b border-rule pb-2">
        <span className="ledger-figures text-[10px] uppercase tracking-wider text-ink-soft">
          Open-Source Community
        </span>
        <span className="ledger-figures border border-ledger/40 bg-ledger/10 px-1.5 py-0.5 text-[10px] font-medium text-ledger">
          Volunteer
        </span>
      </div>

      <div className="my-2 space-y-1.5 ledger-figures text-[10px]">
        <div className="border border-rule bg-paper-deep/60 px-2 py-1 text-ink">
          ✓ Software Freedom Day 2026
        </div>
        <div className="border border-rule bg-paper-deep/60 px-2 py-1 text-ink">
          ✓ WP Manila Meetup (Jul 2026)
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-rule pt-1.5 text-[10px] ledger-figures text-ink-soft">
        <span>2025 Attendee</span>
        <span className="text-ledger">→ 2026 Team</span>
      </div>
    </div>
  )
}
