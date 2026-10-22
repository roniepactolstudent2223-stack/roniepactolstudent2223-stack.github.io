import type { Project } from '@/lib/types'

export const PORTFOLIO_IDENTITY = {
  name: 'Ronie Pactol',
  role: 'Full Stack Junior System Developer',
  seniority: 'Junior Developer · 2025 Graduate',
  location: '361 F- Avocado St, Balingasa, Quezon City, 1115',
  email: 'roniepactol@gmail.com',
  phone: '0993 126 3221',
  phoneRaw: '+639931263221',
  phoneTel: 'tel:+639931263221',
  viberUrl: 'viber://chat?number=%2B639931263221',
  availability: 'Open to Junior Developer roles',
  targetIntent: 'Full-time',
  isAvailable: true,
  resumeUrl: 'https://docs.google.com/document/d/19qGp36MD_fFns8vMhMO0XVhzwqmjYSL1/edit?usp=sharing',
  resumeDocUrl: 'https://docs.google.com/document/d/19qGp36MD_fFns8vMhMO0XVhzwqmjYSL1/edit?usp=sharing',
  externalLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ronie-pactol-6888092a6/' },
    { label: 'GitHub', href: 'https://github.com/NiessenWaffer' },
    { label: 'Facebook', href: 'https://www.facebook.com/Niessen' },
  ],
  reference: {
    name: 'John Carlo Pattugan',
    role: 'IT Operations Administrator',
    company: 'LevelUp Outsourcing Ph Inc.',
    companyUrl: 'https://levelup.support/',
    phone: '+63 905 1779 250',
  },
  // Homepage orientation
  orientation: {
    role: 'Junior Full Stack Developer',
    stackLine: 'Laravel · Vue.js · PHP · MySQL',
    outcome:
      'I built the Month-End Closing system for the Finance team at Wilcon Depot. It replaced spreadsheets and chat threads with validated entries and a two-step approval.',
    notice: 'Notice period: 0 days',
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
      body: 'Junior Developer roles where I can continue to learn, contribute to real production software, work with seasoned mentors, and build tools that make a difference.',
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
      logoUrl: '/logos/wilcon.png',
      teamSize: 'Internal software development team',
      metric: undefined as { value: string; label: string } | undefined,
      highlight: 'Developed and maintained production finance and treasury web applications using PHP, Laravel, Vue.js, and MySQL. Built the Month-End Closing platform and upgraded the daily Collection and Deposit Report.',
      evidence: [
        { label: 'Month-End Closing', detail: 'Built the central Month-End Closing web application replacing manual spreadsheets and chat threads: automated Debit = Credit validation, two-step BU & Finance manager approvals, automatic next-month reversing entries, live GL balance comparison, and audit logs.' },
        { label: 'Treasury Reports', detail: 'Upgraded the daily Collection and Deposit Report for the Treasury Department: clickable check breakdowns, separated cash and check filters, automatic accounting date alignment, nationwide Branch column, and one-click PDF/Excel export.' },
        { label: 'Backend & ERP Sync', detail: 'Developed and maintained backend features using PHP, Laravel, Vue.js, and MySQL, syncing account and vendor data from the company ERP.' },
        { label: 'QA & Analyst Collaboration', detail: 'Collaborated daily with System Analysts and Quality Assurance (QA) to test, debug, and ship internal enterprise releases.' },
      ],
      insight: '6 months of enterprise systems taught me that reliability matters more than novelty — production code must serve real business needs every day.',
      technologies: ['Laravel', 'Vue.js', 'PHP', 'JavaScript', 'MySQL', 'REST APIs', 'Git'],
      project: 'wilcon-month-end-closing',
      relatedProjects: ['wilcon-month-end-closing', 'wilcon-collection-deposit-report', 'wilcon-enterprise-systems'] as readonly string[],
      photos: ['/wilcon-workstation.webp', '/wilcon-building.webp'] as readonly string[] | undefined,
      photoCaptions: [
        'Dual-Monitor Developer Workstation at Wilcon Depot',
        'Wilcon Depot Corporate Headquarters · Quezon City',
      ] as readonly string[],
      progression: undefined,
    },
    {
      company: 'WordPress Philippines',
      companyDescription: 'The official WordPress community for developers, designers, and site builders in the Philippines',
      role: 'Volunteer & Event Photographer',
      period: 'Jan 2026 – Present (Attendee in 2025)',
      location: 'Metro Manila · Community',
      logoUrl: '/logos/wordpress.png',
      teamSize: 'Community volunteer team',
      metric: undefined as { value: string; label: string } | undefined,
      highlight: 'Stepped up from an attendee in 2025 to an active volunteer photographer in 2026, documenting major open-source events including Software Freedom Day 2026 Manila and the July 2026 WordPress Manila Meetup.',
      evidence: [
        { label: 'Software Freedom Day 2026 Manila', detail: 'Served as volunteer photographer celebrating "The Future Is Open" with developers, designers, students, and open-source advocates (sponsored by Huawei Cloud Developer Group PH & Digital Freedom Foundation).' },
        { label: 'WordPress Manila Meetup (July 2026)', detail: 'Documented the community gathering at Common Ground Work Philippines Don Antonio, capturing speaker sessions, technical discussions, and meetup operations leading toward WordCamp Philippines 2026.' },
        { label: 'Community & Technical Networking', detail: 'Engage directly with local software engineers, PHP developers, and open-source creators across developer workshops and community meetups.' },
      ],
      insight: 'Being part of an open-source community taught me that growth doesn\'t happen in isolation — you grow by contributing, connecting, and showing up for the community.',
      technologies: ['WordPress', 'PHP', 'Community', 'Photography'],
      project: undefined,
      relatedProjects: [] as readonly string[],
      photos: [
        '/wp-community-1.webp',
        '/wp-community-2.webp',
        '/wp-community-3.webp',
        '/wp-community-4.webp',
      ] as readonly string[] | undefined,
      photoCaptions: [
        'Software Freedom Day 2026 Manila · Volunteer Photographer',
        'WordPress Manila Meetup (July 2026) · Common Ground Don Antonio',
        'Developer Sessions & Technical Talks · WordPress Manila',
        'Open-Source Community Networking · Manila',
      ] as readonly string[],
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
      highlight: 'Started as an OJT trainee and was absorbed as an HR Assistant, supporting recruitment and daily HR operations.',
      evidence: [
        { label: 'Recruitment', detail: 'Assisted in screening candidates, scheduling interviews, and coordinating onboarding for new hires.' },
        { label: 'Documentation', detail: 'Maintained employee records, processed HR paperwork, and organized personnel files.' },
        { label: 'Operations', detail: 'Supported daily HR workflows including payroll preparation, leave tracking, and employee inquiries.' },
      ],
      insight: 'People operations require the same attention to detail as code — accuracy and follow-through matter.',
      technologies: [],
      project: undefined,
      relatedProjects: [] as readonly string[],
      photos: ['/certificates/OJT coc .webp'] as readonly string[] | undefined,
      photoCaptions: [
        'OJT Certificate of Completion · Absorbed as HR Assistant',
      ] as readonly string[],
      progression: 'OJT → Absorbed as HR Assistant',
    },
    {
      company: 'Jollibee Foods Corporation',
      companyDescription: 'One of the largest fast-food chains in the Philippines',
      role: 'Service Crew',
      period: 'Jan 2024 – Jun 2024',
      location: 'Tondo, Manila · On-site',
      logoUrl: '/logos/jollibee.png',
      teamSize: 'Store crew',
      metric: undefined as { value: string; label: string } | undefined,
      highlight: 'Worked part-time as a working student, balancing full-time college IT studies with fast-paced store service.',
      evidence: [
        { label: 'Discipline', detail: 'Maintained consistent performance while balancing part-time work with full-time college coursework.' },
        { label: 'Teamwork', detail: 'Collaborated with crew members during peak hours to meet service speed and quality standards.' },
        { label: 'Customer Service', detail: 'Handled customer orders, inquiries, and requests with patience and professionalism.' },
      ],
      insight: 'Working while studying taught me that time management is not about having enough time — it is about how you use it.',
      technologies: [],
      project: undefined,
      relatedProjects: [] as readonly string[],
      photos: undefined,
      photoCaptions: undefined,
      progression: undefined,
    },
  ],
  // Certificates
  coeUrl: 'https://drive.google.com/file/d/1rMC9GD5x8NFLZ40nG5kf7Afc083rLxwG/view?usp=sharing',
  coePdfUrl: '/certificates/Wilcon_Depot_COE.pdf',
  certificates: [
    {
      title: 'Certificate of Employment — Junior System Developer',
      skill: 'Work Experience',
      issuer: 'Wilcon Depot, Inc.',
      date: 'May 28, 2026 – Oct 22, 2026',
      category: 'development',
      imageUrl: '/certificates/Wilcon_Depot_COE.pdf',
      badgeUrl: undefined,
      applied: 'Official Certificate of Employment certifying service as Junior System Developer at Wilcon Depot, Inc. (Head Office, Ugong Norte, Quezon City).',
      verifyUrl: 'https://drive.google.com/file/d/1rMC9GD5x8NFLZ40nG5kf7Afc083rLxwG/view?usp=sharing',
    },
    {
      title: 'English for IT 1',
      skill: 'English Communication',
      issuer: 'DICT-ITU DTC Initiative (Cisco Networking Academy)',
      date: '2026',
      category: 'development',
      imageUrl: '/certificates/English_for_IT_1_certificate_roniepactol-gmail-com_24bd1712-3282-451d-a09c-3a64a30a3528.pdf',
      badgeUrl: 'https://drive.google.com/file/d/1Yi50H75_woZN-xDOznMz1M0gJmjWGHdi/view?usp=sharing',
      applied: 'Completed English for IT 1 covering technical English communication for documentation and collaboration',
      verifyUrl: 'https://drive.google.com/file/d/1txEvQ3kgye36pLv6A58inO6o5unFtcZu/view?usp=sharing',
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
      badgeUrl: 'https://drive.google.com/file/d/1gyNPQZ3Mjpc5CLve34NBvrh5HeM3N3HU/view?usp=sharing',
      applied: 'Completed Python Essentials 1 covering Python fundamentals for scripting and automation',
      verifyUrl: 'https://drive.google.com/file/d/1nAj-2Ez9A_goIH__mZkUyGWJ_QPjXRos/view?usp=sharing',
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
      applied: 'Completed competency requirements under the Philippine TVET Competency Assessment and Certification System in Computer Systems Servicing (COC 1–4)',
      verifyUrl: 'https://drive.google.com/file/d/1YevexiLOCXzNXxMxlOcuZHr0-TJk6OU6/view?usp=sharing',
    },
    {
      title: 'OJT Certificate of Completion',
      skill: 'Work Experience',
      issuer: 'Radiant Force Human Resources',
      date: '2025',
      category: 'development',
      imageUrl: '/certificates/OJT coc .webp',
      applied: 'Completed formal on-the-job training in HR operations, employee records, and office workflows',
      verifyUrl: 'https://drive.google.com/file/d/1YUwoyu9U40CPYeCVRfiQ77TVZiZRcgKM/view?usp=sharing',
    },
    {
      title: 'Best Rookie of the Year',
      skill: 'Leadership & Service',
      issuer: 'Word of Hope Caloocan (Church Ministry)',
      date: '2025',
      category: 'development',
      imageUrl: '/woh-pilot.webp',
      badgeUrl: undefined,
      applied: 'Recognized for outstanding commitment, exemplary character, faithfulness, and dedication to community initiatives and media ministry',
      verifyUrl: undefined,
    },
  ] as const,
  // Sidebar feature data
  stats: [
    { value: 'Mar 2025', label: 'In production' },
    { value: 'Laravel', label: '+ Vue.js' },
    { value: 'QR Scan', label: 'Check-in' },
  ],
  skills: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Tailwind CSS', 'REST APIs', 'Git'],
  currently: 'Continuing to develop the WOH Attendance System for Word of Hope Caloocan',
} as const

export const SECTIONS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'work', label: 'Work', href: '/work' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'certificates', label: 'Certificates', href: '/certificates' },
  { id: 'contact', label: 'Contact', href: '/contact' },
] as const

/**
 * Facts shown on the /projects index. Each field answers one question a
 * recruiter or hiring developer asks when scanning a project list:
 *   usedBy  → Is this real? Who depends on it?
 *   problem → Does he understand why the software exists?
 *   myPart  → What exactly did HE do (vs. the team)?
 *   stack   → Keyword match for ATS / the job post.
 *   status  → Is it live, shipped, or just a demo?
 * Keep every value short and factual. No adjectives.
 */
export type ProjectGroup = 'work' | 'personal' | 'community'

export interface ProjectIndexEntry {
  slug: string
  kind: 'software' | 'community'
  group: ProjectGroup
  groupLabel: string
  usedBy: string
  /** 1-line plain-English outcome highlighted on the row */
  result: string
  /** Exactly 3 short tag words displayed on the row */
  threeTags: [string, string, string]
  /** Expanded labels: Problem · What I built · Result · Tools */
  problem: string
  whatIBuilt: string
  resultDetail: string
  tools: string
  myPart: string
  stack: string
  status: string
  live: boolean
}

export const PROJECT_INDEX: ProjectIndexEntry[] = [
  {
    slug: 'wilcon-month-end-closing',
    kind: 'software',
    group: 'work',
    groupLabel: 'Work · Wilcon Depot',
    usedBy: 'Wilcon Depot Finance & Business Unit Teams',
    result:
      'Replaced manual spreadsheets and chat threads with a validated, two-step approval workflow for monthly accounting close.',
    threeTags: ['Laravel', 'Vue.js', 'MySQL'],
    problem:
      'Departments sent monthly accounting adjustments through spreadsheets and chat apps, causing delays, missing fields, and duplicate entries.',
    whatIBuilt:
      'Built a central web system where each department enters adjustments, the system checks that Debit equals Credit, managers approve in two steps, and next-month reversals run automatically.',
    resultDetail:
      'Blocked unbalanced and duplicate entries before they reached Finance and gave managers a live view of closing progress.',
    tools: 'Laravel · Vue.js · PHP · MySQL',
    myPart:
      'Built centralized submission interface, automated net-balance validation (Debit = Credit), multi-tier BU-to-Finance approval chain, automated next-month reversing entries, and live GL balance comparison.',
    stack: 'Laravel · Vue.js · PHP · MySQL',
    status: 'Delivered to Finance, 2026',
    live: true,
  },
  {
    slug: 'wilcon-collection-deposit-report',
    kind: 'software',
    group: 'work',
    groupLabel: 'Work · Wilcon Depot',
    usedBy: 'Wilcon Depot Treasury Department',
    result:
      'Turned static daily sales totals into clickable check breakdowns with nationwide branch filtering and one-click Excel/PDF export.',
    threeTags: ['Laravel', 'Vue.js', 'MySQL'],
    problem:
      'Treasury staff only saw static check totals without knowing which individual checks were inside, and cash records overlapped with check records.',
    whatIBuilt:
      'Added a clickable check pop-up showing bank and check details, separated cash from check filters, added a nationwide branch column, and built PDF and Excel exports.',
    resultDetail:
      'Treasury staff can inspect individual checks in one click and export clean daily reports across all stores.',
    tools: 'Laravel · Vue.js · PHP · MySQL',
    myPart:
      'Built interactive check drill-down modal, separated cash vs. check reconciliation filters, automated accounting date alignment, added multi-branch tracking with nationwide defaults, and enabled PDF/Excel export.',
    stack: 'Laravel · Vue.js · PHP · MySQL',
    status: 'Delivered to Treasury, 2026',
    live: true,
  },
  {
    slug: 'woh-attendance-system',
    kind: 'software',
    group: 'personal',
    groupLabel: 'Personal · Word of Hope',
    usedBy: 'Word of Hope Caloocan: ushers, pastors, church admin',
    result:
      'Replaced paper sign-in sheets with a camera QR check-in kiosk and automatic follow-up lists for absent members.',
    threeTags: ['Laravel', 'Vue.js', 'REST API'],
    problem:
      'Sunday attendance was written by hand, causing lobby lines and making it hard for leaders to notice who stopped attending.',
    whatIBuilt:
      'Built the full system end to end: a Vue.js camera QR check-in kiosk, a Laravel REST API connected to the church website, and an admin dashboard that flags members who miss two Sundays.',
    resultDetail:
      'In live use every Sunday since March 2025 with fast check-ins and zero duplicate records.',
    tools: 'Laravel · Vue.js · MySQL · REST API',
    myPart: 'Built it end to end: database, Laravel API, Vue.js kiosk and admin dashboard.',
    stack: 'Laravel · Vue.js · MySQL · REST API',
    status: 'Live every Sunday since Mar 2025',
    live: true,
  },
  {
    slug: 'wilcon-enterprise-systems',
    kind: 'software',
    group: 'work',
    groupLabel: 'Work · Wilcon Depot',
    usedBy: 'Wilcon Depot internal finance teams',
    result:
      'Maintained internal finance web apps and connected company ERP records to daily voucher workflows over a 6-month developer role.',
    threeTags: ['Laravel', 'Vue.js', 'PHP'],
    problem:
      'Internal finance tools needed ongoing updates, bug fixes, and reliable data sync from the company central ERP records.',
    whatIBuilt:
      'Wrote backend Laravel and SQL logic for financial voucher processing, synced branch and vendor data from company ERP APIs, and tested releases with System Analysts and QA.',
    resultDetail:
      'Kept daily finance and voucher web tools accurate and stable across retail branches.',
    tools: 'Laravel · Vue.js · PHP · MySQL',
    myPart: 'Maintained backend features, wrote SQL, and worked with QA and analysts on releases.',
    stack: 'Laravel · Vue.js · PHP · MySQL',
    status: 'May – Oct 2026',
    live: false,
  },
  {
    slug: 'wordpress-ph-community',
    kind: 'community',
    group: 'community',
    groupLabel: 'Community · WordPress PH',
    usedBy: 'WordPress Philippines & Open-Source Community',
    result:
      'Grew from a 2025 meetup attendee into an official 2026 volunteer photographer for Manila open-source events.',
    threeTags: ['WordPress', 'Volunteering', 'Open Source'],
    problem:
      'Local tech meetups rely on volunteers to run events and document sessions for the wider developer community.',
    whatIBuilt:
      'Volunteered as event photographer for Software Freedom Day 2026 Manila and the July 2026 WordPress Manila Meetup at Common Ground.',
    resultDetail:
      'Documented speaker talks, workshops, and community sessions leading up to WordCamp Philippines 2026.',
    tools: 'Event Photography · Community Operations · Open Source',
    myPart:
      'Volunteer photographer documenting Software Freedom Day 2026 Manila, the July 2026 WP Manila Meetup at Common Ground, and community workshops; attendee in 2025.',
    stack: 'WordPress · Community · Open Source',
    status: 'Volunteering since Jan 2026',
    live: false,
  },
]

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

/**
 * Skills as plain, regular-weight text. Grouped so an ATS parser and a human
 * both see "Backend: Laravel, PHP ..." rather than a cloud of badges.
 * Only list what appears on the resume.
 */
export const SKILL_GROUPS: { group: string; items: string[] }[] = [
  { group: 'Backend', items: ['Laravel', 'PHP', 'Eloquent ORM', 'REST APIs'] },
  { group: 'Frontend', items: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'HTML5 / CSS3'] },
  { group: 'Database', items: ['MySQL', 'Relational Schema', 'CRUD Queries', 'Data Indexing'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Composer'] },
]

/**
 * Career history written as an audit log: newest first, one fact per line.
 * Dates are exactly what is on the resume. Do not add months that are unknown.
 */
export interface CareerLogEntry {
  when: string
  what: string
  where: string
  note?: string
}

export const CAREER_LOG: CareerLogEntry[] = [
  { when: 'May 2026 – Oct 2026', what: 'Full Stack Junior System Developer', where: 'Wilcon Depot, Inc.', note: '6 months · Laravel, Vue.js, MySQL' },
  { when: 'Jan 2026 – present', what: 'Volunteer and Event Photographer', where: 'WordPress Philippines', note: 'Attendee in 2025' },
  { when: 'Sep 2025 – Jan 2026', what: 'HR Assistant', where: 'Radiant Force Human Resources', note: 'Started as an OJT trainee' },
  { when: '2025', what: 'Graduated BS Information Technology', where: 'Access Computer College', note: 'Studied 2021 to 2025' },
  { when: 'Mar 2025', what: 'WOH Attendance System went live', where: 'Word of Hope Caloocan', note: 'Built end to end · in use every Sunday' },
  { when: 'Jan 2024 – Jun 2024', what: 'Service Crew (working student)', where: 'Jollibee Foods Corp.' },
]

/**
 * The approval flow of the Month-End Closing system, as the roles actually use it.
 * Shown on the home page as the signature element. No amounts, no company data.
 */
export interface ApprovalStep {
  key: string
  status: string
  actor: string
  action: string
  checks?: string[]
}

export const APPROVAL_FLOW: ApprovalStep[] = [
  {
    key: 'submit',
    status: 'Submitted',
    actor: 'Business Unit supervisor',
    action: 'Enters or uploads the adjustment. The system checks it before it can be sent.',
    checks: ['Required fields complete', 'Debit equals credit', 'No duplicate entry'],
  },
  {
    key: 'review',
    status: 'Reviewed',
    actor: 'Business Unit manager',
    action: 'Reviews the entry, then approves or rejects it.',
  },
  {
    key: 'approve',
    status: 'Approved and posted',
    actor: 'Financial Reporting manager',
    action: 'Gives final approval and posts the balances to the accounting system in one click.',
  },
  {
    key: 'reverse',
    status: 'Reversed',
    actor: 'System',
    action: 'Creates the reversing entry for the first day of the next month when one is needed.',
  },
]
