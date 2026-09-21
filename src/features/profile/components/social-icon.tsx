import { Mail } from 'lucide-react'

// Ikon presentasi milik komponen ini (bukan data): data profil hanya
// menyimpan string yang cocok dengan union ini.
export type SocialIcon = 'github' | 'linkedin' | 'email'

// Ukuran default 18px; bisa dioverride via prop `size`.
type SocialIconProps = { icon: SocialIcon; size?: number }

// GitHub + LinkedIn tidak tersedia di lucide-react (ikon brand dihapus),
// jadi diambil dari sprite public/icons.svg via <use>. Email memakai Mail lucide.
export function SocialIconGlyph({ icon, size = 18 }: SocialIconProps) {
  if (icon === 'email') {
    return <Mail size={size} aria-hidden="true" />
  }
  return (
    <svg width={size} height={size} aria-hidden="true">
      <use href={`/icons.svg#${icon}-icon`} />
    </svg>
  )
}
