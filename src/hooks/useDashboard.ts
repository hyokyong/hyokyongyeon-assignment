// src/hooks/useDashboard.ts
import { useSuspenseQuery } from '@tanstack/react-query'
import { getDashboard } from '@/api/dashboard'

/**
 * 대시보드 데이터 조회 훅
 * - useSuspenseQuery: 로딩 중엔 Suspense로 위임, data 항상 존재 보장
 */
export const useDashboard = () => {
  return useSuspenseQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
    staleTime: 0,
  })
}
