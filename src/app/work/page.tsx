import type { Metadata } from 'next'
import WorkPage from '@/components/work/WorkPage'
import MobileNavigation from '@/components/navigation/MobileNavigation'

export const metadata: Metadata = {
  title: 'Work Experience — Ronie Pactol',
  description: 'Work history, roles, and impact across design engineering positions.',
}

export default function Work() {
  return (
    <div>
      <MobileNavigation />
      <WorkPage />
    </div>
  )
}
