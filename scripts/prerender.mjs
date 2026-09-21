// Post-build prerender (ESM, tanpa dependensi tambahan):
// menyalin dist/index.html menjadi dist/projects/index.html dan
// dist/projects/<id>/index.html dengan meta OG/canonical/title yang sesuai.
//
// Kenapa ini perlu: crawler/share (WA, X, LinkedIn) umumnya tidak mengeksekusi
// JS, sehingga meta dinamis react-helmet-async saja tidak cukup. File HTML
// statis per route memastikan setiap URL (termasuk detail) punya OG yang benar.
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(rootDir, 'dist')
const templatePath = join(distDir, 'index.html')

if (!existsSync(templatePath)) {
  console.error('[prerender] dist/index.html tidak ditemukan. Jalankan `vite build` dulu.')
  process.exit(1)
}

const DEFAULT_URL = 'https://example.com'
const siteUrl = (process.env.SITE_URL ?? process.env.VITE_SITE_URL ?? DEFAULT_URL).replace(/\/$/, '')

function readProjectsSource() {
  const source = readFileSync(join(rootDir, 'src', 'features', 'projects', 'data', 'projects.ts'), 'utf8')
  const blocks = source.split(/{/).slice(1)
  return blocks
    .map((block) => {
      const id = block.match(/id:\s*['"]([^'"]+)['"]/)?.[1]
      const title = block.match(/title:\s*['"]([^'"]+)['"]/)?.[1]
      const description = block.match(/description:\s*(['"])([\s\S]*?)\1/)?.[2]
      const image = block.match(/image:\s*['"]([^'"]+)['"]/)?.[1]
      return id && title ? { id, title, description, image } : null
    })
    .filter(Boolean)
}

let template = readFileSync(templatePath, 'utf8')

// Selaraskan URL default bawaan build dengan SITE_URL aktual.
// (Bundle JS memakai VITE_SITE_URL saat build; HTML statis diperbaiki di sini.)
if (siteUrl !== DEFAULT_URL) {
  template = template.split(DEFAULT_URL).join(siteUrl)
  writeFileSync(templatePath, template)
  console.log(`[prerender] URL canonical home diselaraskan ke ${siteUrl}`)
}

const siteName = 'Portofolio Aldi Setiawan'

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Ganti tag <title> dan meta/link baik versi statis (tanpa data-rh) maupun
// versi Helmet (dengan data-rh). Jika pola tidak ada, sisipkan setelah </title>.
function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) return html.replace('</title>', `</title>\n    ${replacement}`)
  return html.replace(pattern, replacement)
}

// `data-rh="true"` hanya ada saat Helmet sempat render (SSR); di HTML statis
// hasil build tag-nya polos — kedua varian harus cocok agar tidak duplikat.
const RH = '( data-rh="true")?'

// Halaman index /projects (showcase penuh) — pola meta sama, tipe website.
{
  const path = '/projects'
  const url = `${siteUrl}${path}`
  const title = escapeHtml(`Proyek — ${siteName}`)
  const description = escapeHtml('Kumpulan proyek yang saya kerjakan.')

  let html = template
  html = replaceTag(html, /<title>.*?<\/title>/, `<title>${title}</title>`)
  html = replaceTag(html, new RegExp(`<meta name="description" content="[^"]*"${RH} \\/>`), `<meta name="description" content="${description}" />`)
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
  html = replaceTag(html, new RegExp(`<meta property="og:url" content="[^"]*"${RH} \\/>`), `<meta property="og:url" content="${url}" />`)
  html = replaceTag(html, new RegExp(`<meta property="og:title" content="[^"]*"${RH} \\/>`), `<meta property="og:title" content="${title}" />`)
  html = replaceTag(html, new RegExp(`<meta property="og:description" content="[^"]*"${RH} \\/>`), `<meta property="og:description" content="${description}" />`)
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div><noscript><h1>${title}</h1><p>${description}</p></noscript>`,
  )

  const outDir = join(distDir, 'projects')
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  console.log('[prerender] halaman /projects ditulis ke dist/projects/index.html')
}

let count = 0
for (const project of readProjectsSource()) {
  const path = `/projects/${project.id}`
  const url = `${siteUrl}${path}`
  const title = escapeHtml(`${project.title} — ${siteName}`)
  const description = escapeHtml(project.description ?? siteName)
  const image = project.image?.startsWith('/') ? `${siteUrl}${project.image}` : `${siteUrl}/og-default.svg`

  let html = template
  html = replaceTag(html, /<title>.*?<\/title>/, `<title>${title}</title>`)
  html = replaceTag(html, new RegExp(`<meta name="description" content="[^"]*"${RH} \\/>`), `<meta name="description" content="${description}" />`)
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
  html = replaceTag(html, new RegExp(`<meta property="og:type" content="[^"]*"${RH} \\/>`), `<meta property="og:type" content="article" />`)
  html = replaceTag(html, new RegExp(`<meta property="og:url" content="[^"]*"${RH} \\/>`), `<meta property="og:url" content="${url}" />`)
  html = replaceTag(html, new RegExp(`<meta property="og:title" content="[^"]*"${RH} \\/>`), `<meta property="og:title" content="${title}" />`)
  html = replaceTag(html, new RegExp(`<meta property="og:description" content="[^"]*"${RH} \\/>`), `<meta property="og:description" content="${description}" />`)
  html = replaceTag(html, new RegExp(`<meta property="og:image" content="[^"]*"${RH} \\/>`), `<meta property="og:image" content="${image}" />`)
  html = replaceTag(html, new RegExp(`<meta name="twitter:title" content="[^"]*"${RH} \\/>`), `<meta name="twitter:title" content="${title}" />`)
  html = replaceTag(html, new RegExp(`<meta name="twitter:description" content="[^"]*"${RH} \\/>`), `<meta name="twitter:description" content="${description}" />`)
  html = replaceTag(html, new RegExp(`<meta name="twitter:image" content="[^"]*"${RH} \\/>`), `<meta name="twitter:image" content="${image}" />`)
  // Fallback noscript agar konten detail tetap terbaca tanpa JS.
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div><noscript><h1>${title}</h1><p>${description}</p></noscript>`,
  )

  const outDir = join(distDir, 'projects', project.id)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  count += 1
}

// Fallback hosting statis tanpa rewrite (mis. GitHub Pages): salin home
// sebagai 404.html agar deep-link tetap boot ke router client.
copyFileSync(templatePath, join(distDir, '404.html'))

console.log(`[prerender] ${count} halaman proyek ditulis ke dist/projects/*/index.html`)
