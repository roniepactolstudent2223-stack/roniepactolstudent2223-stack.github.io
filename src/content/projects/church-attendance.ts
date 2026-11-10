export const churchAttendance = {
	title: 'Church Attendance & Management System',
	organization: 'Word of Hope Caloocan',
	role: 'Solo full-stack developer',
	liveUrl: 'https://attendance.wohcaloocan.org/attendance/',
	stack: ['Laravel (PHP)', 'Vue.js', 'MySQL', 'REST API', 'Buefy'],
	summary: 'A church management system that connects QR check-in, attendance tracking, pastoral follow-up, and member administration.',
	features: [
		{ title: 'QR code check-in', description: 'Built a real-time scanning interface with Vue.js and REST APIs for instant check-ins, replacing manual logs and helping reduce entrance queues.', implementation: 'Vue.js scanning interface · REST API integration' },
		{ title: 'Automated follow-up', description: 'Engineered a Laravel backend that analyzes weekly MySQL attendance records and flags members with consecutive absences for pastoral follow-up.', implementation: 'Laravel tracking logic · Weekly MySQL attendance records' },
		{ title: 'Role-based security', description: 'Implemented strict access controls and data isolation across Admin, Pastor, and Usher tiers to protect sensitive personal records.', implementation: 'Admin / Pastor / Usher access tiers · Data isolation' },
		{ title: 'Administration & analytics', description: 'Built a responsive administration dashboard with Buefy for managing member profiles and visualizing weekly attendance metrics.', implementation: 'Buefy interface · Member profiles · Weekly attendance metrics' },
	],
	screenshots: [
		{ id: 'dashboard', title: 'Analytics dashboard', src: '/images/ProjectAttendanceDashbaord.png', width: 1895, height: 955, alt: 'Church attendance administration dashboard showing attendance metrics and follow-up panels.', caption: 'The dashboard brings together member totals, attendance metrics, service records, and follow-up information.' },
		{ id: 'members', title: 'Member management', src: '/images/ProjectAttendanecMember.png', width: 1902, height: 949, alt: 'Member management interface with a searchable directory and selected-member details.', caption: 'A searchable member directory sits beside profile details, contact information, and attendance history.' },
		{ id: 'schedules', title: 'Service schedules', src: '/images/ProjectAttendanceSchedule.png', width: 1893, height: 966, alt: 'Church Attendance Management System service schedule screen showing recurring services, search, and schedule controls.', caption: 'The schedule screen shows recurring church services and the controls used to manage them.' },
		{ id: 'launch', title: 'At the church', src: '/images/ProjectAttendanceSystem.png', width: 400, height: 226, alt: 'Word of Hope Caloocan attendance-system pilot announcement with the check-in station and a registration QR code.', caption: 'The pilot announcement introduces the attendance system and the church’s check-in station.' },
	],
};
