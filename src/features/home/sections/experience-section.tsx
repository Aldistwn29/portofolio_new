import { Container } from '@/components/layout/container'
import { SectionTitle, Tag } from '@/components/ui/tag'
import { experiences } from '@/features/profile'

// Timeline border-l + dot ala referensi. field `description` dipakai sebagai
// ringkasan (padanan `summary` di referensi), `technologies` sebagai stack.
export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mt-16">
      <Container narrow className="space-y-6">
        <SectionTitle id="experience-title">Experience</SectionTitle>
        {experiences.length > 0 ? (
          <ol className="space-y-8 border-l border-border/70 pl-5">
            {experiences.map((exp) => (
              <li key={exp.id} className="relative">
                <span aria-hidden="true" className="absolute -left-[23px] top-2 size-2 rounded-full bg-primary/70" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-sm font-semibold text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      {exp.company}
                      <span className="sr-only"> (tab baru)</span>
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">{exp.company}</p>
                  )}
                  <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{exp.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.highlights.map((h) => (
                      <li key={h} className="text-sm text-muted-foreground">
                        <span aria-hidden="true" className="mr-2 text-primary">•</span>{h}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-muted-foreground">Pengalaman kerja akan ditambahkan di sini.</p>
        )}
      </Container>
    </section>
  )
}
