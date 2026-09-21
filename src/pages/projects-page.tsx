import { Helmet } from 'react-helmet-async'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { RouterButtonLink } from '@/components/ui/router-button-link'
import { ProjectCard, projects } from '@/features/projects'
import { useFocusHeading } from '@/hooks/use-focus-heading'
import { useAnnounceRoute } from '@/hooks/use-announce-route'
import { SITE_DESCRIPTION } from '@/config/site'
import { canonicalFor, pageTitle } from '@/lib/seo'

// Halaman showcase semua proyek ala referensi (grid poster + judul +
// deskripsi + pill teknologi). Home hanya menampilkan yang featured.
export function ProjectsPage() {
  const headingRef = useFocusHeading<HTMLHeadingElement>()
  const title = pageTitle('Proyek')
  useAnnounceRoute(title)
  const path = '/projects'

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={canonicalFor(path)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={canonicalFor(path)} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container narrow className="space-y-10 py-16 sm:py-20">
        <RouterButtonLink to="/" variant="ghost">
          <ArrowLeft size={16} aria-hidden="true" /> Kembali ke beranda
        </RouterButtonLink>
        <div>
          <p className="mb-3 font-mono text-sm text-primary">PORTFOLIO / PROYEK</p>
          <h1 ref={headingRef} tabIndex={-1} className="max-w-3xl text-4xl font-bold leading-tight outline-none sm:text-5xl">
            Showcase proyek.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Kumpulan proyek yang saya kerjakan.
          </p>
        </div>
        {projects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        ) : (
          <p className="text-muted-foreground">Proyek akan ditambahkan di sini.</p>
        )}
      </Container>
    </>
  )
}
