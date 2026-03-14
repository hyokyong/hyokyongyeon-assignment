import { http, HttpResponse } from 'msw'
import type { UserResponse } from '@/types/api/user'

/**
 * 회원정보 조회
 * - Authorization: Bearer {accessToken} 헤더 필요
 * - 실제 환경에서는 토큰 검증 후 401 반환 가능
 */
const getUser = http.get('/api/user', () => {
  return HttpResponse.json<UserResponse>({
    name: '홍길동',
    memo: '안녕하세요, 홍길동입니다.',
  })
})

export const userHandlers = [getUser]
