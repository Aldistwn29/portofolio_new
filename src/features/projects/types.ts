export type Project = {
  id: string
  title: string
  description: string
  details: string
  technologies: string[]
  image?: string
  demoUrl?: string
  sourceUrl?: string
  // Tampil di home ("Featured") bila true; halaman /projects menampilkan semua.
  featured?: boolean
  // Poin capaian / fitur utama, opsional (bullet di kartu dan halaman detail).
  highlights?: string[]
  // Periode pengerjaan, mis. "2024 — Sekarang". Opsional.
  period?: string
}
