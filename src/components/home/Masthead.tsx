import Link from 'next/link'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

/**
 * Clean, structured Hero without redundant boxed cards or excess borders.
 * LeftSidebar already displays the portrait and Right DetailPanel displays
 * the candidate stat tiles & systems jump list.
 */
export default function Masthead() {
  const { role, stackLine, outcome, notice } = PORTFOLIO_IDENTITY.orientation
  const stackItems = stackLine.split('·').map((s) => s.trim())

  return (
    <header className="px-6 pb-12 pt-8 sm:pb-16 sm:pt-12">
      <div className="max-w-4xl">
        {/* Top Masthead Strip */}
        <div className="ledger-figures flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 border-b border-rule/60 pb-3 text-xs uppercase tracking-[0.08em] text-ink-soft">
          <span>{PORTFOLIO_IDENTITY.name} · Quezon City, PH</span>
          <span className="inline-flex items-center gap-1.5 bg-ledger/12 px-2.5 py-0.5 font-medium text-ledger">
            <span className="h-1.5 w-1.5 rounded-full bg-ledger" aria-hidden="true" />
            {notice}
          </span>
        </div>

        <div className="mt-8">
          <p className="ledger-figures text-xs uppercase tracking-[0.1em] text-ledger font-medium">
            Full-Stack Web Systems · Production Experience
          </p>

          <h1 className="mt-2 font-serif text-[2.4rem] font-medium leading-[1.06] tracking-tight text-ink sm:text-5xl md:text-[3.5rem]">
            {role}
          </h1>

          {/* Borderless Soft Stack Pills */}
          <ul aria-label="Core stack" className="mt-4 flex flex-wrap items-center gap-2">
            {stackItems.map((item) => (
              <li
                key={item}
                className="ledger-figures bg-paper-deep/85 px-3 py-1 text-xs font-medium text-ink"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Highlighted Outcome Surface */}
          <div className="mt-6 border-l-2 border-ledger bg-paper-deep/55 py-3.5 pl-4 pr-4">
            <p className="ledger-figures text-[10px] uppercase tracking-[0.1em] text-ledger font-medium">
              Recent Enterprise Impact · Wilcon Depot
            </p>
            <p className="mt-1 text-base leading-relaxed text-ink sm:text-[17px]">
              {outcome}
            </p>
          </div>

          {/* Clean Action Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="#projects"
              className="ledger-figures inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-xs font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-ledger"
            >
              Explore Projects &amp; Screens ↓
            </Link>
            <Link
              href="#approval-trail"
              className="ledger-figures inline-flex items-center gap-2 bg-paper-deep/80 px-4 py-2.5 text-xs uppercase tracking-[0.06em] text-ink transition-colors hover:bg-paper-deep"
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
      </div>
    </header>
  )
}
