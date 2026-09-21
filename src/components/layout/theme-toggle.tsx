import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

// Toggle tema light/dark. Varian `pill` untuk nav desktop,
// `menu-row` untuk baris dalam dropdown menu mobile.
export function ThemeToggle({ variant = 'pill' }: { variant?: 'pill' | 'menu-row' }) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  if (variant === 'menu-row') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isLight ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
        aria-pressed={isLight}
        className="flex min-h-12 w-full items-center gap-3 rounded-xl px-4 text-base font-medium text-foreground transition-colors hover:bg-accent motion-reduce:transition-none"
      >
        {isLight ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
        <span className="flex-1 text-left">{isLight ? 'Mode gelap' : 'Mode terang'}</span>
        <span aria-hidden="true" className="font-mono text-xs text-muted-foreground">
          {isLight ? 'AKTIF: TERANG' : 'AKTIF: GELAP'}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
      aria-pressed={isLight}
      title={isLight ? 'Mode gelap' : 'Mode terang'}
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors',
        'hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      )}
    >
      {isLight ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
    </button>
  )
}
