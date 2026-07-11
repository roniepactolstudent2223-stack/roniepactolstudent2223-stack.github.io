import type { Metadata } from 'next'
import CertificatesPage from '@/components/certificates/CertificatesPage'
import MobileNavigation from '@/components/navigation/MobileNavigation'

export const metadata: Metadata = {
  title: 'Certificates — Ronie Pactol',
  description: 'Professional certifications and credentials earned by Ronie Pactol.',
}

export default function Certificates() {
  return (
    <div>
      <MobileNavigation />
      <CertificatesPage />
    </div>
  )
}
