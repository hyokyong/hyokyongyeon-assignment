import type { ReactNode } from 'react'

interface CardProps {
  /** 카드 내용 */
  children: ReactNode
  /** 추가 클래스 */
  className?: string
  /** 클릭 이벤트 - 있으면 커서 포인터 */
  onClick?: () => void
}

/**
 * 공통 카드 컴포넌트
 * - 기본 카드 레이아웃 (배경, 패딩, 그림자, 라운드)
 * - 사용처: 할 일 목록 카드, 대시보드 카드
 */
export const Card = ({ children, className = '', onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={[
        'bg-bg-card rounded-lg shadow-sm border border-border-subtle p-4',
        /* onClick 있으면 커서 포인터 및 hover 효과 */
        onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
