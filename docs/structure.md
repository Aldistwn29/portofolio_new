# Struktur portfolio

## Menjalankan proyek

```sh
npm install
npm run dev
npm run build
npm run lint
```

Build produksi dengan domain sendiri (agar canonical/OG/sitemap absolut benar):

```sh
# PowerShell
$env:SITE_URL = "https://domain-anda.com"; npm run build
```

## Arsitektur: SPA 2 halaman

Single-page app (BrowserRouter, tanpa SSR):

```text
/                 Home — hero, about (tentang saya), experience,
                  tech-stack, overview proyek (maks 4 featured, grid 2x2)
                  + anchor #home #about #experience #stack #projects
/projects          Showcase semua proyek (grid kartu landscape 16:9)
/projects/:id     Detail proyek (breadcrumb, konten penuh, terkait, OG per proyek)
/lainnya          Halaman 404
```

Klik kartu mana pun (home maupun `/projects`) membuka halaman detail
`/projects/:id` — tanpa popup/dialog. Overview home menampilkan maks 4
featured dalam grid 2x2 dengan tombol "Explore Projects" (selalu tampil bila
ada proyek) menuju `/projects`; sub-heading overview rata tengah; ada jarak
lega antara grid dan footer.

Navigasi utama berbasis route: hanya Beranda (`/`) dan Proyek (`/projects`),
dengan status aktif dari `NavLink` (Beranda memakai `end`). Desktop menampilkannya sebagai pill;
mobile sebagai header atas (brand kiri + hamburger kanan) dan bottom bar
(2 link route Beranda + Proyek, tanpa toggle tema): tombol hamburger
membuka dropdown berisi link Beranda/Proyek (teks, tanpa ikon), toggle
light/dark, dan navlink sosial (ikon + label: LinkedIn, GitHub, email bila
diisi di `profile.socialLinks`). Pill desktop juga menampilkan ikon sosial yang sama. Section-section home (tentang, pengalaman, stack) tidak tampil
di nav — dijangkau via scroll home, CTA dalam halaman, dan quick-link footer
(`sectionLinks` di `config/navigation.ts`). Untuk hosting statis tanpa rewrite
(mis. GitHub Pages murni), ganti `createBrowserRouter` ke `createHashRouter`
di `src/app/router.tsx` atau manfaatkan `dist/404.html` hasil prerender
sebagai fallback.

## Pembagian tanggung jawab (feature-first)

```text
public/                 File publik bernama tetap: favicon, OG image, CV, icons.svg
src/
  app/                  Router, RootLayout, RouteScrollManager
  pages/                HomePage, ProjectsPage, NotFoundPage
                        (murni komponen; tanpa loader, tanpa section)
  features/             Kode milik satu domain (data + tipe + komponen + section)
    home/
      sections/         hero, about, education-card, experience, tech-stack,
                        projects-overview
      index.ts          Barrel section-section home
    projects/
      components/       project-card (article: gambar/judul link ke
                        /projects/:id + ikon demo/GitHub opsional),
                        project-links (ikon Demo online + GitHub, null bila kosong)
                        project-detail-dialog dihapus (detail jadi halaman)
      data/projects.ts  Konten proyek statis
      types.ts          Tipe Project (colocated dengan domainnya)
      index.ts          Barrel data + tipe + komponen publik
    profile/
      components/       social-links, social-icon (+ tipe SocialIcon di sini)
      data/             profile.ts, experience.ts, tech-stack.ts
      types.ts          Profile, Education, Experience, TechStackGroup, SocialLink
      index.ts          Barrel data + tipe + komponen publik
  components/
    ui/                 Wrapper Radix dan komponen UI generik lintas fitur
                        (+ tag.tsx: Tag pill mono dan SectionTitle)
    layout/             Container (+ prop `narrow` = kolom max-w-3xl),
                        navigasi desktop/mobile, footer, theme-toggle
  config/               Konstanta situs: navigation.ts, site.ts
  hooks/                Logika React bersama lintas fitur
  lib/                  Fungsi murni: seo.ts, scroll.ts, theme.ts (+ store), utils.ts
  App.tsx               HelmetProvider + TooltipProvider + RouterProvider
  main.tsx              Entry React
  index.css             Token tema dan base styles
  assets/               Gambar yang diimpor dan diproses Vite
                        (images/profile, images/companies, images/education, images/projects)
scripts/
  seo.mjs               Validasi ID unik + generate sitemap.xml/robots.txt (pre-build)
  prerender.mjs         Salin index.html → dist/projects/index.html (showcase)
                        + 404.html (post-build)
index.html              HTML awal dan metadata Open Graph statis (default)
```

Prinsip:

- **Feature-first, bukan layer-first.** Semua milik satu domain tinggal di
  `features/<domain>/` dan diekspor lewat `index.ts` (barrel). Konsumen
  mengimpor dari barrel (`@/features/projects`), bukan path dalam.
- **`components/` hanya untuk shared lintas fitur** (`ui`, `layout`).
- **`config/` untuk konstanta situs** (navigasi, URL/nama situs).
- **`lib/` murni fungsi tanpa lifecycle React** (`cn`, SEO, scroll, theme store).
- **Tipe colocated dengan domainnya** — tidak ada folder `types/` global;
  tipe presentasi milik komponennya (`SocialIcon` di `social-icon.tsx`),
  tipe domain milik `features/<domain>/types.ts`.

## Alur

`main.tsx → App.tsx (RouterProvider) → app/router.tsx → RootLayout → pages → features/<domain> → components/ui → Radix`

`HomePage` merangkai section dari barrel `@/features/home` dalam layout sempit
(`Container narrow`, max-w-3xl): hero (foto + sapaan + role + lokasi) →
tentang (border-l + edukasi) → pengalaman (timeline border-l + dot) →
tech-stack (satu pill cloud) → overview (maks 4 featured + tombol ke /projects,
sub-heading tengah, padding bawah lega ke footer).
`ProjectsPage` menampilkan semua proyek. Klik kartu mana pun membuka halaman
detail `/projects/:id` (breadcrumb, konten penuh, highlights, teknologi,
Demo/Source, terkait) — tanpa popup. `ProjectDetailPage` memakai loader sync
di `app/project-detail-loader.ts`. `NotFoundPage` dipakai untuk route `*` dan
sebagai `errorElement` (404 dari loader ID tak dikenal).

`SiteNavigation` merender `DesktopNavigation` (pill Beranda + Proyek di atas
pada lebar >= 768 px), `MobileNavigation` (header atas mobile: brand kiri
+ hamburger kanan, hanya di bawah 768 px), dan `MobileBottomBar` (bar bawah
mobile: 2 link route Beranda + Proyek dengan ikon, tanpa toggle tema).
Dropdown hamburger (`MobileMenu`) berisi link Beranda/Proyek (`NavLink`, teks
tanpa ikon), baris toggle Tema, dan navlink sosial (ikon + label);
menutup saat link diklik, Escape, atau klik di luar, dengan fokus kembali ke tombol hamburger. Semuanya membaca route dari
`config/navigation.ts`; footer membaca `sectionLinks` untuk quick-link section.

Semua link section memakai path absolut `/#id` (helper `homeSectionPath`)
agar berfungsi dari route mana pun — dipakai CTA hero/footer dan quick-link
footer. `RouteScrollManager` menangani scroll ke section/navigasi atas setiap
pindah route; offset anchor tetap via `scroll-padding-top` di `index.css`.

## SEO dan Open Graph

1. `index.html` berisi meta statis default (canonical, OG, Twitter) —
   crawler/share yang tidak mengeksekusi JS membaca ini.
2. `lib/seo.ts` + `react-helmet-async` mengatur title/deskripsi dinamis per
   route untuk browser dan crawler yang mengeksekusi JS.
3. `scripts/prerender.mjs` menyalin `dist/index.html` menjadi
   `dist/projects/index.html` (showcase) dan `dist/projects/<id>/index.html`
   (detail, `og:type=article`) dengan title/canonical/OG yang sesuai +
   fallback `<noscript>`, plus `dist/404.html` untuk hosting statis.
4. `scripts/seo.mjs` memvalidasi ID proyek unik (untuk route `/projects/:id`)
   dan menulis `public/sitemap.xml` (`/`, `/projects`, + per-id) +
   `public/robots.txt` dari data statis.
5. Domain produksi via `SITE_URL` (lihat perintah build di atas);
   `src/config/site.ts` membaca `VITE_SITE_URL` yang diteruskan `vite.config.ts`.

Variabel spacing navigasi di `index.css` menjaga konten/footer tetap terlihat dan menangani safe area perangkat. Hook mengikuti `scroll-padding-top` sehingga link aktif dan posisi anchor memakai offset responsif yang sama. Navigasi berada pada z-index 40, di bawah dialog (50).

## Mengubah konten

- `features/profile/data/profile.ts`: ubah `greeting` (sapaan h1 hero), `role`, `location`, `photo` (hasil import dari `src/assets/images/profile/`), `about`, dan `education[]` (`school`, `schoolUrl?`, `logo?`, `degree`, `period`). Tambahkan `email`, isi `socialLinks` dengan `{ label, url, icon }` menggunakan URL HTTPS akun asli (`icon` salah satu dari `'github' | 'linkedin' | 'email'`). Field kosong tidak menghasilkan link/gambar palsu (sosial tetap ada di footer + desktop pill).
- `features/profile/data/experience.ts`: tambah pengalaman `{ id, company, companyUrl?, logo?, role, period, description, highlights?[], technologies[] }` — ID unik. `description` tampil sebagai ringkasan; logo perusahaan tidak ditampilkan di timeline (hanya thumbnail kecil di education-card bila `logo` diisi).
- `features/profile/data/tech-stack.ts`: isi teknologi per kategori; tampil sebagai satu pill cloud (kategori tidak ditampilkan, tetap disimpan untuk pemakaian mendatang).
- `features/projects/data/projects.ts`: tambahkan proyek dengan ID unik, deskripsi, detail, teknologi. Yang dirender kartu: `image` (landscape 16:9), judul (link detail), deskripsi (2 baris), 3 teknologi pertama, footer berisi link "Lihat detail" + ikon Demo online/GitHub opsional dari `demoUrl`/`sourceUrl` (tidak tampil bila kosong); klik kartu membuka halaman detail yang merender `details`, `highlights`, semua teknologi, `demoUrl`/`sourceUrl`, dan `period`. Set `featured: true` agar tampil di home (maks 4, halaman `/projects` menampilkan semua).
- `public/icons.svg`: sprite ikon brand (GitHub, LinkedIn) via `<use>`; gunakan `fill="currentColor"` agar mengikuti tema. Email memakai ikon `Mail` lucide-react.
- Untuk screenshot, tambahkan file ke `src/assets/images/projects/`, impor di `projects.ts`, lalu gunakan hasil import sebagai `image`.
- `src/config/navigation.ts`: `navigation` (2 route: `/`, `/projects`) untuk nav utama; `sectionLinks` (Tentang, Pengalaman, Stack via `/#id`) untuk quick-link footer.
- `src/index.css`: ubah token OKLCH untuk mengganti tema seluruh komponen.
- Untuk OG produksi, gunakan URL website serta gambar publik yang benar pada `index.html`; metadata jangan hanya dibuat melalui JavaScript di browser.

## Konvensi

- File kebab-case, komponen PascalCase, hook berawalan `use`.
- Alias `@/` mengarah ke `src/` dan dikonfigurasi di Vite serta TypeScript.
- Konsumsi fitur lewat barrel-nya (`@/features/projects`), bukan path dalam.
- Props khusus komponen ditempatkan di file komponen; tipe domain di `features/<domain>/types.ts`.
- Gunakan `cn()` dari `lib/utils.ts` untuk menggabungkan class Tailwind.
- Wrapper button meneruskan props/ref React 19 agar kompatibel dengan `asChild` Radix.
- Pertahankan DialogTitle, DialogDescription, label tombol ikon, dan akses keyboard.
- Tambahkan folder atau abstraksi saat ada kebutuhan, bukan sebagai folder kosong.

## File yang dihapus (rapihan)

Sisa template/kode mati: `src/App.css`, `src/assets/react.svg`,
`src/assets/vite.svg`, `src/assets/hero.png`,
`src/components/ui/dropdown-menu.tsx`, dependensi `open-graph` dan
`@radix-ui/react-dropdown-menu`.

Catatan: `src/components/ui/dialog.tsx` (wrapper Radix Dialog) saat ini tidak
dipakai komponen mana pun — dropdown hamburger mobile memakai dropdown kustom
(`useState` + klik-luar + Escape + fokus-return manual). Bundle tidak
terpengaruh (tree-shaken), dan wrapper tetap tersedia bila nanti butuh modal.

## Pemeriksaan manual

1. Jalankan aplikasi dan periksa layout di layar kecil serta desktop.
2. Gunakan Tab untuk mengakses skip link dan navigasi.
3. Pada lebar < 768 px, periksa header atas (brand kiri + hamburger kanan) dan bottom bar (2 link Beranda + Proyek dengan ikon, tanpa Tema): indikator aktif benar di keduanya, area aman perangkat, dan footer/konten tidak tertutup bar. Buka hamburger: dropdown tampil di kanan atas dengan link Beranda/Proyek (teks, indikator aktif benar) dan toggle Tema. Pada lebar >= 768 px, periksa pill Beranda + Proyek beserta toggle tema di ujungnya. Hanya navigasi yang terlihat yang boleh menerima fokus Tab.
4. Dropdown hamburger: Escape menutup dan mengembalikan fokus ke tombol hamburger, klik di luar menutup, klik link mana pun menutup. Jika preferensi reduced motion aktif, tidak ada animasi berlebihan.
5. Toggle Tema (ikon Matahari/Bulan): klik harus mengganti seluruh palet terang/gelap tanpa reload, pilihan tersimpan di localStorage, dan menghormati preferensi OS pada kunjungan pertama. Reload halaman tidak boleh menampilkan flash tema yang salah.
6. Home tampil sempit terpusat (max-w-3xl): hero foto/inisial + sapaan + role + pill lokasi; about border-l + edukasi; experience timeline dot; tech-stack satu pill cloud; overview maks 4 kartu landscape (maks 2 kolom) dengan sub-heading rata tengah dan jarak lega ke footer; klik kartu membuka halaman detail.
7. Buka halaman penuh `/projects`: semua proyek tampil dalam grid. Buka `/projects/<id>`: breadcrumb (Beranda / Proyek / ...), konten detail (gambar, deskripsi, highlights, teknologi, Demo/Source), proyek terkait, dan judul tab harus benar. Buka `/projects/tidak-ada`: halaman 404 dengan layout tampil.
8. Pindah route antar halaman: fokus harus ke heading (h1) dan live region mengumumkan judul halaman.
9. Dari halaman detail/proyek, klik Beranda lalu quick-link footer (Tentang, Pengalaman, Stack): harus kembali ke home lalu scroll ke section target.
10. Status aktif nav: di `/` yang aktif Beranda; di `/projects` maupun `/projects/<id>` yang aktif Proyek.
11. Klik setiap link, ubah ukuran viewport, lalu periksa heading section dan footer tidak tertutup navigasi. Pill desktop ramping (link ~40px tinggi, padding-x lega); tidak ada dialog proyek lagi.
12. Setelah `npm run build`: periksa `dist/projects/index.html` (showcase) dan `dist/projects/<id>/index.html` memuat title/canonical/OG yang benar (`og:type=article` untuk detail), dan `public/sitemap.xml` memuat `/`, `/projects`, + per-id.

Untuk OG produksi, set `SITE_URL` saat build dan gunakan gambar publik JPG/PNG
1200x630 (ganti placeholder `public/og-default.svg`); metadata jangan hanya
dibuat melalui JavaScript di browser.
