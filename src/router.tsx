import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/components/layout.tsx'
import DashboardPage from '@/pages/dashboard.tsx'
import SignInPage from '@/pages/signIn.tsx'
import TaskPage from '@/pages/task.tsx'
import TaskDetailPage from '@/pages/taskDetail.tsx'
import UserPage from '@/pages/user.tsx'

/**
 * 앱 전체 라우트 설정
 * - Layout: GNB + LNB + Outlet 공통 레이아웃
 * - /sign-in: 레이아웃 없이 단독 페이지
 */
const router = createBrowserRouter([
  {
    /** 공통 레이아웃 적용 라우트 */
    path: '/',
    element: <Layout />,
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
