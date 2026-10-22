import Link from 'next/link'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

/**
 * Hero with planned editorial layout:
 * - Left: Role H1, stack badges, highlighted outcome callout, and quick action links
 * - Right: Candidate At-a-Glance Ledger Card (no duplicate portrait photo since
 *   the portrait already lives permanently in the LeftSidebar)
 */
export default function Masthead() {
  const { role, stackLine, outcome, notice } = PORTFOLIO_IDENTITY.orientation
  const stackItems = stackLine.split('·').map((s) => s.trim())

  return (
    <header className="px-6 pb-12 pt-8 sm:pb-16 sm:pt-12">
      <div className="max-w-4xl">
        {/* Top Ledger Masthead Strip */}
        <div className="ledger-figures flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 text-xs uppercase tracking-[0.08em] text-ink-soft">
          <span>{PORTFOLIO_IDENTITY.name} · Quezon City, PH</span>
          <span className="inline-flex items-center gap-1.5 border border-ledger/40 bg-ledger/10 px-2.5 py-0.5 font-medium text-ledger">
            <span className="h-1.5 w-1.5 rounded-full bg-ledger" aria-hidden="true" />
            {notice}
          </span>
        </div>
        <div className="rule-double mt-3" aria-hidden="true" />

        {/* Main Hero Grid: Typography + Candidate Snapshot Ledger Card */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_17rem] lg:items-start">
          <div>
            <p className="ledger-figures text-xs uppercase tracking-[0.1em] text-ledger font-medium">
              Full-Stack Web Systems · Production Experience
            </p>

            <h1 className="mt-2 font-serif text-[2.4rem] font-medium leading-[1.06] tracking-tight text-ink sm:text-5xl md:text-[3.5rem]">
              {role}
            </h1>

            {/* Stack Tags */}
            <ul aria-label="Core stack" className="mt-4 flex flex-wrap items-center gap-2">
              {stackItems.map((item) => (
                <li
                  key={item}
                  className="ledger-figures border border-ink/25 bg-paper-deep/80 px-2.5 py-1 text-xs font-medium text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* Highlighted Outcome Block */}
            <div className="mt-6 border-l-2 border-ledger bg-paper-deep/65 py-3 pl-4 pr-3.5">
              <p className="ledger-figures text-[10px] uppercase tracking-[0.1em] text-ledger font-medium">
                Recent Enterprise Impact · Wilcon Depot
              </p>
              <p className="mt-1 text-base leading-relaxed text-ink sm:text-[17px]">
                {outcome}
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="ledger-figures inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 text-xs font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ink/85"
              >
                Explore Projects &amp; Screens ↓
              </Link>
              <Link
                href="#approval-trail"
                className="ledger-figures inline-flex items-center gap-2 border border-rule bg-paper px-4 py-2.5 text-xs uppercase tracking-[0.06em] text-ink transition-colors hover:border-ink"
              >
                How Month-End Closing Works ↓
              </Link>
              <a
                href={PORTFOLIO_IDENTITY.resumeDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ledger-figures inline-flex items-center gap-1.5 px-2 py-2 text-xs text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                Live Resume ↗
              </a>
            </div>
          </div>

          {/* Right: Candidate Snapshot Ledger Card (No duplicate portrait photo) */}
          <div className="border border-rule bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-rule pb-2.5">
              <span className="ledger-figures text-[10px] font-medium uppercase tracking-[0.12em] text-ledger">
                Candidate Ledger
              </span>
              <span className="ledger-figures text-[10px] text-ink-soft">
                QC · PH
              </span>
            </div>

            <dl className="mt-3 divide-y divide-rule/70 text-xs">
              <div className="py-2">
                <dt className="ledger-figures text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  Enterprise Experience
                </dt>
                <dd className="mt-0.5 font-medium text-ink">
                  6 Months · Wilcon Depot, Inc.
                </dd>
              </div>
              <div className="py-2">
                <dt className="ledger-figures text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  Shipped Systems
                </dt>
                <dd className="mt-0.5 font-medium text-ink">
                  4 Production Web Systems
                </dd>
              </div>
              <div className="py-2">
                <dt className="ledger-figures text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  Education
                </dt>
                <dd className="mt-0.5 font-medium text-ink">
                  BS Information Technology (2025)
                </dd>
              </div>
              <div className="py-2">
                <dt className="ledger-figures text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  Start Readiness
                </dt>
                <dd className="mt-0.5 font-medium text-ledger">
                  Immediate · SSS, PhilHealth &amp; Pag-IBIG
                </dd>
              </div>
            </dl>

            {/* Organization Logos Strip */}
            <div className="mt-3 flex items-center justify-between border-t border-rule pt-3">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logos/wilcon.png"
                  alt="Wilcon Depot"
                  className="h-4 w-auto object-contain"
                />
                <img
                  src="/logos/wordpress.png"
                  alt="WordPress PH"
                  className="h-4 w-auto object-contain"
                />
                <img
                  src="/logos/jollibee.png"
                  alt="Jollibee"
                  className="h-4 w-auto object-contain"
                />
              </div>
              <span className="ledger-figures text-[10px] text-ink-soft">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
