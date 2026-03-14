import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

/** axios 인스턴스 */
export const instance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
})

/** 요청 interceptor */
instance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

/** 응답 interceptor - 401 발생 시 토큰 갱신 후 재시도 */
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    /** 401이고 재시도 안 한 요청만 처리 */
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        /** refreshToken으로 새 accessToken 발급 */
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
          throw new Error('refreshToken 없음')
        }

        const { data } = await instance.post('/api/refresh', null, {
          headers: { Cookie: `token=${refreshToken}` },
        })

        /** 새 토큰 저장 */
        useAuthStore.getState().setAccessToken(data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)

        /** 원래 요청 재시도 */
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return instance(originalRequest)
      } catch {
        /** 갱신 실패 시 로그아웃 후 로그인 페이지로 이동 */
        useAuthStore.getState().clearAuth()
        window.location.href = '/sign-in'
      }
    }

    return Promise.reject(error)
  }
)
