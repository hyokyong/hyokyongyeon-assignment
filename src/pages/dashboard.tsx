import type { ReactNode } from 'react'
import { ClipboardList, Clock, CheckCircle } from 'lucide-react'
import { useDashboard } from '@/hooks/useDashboard'
import { Card } from '@/components/common/Card'

/** 대시보드 카드 아이템 타입 */
interface DashboardCardItem {
  label: string
  count: number
  icon: ReactNode
  iconColor: string
}

/**
 * 대시보드 페이지
 * - GET /api/dashboard 데이터 표시
 * - 전체 할 일, 해야할 일, 한 일 카드 표시
 * - useQuery로 데이터 조회 (캐싱, 로딩/에러 자동 처리)
 */
const DashboardPage = () => {
  const { data } = useDashboard()

  /** 대시보드 카드 목록 */
  const cards: DashboardCardItem[] = [
    {
      label: '전체 할 일',
      count: data.numOfTask,
      icon: <ClipboardList size={24} />,
      iconColor: 'text-primary',
    },
    {
      label: '해야할 일',
      count: data.numOfRestTask,
      icon: <Clock size={24} />,
      iconColor: 'text-danger',
    },
    {
      label: '한 일',
      count: data.numOfDoneTask,
      icon: <CheckCircle size={24} />,
      iconColor: 'text-success',
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* 페이지 타이틀 */}
      <h2 className="text-xl font-bold text-text-primary">대시보드</h2>

      {/* 대시보드 카드 목록 */}
      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <div className="flex flex-col gap-3">
              {/* 아이콘 */}
              <span className={card.iconColor}>{card.icon}</span>
              {/* 수치 */}
              <span className="text-3xl font-bold text-text-primary">
                {card.count}
              </span>
              {/* 라벨 */}
              <span className="text-sm text-text-secondary">{card.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
