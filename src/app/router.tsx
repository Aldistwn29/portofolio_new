import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/app/root-layout'
import { RouteScrollManager } from '@/app/route-scroll-manager'
import { HomePage } from '@/pages/home-page'
import { ProjectsPage } from '@/pages/projects-page'
import { ProjectDetailPage } from '@/pages/project-detail-page'
import { projectDetailLoader } from '@/app/project-detail-loader'
import { NotFoundPage } from '@/pages/not-found-page'

// BrowserRouter (data router). Untuk hosting statis tanpa rewrite
// (mis. GitHub Pages murni), ganti ke HashRouter di main/App.
export const router = createBrowserRouter([
  {
    path: '/',
    // ScrollManager di dalam route agar selalu punya Router context.
    // RootLayout dipakai langsung agar bisa dipakai ulang sebagai
    // errorElement tanpa hook router di dalamnya.
    element: (
      <>
        <RouteScrollManager />
        <RootLayout />
      </>
    ),
    // 404 dari loader (ID proyek tak dikenal) tetap memakai layout global.
    errorElement: (
      <RootLayout>
        <NotFoundPage />
      </RootLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      {
        path: 'projects/:projectId',
        element: <ProjectDetailPage />,
        loader: projectDetailLoader,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
