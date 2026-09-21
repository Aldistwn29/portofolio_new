import { useEffect, useSyncExternalStore } from 'react'
import {
  applyTheme,
  getTheme,
  setTheme,
  subscribeTheme,
  syncThemeFromStorage,
  toggleTheme,
  type Theme,
} from '@/lib/theme'

// State tema global per tab; sinkron antar instance dan antar tab.
export function useTheme(): { theme: Theme; setTheme: (theme: Theme) => void; toggleTheme: () => void } {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'dark' as Theme)

  // Jaring pengaman: pastikan DOM sesuai store saat komponen pertama mount
  // (first paint sudah ditangani skrip inline di index.html).
  useEffect(() => {
    applyTheme(getTheme())
  }, [])

  useEffect(() => {
    window.addEventListener('storage', syncThemeFromStorage)
    return () => window.removeEventListener('storage', syncThemeFromStorage)
  }, [])

  return { theme, setTheme, toggleTheme }
}
