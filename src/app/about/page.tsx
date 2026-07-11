import type { Metadata } from 'next'
import AboutPage from '@/components/about/AboutPage'
import MobileNavigation from '@/components/navigation/MobileNavigation'

export const metadata: Metadata = {
  title: 'About — Ronie Pactol',
  description: 'Background, principles, and what Ronie Pactol is looking for as a developer.',
}

export default function About() {
  return (
    <div>
      <MobileNavigation />
      <AboutPage />
    </div>
  )
}
