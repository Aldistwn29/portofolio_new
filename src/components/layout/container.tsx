import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = ComponentProps<'div'> & { narrow?: boolean }

// `narrow` = kolom sempit terpusat (max-w-3xl) ala halaman referensi.
export function Container({ narrow = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full', narrow ? 'max-w-3xl px-4' : 'max-w-6xl px-5 sm:px-8', className)}
      {...props}
    />
  )
}
