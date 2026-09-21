import type { SocialIcon } from '@/features/profile/components/social-icon'

export type SocialLink = {
  label: string
  url: string
  icon: SocialIcon
}

export type Education = {
  school: string
  schoolUrl?: string
  // Hasil import gambar Vite, mis. dari src/assets/images/education/.
  // Opsional: bila kosong, kartu memakai ikon GraduationCap sebagai fallback.
  logo?: string
  degree: string
  period: string
}

export type Experience = {
  id: string
  company: string
  companyUrl?: string
  // Hasil import gambar Vite, mis. dari src/assets/images/companies/.
  // Opsional: bila kosong, kartu memakai inisial perusahaan sebagai fallback.
  logo?: string
  role: string
  period: string
  description: string
  highlights?: string[]
  technologies: string[]
}

export type TechStackGroup = {
  category: string
  items: string[]
}

export type Profile = {
  name: string
  greeting: string
  role: string
  location: string
  about: string
  // Hasil import gambar Vite, mis. dari src/assets/images/profile/.
  // Opsional: bila kosong, hero memakai inisial nama sebagai fallback.
  photo?: string
  education: Education[]
  email?: string
  socialLinks: SocialLink[]
}
