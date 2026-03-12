import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '@/api/task'

/** 할 일 삭제 훅 */
export const useDeleteTask = () => {
  /** 캐시 무효화를 위한 queryClient */
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      /**
       * 삭제 성공 시 tasks 캐시 무효화
       * - 목록 페이지로 돌아갔을 때 최신 데이터로 갱신
       */
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
