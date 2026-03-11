import { http, HttpResponse } from 'msw'
import type { AuthTokenResponse } from '@/types/api/auth'
import type { ErrorResponse } from '@/types/api/common'

/**
 * 로그인
 * - 이메일, 비밀번호 누락 시 400 반환
 * - 성공 시 accessToken, refreshToken 반환
 */
const signIn = http.post('/api/sign-in', async ({ request }) => {
  const body = (await request.json()) as { email: string; password: string }

  if (!body.email || !body.password) {
    return HttpResponse.json(
      {
        errorMessage: '이메일과 비밀번호를 입력해주세요.',
      } satisfies ErrorResponse,
      { status: 400 }
    )
  }

  return HttpResponse.json({
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  } satisfies AuthTokenResponse)
})

/**
 * 토큰 갱신
 * - refreshToken 쿠키를 받아 새로운 accessToken, refreshToken 반환
 * - 실제 환경에서는 쿠키 검증 후 401 반환 가능
 */
const refresh = http.post('/api/refresh', () => {
  return HttpResponse.json({
    accessToken: 'new-mock-access-token',
    refreshToken: 'new-mock-refresh-token',
  } satisfies AuthTokenResponse)
})

export const authHandlers = [signIn, refresh]
