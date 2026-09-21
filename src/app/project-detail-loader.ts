import type { LoaderFunctionArgs } from 'react-router'
import { projects, type Project } from '@/features/projects'

// Loader sync dari data statis — melempar 404 jika ID tidak dikenal.
// Dipisah dari halaman agar file page hanya mengekspor komponen.
export function projectDetailLoader({ params }: LoaderFunctionArgs): Project {
  const project = projects.find((item) => item.id === params.projectId)
  if (!project) throw new Response('Proyek tidak ditemukan', { status: 404 })
  return project
}
