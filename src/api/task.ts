import { instance } from '@/api/instance'
import type {
  TaskListResponse,
  TaskDetailResponse,
  DeleteTaskResponse,
} from '@/types/api'

/**
 * 할 일 목록 조회 API
 * - GET /api/task?page={n}
 */
export const getTasks = async (page: number): Promise<TaskListResponse> => {
  const response = await instance.get<TaskListResponse>('/api/task', {
    params: { page },
  })
  return response.data
}

/**
 * 할 일 상세 조회 API
 * - GET /api/task/:id
 */
export const getTaskDetail = async (
  id: string
): Promise<TaskDetailResponse> => {
  const response = await instance.get<TaskDetailResponse>(`/api/task/${id}`)
  return response.data
}

/**
 * 할 일 삭제 API
 * - DELETE /api/task/:id
 */
export const deleteTask = async (id: string): Promise<DeleteTaskResponse> => {
  const response = await instance.delete<DeleteTaskResponse>(`/api/task/${id}`)
  return response.data
}
