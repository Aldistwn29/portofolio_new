import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router'
import { TooltipProvider } from '@/components/ui/tooltip'
import { router } from '@/app/router'

// Komposisi halaman pindah ke pages/*; RootLayout menyediakan navigasi global.
// Catatan GitHub Pages (static tanpa rewrite): ganti router di app/router.tsx
// menjadi createHashRouter jika deep-link refresh 404 tidak bisa dihindari.
function App() {
  return (
    <HelmetProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </HelmetProvider>
  )
}

export default App
