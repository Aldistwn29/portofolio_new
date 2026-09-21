import { Link } from 'react-router'
import { Container } from '@/components/layout/container'
import { SocialLinks, profile } from '@/features/profile'
import { sectionLinks } from '@/config/navigation'
import { homeSectionPath } from '@/lib/seo'

export function SiteFooter() {
  return (
    <footer className="border-t py-7 text-sm text-muted-foreground">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <nav aria-label="Tautan section">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {sectionLinks.map((item) => (
              <li key={item.id}>
                <Link to={homeSectionPath(item.id)} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks compact />
        <Link to={homeSectionPath('home')} className="hover:text-primary">Kembali ke atas ↑</Link>
      </Container>
    </footer>
  )
}
