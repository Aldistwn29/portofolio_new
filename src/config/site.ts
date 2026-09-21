// Konfigurasi situs terpusat untuk SEO, canonical, dan Open Graph.
//
// GANTI domain produksi sebelum build final via environment:
// `SITE_URL=https://domain-anda.com npm run build` (atau VITE_SITE_URL).
// Nilai default hanya untuk development agar meta tetap valid.
const envUrl =
  (typeof import.meta !== 'undefined' &&
    (import.meta.env?.VITE_SITE_URL as string | undefined)) ||
  undefined

export const SITE_URL = (envUrl ?? 'https://example.com').replace(/\/$/, '')

export const SITE_NAME = 'Portofolio Aldi Setiawan'

export const SITE_DESCRIPTION =
  'Portofolio Aldi Setiawan — proyek pengembangan web, proses belajar, dan eksplorasi React, TypeScript, dan Tailwind CSS.'

export const SITE_LOCALE = 'id_ID'

// TODO: ganti dengan gambar OG produksi (JPG/PNG 1200x630) di public/.
// File SVG ini hanya placeholder agar meta valid selama development.
export const SITE_OG_IMAGE = `${SITE_URL}/og-default.svg`
