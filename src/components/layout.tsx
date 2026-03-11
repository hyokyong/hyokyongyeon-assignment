import { Outlet } from 'react-router-dom'

/**
 * 공통 레이아웃 컴포넌트
 * - GNB, LNB는 추후 feature/navigation에서 구현
 * - Outlet: 하위 라우트 페이지가 렌더링되는 영역
 */
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 네비게이션 - 추후 GNB 컴포넌트로 교체 */}
      <header className="h-14 bg-bg-card border-b border-gray-200" />

      <div className="flex flex-1">
        {/* 좌측 네비게이션 - 추후 LNB 컴포넌트로 교체 */}
        <aside className="w-48 bg-bg-card border-r border-gray-200" />

        {/* 페이지 콘텐츠 영역 */}
        <main className="flex-1 p-6 bg-bg-default">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
