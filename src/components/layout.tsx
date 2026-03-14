import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import GNB from '@/components/gnb'
import LNB from '@/components/lnb'
import { ErrorFallback, LoadingFallback } from './common'

/**
 * 공통 레이아웃 컴포넌트
 * - ErrorBoundary: API 에러 발생 시 ErrorFallback 표시
 * - Suspense: 데이터 로딩 중 LoadingFallback 표시
 */
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <GNB />
      <div className="flex flex-1">
        <LNB />
        <main className="flex-1 p-6 bg-bg-default">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}

export default Layout
