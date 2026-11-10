export interface WrittenProject {
	slug: string;
	title: string;
	organization: string;
	kind: string;
	stack: string[];
	summary: string;
	overview: string;
	note?: string;
	experienceUrl?: string;
	features: { title: string; description: string }[];
}

export const writtenProjects: WrittenProject[] = [
	{
		slug: 'treasury-collection-deposit',
		title: 'Treasury Collection & Deposit Report Enhancement',
		organization: 'Wilcon Depot Inc.',
		kind: 'Work contribution',
		stack: [],
		summary: 'Enhanced Treasury reports with transaction drill-downs, multi-branch filtering, and PDF and Excel exports.',
		overview: 'I enhanced Wilcon Depot’s existing Collection and Deposit Report to make payment details easier to inspect, align branch reporting, and simplify report downloads.',
		experienceUrl: '/experience/#wilcon-depot',
		features: [
			{ title: 'Interactive transaction breakdown', description: 'Made report amounts clickable so users can inspect detailed check payments and clearly distinguish unpaid checks from cash transactions.' },
			{ title: 'Multi-branch filtering', description: 'Aligned payment dates and statuses, added branch columns, and updated filters to load all branches automatically when no specific branch is selected.' },
			{ title: 'One-click report exports', description: 'Added PDF and Excel download options for both summary tables and detailed payment breakdowns.' },
		],
	},
	{
		slug: 'closing-process-automation',
		title: 'Closing Process Automation',
		organization: 'Wilcon Depot Inc.',
		kind: 'Work contribution · Accounting & dashboard modules',
		stack: [],
		summary: 'Automated account synchronization, validated accounting entries, and connected approvals with posting and a live closing dashboard.',
		overview: 'I worked on accounting and dashboard modules for the closing process, connecting account synchronization, validated entry, manager approval, and posting to the main accounting system.',
		experienceUrl: '/experience/#wilcon-depot',
		features: [
			{ title: 'Automated account sync', description: 'Set up scheduled background updates and a manual sync button to pull the latest account records from the main database while blocking inactive accounts.' },
			{ title: 'Automated entry & error checking', description: 'Built file-upload and manual-entry forms that validate required fields, prevent duplicate entries across departments, calculate net balances, and automatically generate next-month reversal entries.' },
			{ title: 'Approval workflow & live dashboard', description: 'Created a step-by-step manager approval workflow with activity logs, one-click posting to the main accounting system, real-time balance tracking, and a visual progress dashboard.' },
		],
	},
	{
		slug: 'pdf-locker-unlocker',
		title: 'PDF Locker / Unlocker Utility',
		organization: 'Python CLI tool',
		kind: 'Utility',
		stack: ['Python', 'CLI'],
		summary: 'A terminal utility for password-protecting and unlocking PDFs, with direct file paths, drag-and-drop input, and validation.',
		overview: 'I built a Python command-line tool to encrypt and decrypt PDF files with password protection through an interactive terminal interface.',
		features: [
			{ title: 'File encryption', description: 'Implemented password-based encryption and decryption for PDF files.' },
			{ title: 'CLI automation', description: 'Created an interactive terminal interface that supports direct file paths and drag-and-drop execution.' },
			{ title: 'Validation & error handling', description: 'Added encryption-state checks and error handling for invalid file paths or passwords.' },
		],
	},
	{
		slug: 'hospital-patient-flow',
		title: 'Hospital Patient Flow Management System',
		organization: 'Laravel 13 learning project',
		kind: 'Learning project',
		stack: ['Laravel 13', 'Laravel policies'],
		summary: 'A full-stack Laravel learning project following the patient journey from appointment booking and triage through consultation and billing.',
		overview: 'I built this system to learn Laravel 13 through a complete patient-flow management workflow and role-based authorization.',
		note: 'Built for learning Laravel 13, not as a production hospital system.',
		features: [
			{ title: 'End-to-end patient workflow', description: 'Built a management system covering appointment booking, nurse triage, doctor consultation, and final billing.' },
			{ title: 'Role-based access control', description: 'Implemented granular permissions across seven hospital roles using Laravel policies to control access to sensitive medical and financial records.' },
		],
	},
	{
		slug: 'church-sms-automation',
		title: 'Church SMS Automation System',
		organization: 'Church software',
		kind: 'Messaging & registration',
		stack: ['Python', 'FastAPI', 'REST API', 'SQLite', 'Twilio', 'HTML', 'JavaScript'],
		summary: 'Scheduled service reminders and member registration connected through a FastAPI backend, SQLite, and the Twilio API.',
		overview: 'I built a church SMS automation system that connects member registration and management with scheduled weekly service reminders.',
		features: [
			{ title: 'Automated SMS reminders', description: 'Scheduled weekly service reminders using Python and the Twilio API.' },
			{ title: 'Backend API', description: 'Built a FastAPI backend with SQLite for creating, reading, updating, and deleting member records.' },
			{ title: 'Frontend registration form', description: 'Created an HTML and JavaScript member-registration form integrated with the API.' },
		],
	},
];
