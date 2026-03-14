import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

/**
 * 보호 라우트 컴포넌트
 * - isInitialized: false → 아무것도 렌더링 안 함 (토큰 복구 중)
 * - accessToken 없으면 /sign-in으로 redirect
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken, isInitialized } = useAuthStore()

  if (!isInitialized) return null

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
