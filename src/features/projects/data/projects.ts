import type { Project } from '@/features/projects/types'

// Tambahkan proyek asli, gambar, demoUrl, dan sourceUrl ketika tersedia.
// Tandai `featured: true` agar tampil di home; halaman /projects menampilkan semua.
export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description: 'Portfolio satu halaman dengan komponen reusable dan design system bertema gelap.',
    details: 'Dibangun dengan React dan TypeScript menggunakan Vite. Konten dipisahkan dari tampilan, Tailwind CSS mengelola token desain, dan Radix UI menyediakan primitive interaksi yang aksesibel.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI'],
    featured: true,
  },
]
