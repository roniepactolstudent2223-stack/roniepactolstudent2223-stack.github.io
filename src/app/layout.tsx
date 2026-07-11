import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'
import PortfolioLayout from '@/components/layout/PortfolioLayout'
import { getProjects } from '@/lib/getProjects'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Ronie Pactol — Junior System Developer',
  description: 'Portfolio of Ronie Pactol, a junior system developer building enterprise web applications.',
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex h-screen overflow-hidden">
        <PortfolioLayout projects={projects}>
          {children}
        </PortfolioLayout>
      </body>
    </html>
  )
}
