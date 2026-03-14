import { http, HttpResponse } from 'msw'
import type { DashboardResponse } from '@/types/api/dashboard'

/**
 * 대시보드 데이터 조회
 * - 전체/미완료/완료 할 일 수 반환
 */
const getDashboard = http.get('/api/dashboard', () => {
  return HttpResponse.json<DashboardResponse>({
    numOfTask: 60,
    numOfRestTask: 40,
    numOfDoneTask: 20,
  })
})

export const dashboardHandlers = [getDashboard]
