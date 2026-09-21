// Build script (ESM, tanpa dependensi tambahan):
// - memvalidasi ID proyek unik (ID duplikat menggagalkan build),
// - menulis public/sitemap.xml dan public/robots.txt dari data statis.
//
// Dijalankan sebelum `vite build` melalui `npm run build`.
// Override domain: `SITE_URL=https://domain-anda.com npm run build`.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(rootDir, 'public')
mkdirSync(publicDir, { recursive: true })

// SITE_URL diambil dari environment saat build agar meta/OG absolut benar.
// Mendukung SITE_URL maupun VITE_SITE_URL (yang dibaca bundle via import.meta.env).
const siteUrl = (process.env.SITE_URL ?? process.env.VITE_SITE_URL ?? 'https://example.com').replace(/\/$/, '')

// Ambil daftar proyek langsung dari sumber TS tanpa mengeksekusi TS:
// cukup untuk struktur data statis sederhana (id + updatedAt opsional).
function readProjectsSource() {
  const source = readFileSync(join(rootDir, 'src', 'features', 'projects', 'data', 'projects.ts'), 'utf8')
  const ids = [...source.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map((match) => match[1])
  const updated = [...source.matchAll(/updatedAt:\s*['"]([^'"]+)['"]/g)].map((match) => match[1])
  return ids.map((id, index) => ({ id, updatedAt: updated[index] }))
}

const projects = readProjectsSource()
const seen = new Set()
for (const project of projects) {
  if (seen.has(project.id)) {
    console.error(`[seo] ID proyek duplikat: "${project.id}". ID harus unik untuk route /projects/:id.`)
    process.exit(1)
  }
  seen.add(project.id)
}

const today = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${siteUrl}/projects`, changefreq: 'weekly', priority: '0.9' },
  ...projects.map((project) => ({
    loc: `${siteUrl}/projects/${project.id}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: project.updatedAt ?? today,
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(
    (url) =>
      `  <url>\n    <loc>${url.loc}</loc>\n${url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>\n` : ''}    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`,
  )
  .join('\n')}\n</urlset>\n`

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`[seo] sitemap.xml ditulis (${urls.length} URL)`)
console.log(`[seo] ${projects.length} route proyek siap di-prerender`)
