import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Teruskan SITE_URL (non-prefiks) ke bundle agar konsisten dengan skrip
  // scripts/seo.mjs dan scripts/prerender.mjs. Pengguna cukup set satu var:
  // SITE_URL=https://domain-anda.com npm run build (PowerShell: $env:SITE_URL=...).
  define: process.env.SITE_URL
    ? { 'import.meta.env.VITE_SITE_URL': JSON.stringify(process.env.SITE_URL) }
    : {},
  plugins: [
    react(),
    tailwindcss(),
  ],
})
