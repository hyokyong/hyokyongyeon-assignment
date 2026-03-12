import type { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'

/**
 * ErrorBoundary 에러 화면 컴포넌트
 * - API 에러 발생 시 Layout 단에서 표시
 * - 다시 시도: resetErrorBoundary 호출
 * - 홈으로: 대시보드로 이동
 */
export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-lg font-semibold text-text-primary">
        문제가 발생했어요.
      </p>
      <p className="text-sm text-text-secondary">잠시 후 다시 시도해주세요.</p>
      <div className="flex gap-2">
        <Button variant="primary" size="md" onClick={resetErrorBoundary}>
          다시 시도
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={() => {
            resetErrorBoundary()
            navigate('/')
          }}
        >
          홈으로
        </Button>
      </div>
    </div>
  )
}
