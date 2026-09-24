import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

type ProjectLinksProps = {
  demoUrl?: string
  sourceUrl?: string
  title: string
  className?: string
}

// Ikon link eksternal kartu proyek: demo online (opsional) dan GitHub (opsional).
// Render null bila keduanya kosong. GitHub memakai sprite public/icons.svg
// (konsisten dengan SocialIconGlyph) karena ikon brand tidak ada di lucide.
export function ProjectLinks({ demoUrl, sourceUrl, title, className }: ProjectLinksProps) {
  if (!demoUrl && !sourceUrl) return null

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka demo online ${title}`}
          title="Demo online"
          className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ExternalLink size={16} aria-hidden="true" />
          <span className="sr-only"> (tab baru)</span>
        </a>
      )}
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka source code ${title} di GitHub`}
          title="GitHub"
          className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <svg width={16} height={16} aria-hidden="true">
            <use href="/icons.svg#github-icon" />
          </svg>
          <span className="sr-only"> (tab baru)</span>
        </a>
      )}
    </div>
  )
}
