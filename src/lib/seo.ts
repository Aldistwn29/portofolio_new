import { SITE_NAME, SITE_URL } from '@/config/site'

/** Judul dokumen: "Judul Halaman — Nama Situs" atau nama situs untuk home. */
export function pageTitle(title?: string) {
  return title ? `${title} — ${SITE_NAME}` : SITE_NAME
}

/** URL canonical absolut untuk sebuah path (contoh: `/projects`). */
export function canonicalFor(path: string) {
  return `${SITE_URL}${path}`
}

/** Path menuju section di home (contoh: `/#projects`). Dipakai lintas route. */
export function homeSectionPath(id: string) {
  return `/#${id}`
}
