import { Container } from '@/components/layout/container'
import { SectionTitle } from '@/components/ui/tag'
import { EducationCard } from '@/features/home/sections/education-card'
import { profile } from '@/features/profile'

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="mt-16">
      <Container narrow className="space-y-4">
        <SectionTitle id="about-title">About</SectionTitle>
        <div className="border-l border-border/70 pl-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{profile.about}</p>
          {profile.education.length > 0 && (
            <ul aria-label="Pendidikan" className="mt-6 space-y-4">
              {profile.education.map((item) => <EducationCard key={item.school} item={item} />)}
            </ul>
          )}
        </div>
      </Container>
    </section>
  )
}
