import { DesktopNavigation } from '@/components/layout/desktop-navigation'
import { MobileBottomBar } from '@/components/layout/mobile-bottom-bar'
import { MobileNavigation } from '@/components/layout/mobile-navigation'

// Navigasi berbasis route (status aktif dari NavLink).
// Mobile: header atas (brand + hamburger) + bottom bar (Beranda + Proyek).
export function SiteNavigation() {
  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
      <MobileBottomBar />
    </>
  )
}
