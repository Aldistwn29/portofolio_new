// Navigasi utama berbasis route (bukan per-section):
// hanya Beranda (/) dan Proyek (/projects). Section-section home
// (tentang, pengalaman, stack) dijangkau via scroll home,
// CTA dalam halaman, dan quick-link footer (sectionLinks di bawah).
export const navigation = [
  { to: '/', label: 'Beranda' },
  { to: '/projects', label: 'Proyek' },
] as const

// Jump-link ke section home untuk quick-link footer.
// ID harus sesuai dengan id section di halaman home.
export const sectionLinks = [
  { id: 'about', label: 'Tentang' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'stack', label: 'Stack' },
] as const
