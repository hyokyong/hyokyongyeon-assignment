import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'

/**
 * MSW 목 서버 활성화 함수
 * - 개발 환경(DEV)에서만 MSW 워커를 시작
 * - 프로덕션 빌드에서는 실행되지 않음
 * - onUnhandledRequest: 'bypass' → 핸들러 없는 요청은 그냥 통과
 */
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start({
      // 핸들러가 없는 요청은 실제 네트워크로 bypass (콘솔 경고 없음)
      onUnhandledRequest: 'bypass',
    })
  }
}

/**
 * MSW 초기화가 완료된 후 React 앱을 렌더링
 * - enableMocking()이 완료되기 전에 앱이 렌더링되면
 *   MSW가 요청을 가로채지 못할 수 있어 then() 체이닝으로 순서 보장
 */
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
})
