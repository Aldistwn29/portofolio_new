import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { SocialIconGlyph, profile } from '@/features/profile'
import { navigation } from '@/config/navigation'
import { cn } from '@/lib/utils'

// Dropdown hamburger di header mobile (kanan atas). Berisi link route
// (Beranda, Proyek), toggle tema, dan navlink sosial (ikon + label).
// Menutup saat: link diklik, Escape ditekan, atau klik di luar panel.
// Fokus kembali ke trigger.
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Klik di luar panel menutup (setState di dalam event callback — aman).
  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open ])

  // Escape menutup + fokus kembali ke trigger.
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open ])

  // Fokus ke panel saat dibuka agar keyboard langsung di dalam menu.
  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open ])

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      {open && (
        <div
          ref={panelRef}
          id="mobile-menu-panel"
          tabIndex={-1}
          className="absolute right-0 top-full mt-2 w-60 rounded-2xl border bg-card p-2 text-card-foreground shadow-xl focus:outline-none"
        >
          <nav aria-label="Navigasi halaman">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => cn(
                      'flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors motion-reduce:transition-none',
                      isActive
                        ? 'bg-primary/15 text-primary'
                        : 'text-foreground hover:bg-accent',
                    )}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-1 border-t border-border pt-1">
            <ThemeToggle variant="menu-row" />
          </div>
          {profile.socialLinks.length > 0 && (
            <nav aria-label="Media sosial" className="mt-1 border-t border-border pt-1">
              <ul className="space-y-1">
                {profile.socialLinks.map((link) => {
                  const isEmail = link.url.startsWith('mailto:')
                  return (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target={isEmail ? undefined : '_blank'}
                        rel={isEmail ? undefined : 'noopener noreferrer'}
                        onClick={() => setOpen(false)}
                        className="flex min-h-12 items-center gap-3 rounded-xl px-4 text-base font-medium text-foreground transition-colors hover:bg-accent motion-reduce:transition-none"
                      >
                        <SocialIconGlyph icon={link.icon} size={20} />
                        {link.label}
                        {!isEmail && <span className="sr-only"> (tab baru)</span>}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  )
}
