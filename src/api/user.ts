import { instance } from '@/api/instance'
import type { UserResponse } from '@/types/api'

/**
 * 회원정보 조회 API
 * - GET /api/user
 */
export const getUser = async (): Promise<UserResponse> => {
  const response = await instance.get<UserResponse>('/api/user')
  return response.data
}
