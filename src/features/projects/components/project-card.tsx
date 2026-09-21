import { Code2 } from 'lucide-react'
import { Link } from 'react-router'
import { Tag } from '@/components/ui/tag'
import { type Project } from '@/features/projects'

// Kartu persegi kompak sebagai link ke halaman detail /projects/:id.
// Poster aspect-square, body dipadatkan (padding, deskripsi 2 baris, 3 pill).
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      aria-label={`Lihat detail ${project.title}`}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`Tampilan ${project.title}`}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div aria-hidden="true" className="flex aspect-square w-full items-center justify-center bg-secondary text-primary">
          <Code2 size={40} strokeWidth={1} />
        </div>
      )}
      <div className="flex flex-1 flex-col space-y-1.5 p-3">
        <p className="font-display text-sm font-semibold text-foreground">{project.title}</p>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </Link>
  )
}
