import type { TechStackGroup } from '@/features/profile/types'

// Daftar teknologi per kategori, ditampilkan sebagai pill teks.
// Sesuaikan kategori dan item dengan keahlian asli.
export const techStack: TechStackGroup[] = [
  { category: 'Bahasa', items: ['TypeScript', 'JavaScript', 'Python', 'Java'] },
  { category: 'Frontend', items: ['React', 'Tailwind CSS', 'Vite', 'Next.js', 'Bootstrap'] },
  { category: 'Backend', items: ['Node.js', 'Laravel', 'Spring Boot'] },
  { category: 'Database', items: ['MySQL', 'PostgreSQL', 'Supabase'] },
  { category: 'DevOps & Tools', items: ['Git', 'GitHub Actions', 'VPS Deployment', 'Docker'] },
]
