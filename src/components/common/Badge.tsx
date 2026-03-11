import type { TaskStatus } from '@/types/api'

/** status별 스타일 */
const statusStyles: Record<TaskStatus, string> = {
  TODO: 'bg-primary/10 text-primary',
  DONE: 'bg-success/10 text-success',
}

/** status별 라벨 */
const statusLabels: Record<TaskStatus, string> = {
  TODO: '해야할 일',
  DONE: '완료',
}

interface BadgeProps {
  /** 할 일 상태 - TODO: 미완료, DONE: 완료 */
  status: TaskStatus
}

/**
 * 공통 배지 컴포넌트
 * - TODO: primary 색상 토큰
 * - DONE: success 색상 토큰
 * - 사용처: 할 일 카드 상태 표시
 */
export const Badge = ({ status }: BadgeProps) => {
  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        statusStyles[status],
      ].join(' ')}
    >
      {statusLabels[status]}
    </span>
  )
}
