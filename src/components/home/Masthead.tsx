import Link from 'next/link'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

export default function Masthead() {
  const { role, stackLine, outcome } = PORTFOLIO_IDENTITY.orientation
  const stackItems = stackLine.split('·').map((s) => s.trim())

  return (
    <header className="px-6 pb-10 pt-8 sm:pb-12 sm:pt-12">
      <div className="max-w-4xl">
        <h1 className="font-serif text-[2.4rem] font-medium leading-[1.06] tracking-tight text-ink sm:text-5xl md:text-[3.4rem]">
          {role}
        </h1>

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

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-[17px]">
          {outcome}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="#projects"
            className="ledger-figures inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-xs font-medium text-paper transition-colors hover:bg-ledger"
          >
            View Projects ↓
          </Link>
          <a
            href={PORTFOLIO_IDENTITY.resumeDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ledger-figures inline-flex items-center gap-1.5 bg-paper-deep/80 px-4 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-paper-deep"
          >
            Resume (Google Doc) ↗
          </a>
        </div>
      </div>
    </header>
  )
}
