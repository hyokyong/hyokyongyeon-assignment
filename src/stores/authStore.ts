import { create } from 'zustand'
import { refresh } from '@/api/auth'

/** 인증 상태 타입 */
interface AuthState {
  /** JWT 액세스 토큰 - 메모리에만 저장 (새로고침 시 초기화) */
  accessToken: string | null
  /** 초기화 완료 여부 - 복구 전에 페이지 렌더링 방지용 */
  isInitialized: boolean
  /** 액세스 토큰 저장 */
  setAccessToken: (token: string) => void
  /** 로그아웃 - 토큰 전체 초기화 */
  clearAuth: () => void
  /** 앱 시작 시 토큰 복구 */
  initialize: () => Promise<void>
}

/**
 * 인증 전역 스토어
 * - accessToken: Zustand 메모리 저장 (XSS 방어)
 * - refreshToken: localStorage 저장 (새로고침 후 복구용)
 * - initialize: 앱 시작 시 refreshToken으로 accessToken 복구
 */
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isInitialized: false,

  setAccessToken: (token) => set({ accessToken: token }),

  clearAuth: () => {
    /** 메모리 토큰 초기화 */
    set({ accessToken: null })
    /** localStorage refreshToken 제거 */
    localStorage.removeItem('refreshToken')
  },

  initialize: async () => {
    const refreshToken = localStorage.getItem('refreshToken')

    if (refreshToken) {
      try {
        /** refreshToken으로 새 accessToken 발급 */
        const data = await refresh()
        set({ accessToken: data.accessToken })
        localStorage.setItem('refreshToken', data.refreshToken)
      } catch {
        /** 갱신 실패 시 토큰 제거 */
        localStorage.removeItem('refreshToken')
      }
    }

    /** 복구 완료 */
    set({ isInitialized: true })
  },
}))
