import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { SocialIconGlyph } from '@/features/profile/components/social-icon'
import { profile } from '@/features/profile/data/profile'

// Tombol ikon sosial (LinkedIn/GitHub/Email). Tidak dirender saat
// profile.socialLinks kosong — isi dulu URL asli di data/profile.ts.
// mailto: dibuka tanpa tab baru dan tanpa embel-embel "(tab baru)".
export function SocialLinks({ compact = false }: { compact?: boolean }) {
  if (profile.socialLinks.length === 0) return null

  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Media sosial">
      {profile.socialLinks.map((link) => {
        const isEmail = link.url.startsWith('mailto:')
        const actionHint = isEmail ? '' : ' di tab baru'
        return (
          <li key={link.url}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={link.url}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  aria-label={`Buka ${link.label}${actionHint}`}
                  className={
                    compact
                      ? 'inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
                      : 'inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
                  }
                >
                  <SocialIconGlyph icon={link.icon} size={compact ? 16 : 18} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                Buka {link.label}
                {actionHint}
              </TooltipContent>
            </Tooltip>
          </li>
        )
      })}
    </ul>
  )
}
