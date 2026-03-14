import { useState } from 'react'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'

interface DeleteModalProps {
  /** 삭제할 할 일 ID */
  taskId: string
  /** 모달 닫기 콜백 */
  onClose: () => void
  /** 삭제 확인 후 제출 콜백 */
  onConfirm: () => void
  /** 삭제 로딩 상태 */
  isLoading: boolean
}

/**
 * 할 일 삭제 확인 모달
 * - input에 taskId와 동일한 값 입력 시 제출 버튼 활성화
 * - 불일치 시 제출 버튼 비활성화
 */
const DeleteModal = ({
  taskId,
  onClose,
  onConfirm,
  isLoading,
}: DeleteModalProps) => {
  const [inputValue, setInputValue] = useState('')

  /** input값과 taskId가 일치할 때만 제출 버튼 활성화 */
  const isConfirmable = inputValue === taskId

  return (
    <Modal
      title="할 일 삭제"
      onClose={onClose}
      footer={
        <>
          {/* 취소 버튼 */}
          <Button variant="ghost" size="md" onClick={onClose}>
            취소
          </Button>
          {/* 제출 버튼 - input값 불일치 시 비활성화 */}
          <Button
            variant="danger"
            size="md"
            disabled={!isConfirmable || isLoading}
            onClick={onConfirm}
          >
            {isLoading ? '삭제 중...' : '삭제'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        {/* 안내 문구 */}
        <p className="text-sm text-text-secondary">
          삭제하려면 아래 입력창에{' '}
          <span className="font-semibold text-text-primary">{taskId}</span>를
          입력해주세요.
        </p>

        {/* 확인용 ID 입력 */}
        <Input
          label="ID 확인"
          type="text"
          placeholder={taskId}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </Modal>
  )
}

export default DeleteModal
