import { useEffect, useRef } from 'react'

// Fokus ke heading saat halaman dimuat agar pembaca layar dan keyboard
// berpindah konteks setiap navigasi route (pengganti perilaku bawaan MPA).
export function useFocusHeading<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])

  return ref
}
