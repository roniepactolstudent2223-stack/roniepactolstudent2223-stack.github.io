import Link from 'next/link'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

export default function Masthead() {
  const { role, stackLine, outcome } = PORTFOLIO_IDENTITY.orientation
  const stackItems = stackLine.split('·').map((s) => s.trim())

  return (
    <header className="px-6 pb-8 pt-8 sm:pb-10 sm:pt-11">
      <div className="max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 bg-paper-deep/75 px-3 py-1 text-xs font-medium text-ink">
            <img
              src="/logos/wilcon.png"
              alt="Wilcon Depot"
              className="h-3.5 w-3.5 object-contain"
            />
            <span>Wilcon Depot, Inc. · Finance &amp; Treasury Systems</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-paper-deep/75 px-3 py-1 text-xs font-medium text-ink">
            <span>Word of Hope Caloocan · Live QR Kiosk</span>
          </span>
        </div>

        <h1 className="mt-4 font-serif text-[2.45rem] font-medium leading-[1.06] tracking-tight text-ink sm:text-5xl md:text-[3.35rem]">
          {role}
        </h1>

        <ul aria-label="Core stack" className="mt-4 flex flex-wrap items-center gap-1.5">
          {stackItems.map((item) => (
            <li
              key={item}
              className="ledger-figures bg-ink px-3 py-1 text-xs font-medium text-paper"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-[16px]">
          {outcome}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="#projects"
            className="ledger-figures inline-flex items-center gap-2 bg-ledger px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink"
          >
            Explore Systems ↓
          </Link>
          <a
            href={PORTFOLIO_IDENTITY.resumeDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ledger-figures inline-flex items-center gap-1.5 bg-paper-deep/85 px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
          >
            Resume (Google Doc) ↗
          </a>
        </div>
      </div>
    </header>
  )
}
