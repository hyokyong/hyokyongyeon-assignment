import { instance } from '@/api/instance'
import type { AuthTokenResponse, SignInRequest } from '@/types/api'

/**
 * 로그인 API
 * - POST /api/sign-in
 * - 성공 시 accessToken, refreshToken 반환
 */
export const signIn = async (
  data: SignInRequest
): Promise<AuthTokenResponse> => {
  const response = await instance.post<AuthTokenResponse>('/api/sign-in', data)
  return response.data
}

/**
 * 토큰 갱신 API
 * - POST /api/refresh
 * - refreshToken으로 새 accessToken 발급
 */
export const refresh = async (): Promise<AuthTokenResponse> => {
  const response = await instance.post<AuthTokenResponse>('/api/refresh')
  return response.data
}
