import { Button } from '@/components/common/Button.tsx'

interface EmptyStateProps {
  /** 제목 */
  title: string
  /** 설명 */
  description?: string
  /** 액션 버튼 텍스트 */
  actionLabel?: string
  /** 액션 버튼 클릭 콜백 */
  onAction?: () => void
}

/**
 * 공통 EmptyState 컴포넌트
 * - 빈 화면, 404 화면 등에서 사용
 * - 사용처: 404 화면, 빈 목록 화면
 */
export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      {/* 제목 */}
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>

      {/* 설명 */}
      {description && (
        <p className="text-sm text-text-secondary">{description}</p>
      )}

      {/* 액션 버튼 */}
      {actionLabel && onAction && (
        <Button variant="ghost" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
