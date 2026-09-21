import { Helmet } from 'react-helmet-async'
import { Container } from '@/components/layout/container'
import { RouterButtonLink } from '@/components/ui/router-button-link'
import { useFocusHeading } from '@/hooks/use-focus-heading'
import { useAnnounceRoute } from '@/hooks/use-announce-route'
import { pageTitle } from '@/lib/seo'

// Dipakai untuk route `*` dan sebagai errorElement untuk 404 dari loader.
export function NotFoundPage() {
  const headingRef = useFocusHeading<HTMLHeadingElement>()
  useAnnounceRoute(pageTitle('Halaman tidak ditemukan'))

  return (
    <>
      <Helmet>
        <title>{pageTitle('Halaman tidak ditemukan')}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container narrow className="space-y-6 py-24 text-center sm:py-32">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 ref={headingRef} tabIndex={-1} className="text-4xl font-bold sm:text-5xl">
          Halaman tidak ditemukan.
        </h1>
        <p className="mx-auto max-w-xl leading-7 text-muted-foreground">
          Alamat yang kamu buka tidak tersedia. Kembali ke beranda untuk menjelajahi portfolio.
        </p>
        <RouterButtonLink to="/">Kembali ke beranda</RouterButtonLink>
      </Container>
    </>
  )
}
