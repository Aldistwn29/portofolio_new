import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionTitle } from '@/components/ui/tag'
import { RouterButtonLink } from '@/components/ui/router-button-link'
import { ProjectCard, projects } from '@/features/projects'

// Overview di home: maks 4 proyek featured; halaman /projects menampilkan semua.
const MAX_FEATURED = 4

export function ProjectsOverviewSection() {
  const featured = projects.filter((project) => project.featured).slice(0, MAX_FEATURED)

  return (
    <section id="projects" aria-labelledby="projects-title" className="mt-16 pb-16 sm:pb-24">
      <Container narrow className="space-y-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Featured Projects</p>
          <SectionTitle id="projects-title" className="mt-1">Check out my latest work</SectionTitle>
          <p className="mt-2 text-sm text-muted-foreground">From small experiments to full production apps. Click a card to see details.</p>
        </div>
        {featured.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {featured.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            {featured.length < projects.length && (
              <RouterButtonLink to="/projects" variant="outline">
                Lihat semua proyek <ArrowUpRight size={16} aria-hidden="true" />
              </RouterButtonLink>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Proyek akan ditambahkan di sini.</p>
        )}
      </Container>
    </section>
  )
}
