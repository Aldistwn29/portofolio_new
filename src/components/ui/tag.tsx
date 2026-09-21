import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

// Pill mono kecil untuk label teknologi.
export function Tag({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'rounded-lg border border-border/60 bg-card px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-primary/60 hover:text-primary',
        className,
      )}
      {...props}
    />
  )
}

// Judul section gaya referensi (h2 agar aria-labelledby section tetap valid).
export function SectionTitle({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl', className)}
      {...props}
    />
  )
}
