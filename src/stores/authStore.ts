import { create } from 'zustand'

/** 인증 상태 타입 */
interface AuthState {
  /** JWT 액세스 토큰 - 메모리에만 저장 (새로고침 시 초기화) */
  accessToken: string | null
  /** 액세스 토큰 저장 */
  setAccessToken: (token: string) => void
  /** 로그아웃 - 토큰 전체 초기화 */
  clearAuth: () => void
}

/**
 * 인증 전역 스토어
 * - accessToken: Zustand 메모리 저장 (XSS 방어)
 * - refreshToken: localStorage 저장 (새로고침 후 복구용)
 */
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,

  setAccessToken: (token) => set({ accessToken: token }),

  clearAuth: () => {
    /** 메모리 토큰 초기화 */
    set({ accessToken: null })
    /** localStorage refreshToken 제거 */
    localStorage.removeItem('refreshToken')
  },
}))
