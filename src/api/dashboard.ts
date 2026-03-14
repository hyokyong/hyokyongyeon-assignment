import { instance } from '@/api/instance'
import type { DashboardResponse } from '@/types/api'

/**
 * 대시보드 데이터 조회 API
 * - GET /api/dashboard
 */
export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await instance.get<DashboardResponse>('/api/dashboard')
  return response.data
}
