import { Link } from 'react-router'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { profile } from '@/features/profile'
import { homeSectionPath } from '@/lib/seo'

// Header atas mobile: brand kiri + hamburger kanan.
// Dropdown menu berisi link Beranda/Proyek (teks) + toggle tema.
export function MobileNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b bg-background/90 pb-[max(0.5rem,env(safe-area-inset-top))] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-md md:hidden">
      <div className="flex min-h-12 items-center justify-between gap-4 px-4">
        <Link to={homeSectionPath('home')} className="rounded-sm font-display text-lg font-bold">
          {profile.name}<span className="text-primary">.</span>
        </Link>
        <MobileMenu />
      </div>
    </header>
  )
}
