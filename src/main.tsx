import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Layout from './Layout.tsx'
import DetailPage from './pages/detail/DetailPage.tsx'
import MainPage from './pages/main/MainPage.tsx'
import TestPage from './pages/test/TestPage.tsx'
import SignupPage from './auth/signup/SignupPage.tsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/detail/:movieId", element: <DetailPage /> },
      { path: "/test", element: <TestPage /> },
      { path: "/signup", element: <SignupPage /> }
    ],
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
