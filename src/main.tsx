import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Layout from './Layout.tsx'
import DetailPage from './pages/detail/DetailPage.tsx'
import MainPage from './pages/main/MainPage.tsx'
import TestPage from './pages/test/TestPage.tsx'
import LoginPage from './pages/auth/login/LoginPage.tsx'
import SignupPage from './pages/auth/signup/SignupPage.tsx'
import MyPage from './pages/auth/mypage/MyPage.tsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/detail/:movieId", element: <DetailPage /> },
      { path: "/test", element: <TestPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/mypage", element: <MyPage />},
    ],
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
