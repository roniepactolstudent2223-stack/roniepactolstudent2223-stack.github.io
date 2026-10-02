'use client'

import Masthead from '@/components/home/Masthead'
import FeaturedProject from '@/components/home/FeaturedProject'
import ProjectGrid from '@/components/projects/ProjectGrid'
import Footer from '@/components/layout/Footer'
import MobileNavigation from '@/components/navigation/MobileNavigation'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { PORTFOLIO_IDENTITY } from '@/lib/portfolio-config'

const PLACEHOLDER_IMAGES: Record<string, string> = {
  'woh-attendance-system': '/woh-pilot.webp',
  'wordpress-ph-community': '/wp-community-1.webp',
  'wilcon-enterprise-systems': '/wilcon-enterprise.svg',
}

export default function Home() {
  const { projects } = usePortfolio()

  const featured = projects.find((p) => p.slug === PORTFOLIO_IDENTITY.featuredProject.slug)

  return (
    <div>
      <MobileNavigation />

      {/* Hero — spacious, large type, editorial energy */}
      <Masthead />

      {/* Featured — dense, full-width, cinematic */}
      {featured && (
        <section id="production-systems" className="bg-neutral-50 px-6 py-8">
          <div className="max-w-5xl">
            <FeaturedProject
              project={featured}
              imageUrl={PLACEHOLDER_IMAGES[featured.slug] || `https://picsum.photos/seed/${featured.slug}/800/600`}
            />
          </div>
        </section>
      )}

      {/* Enterprise & Community Systems */}
      <section id="work-systems" className="px-6 py-12">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200 pb-3">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Enterprise & Community Work
            </p>
            <p className="text-[10px] font-mono text-neutral-400">
              {projects.length} systems
            </p>
          </div>
          <ProjectGrid projects={projects.filter(p => p.slug !== featured?.slug)} />
        </div>
      </section>

      {/* Footer — spacious, editorial close */}
      <Footer />
    </div>
  )
}
