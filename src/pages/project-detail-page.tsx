import { Helmet } from 'react-helmet-async'
import { Link, useLoaderData } from 'react-router'
import { Code2, ExternalLink } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ButtonLink } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
import { ProjectCard, projects, type Project } from '@/features/projects'
import { useFocusHeading } from '@/hooks/use-focus-heading'
import { useAnnounceRoute } from '@/hooks/use-announce-route'
import type { projectDetailLoader } from '@/app/project-detail-loader'
import { SITE_OG_IMAGE, SITE_URL } from '@/config/site'
import { canonicalFor, pageTitle } from '@/lib/seo'

// Loader ada di app/project-detail-loader agar file ini hanya mengekspor komponen.

function relatedProjects(project: Project): Project[] {
  const related = projects.filter(
    (item) => item.id !== project.id && item.technologies.some((tech) => project.technologies.includes(tech)),
  )
  if (related.length > 0) return related.slice(0, 3)
  return projects.filter((item) => item.id !== project.id).slice(0, 3)
}

export function ProjectDetailPage() {
  const project = useLoaderData<typeof projectDetailLoader>()
  const headingRef = useFocusHeading<HTMLHeadingElement>()
  useAnnounceRoute(pageTitle(project.title))
  const related = relatedProjects(project)
  const path = `/projects/${project.id}`
  const ogImage = project.image?.startsWith('/') ? `${SITE_URL}${project.image}` : SITE_OG_IMAGE

  return (
    <>
      <Helmet>
        <title>{pageTitle(project.title)}</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={canonicalFor(path)} />
        <meta property="og:title" content={pageTitle(project.title)} />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={canonicalFor(path)} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={pageTitle(project.title)} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <Container narrow className="space-y-10 py-16 sm:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Beranda</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/projects" className="hover:text-primary">Proyek</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">{project.title}</li>
          </ol>
        </nav>
        <article className="space-y-6">
          <div>
            <p className="mb-3 font-mono text-sm text-primary">PROYEK / DETAIL</p>
            {project.period && <p className="mb-2 font-mono text-xs text-muted-foreground">{project.period}</p>}
            <h1 ref={headingRef} tabIndex={-1} className="max-w-3xl text-4xl font-bold leading-tight outline-none sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{project.description}</p>
          </div>
          {project.image ? (
            <img
              src={project.image}
              alt={`Tampilan ${project.title}`}
              className="aspect-video w-full rounded-lg object-cover"
            />
          ) : (
            <div aria-hidden="true" className="flex aspect-video w-full items-center justify-center rounded-lg bg-secondary text-primary">
              <Code2 size={48} strokeWidth={1} />
            </div>
          )}
          <p className="text-sm leading-7 text-muted-foreground">{project.details}</p>
          {project.highlights && project.highlights.length > 0 && (
            <ul aria-label="Poin utama" className="space-y-1">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="text-sm leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mr-2 text-primary">•</span>{highlight}
                </li>
              ))}
            </ul>
          )}
          {project.technologies.length > 0 && (
            <ul aria-label="Teknologi" className="flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <li key={technology}><Tag>{technology}</Tag></li>
              ))}
            </ul>
          )}
          {(project.demoUrl || project.sourceUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.demoUrl && (
                <ButtonLink href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Demo <ExternalLink size={16} aria-hidden="true" />
                  <span className="sr-only"> (tab baru)</span>
                </ButtonLink>
              )}
              {project.sourceUrl && (
                <ButtonLink variant="outline" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <Code2 size={16} aria-hidden="true" /> Source code
                  <span className="sr-only"> (tab baru)</span>
                </ButtonLink>
              )}
            </div>
          )}
        </article>
        {related.length > 0 && (
          <section aria-labelledby="related-title" className="space-y-6 border-t pt-10">
            <h2 id="related-title" className="text-2xl font-semibold sm:text-3xl">Proyek terkait.</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((item) => <ProjectCard key={item.id} project={item} />)}
            </div>
          </section>
        )}
      </Container>
    </>
  )
}
