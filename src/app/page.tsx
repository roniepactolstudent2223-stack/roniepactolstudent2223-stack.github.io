'use client'

import Masthead from '@/components/home/Masthead'
import ApprovalTrail from '@/components/home/ApprovalTrail'
import EntryLedger from '@/components/home/EntryLedger'
import AuditLog from '@/components/home/AuditLog'
import SkillsIndex from '@/components/home/SkillsIndex'
import Footer from '@/components/layout/Footer'
import MobileFacts from '@/components/layout/MobileFacts'
import MobileNavigation from '@/components/navigation/MobileNavigation'
import { usePortfolio } from '@/contexts/PortfolioContext'

/**
 * Home reads top to bottom in the order a screener asks questions:
 * who/what → proof it works → what else I built → where I have worked → skills → contact.
 */
export default function Home() {
  const { projects } = usePortfolio()

  return (
    <div>
      <MobileNavigation />
      <Masthead />
      <ApprovalTrail />
      <EntryLedger projects={projects} />
      <AuditLog />
      <SkillsIndex />
      <MobileFacts />
      <Footer />
    </div>
  )
}
