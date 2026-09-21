import { Link, NavLink } from 'react-router'
import { navigation } from '@/config/navigation'
import { SocialIconGlyph, profile } from '@/features/profile'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { cn } from '@/lib/utils'
import { homeSectionPath } from '@/lib/seo'

// Nav berbasis route: Beranda (/) dan Proyek (/projects).
// Beranda memakai `end` agar hanya aktif di /.
export function DesktopNavigation() {
  return (
    <header className="fixed left-1/2 top-[max(1.25rem,env(safe-area-inset-top))] z-40 hidden w-max max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-4 rounded-full border bg-background/90 py-1.5 pl-5 pr-2 shadow-lg backdrop-blur-md md:flex lg:gap-6 lg:pl-6">
      <Link to={homeSectionPath('home')} className="shrink-0 rounded-sm font-display text-lg font-bold">
        {profile.name}<span className="text-primary">.</span>
      </Link>
      <nav aria-label="Navigasi utama">
        <ul className="flex items-center gap-1">
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => cn(
                  'inline-flex min-h-10 items-center rounded-full px-5 text-sm font-medium transition-colors motion-reduce:transition-none lg:px-6',
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {profile.socialLinks.length > 0 && (
        <ul aria-label="Media sosial" className="flex shrink-0 items-center gap-1 border-l border-border pl-4">
          {profile.socialLinks.map((link) => {
            const isEmail = link.url.startsWith('mailto:')
            return (
              <li key={link.url}>
                <a
                  href={link.url}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  aria-label={`Buka ${link.label}${isEmail ? '' : ' di tab baru'}`}
                  title={link.label}
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <SocialIconGlyph icon={link.icon} size={16} />
                </a>
              </li>
            )
          })}
        </ul>
      )}
      <div className="shrink-0 border-l border-border pl-1">
        <ThemeToggle />
      </div>
    </header>
  )
}
