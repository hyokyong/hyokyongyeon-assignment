import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

/**
 * TanStack Query 클라이언트 설정
 * - staleTime: 5분 동안 캐시 데이터를 신선한 것으로 간주
 * - retry: API 실패 시 1번만 재시도
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

/**
 * 앱 루트 컴포넌트
 * - 앱 시작 시 토큰 복구 (initialize)
 * - 복구 완료 전까지 로딩 화면 표시
 */
const AppContent = () => {
  const { isInitialized, initialize } = useAuthStore()

  useEffect(() => {
    /** 앱 시작 시 refreshToken으로 accessToken 복구 시도 */
    initialize()
  }, [initialize])

  /** 토큰 복구 완료 전 로딩 화면 */
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-default">
        <p className="text-text-secondary">로딩 중...</p>
      </div>
    )
  }

  return <RouterProvider router={router} />
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App
