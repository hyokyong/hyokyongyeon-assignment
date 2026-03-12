import type { InputHTMLAttributes } from 'react'
import { ErrorMessage } from '@/components/common/ErrorMessage.tsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** input 라벨 텍스트 */
  label: string
  /** 유효성 에러 메시지 */
  error?: string
}

/**
 * 공통 Input 컴포넌트
 * - label: 라벨
 * - error: 유효성 검증 실패 시 에러 메시지 표시
 * - disabled: disabled 색상 토큰 적용
 */
export const Input = ({
  label,
  error,
  id,
  disabled,
  className = '',
  ...props
}: InputProps) => {
  const inputId = id ?? label

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-text-primary"
      >
        {label}
      </label>

      {/* input */}
      <input
        id={inputId}
        disabled={disabled}
        className={[
          'w-full px-3 py-2 rounded-md border text-sm outline-none transition-colors',
          /* 에러 상태: 빨간 테두리 */
          error
            ? 'border-danger focus:border-danger'
            : 'border-border-strong focus:border-primary',
          /* disabled 상태: disabled 색상 토큰 적용 */
          disabled
            ? 'bg-disabled/20 text-disabled cursor-not-allowed'
            : 'bg-bg-card',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />

      {/* 유효성 에러 메시지 */}
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
