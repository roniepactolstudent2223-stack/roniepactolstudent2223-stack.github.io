import type { Project } from '@/lib/types'

export const PORTFOLIO_IDENTITY = {
  name: 'Ronie Pactol',
  role: 'Full Stack Junior System Developer',
  seniority: 'Junior Developer · 2025 Graduate',
  location: 'Balingasa, Quezon City',
  email: 'roniepactol@gmail.com',
  availability: 'Open to Junior / Mid-level roles',
  targetIntent: 'Full-time',
  isAvailable: true,
  resumeUrl: '/resume.pdf',
  externalLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ronie-pactol-6888092a6/' },
    { label: 'GitHub', href: 'https://github.com/NiessenWaffer' },
  ],
  // Homepage orientation
  orientation: {
    headline: 'Building production web applications and serving real communities.',
    subtext: 'Full Stack Junior System Developer at Wilcon Depot (6 mos). Word of Hope church attendance system creator and active WordPress Philippines volunteer.',
  },
  featuredProject: {
    slug: 'woh-attendance-system',
    label: 'WOH Attendance System',
  },
  // About page
  about: {
    statement: {
      headline: 'I studied programming when it was hard — and I kept going.',
      body: 'My journey in Information Technology did not begin with talent. It began with a decision to keep going. I studied Information Technology at Access Computer College from 2021 to 2025. Programming was one of the hardest things I had ever learned. Even after graduating, I still felt like I wasn\'t good enough. There were many concepts I struggled to understand, and I often questioned whether I had chosen the right path.\n\nI grew up alone, providing for myself. There was no safety net — no family to fall back on when things got hard. Financial struggles were constant. Finding a job was another challenge. I failed many interviews. I even applied to BPO companies, but I wasn\'t hired because my English communication skills were not strong enough. Every rejection was discouraging, but it also showed me what I needed to improve.\n\nInstead of giving up, I made a different decision. I stopped focusing only on getting hired and started focusing on becoming better. I quit playing online games — something I had relied on to escape — and replaced that time with studying. I committed myself to learning every day. I built projects, practiced programming, read documentation, watched tutorials, and learned from my mistakes. Progress was slow, but I kept moving forward.\n\nPullQuote::I grew up alone, providing for myself. There was no safety net. Every decision to keep going was a decision I made for myself.\n\nToday, I still consider myself a student. There is always something new to learn, and I know my journey is far from over. Every project I build represents another step forward. Every challenge teaches me something valuable.\n\nMy story isn\'t about being naturally gifted. It\'s about persistence. If there\'s one thing I\'ve learned, it\'s that consistent effort can take you further than talent alone.',
    },
    focusAreas: [
      {
        title: 'Church Attendance System',
        description: 'Built a full-stack QR check-in & pastoral care system using Laravel and Vue.js for Word of Hope Caloocan. In active production since March 2025.',
        project: 'woh-attendance-system',
      },
      {
        title: 'WordPress Philippines Volunteer',
        description: 'Active community volunteer and official event photographer for WordPress Philippines meetups, connecting with local web developers and open-source advocates.',
        project: 'wordpress-ph-community',
      },
      {
        title: 'Enterprise Web Applications',
        description: 'Developing and maintaining internal enterprise web tools at Wilcon Depot using Laravel, Vue.js, MySQL, and ERP integrations with Infor M3 APIs.',
        project: 'wilcon-enterprise-systems',
      },
    ],
    principles: [
      {
        title: 'Consistency over perfection',
        body: 'I didn\'t learn programming because I was talented. I learned because I showed up every day and kept trying.',
      },
      {
        title: 'Learn by building',
        body: 'Reading tutorials is not enough. I build projects to understand how things actually work in production.',
      },
      {
        title: 'Embrace the struggle',
        body: 'Failed interviews and rejected applications taught me more than any course. Every failure is feedback.',
      },
    ],
    lookingFor: {
      headline: 'What I\'m looking for',
      body: 'Junior to mid-level roles where I can grow as a developer. I want to work with teams that value learning, give honest feedback, and build software that matters.',
    },
  },
  // Work experience
  workExperience: [
    {
      company: 'Wilcon Depot, Inc.',
      companyDescription: 'Leading home improvement and construction supply retailer in the Philippines',
      role: 'Full Stack Junior System Developer',
      period: 'May 2026 – Oct 2026 (6 months)',
      duration: '6 mos',
      location: 'Quezon City, Philippines · On-site',
      logoUrl: undefined,
      teamSize: 'Internal software development team',
      metric: undefined as { value: string; label: string } | undefined,
      highlight: '6 months as a Full Stack Junior System Developer building and maintaining internal enterprise applications using Laravel, Vue.js, and Infor M3 ERP APIs',
      evidence: [
        { label: 'Full-Stack', detail: 'Build and maintain internal enterprise web applications using Laravel and Vue.js, covering both frontend and backend' },
        { label: 'ERP Integration', detail: 'Work on ERP integrations including Infor M3 API and financial voucher processing workflows' },
        { label: 'Collaboration', detail: 'Collaborate with senior developers on production systems, module maintenance, and new feature implementation' },
      ],
      insight: '6 months of enterprise systems taught me that reliability matters more than novelty — production code must serve real business needs every day.',
      technologies: ['Laravel', 'Vue.js', 'PHP', 'JavaScript', 'MySQL', 'Infor M3', 'Git'],
      project: 'wilcon-enterprise-systems',
      photos: ['/wilcon-workstation.jpg', '/wilcon-building.png'] as readonly string[] | undefined,
      progression: undefined,
    },
    {
      company: 'WordPress Philippines',
      companyDescription: 'The official WordPress community for developers, designers, and site builders in the Philippines',
      role: 'Volunteer & Event Photographer',
      period: 'Jan 2026 – Present (Attendee in 2025)',
      location: 'Metro Manila · Community',
      logoUrl: undefined,
      teamSize: 'Community volunteer team',
      metric: undefined as { value: string; label: string } | undefined,
      highlight: 'Stepped up from an attendee in 2025 to an active volunteer photographer in 2026, documenting tech meetups and community gatherings',
      evidence: [
        { label: 'Community', detail: 'Document tech meetups, workshops, and community discussions across WordPress Philippines gatherings' },
        { label: 'Engagement', detail: 'Network with local software engineers, explore open-source web ecosystems, and support event operations' },
      ],
      insight: 'Being part of a developer community taught me that growth doesn\'t happen in isolation — you grow by contributing and connecting.',
      technologies: ['WordPress', 'PHP', 'Community', 'Photography'],
      project: 'wordpress-ph-community',
      progression: 'Attendee (2025) → Volunteer Photographer (2026)',
    },
    {
      company: 'Radiant Force Human Resources',
      companyDescription: 'Human resources company based in Quezon City',
      role: 'HR Assistant',
      period: 'Sep 2025 – Jan 2026',
      location: 'Quezon City · On-site',
      logoUrl: undefined,
      teamSize: 'HR operations team',
      metric: undefined as { value: string; label: string } | undefined,
      highlight: 'Started as an OJT and was absorbed as an HR Assistant, supporting recruitment and daily HR operations',
      evidence: [
        { label: 'Recruitment', detail: 'Assisted in screening candidates, scheduling interviews, and coordinating onboarding for new hires' },
        { label: 'Documentation', detail: 'Maintained employee records, processed HR paperwork, and organized personnel files' },
        { label: 'Operations', detail: 'Supported daily HR workflows including payroll preparation, leave tracking, and employee inquiries' },
      ],
      insight: 'People operations require the same attention to detail as code — accuracy and follow-through matter.',
      technologies: [],
      project: undefined,
      progression: 'OJT → absorbed as HR Assistant',
    },
    {
      company: 'Jollibee Foods Corporation',
      companyDescription: 'One of the largest fast-food chains in the Philippines',
      role: 'Service Crew',
      period: 'Jan 2024 – Jun 2024',
      location: 'Tondo, Manila · On-site',
      logoUrl: undefined,
      teamSize: 'Store crew',
      metric: undefined as { value: string; label: string } | undefined,
      highlight: 'Worked part-time as a working student, balancing college studies with fast-food service operations',
      evidence: [
        { label: 'Discipline', detail: 'Maintained consistent performance while balancing part-time work with full-time college coursework' },
        { label: 'Teamwork', detail: 'Collaborated with crew members during peak hours to meet service speed and quality standards' },
        { label: 'Customer Service', detail: 'Handled customer orders, inquiries, and complaints with patience and professionalism' },
      ],
      insight: 'Working while studying taught me that time management is not about having enough time — it is about how you use it.',
      technologies: [],
      project: undefined,
      progression: undefined,
    },
  ],
  // Certificates
  certificates: [
    {
      title: 'English for IT 1',
      skill: 'English Communication',
      issuer: 'DICT-ITU DTC Initiative (Cisco Networking Academy)',
      date: '2026',
      category: 'development',
      imageUrl: '/certificates/English_for_IT_1_certificate_roniepactol-gmail-com_24bd1712-3282-451d-a09c-3a64a30a3528.pdf',
      badgeUrl: '/certificates/EnglishforIT1_Badge.pdf',
      applied: 'Completed English for IT 1 covering technical English communication for documentation and collaboration',
      verifyUrl: undefined,
    },
    {
      title: 'JavaScript Essentials 1',
      skill: 'JavaScript',
      issuer: 'Cisco Networking Academy',
      date: '2026',
      category: 'development',
      imageUrl: '/certificates/JavaScript_Essentials_1_certificate_roniepactol-gmail-com_aca53f12-778b-4e9c-9135-b17a3d813c5a.pdf',
      badgeUrl: '/certificates/JavaScriptEssentials1_Badge.pdf',
      applied: 'Completed JavaScript Essentials 1 covering foundational JavaScript knowledge for web development',
      verifyUrl: undefined,
    },
    {
      title: 'Python Essentials 1',
      skill: 'Python',
      issuer: 'Cisco Networking Academy',
      date: '2026',
      category: 'development',
      imageUrl: '/certificates/Python_Essentials_1_certificate_roniepactol-gmail-com_d7e6f02a-9546-4d78-a850-7a0005caec20.pdf',
      badgeUrl: '/certificates/PythonEssentials1_Badge.pdf',
      applied: 'Completed Python Essentials 1 covering Python fundamentals for scripting and automation',
      verifyUrl: undefined,
    },
    {
      title: 'Learn Vue',
      skill: 'Vue.js',
      issuer: 'Scrimba',
      date: '2026',
      category: 'development',
      imageUrl: '/certificates/Learn Vue.pdf',
      badgeUrl: undefined,
      applied: 'Completed the Scrimba course covering Vue.js fundamentals for building interactive web applications',
      verifyUrl: undefined,
    },
    {
      title: 'NC2 — Computer Systems Servicing',
      skill: 'Networking',
      issuer: 'TESDA',
      date: '2025',
      category: 'development',
      imageUrl: '/certificates/NC2.pdf',
      badgeUrl: undefined,
      applied: 'Completed competency requirements under the Philippine TVET Competency Assessment and Certification System in Computer Systems Servicing',
      verifyUrl: undefined,
    },
    {
      title: 'OJT Certificate of Completion',
      skill: 'Work Experience',
      issuer: 'Radiant Force Human Resources',
      date: '2025',
      category: 'development',
      imageUrl: '/certificates/OJT coc .png',
      applied: 'Completed on-the-job training as HR Assistant',
      verifyUrl: undefined,
    },
  ] as const,
  // Sidebar feature data
  stats: [
    { value: 'Mar 2025', label: 'In production' },
    { value: 'Laravel', label: '+ Vue.js' },
    { value: 'QR Scan', label: 'Check-in' },
  ],
  skills: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Next.js', 'Tailwind'],
  currently: 'Continuing to develop the WOH Attendance System for Word of Hope Caloocan',
} as const

export const SECTIONS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'work', label: 'Work', href: '/work' },
  { id: 'certificates', label: 'Certificates', href: '/certificates' },
  { id: 'contact', label: 'Contact', href: '/contact' },
] as const

export type WorkDomainId = 'production' | 'community' | 'full-stack'

export interface WorkDomain {
  id: WorkDomainId
  label: string
  count: number
  filter: (project: Project) => boolean
}

export function getWorkDomains(projects: Project[]): WorkDomain[] {
  return [
    {
      id: 'production',
      label: 'Production Systems',
      count: projects.filter((p) =>
        p.tags.some((t) => ['laravel', 'vue.js', 'mysql', 'enterprise'].includes(t))
      ).length,
      filter: (p) => p.tags.some((t) => ['laravel', 'vue.js', 'mysql', 'enterprise'].includes(t)),
    },
    {
      id: 'community',
      label: 'Community & Service',
      count: projects.filter((p) =>
        p.tags.some((t) => ['community', 'volunteering', 'open-source'].includes(t))
      ).length,
      filter: (p) => p.tags.some((t) => ['community', 'volunteering', 'open-source'].includes(t)),
    },
    {
      id: 'full-stack',
      label: 'Full-Stack Web',
      count: projects.filter((p) =>
        p.tags.some((t) => ['laravel', 'vue.js', 'full-stack'].includes(t))
      ).length,
      filter: (p) => p.tags.some((t) => ['laravel', 'vue.js', 'full-stack'].includes(t)),
    },
  ]
}

export function filterProjectsByDomain(
  projects: Project[],
  domainId: string | null
): Project[] {
  if (!domainId) return projects

  const domain = getWorkDomains(projects).find((d) => d.id === domainId)
  return domain ? projects.filter(domain.filter) : projects
}
