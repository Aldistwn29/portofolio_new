import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

type RouterButtonLinkProps = Omit<RouterLinkProps, 'className'> &
  VariantProps<typeof buttonVariants> & { className?: string }

// Link router dengan gaya button untuk navigasi internal SPA.
export function RouterButtonLink({ className, variant, size, ...props }: RouterButtonLinkProps) {
  return <RouterLink className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
