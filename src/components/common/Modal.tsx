import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  /** 모달 제목 */
  title: string
  /** 모달 내용 */
  children: ReactNode
  /** 모달 하단 버튼 영역 */
  footer?: ReactNode
  /** 모달 닫기 콜백 */
  onClose: () => void
}

/**
 * 공통 모달 컴포넌트
 * - Portal로 body에 렌더링 (z-index 이슈 방지)
 * - 외부 클릭 시 닫기
 * - ESC 키로 닫기
 * - 사용처: 에러 모달, 삭제 확인 모달
 */
export const Modal = ({ title, children, footer, onClose }: ModalProps) => {
  /** ESC 키로 모달 닫기 */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  /** 모달 열릴 때 body 스크롤 방지 */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return createPortal(
    /* 딤드 배경 - 클릭 시 모달 닫기 */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="presentation"
    >
      {/* 모달 본체 - 클릭 이벤트 전파 차단 */}
      <div
        className="w-full max-w-md bg-bg-card rounded-lg shadow-lg p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-text-primary"
          >
            {title}
          </h2>
          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="모달 닫기"
          >
            ✕
          </button>
        </div>

        {/* 모달 내용 */}
        <div>{children}</div>

        {/* 모달 푸터 - 버튼 영역 */}
        {footer && <div className="flex justify-end gap-2">{footer}</div>}
      </div>
    </div>,
    document.body
  )
}
