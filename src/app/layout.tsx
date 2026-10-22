import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono, Newsreader } from 'next/font/google'
import './globals.css'
import PortfolioLayout from '@/components/layout/PortfolioLayout'
import { getProjects } from '@/lib/getProjects'
import { PORTFOLIO_IDENTITY, SKILL_GROUPS } from '@/lib/portfolio-config'

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://roniepactol.me'),
  title: 'Ronie Pactol — Junior Full Stack Developer (Laravel, Vue.js)',
  description:
    'Junior Full Stack Developer in Quezon City, Philippines. Laravel, Vue.js, PHP and MySQL. Built the Month-End Closing system for Wilcon Depot Finance and the live WOH Attendance System. Available immediately.',
}

/**
 * Structured data for search and applicant-tracking crawlers. Every value is
 * read from the same config that renders the visible page, so the two cannot drift.
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PORTFOLIO_IDENTITY.name,
  jobTitle: 'Junior Full Stack Developer',
  url: 'https://roniepactol.me/',
  email: PORTFOLIO_IDENTITY.email,
  telephone: PORTFOLIO_IDENTITY.phoneRaw,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Quezon City',
    addressCountry: 'PH',
  },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Access Computer College' },
  knowsAbout: SKILL_GROUPS.flatMap((group) => group.items),
  sameAs: PORTFOLIO_IDENTITY.externalLinks
    .filter((link) => link.label === 'LinkedIn' || link.label === 'GitHub')
    .map((link) => link.href),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const projects = getProjects()

  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex h-screen overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <PortfolioLayout projects={projects}>
          {children}
        </PortfolioLayout>
      </body>
    </html>
  )
}
