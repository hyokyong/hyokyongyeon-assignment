import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTaskDetail } from '@/hooks/useTaskDetail'
import { useDeleteTask } from '@/hooks/useDeleteTask'
import { Button } from '@/components/common/Button'
import { EmptyState } from '@/components/common/EmptyState'
import DeleteModal from '@/components/deleteModal'
import { formatDate } from '@/util/formatDate'

const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  if (!id) {
    return (
      <EmptyState
        title="잘못된 경로예요."
        description="할 일 ID가 없습니다."
        actionLabel="목록으로 돌아가기"
        onAction={() => navigate('/task')}
      />
    )
  }

  return <TaskDetailContent id={id} />
}

/**
 * id 확정 후에만 useTaskDetail 호출 (hooks 순서 유지)
 */
function TaskDetailContent({ id }: { id: string }) {
  const navigate = useNavigate()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { data, error, isError, isPending } = useTaskDetail(id)
  const { mutate: runDelete, isPending: isDeletePending } = useDeleteTask()

  /**
   * 404 처리
   * - ErrorBoundary 말고 페이지 내부에서 EmptyState로 처리
   */
  const status = (error as { response?: { status?: number } })?.response?.status
  if (isError && status === 404) {
    return (
      <EmptyState
        title="존재하지 않는 할 일이에요."
        description="이미 삭제됐거나 잘못된 경로예요."
        actionLabel="목록으로 돌아가기"
        onAction={() => navigate('/task')}
      />
    )
  }

  /** 로딩 중 (404가 아니면서 아직 data 없음) */
  if (isPending || !data) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-text-secondary">로딩 중...</p>
      </div>
    )
  }

  /** 삭제 확인 후 제출 */
  const handleDeleteConfirm = () => {
    runDelete(id, {
      onSuccess: () => {
        /** 삭제 성공 시 목록으로 redirect */
        navigate('/task')
      },
      onError: (err: unknown) => {
        /** 삭제 실패 시 모달 닫기 */
        setIsDeleteModalOpen(false)
        console.error(err)
      },
    })
  }

  return (
    <>
      <div className="flex flex-col gap-6 max-w-2xl">
        {/* 상단: 타이틀 + 삭제 버튼 */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">할 일 상세</h2>
          {/* 삭제 버튼 */}
          <Button
            variant="danger"
            size="md"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            삭제
          </Button>
        </div>

        {/* 상세 내용 */}
        <div className="flex flex-col gap-4 bg-bg-card rounded-lg border border-gray-100 p-6">
          {/* 제목 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-secondary">제목</span>
            <p className="text-base font-semibold text-text-primary">
              {data.title}
            </p>
          </div>

          {/* 메모 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-secondary">메모</span>
            <p className="text-sm text-text-primary whitespace-pre-wrap">
              {data.memo}
            </p>
          </div>

          {/* 등록 일시 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-secondary">등록 일시</span>
            <p className="text-sm text-text-primary">
              {formatDate(data.registerDatetime)}
            </p>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <DeleteModal
          taskId={id}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          isLoading={isDeletePending}
        />
      )}
    </>
  )
}

export default TaskDetailPage
