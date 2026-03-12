import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout'
import ProtectedRoute from '@/components/protectedRoute'
import DashboardPage from '@/pages/dashboard'
import SignInPage from '@/pages/signIn'
import TaskPage from '@/pages/task'
import TaskDetailPage from '@/pages/taskDetail'
import UserPage from '@/pages/user'

/**
 * 앱 전체 라우트 설정
 * - Layout: GNB + LNB + Outlet 공통 레이아웃
 * - /sign-in: 레이아웃 없이 단독 페이지
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      /** 레이아웃 전체에 보호 라우트 적용 */
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        /** 대시보드 - 기본 경로 */
        index: true,
        element: <DashboardPage />,
      },
      {
        /** 할 일 목록 */
        path: 'task',
        element: <TaskPage />,
      },
      {
        /** 할 일 상세 */
        path: 'task/:id',
        element: <TaskDetailPage />,
      },
      {
        /** 회원정보 */
        path: 'user',
        element: <UserPage />,
      },
    ],
  },
  {
    /** 로그인 - 레이아웃 없이 단독 페이지 */
    path: '/sign-in',
    element: <SignInPage />,
  },
])

export default router
