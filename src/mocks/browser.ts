import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * MSW 브라우저 워커 인스턴스
 * - 브라우저 환경에서 Service Worker를 통해 네트워크 요청을 가로채 목 응답 반환
 * - 개발 환경(DEV)에서만 실행됨 (main.tsx 참고)
 */
export const worker = setupWorker(...handlers)
