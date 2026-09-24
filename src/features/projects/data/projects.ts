import type { Project } from '@/features/projects/types'

// Tambahkan proyek asli, gambar, demoUrl, dan sourceUrl ketika tersedia.
// Tandai `featured: true` agar tampil di home; halaman /projects menampilkan semua.
export const projects: Project[] = [
  {
    id: 'finledger',
    title: 'FinLedger',
    description: 'A simple financial ledger application built for small business to track their daily financial health',
    details: 'Findledger helps small business owners manage sales, accounts receivable, and cash flow whithout relying on complex accounting workflows. i built the application using NextJS, TypeScript, and Supabase, convering the full flow from authentication and businees data management to deployment. One of the key technical focuses was data security. I used Supabase Auth together with PostgreSQL Row Level Security (RLS) to isolate business data between users. I also integrated Docker into GitHub Actions to run code checks, tests, and application builds before deployment.',
    technologies: ['React', 'TypeScript', 'NextJS', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'GitHub Actions'],
    image: '/images/projects/finledger-showcase.png',
    // TODO: ganti dengan URL asli. Kosongkan (hapus baris) bila tidak ada.
    demoUrl: 'https://finledger-seven.vercel.app',
    sourceUrl: 'https://github.com/Aldistwn29/finledger',
    featured: true,
  },

  {
    id: 'edusmart',
    title: 'Edusmart',
    description: 'An e-learning platform that combines learning management system (LMS) with AI-Powered student feedback',
    details: 'EduSmart was built to help teachers manage learning materials, quizzes, and assignments while giving students a structured place to access their learning activities. I developed the application using Laravel, React, Inertia.js, and MySQL, connecting backend workflows directly with the frontend without introducing a separate API layer. I also integrated a Large Language Model (LLM) to analyze quiz and assignment data and generate feedback for students based on their learning results. The application was evaluated with teachers and students to validate its functionality and usability.',
    technologies: ['React', 'PHP', 'Javascript', 'Laravel', 'MySQL', 'Tailwind CSS', 'Gemini API'],
    image: '/images/projects/edusmart-showcase.png',
    // TODO: ganti dengan URL asli. Kosongkan (hapus baris) bila tidak ada.
    demoUrl: 'https://edusmart.co.id',
    sourceUrl: 'https://github.com/Aldistwn29/edusmart',
    featured: true,
  },

  {
    id: 'movieflax',
    title: 'MovieFlax',
    description: 'A full-stack streaming platform prototype with subscription and payment workflows.',
    details: 'Movieflex explores how a modern streaming application can handle content management, user interactions, and subscription payments within a full-stack architecture. I built the application using Laravel, React, Inertia.js, and MySQL. Instead of creating a separate REST API, I used Inertia.js to connect Laravel backend workflows directly with the React frontend. I also integrated the Midtrans Payment Gateway to handle subscription payment flows and communication with an external payment service.',
    technologies: ['React', 'Laravel', 'MySQL', 'PHP', 'Javascript', 'Tailwind CSS'],
    image: '/images/projects/moonton.png', 
    // TODO: ganti dengan URL asli. Kosongkan (hapus baris) bila tidak ada.
    demoUrl: 'https://edusmart.co.id',
    sourceUrl: 'https://github.com/Aldistwn29/moonton',
    featured: true,
  },
]
