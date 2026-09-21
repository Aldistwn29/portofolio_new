import type { Experience } from '@/features/profile/types'

// Tambahkan pengalaman kerja asli di sini. ID harus unik.
// Logo: impor gambar dari src/assets/images/companies/ (opsional).
export const experiences: Experience[] = [
    {
        id: 'internship-1',
        company: 'Kantor Desa Nagrak Utara',
        role: 'Fullstack Developer Intern',
        period: 'Jan 2026 - Mar 2026',
        description: 'Build a web-based village adminstration system to help manage public service requests and administrative data in platfrom',
        highlights: [
            'Developed backend workflows for service submissions, status tracking, and document handling using Laravel and MySQL',
            'Deployed the application to a VPS and set up Github Actions for a more consistent CI/CD deployment workflows',
            'Worked across backend, database, and deployment processes throughout the development cycle',
        ],
        technologies: ['Laravel', 'MySQL', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Git', 'Github Actions', 'VPS Deployment'],
    },
    {
        id: 'internship-2',
        company: 'Badan Pusat STatistik (BPS) Kota Sukabumi',
        role: 'Web Development Intern',
        period: 'Jul 2025 - Des 2025',
        description: 'Developed a web application to support consultation scheduling and consultation data management.',
        highlights: [
            'Built application features and CRUD workflows using Laravel and MySQL.',
            'Integrated WhatsApp notifications to support consultation scheduling and communication.',
            'Worked closely with stakeholders using an iterative development approach to validate requirements and improve the system throughout development.',
        ],
        technologies: ['Laravel', 'MySQL', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Git', 'Github Actions', 'VPS Deployment'],
    },
    {
        id: 'internship-3',
        company: 'Bank BJB KCP Cibadak',
        role: 'Data Analyst Intern',
        period: 'Feb 2024 - Mei 2024',
        description: 'Explored customer behavioral and financial data to identify meaningful customer segments and patterns related to credit risk.',
        highlights: [
            'Applied K-Means and K-Medoids clustering using Python and identified three customer segments with similar characteristics.',
            'Analyzed financial and behavioral indicators across customer groups to explore potential credit-risk patterns.',
            'Evaluated clustering performance using Silhouette Score and visualized segment characteristics to support data interpretation.',
        ],
        technologies: ['Excel', 'Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    },
]
