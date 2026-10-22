export interface AtsBullet {
  title: string
  description: string
}

export interface ImageCaption {
  title: string
  description: string
}

export interface ProjectAtsData {
  summary: string
  stackSummary: string
  bullets: AtsBullet[]
  captions: ImageCaption[]
}

export const PROJECT_DETAILS_DATA: Record<string, ProjectAtsData> = {
  'woh-attendance-system': {
    summary:
      'QR church attendance and member care system built end to end with Laravel and Vue.js for Word of Hope Caloocan. Connects to the main church website via REST API to sync member records, speed up lobby check-ins, and flag members who miss two Sundays in a row.',
    stackSummary: 'Laravel (PHP), Vue.js, MySQL, REST API, Tailwind CSS',
    bullets: [
      {
        title: 'Website REST API Sync',
        description:
          'Built a token-authenticated REST API connected to wohcaloocan.org so member registrations sync automatically without re-typing names.',
      },
      {
        title: 'Camera QR Check-In Kiosk',
        description:
          'Built browser camera QR scanning in Vue.js so ushers can check members in at the entrance in about a second.',
      },
      {
        title: 'Zero Duplicate Scans',
        description:
          'Added database constraints on member, service session, and date so rapid scans never create duplicate attendance records.',
      },
      {
        title: 'Automatic Absentee Follow-Up List',
        description:
          'Wrote queries that list members who missed two consecutive Sundays so pastors know who to check on.',
      },
      {
        title: 'Separate Roles for Ushers, Pastors, and Admin',
        description:
          'Restricted each screen by role so ushers only scan attendance while pastors and admins manage member care records.',
      },
    ],
    captions: [
      {
        title: 'Main Church Website (wohcaloocan.org)',
        description: 'Source of member registrations synced via REST API.',
      },
      {
        title: 'Admin Dashboard',
        description: 'Sunday attendance counts and automatic absentee follow-up list.',
      },
      {
        title: 'Lobby Check-In Kiosk',
        description: 'Camera QR check-in screen used at the church entrance every Sunday.',
      },
    ],
  },
  'wilcon-enterprise-systems': {
    summary:
      'Six months of internal web application development as a Full Stack Junior System Developer at Wilcon Depot, Inc. Maintained internal finance web tools using Laravel, Vue.js, and MySQL, synced account and vendor data from the company ERP, and worked with System Analysts and QA on releases.',
    stackSummary: 'Laravel, Vue.js, PHP, MySQL, REST APIs, Git',
    bullets: [
      {
        title: 'Company ERP Data Sync',
        description:
          'Connected internal web apps to company ERP APIs to pull branch ledger accounts, vendor records, and item data.',
      },
      {
        title: 'Financial Voucher Processing',
        description:
          'Wrote and maintained backend PHP and SQL logic for internal financial voucher workflows with exact decimal math and activity logs.',
      },
      {
        title: 'System Analyst & QA Collaboration',
        description:
          'Worked daily with System Analysts and QA testers to reproduce issues, verify fixes, and ship internal feature updates.',
      },
    ],
    captions: [
      {
        title: 'Developer Workstation at Wilcon Depot',
        description: 'Dual-monitor setup used to build and test internal Laravel and Vue.js finance tools.',
      },
      {
        title: 'Wilcon Depot Corporate Office',
        description: 'Headquarters in Quezon City supporting nationwide store operations.',
      },
    ],
  },
  'wilcon-collection-deposit-report': {
    summary:
      'Reporting upgrade built for Wilcon Depot\'s Treasury Department. Turned static daily check totals into clickable check breakdowns, separated cash and check filters for unreconciled accounts, aligned accounting dates automatically, added a nationwide branch column, and built one-click PDF and Excel exports.',
    stackSummary: 'Laravel, Vue.js, PHP, MySQL',
    bullets: [
      {
        title: 'Clickable Check Breakdown',
        description:
          'Turned static check totals into clickable links that open a pop-up showing the customer name, bank, check number, date, and remittance details.',
      },
      {
        title: 'Separate Cash and Check Filters',
        description:
          'Fixed overlap in unreconciled accounts by separating cash records from check records during reconciliation.',
      },
      {
        title: 'Automatic Accounting Date Alignment',
        description:
          'Matched transaction dates with accounting periods so valid check records appear in the right report columns automatically.',
      },
      {
        title: 'Nationwide Branch Column & Default View',
        description:
          'Added a Branch column and set the report to show all nationwide stores by default when no single branch is chosen.',
      },
      {
        title: 'One-Click PDF and Excel Export',
        description:
          'Added download buttons so Treasury staff can export the filtered report to PDF or Excel for offline audits.',
      },
    ],
    captions: [
      {
        title: 'Collection & Deposit Report Table',
        description: 'Daily sales, cash, and check summaries with PDF and Excel export buttons.',
      },
      {
        title: 'Nationwide Branch Column & Filter',
        description: 'Added Branch column that displays all nationwide branches by default.',
      },
      {
        title: 'Clickable Check Breakdown Modal',
        description: 'Pop-up showing customer name, issuing bank, check number, date, and amount.',
      },
    ],
  },
  'wilcon-month-end-closing': {
    summary:
      'Monthly closing web system built for Wilcon Depot\'s Financial Reporting Department. Replaced manual spreadsheets and chat threads with a central workflow where departments submit journal entries, the system checks that Debit equals Credit, managers approve in two steps, and next-month reversals run automatically.',
    stackSummary: 'Laravel, Vue.js, PHP, MySQL',
    bullets: [
      {
        title: 'Direct Department Entry Instead of Spreadsheets',
        description:
          'Shifted entry submission and file uploads directly to each Business Unit supervisor so Finance no longer had to combine dozens of spreadsheet files by hand.',
      },
      {
        title: 'Automatic Balance & Duplicate Checks',
        description:
          'Blocked entries from being submitted if Debit does not equal Credit, if required fields are blank, or if a duplicate entry already exists.',
      },
      {
        title: 'Two-Step Manager Approval Chain',
        description:
          'Routed every submission from the Business Unit Supervisor to the Business Unit Manager for review, and then to the Financial Reporting Manager for final approval and batch posting.',
      },
      {
        title: 'Automatic Next-Month Reversing Entries',
        description:
          'Scheduled automatic reversing entries (swapping Debit and Credit) for the first day of the next month so accruals do not have to be re-typed.',
      },
      {
        title: 'Live General Ledger Balance Comparison',
        description:
          'Built a side-by-side table showing unadjusted balances, approved adjustments, and projected closing balances with a baseline lock during close.',
      },
    ],
    captions: [
      {
        title: 'Closing Progress & Status Summary',
        description: 'Tracks entries waiting for BU Head approval, Finance posting, and completed postings.',
      },
      {
        title: 'Chart of Accounts Master File & Access Rules',
        description: 'Configures department access groups and mandatory fields per GL account.',
      },
      {
        title: 'General Ledger Balance Display',
        description: 'Side-by-side comparison of unadjusted, posted adjustment, and projected closing balances.',
      },
    ],
  },
  'wordpress-ph-community': {
    summary:
      'Community involvement and volunteering with WordPress Philippines and the local open-source community. Started as a meetup attendee in 2025 and stepped up in 2026 as a volunteer photographer covering Software Freedom Day 2026 Manila and the July 2026 WordPress Manila Meetup.',
    stackSummary: 'Community Operations, Event Photography, Open Source',
    bullets: [
      {
        title: 'Software Freedom Day 2026 Manila',
        description:
          'Volunteered as event photographer celebrating "The Future Is Open" with developers, designers, students, and open-source advocates, supported by Huawei Cloud Developer Group PH and the Digital Freedom Foundation.',
      },
      {
        title: 'WordPress Manila Meetup (July 2026)',
        description:
          'Documented talks, Q&A sessions, and community networking at Common Ground Work Philippines Don Antonio ahead of WordCamp Philippines 2026.',
      },
      {
        title: '2025 Attendee → 2026 Volunteer',
        description:
          'Grew from attending local meetups in 2025 into helping the organizing team run and document events in 2026.',
      },
    ],
    captions: [
      {
        title: 'Software Freedom Day 2026 Manila',
        description: 'Open-source community gathering in Metro Manila.',
      },
      {
        title: 'WordPress Manila Meetup (Common Ground Don Antonio)',
        description: 'Monthly meetup of WordPress and web developers in Quezon City.',
      },
    ],
  },
}
