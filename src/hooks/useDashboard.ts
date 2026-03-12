import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '@/api/dashboard'

/**
 * 대시보드 데이터 조회 훅
 */
export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
    /** 페이지 진입할 때마다 새로 호출 */
    staleTime: 0,
  })
}
