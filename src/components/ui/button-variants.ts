import { cva } from 'class-variance-authority'

// Dipisah dari button.tsx agar file komponen tetap memenuhi aturan
// react-refresh/only-export-components dan bisa dipakai ulang.
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-border bg-background text-foreground hover:bg-accent',
        ghost: 'text-muted-foreground hover:bg-accent hover:text-foreground',
      },
      size: { default: 'min-h-11 px-5 py-2', icon: 'size-11 shrink-0' },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
)
