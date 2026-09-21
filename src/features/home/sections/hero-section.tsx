import type { RefObject } from 'react'
import { MapPin } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { profile } from '@/features/profile'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function HeroSection({ headingRef }: { headingRef?: RefObject<HTMLHeadingElement | null> }) {
  return (
    <section id="home" aria-labelledby="hero-title" className="py-20 sm:py-24">
      <Container narrow>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.name}
              width={224}
              height={224}
              className="size-28 shrink-0 rounded-full border border-border object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-28 shrink-0 items-center justify-center rounded-full border border-border bg-secondary font-display text-3xl font-bold text-primary"
            >
              {initials(profile.name)}
            </span>
          )}
          <div className="space-y-3">
            <h1 ref={headingRef} id="hero-title" tabIndex={-1} className="font-display text-3xl font-bold tracking-tight text-foreground outline-none sm:text-4xl">
              {profile.greeting} <span className="inline-block" aria-hidden="true">👋</span>
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">{profile.role}</p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary px-3 py-1 text-xs text-secondary-foreground">
              <MapPin className="size-3.5 text-primary" aria-hidden="true" />
              {profile.location}
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}