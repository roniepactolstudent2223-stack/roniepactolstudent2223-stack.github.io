import Link from 'next/link'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

/**
 * Hero. Built for a 10-second read on a phone:
 *   1. who (name + city)            2. what (role as the H1)
 *   3. one provable outcome         4. the one logistics fact HR needs (notice period)
 * Plain server-rendered text, no animation, so it is readable the instant it paints.
 */
export default function Masthead() {
  const { role, stackLine, outcome, notice } = PORTFOLIO_IDENTITY.orientation

  return (
    <header className="px-6 pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="max-w-3xl">
        <p className="ledger-figures flex flex-wrap justify-between gap-x-6 gap-y-1 text-xs uppercase tracking-[0.08em] text-ink-soft">
          <span>{PORTFOLIO_IDENTITY.name} · Quezon City, PH</span>
          <span>{notice}</span>
        </p>
        <div className="rule-double mt-3" aria-hidden="true" />

        <h1 className="mt-8 font-serif text-[2.5rem] font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
          {role}
        </h1>
        <p className="ledger-figures mt-3 text-sm text-ink-soft">{stackLine}</p>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink">{outcome}</p>

        <p className="mt-6">
          <Link
            href="#approval-trail"
            className="inline-flex items-center gap-2 text-[15px] text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ledger"
          >
            See how it works
            <span aria-hidden="true">↓</span>
          </Link>
        </p>
      </div>
    </header>
  )
}
