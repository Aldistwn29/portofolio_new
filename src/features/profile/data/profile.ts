import profilePhoto from '@/assets/portofolio-image.jpeg'
import type { Profile } from '@/features/profile/types'

// CONTOH sementara agar ikon sosial tampil di navbar/footer.
// TODO: ganti dengan URL asli sebelum produksi.
// Gambar diimpor agar Vite membundelnya ke dist/assets (string path mentah
// tidak diproses bundler sehingga 404 di production).
export const profile: Profile = {
  name: "Aldi Setiawan",
  greeting: "Hallo, Saya Aldi Setiawan",
  role: "Sofware Engineer | Fullstack Developer",
  location: "Indonesia",
  about: "i'm Aldi Setiawan fresh graduate from Universitas Nusa Putra with experience in data analysis and software developement. i enjoy build practical web applications from the initial ide to deployment using technologi. i have also explored AI integration and data analysis through academic, internship, and personal projects. i'm interest in software engineer",
  education: [],
  photo: profilePhoto,
  email: "aldi60051@gmail.com",
  socialLinks: [
    { label: "LinkedIn", url: "https://linkedin.com/in/aldi-setiawan29", icon: "linkedin" },
    { label: "GitHub", url: "https://github.com/Aldistwn29", icon: "github" },
    { label: "Email", url: "mailto:aldi60051@gmail.com", icon: "email" },
  ],
}
