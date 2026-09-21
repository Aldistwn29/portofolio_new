import { ExternalLink } from 'lucide-react'
import type { Education } from '@/features/profile'

// Baris pendidikan ala referensi: sekolah + jurusan di kiri, periode di kanan.
export function EducationCard({ item }: { item: Education }) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        {item.logo && (
          <img src={item.logo} alt="" aria-hidden="true" loading="lazy" className="size-6 shrink-0 rounded-md border object-contain" />
        )}
        <div>
          {item.schoolUrl ? (
            <a
              href={item.schoolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {item.school}
              <ExternalLink size={12} aria-hidden="true" />
              <span className="sr-only"> (tab baru)</span>
            </a>
          ) : (
            <p className="text-sm font-semibold text-foreground">{item.school}</p>
          )}
          <p className="text-xs text-muted-foreground">{item.degree}</p>
        </div>
      </div>
      <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
    </li>
  )
}
