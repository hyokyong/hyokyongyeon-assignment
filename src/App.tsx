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

const AppContent = () => {
  const { initialize } = useAuthStore()

  useEffect(() => {
    /** 앱 시작 시 refreshToken으로 accessToken 복구 시도 */
    initialize()
  }, [initialize])

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
