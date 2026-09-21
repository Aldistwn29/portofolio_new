import { useEffect } from 'react'
import { useLocation } from 'react-router'

// Mengumumkan judul halaman ke live region global di RootLayout setiap route berubah.
export function useAnnounceRoute(title: string) {
  const { pathname } = useLocation()

  useEffect(() => {
    const announcer = document.querySelector('[data-route-announcer]')
    if (announcer) announcer.textContent = title
  }, [pathname, title])
}
