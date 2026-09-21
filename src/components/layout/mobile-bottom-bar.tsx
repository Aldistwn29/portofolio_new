import { NavLink } from 'react-router'
import { FolderOpen, House } from 'lucide-react'
import { navigation } from '@/config/navigation'
import { cn } from '@/lib/utils'

const navigationIcons = {
  '/': House,
  '/projects': FolderOpen,
} as const

// Bottom bar mobile: 2 link route (Beranda, Proyek) tanpa toggle tema.
// Toggle tema hanya ada di hamburger header atas + desktop pill.
// Status aktif dari NavLink; Beranda memakai `end`.
export function MobileBottomBar() {
  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] md:hidden"
    >
      <ul className="flex min-h-[var(--mobile-bar-height)] items-stretch">
        {navigation.map((item) => {
          const Icon = navigationIcons[item.to]
          return (
            <li key={item.to} className="flex min-w-0 flex-1">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => cn(
                  'relative flex min-h-[var(--mobile-bar-height)] w-full flex-col items-center justify-center gap-1 px-1 py-2 text-xs font-medium transition-colors focus-visible:-outline-offset-4 motion-reduce:transition-none',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {({ isActive }) => (
                  <>
                    <span aria-hidden="true" className={cn('absolute inset-x-5 top-0 h-0.5 rounded-b-full', isActive && 'bg-primary')} />
                    <span className={cn('flex h-7 w-12 items-center justify-center rounded-lg', isActive && 'bg-primary/15')}>
                      <Icon size={20} strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
