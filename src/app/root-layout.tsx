import { Outlet } from 'react-router'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteNavigation } from '@/components/layout/site-navigation'

// Layout root: navigasi + konten route + footer + skip link global.
// `children` dipakai saat menjadi errorElement agar 404 loader tetap berlayout.
// RouteScrollManager TIDAK di sini: ia memakai useLocation dan harus berada
// di dalam Router context (lihat router.tsx).
export function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:p-3 focus:text-primary-foreground"
      >
        Lewati ke konten utama
      </a>
      <SiteNavigation />
      <div className="pb-[var(--nav-bottom-space)] pt-[var(--nav-top-space)]">
        <main id="main-content" tabIndex={-1}>
          {children ?? <Outlet />}
        </main>
        <SiteFooter />
      </div>
      {/* Live region untuk mengumumkan judul halaman setiap navigasi route. */}
      <p aria-live="polite" role="status" className="sr-only" data-route-announcer />
    </>
  )
}
