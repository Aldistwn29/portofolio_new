import { Container } from '@/components/layout/container'
import { SectionTitle, Tag } from '@/components/ui/tag'
import { techStack } from '@/features/profile'

// Satu pill cloud dari seluruh kategori (kategori tetap di data
// untuk pemakaian mendatang, tapi tidak ditampilkan).
export function TechStackSection() {
  const items = [...new Set(techStack.flatMap((group) => group.items))]

  return (
    <section id="stack" aria-labelledby="stack-title" className="mt-16">
      <Container narrow className="space-y-4">
        <SectionTitle id="stack-title">Tech Stack</SectionTitle>
        <p className="text-sm text-muted-foreground">My tools of choice</p>
        {items.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => <Tag key={item}>{item}</Tag>)}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Tech stack akan ditambahkan di sini.</p>
        )}
      </Container>
    </section>
  )
}
