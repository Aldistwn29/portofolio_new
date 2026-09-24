import { ArrowUpRight, Code2 } from 'lucide-react'
import { Link } from 'react-router'
import { Tag } from '@/components/ui/tag'
import { type Project } from '@/features/projects'
import { ProjectLinks } from '@/features/projects/components/project-links'

// Kartu landscape kompak: gambar + judul menaut ke halaman detail
// /projects/:id, footer berisi link detail + ikon demo/GitHub opsional.
// Dibuat sebagai <article> (bukan satu <Link> besar) agar <a> eksternal
// tidak nested di dalam link — tidak valid secara a11y/HTML.
export function ProjectCard({ project }: { project: Project }) {
  const detailPath = `/projects/${project.id}`

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-colors hover:border-primary/50">
      <Link
        to={detailPath}
        aria-label={`Lihat detail ${project.title}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`Tampilan ${project.title}`}
            loading="lazy"
            width={800}
            height={450}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div aria-hidden="true" className="flex aspect-video w-full items-center justify-center bg-secondary text-primary">
            <Code2 size={32} strokeWidth={1} />
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col space-y-1.5 p-3">
        <Link
          to={detailPath}
          className="rounded-sm font-display text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {project.title}
        </Link>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
        <div className="flex items-center justify-between pt-1">
          <Link
            to={detailPath}
            aria-label={`Lihat detail ${project.title}`}
            className="inline-flex items-center gap-1 rounded-sm text-xs font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Lihat detail <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <ProjectLinks demoUrl={project.demoUrl} sourceUrl={project.sourceUrl} title={project.title} />
        </div>
      </div>
    </article>
  )
}
