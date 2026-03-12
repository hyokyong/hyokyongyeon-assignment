import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import type { TaskItem } from '@/types/api'

interface TaskCardProps {
  /** 할 일 아이템 데이터 */
  task: TaskItem
}

/**
 * 할 일 카드 컴포넌트
 * - title, memo, status(Badge) 표시
 */
const TaskCard = memo(({ task }: TaskCardProps) => {
  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(`/task/${task.id}`)}>
      <div className="flex flex-col gap-2">
        {/* 상단: 제목 + 배지 */}
        <div className="flex items-center justify-between gap-2">
          {/* 할 일 제목 */}
          <h3 className="text-sm font-semibold text-text-primary truncate">
            {task.title}
          </h3>
          {/* 상태 배지 */}
          <Badge status={task.status} />
        </div>

        {/* 메모 - 2줄까지만 표시 */}
        <p className="text-sm text-text-secondary line-clamp-2">{task.memo}</p>
      </div>
    </Card>
  )
})

export default TaskCard
