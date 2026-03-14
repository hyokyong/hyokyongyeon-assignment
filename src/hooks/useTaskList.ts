import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { getTasks } from '@/api/task'

/**
 * 할 일 목록 무한 스크롤 훅
 * - useSuspenseInfiniteQuery: 로딩 중엔 Suspense로 위임
 * - 페이지별 데이터를 자동으로 누적 관리
 * - hasNextPage: false면 fetchNextPage 호출 안 함
 */
export const useTaskList = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: ({ pageParam }) => getTasks(pageParam as number),
    /** 최초 페이지는 1부터 시작 */
    initialPageParam: 1,
    /**
     * 다음 페이지 번호 반환
     * - hasNext: true면 다음 페이지 번호 반환
     * - hasNext: false면 undefined → hasNextPage가 false
     */
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined
    },
  })
}
