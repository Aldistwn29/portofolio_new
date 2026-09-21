export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'portfolio-theme'

// Prioritas: pilihan tersimpan > preferensi OS > dark (default situs).
export function resolveInitialTheme(): Theme {
  const stored = safeStorageGet()
  if (stored === 'light' || stored === 'dark') return stored
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('light', theme === 'light')
  root.classList.toggle('dark', theme === 'dark')
  // Sinkronkan theme-color agar bilah browser mengikuti tema.
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'light' ? '#fafafa' : '#292524',
  )
}

export function persistTheme(theme: Theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Abaikan (mode privat / storage diblokir): tema tetap berlaku sesi ini.
  }
}

// Store global agar semua instance toggle (nav desktop + mobile) sinkron.
let currentTheme: Theme | null = null
const listeners = new Set<(theme: Theme) => void>()

export function getTheme(): Theme {
  if (!currentTheme) currentTheme = resolveInitialTheme()
  return currentTheme
}

export function setTheme(next: Theme) {
  currentTheme = next
  persistTheme(next)
  if (typeof document !== 'undefined') applyTheme(next)
  listeners.forEach((listener) => listener(next))
}

export function toggleTheme() {
  setTheme(getTheme() === 'light' ? 'dark' : 'light')
}

export function subscribeTheme(listener: (theme: Theme) => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

// Sinkron antar tab: tab lain mengubah localStorage.
export function syncThemeFromStorage(event: StorageEvent) {
  if (event.key !== THEME_STORAGE_KEY) return
  if (event.newValue !== 'light' && event.newValue !== 'dark') return
  currentTheme = event.newValue
  if (typeof document !== 'undefined') applyTheme(event.newValue)
  listeners.forEach((listener) => listener(event.newValue as Theme))
}

function safeStorageGet(): string | null {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}
