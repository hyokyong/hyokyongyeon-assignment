import { useQuery } from '@tanstack/react-query'
import { getTaskDetail } from '@/api/task'

/**
 * 할 일 상세 조회 훅
 * - 404는 throw하지 않고 error로 두어 페이지에서 EmptyState 처리
 * - 404 외 에러는 throwOnError로 ErrorBoundary에 위임
 */
export const useTaskDetail = (id: string) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskDetail(id),
    /** 404는 ErrorBoundary 말고 페이지 내부에서 처리 */
    throwOnError: (error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response
        ?.status
      return status !== 404
    },
  })
}
