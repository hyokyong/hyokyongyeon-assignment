/** 로그인 요청 바디 */
export interface SignInRequest {
  email: string
  password: string
}

/** 로그인/토큰 갱신 성공 응답 */
export interface AuthTokenResponse {
  accessToken: string
  refreshToken: string
}
