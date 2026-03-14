/**
 * Suspense 로딩 화면 컴포넌트
 * - 데이터 로딩 중일 때 Layout 단에서 표시
 */
export const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-text-secondary">로딩 중...</p>
    </div>
  )
}
