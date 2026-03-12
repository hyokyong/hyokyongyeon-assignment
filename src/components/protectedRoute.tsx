import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface ProtectedRouteProps {
  /** 보호할 페이지 컴포넌트 */
  children: ReactNode
}

/**
 * 보호 라우트 컴포넌트
 * - accessToken 없으면 로그인 페이지로 redirect
 * - 대시보드, 할 일 목록, 할 일 상세, 회원정보에 적용
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken, isInitialized } = useAuthStore()

  /** initialize 전에는 잠깐 빈 화면 — refresh 복구 후 판단 */
  if (!isInitialized) {
    return null
  }

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
