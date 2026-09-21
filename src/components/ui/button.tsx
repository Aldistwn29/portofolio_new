import type { ComponentProps } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>

// React 19: ref diteruskan melalui props, termasuk saat digunakan oleh asChild.
export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

type ButtonLinkProps = ComponentProps<'a'> & VariantProps<typeof buttonVariants>

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
