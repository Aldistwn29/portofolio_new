import { Helmet } from 'react-helmet-async'
import {
  AboutSection,
  ExperienceSection,
  HeroSection,
  ProjectsOverviewSection,
  TechStackSection,
} from '@/features/home'
import { profile } from '@/features/profile'
import { useFocusHeading } from '@/hooks/use-focus-heading'
import { useAnnounceRoute } from '@/hooks/use-announce-route'
import { SITE_DESCRIPTION, SITE_NAME } from '@/config/site'
import { canonicalFor, pageTitle } from '@/lib/seo'

const title = `${profile.name} — ${profile.role}`

// Halaman utama: komposisi section satu halaman.
// Navigasi utama berbasis route (status aktif dari NavLink);
// section dijangkau via scroll, CTA, dan quick-link footer.
export function HomePage() {
  const heroHeadingRef = useFocusHeading<HTMLHeadingElement>()
  useAnnounceRoute(SITE_NAME)

  return (
    <>
      <Helmet>
        <title>{pageTitle(title)}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={canonicalFor('/')} />
        <meta property="og:title" content={pageTitle(title)} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={canonicalFor('/')} />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroSection headingRef={heroHeadingRef} />
      <AboutSection />
      <ExperienceSection />
      <TechStackSection />
      <ProjectsOverviewSection />
    </>
  )
}
