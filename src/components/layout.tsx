import { Outlet } from 'react-router-dom'
import GNB from '@/components/gnb'
import LNB from '@/components/lnb'

/**
 * 공통 레이아웃 컴포넌트
 * - GNB: 상단 네비게이션
 * - LNB: 좌측 네비게이션
 * - Outlet: 하위 라우트 페이지가 렌더링되는 영역
 */
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <GNB />

      <div className="flex flex-1">
        <LNB />

        <main className="flex-1 p-6 bg-bg-default">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
