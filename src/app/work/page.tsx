import type { Metadata } from 'next'
import WorkPage from '@/components/work/WorkPage'
import MobileNavigation from '@/components/navigation/MobileNavigation'

export const metadata: Metadata = {
  title: 'Work & Community Experience — Ronie Pactol',
  description: 'Work history, engineering roles, and community volunteering as a Junior System Developer.',
}

export default function Work() {
  return (
    <div>
      <MobileNavigation />
      <WorkPage />
    </div>
  )
}
