import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { prefersReducedMotion } from '@/lib/scroll'

// Menggantikan perilaku scroll bawaan browser yang hilang pada SPA:
// - navigasi dengan hash (/#projects): scroll ke section target, menunggu
//   satu frame agar HomePage selesai render setelah pindah route.
// - navigasi tanpa hash: kembali ke atas halaman.
// Offset anchor ditangani CSS via scroll-padding-top di index.css.
export function RouteScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let frame = 0
    let timer: number | undefined
    const scroll = () => {
      document.getElementById(id)?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      })
    }
    frame = window.requestAnimationFrame(() => {
      scroll()
      // Fallback jika target belum ter-mount saat frame pertama.
      timer = window.setTimeout(scroll, 100)
    })
    return () => {
      window.cancelAnimationFrame(frame)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}
