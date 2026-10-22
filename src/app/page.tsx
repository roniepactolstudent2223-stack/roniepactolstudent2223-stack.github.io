'use client'

import Masthead from '@/components/home/Masthead'
import EntryLedger from '@/components/home/EntryLedger'
import AuditLog from '@/components/home/AuditLog'
import SkillsIndex from '@/components/home/SkillsIndex'
import Footer from '@/components/layout/Footer'
import MobileFacts from '@/components/layout/MobileFacts'
import MobileNavigation from '@/components/navigation/MobileNavigation'
import { usePortfolio } from '@/contexts/PortfolioContext'

export default function Home() {
  const { projects } = usePortfolio()

  return (
    <div>
      <MobileNavigation />
      <Masthead />
      <EntryLedger projects={projects} />
      <AuditLog />
      <SkillsIndex />
      <MobileFacts />
      <Footer />
    </div>
  )
}
