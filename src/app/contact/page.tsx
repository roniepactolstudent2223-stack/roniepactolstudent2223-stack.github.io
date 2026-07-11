import type { Metadata } from 'next'
import ContactPage from '@/components/contact/ContactPage'
import MobileNavigation from '@/components/navigation/MobileNavigation'

export const metadata: Metadata = {
  title: 'Contact — Ronie Pactol',
  description: 'Get in touch with Ronie Pactol for development opportunities.',
}

export default function Contact() {
  return (
    <div>
      <MobileNavigation />
      <ContactPage />
    </div>
  )
}
