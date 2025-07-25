import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Layout from './Layout.tsx'
import DetailPage from './pages/detail/DetailPage.tsx'
import MainPage from './pages/main/MainPage.tsx'
import { ThemeProvider } from '@emotion/react'
import theme from './theme.ts'
import TestPage from './pages/test/TestPage.tsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/detail/:movieId", element: <DetailPage /> },
      { path: "/test", element: <TestPage /> },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
)
